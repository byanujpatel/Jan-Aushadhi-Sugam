import React, { useState } from "react";
import { Search, ShieldAlert, FileSearch, ArrowRight } from "lucide-react";
import { motion } from "motion/react";

interface MedicineFormProps {
  onSearch: (name: string, strength: string) => void;
  isLoading: boolean;
}

const COMMON_TAGS = [
  { name: "Augmentin", strength: "625 Duo" },
  { name: "Dolo", strength: "650mg" },
  { name: "Pantocid", strength: "40mg" },
  { name: "Crocin", strength: "500mg" },
  { name: "Montek-LC", strength: "10mg" },
  { name: "Pan-D", strength: "Standard" }
];

export default function MedicineForm({ onSearch, isLoading }: MedicineFormProps) {
  const [name, setName] = useState("");
  const [strength, setStrength] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name.trim()) {
      onSearch(name.trim(), strength.trim());
    }
  };

  const selectTag = (tag: typeof COMMON_TAGS[0]) => {
    setName(tag.name);
    setStrength(tag.strength === "Standard" ? "" : tag.strength);
    onSearch(tag.name, tag.strength === "Standard" ? "" : tag.strength);
  };

  return (
    <div className="bg-white rounded-3xl p-6 border border-teal-50 shadow-md">
      <div>
        <h3 className="text-lg font-semibold text-slate-800 flex items-center gap-2">
          <FileSearch className="w-5 h-5 text-teal-600" />
          Direct Brand Matcher
        </h3>
        <p className="text-xs text-slate-500">Already know the brand name? Type it below to find its generic active salt</p>
      </div>

      <form onSubmit={handleSubmit} className="mt-4 space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <label htmlFor="brand-name" className="text-xs font-bold text-slate-600 uppercase tracking-wider block">
              Medicine Brand Name *
            </label>
            <div className="relative">
              <input
                id="brand-name"
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g., Augmentin, Dolo, Pan-D"
                className="w-full bg-slate-50 text-slate-800 text-sm py-3 px-4 pl-10 rounded-xl border border-slate-200 focus:outline-none focus:border-teal-500 focus:bg-white transition"
              />
              <Search className="absolute left-3.5 top-3.5 w-4 h-4 text-slate-400" />
            </div>
          </div>

          <div className="space-y-1.5">
            <label htmlFor="strength" className="text-xs font-bold text-slate-600 uppercase tracking-wider block">
              Strength / Dosage (Optional)
            </label>
            <input
              id="strength"
              type="text"
              value={strength}
              onChange={(e) => setStrength(e.target.value)}
              placeholder="e.g., 625mg, 40mg, syrup"
              className="w-full bg-slate-50 text-slate-800 text-sm py-3 px-4 rounded-xl border border-slate-200 focus:outline-none focus:border-teal-500 focus:bg-white transition"
            />
          </div>
        </div>

        <button
          type="submit"
          disabled={isLoading || !name.trim()}
          className="w-full bg-slate-800 hover:bg-slate-900 disabled:bg-slate-300 text-white text-sm font-bold py-3 px-4 rounded-xl shadow-sm transition flex items-center justify-center gap-2"
        >
          {isLoading ? (
            <>
              <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              Searching Database...
            </>
          ) : (
            <>
              Instant Match Generic Salt
              <ArrowRight className="w-4 h-4" />
            </>
          )}
        </button>
      </form>

      {/* Quick Search Tags */}
      <div className="mt-5 pt-4 border-t border-slate-100">
        <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider block mb-2">
          Or click a popular Indian brand:
        </span>
        <div className="flex flex-wrap gap-1.5">
          {COMMON_TAGS.map((tag, idx) => (
            <button
              key={idx}
              type="button"
              disabled={isLoading}
              onClick={() => selectTag(tag)}
              className="py-1 px-3 text-xs bg-slate-100 hover:bg-teal-50 hover:text-teal-700 text-slate-600 rounded-lg transition font-medium border border-transparent hover:border-teal-200"
            >
              {tag.name} {tag.strength !== "Standard" ? `(${tag.strength})` : ""}
            </button>
          ))}
        </div>
      </div>

      {/* Clinical notice */}
      <div className="mt-4 p-3 bg-teal-50/40 border border-teal-100 rounded-xl flex items-start gap-2.5">
        <ShieldAlert className="w-4.5 h-4.5 text-teal-600 shrink-0 mt-0.5" />
        <p className="text-[11px] text-teal-800 leading-relaxed">
          <strong>Medical Note:</strong> Active salts determine efficacy, but always consult with your physician before substituting prescriptions, particularly for narrow-therapeutic or life-saving chronic therapies.
        </p>
      </div>
    </div>
  );
}
