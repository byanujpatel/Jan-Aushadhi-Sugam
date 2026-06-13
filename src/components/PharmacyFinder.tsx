import React, { useState } from "react";
import { MapPin, Phone, ExternalLink, Search, Store, Navigation } from "lucide-react";
import { PharmacyStore } from "../types";

interface PharmacyFinderProps {
  onSearchStores: (query: string) => Promise<PharmacyStore[]>;
  stores: PharmacyStore[];
  isLoading: boolean;
}

const POPULAR_LOCATIONS = ["Koramangala, Bengaluru", "Sector 62, Noida", "Andheri West, Mumbai", "T Nagar, Chennai"];

export default function PharmacyFinder({ onSearchStores, stores, isLoading }: PharmacyFinderProps) {
  const [query, setQuery] = useState("");
  const [searched, setSearched] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      await onSearchStores(query.trim());
      setSearched(true);
    }
  };

  const handleQuickSelect = async (loc: string) => {
    setQuery(loc);
    await onSearchStores(loc);
    setSearched(true);
  };

  return (
    <div className="bg-white rounded-3xl p-6 border border-teal-50 shadow-md">
      <div>
        <h3 className="text-lg font-semibold text-slate-800 flex items-center gap-2">
          <Store className="w-5 h-5 text-teal-600" />
          Jan Aushadhi Kendra Finder
        </h3>
        <p className="text-xs text-slate-500">
          Find registered PMJAK generic medicine stores, addresses, and phone numbers near you to beat stock issues
        </p>
      </div>

      <form onSubmit={handleSubmit} className="mt-4 flex gap-2">
        <div className="relative flex-1">
          <input
            type="text"
            required
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Type city, PIN code, or locality (e.g., Indiranagar, Bangalore)"
            className="w-full bg-slate-50 text-slate-800 text-sm py-3 px-4 pl-10 rounded-xl border border-slate-200 focus:outline-none focus:border-teal-500 focus:bg-white transition"
          />
          <MapPin className="absolute left-3.5 top-3.5 w-4 h-4 text-slate-400" />
        </div>
        <button
          type="submit"
          disabled={isLoading || !query.trim()}
          className="bg-teal-600 hover:bg-teal-700 disabled:bg-teal-300 text-white font-semibold px-5 rounded-xl text-sm transition hover:shadow-md flex items-center gap-1.5 shrink-0"
        >
          {isLoading ? (
            <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
          ) : (
            <>
              <Search className="w-4 h-4" />
              <span>Find Stores</span>
            </>
          )}
        </button>
      </form>

      {/* Popular locations quick select */}
      <div className="mt-3.5 flex flex-wrap items-center gap-2">
        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Suggested:</span>
        {POPULAR_LOCATIONS.map((loc) => (
          <button
            key={loc}
            type="button"
            onClick={() => handleQuickSelect(loc)}
            className="text-xs py-1 px-2.5 bg-slate-100 hover:bg-teal-50 text-slate-600 hover:text-teal-700 rounded-lg transition"
          >
            {loc.split(",")[0]}
          </button>
        ))}
      </div>

      <div className="mt-6">
        {isLoading ? (
          <div className="space-y-3 py-6">
            <div className="h-6 bg-slate-100 rounded-lg animate-pulse w-3/4 mx-auto" />
            <div className="h-16 bg-slate-100 rounded-lg animate-pulse w-full" />
            <div className="h-16 bg-slate-100 rounded-lg animate-pulse w-full" />
          </div>
        ) : stores.length > 0 ? (
          <div className="space-y-3.5">
            <p className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">
              Found {stores.length} Registered Generic Pharmacy locations:
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {stores.map((store, index) => (
                <div
                  key={index}
                  className="p-4 border border-rose-50 hover:border-teal-100 bg-slate-50/40 rounded-2xl flex flex-col justify-between transition-colors hover:bg-teal-50/5"
                >
                  <div>
                    <div className="flex items-start justify-between gap-2">
                      <h4 className="text-sm font-bold text-slate-800 line-clamp-2">{store.name}</h4>
                      {store.distance && (
                        <span className="text-[10px] bg-teal-50 text-teal-700 font-bold px-2 py-0.5 rounded-full shrink-0">
                          {store.distance}
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-slate-500 mt-1 line-clamp-3 leading-relaxed">
                      {store.address}
                    </p>
                  </div>

                  <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between gap-2">
                    {store.phone && store.phone !== "Not available" ? (
                      <a
                        href={`tel:${store.phone}`}
                        className="text-xs text-teal-600 font-semibold hover:underline flex items-center gap-1"
                      >
                        <Phone className="w-3 h-3" />
                        {store.phone}
                      </a>
                    ) : (
                      <span className="text-[11px] text-slate-400 italic">No contact number</span>
                    )}

                    {store.mapsUrl ? (
                      <a
                        href={store.mapsUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="text-[11px] bg-slate-800 text-white font-medium py-1 px-3 rounded-lg flex items-center gap-1 hover:bg-slate-900 transition"
                      >
                        <Navigation className="w-3 h-3" />
                        Directions
                        <ExternalLink className="w-2.5 h-2.5" />
                      </a>
                    ) : (
                      <a
                        href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
                          store.name + " " + store.address
                        )}`}
                        target="_blank"
                        rel="noreferrer"
                        className="text-[11px] bg-slate-100 text-slate-700 font-semibold py-1 px-3 rounded-lg flex items-center gap-1 hover:bg-slate-200 transition"
                      >
                        <Navigation className="w-3 h-3" />
                        Google Maps
                      </a>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : searched ? (
          <div className="py-8 text-center text-slate-400 bg-slate-50/40 rounded-2xl border border-slate-100">
            <Store className="w-8 h-8 mx-auto text-slate-300 stroke-[1.5] mb-2" />
            <p className="text-sm font-semibold text-slate-600">No official Kendra stores indexed for this area</p>
            <p className="text-xs text-slate-400 mt-1">Try clarifying with city/state (e.g. "Koramangala, Bengaluru")</p>
          </div>
        ) : (
          <div className="py-8 text-center text-slate-400 bg-slate-50/30 rounded-2xl border border-dashed border-slate-200">
            <MapPin className="w-8 h-8 mx-auto text-slate-300 stroke-[1.5] mb-2 animate-bounce" />
            <p className="text-xs text-slate-500 font-medium">Enter location above to see verified PMJAK drug stores</p>
          </div>
        )}
      </div>
    </div>
  );
}
