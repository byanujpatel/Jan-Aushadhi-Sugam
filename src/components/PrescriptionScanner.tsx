import React, { useState, useRef } from "react";
import { Camera, Upload, Image as ImageIcon, Laptop, RefreshCw, AlertCircle, FileText } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

interface PrescriptionScannerProps {
  onAnalyze: (base64Image: string, demoPresetId?: string) => void;
  isLoading: boolean;
}

const SAMPLE_PRESCRIPTIONS = [
  {
    id: "sample1",
    label: "Sample 1: Antibiotic & Fever",
    description: "Augmentin 625 DUO and Dolo 650 Prescription",
    image: "/assets/sample_presc_1.jpg", // We will provide a clean base64 string or simple representation
    // Let's store an inline mini-image or a synthetic canvas renderer so it works immediately!
    brandMedicines: "Augmentin 625 DUO (10 Tab), Dolo 650mg (15 Tab)"
  },
  {
    id: "sample2",
    label: "Sample 2: Chronic Care",
    description: "Lipitor 10mg & Pan-D Capsule Prescription",
    image: "/assets/sample_presc_2.jpg",
    brandMedicines: "Lipitor 10mg, Pan-D Caps"
  },
  {
    id: "sample3",
    label: "Sample 3: Pain & Gastric relief",
    description: "Ultracet and Pantocid 40mg",
    image: "/assets/sample_presc_3.jpg",
    brandMedicines: "Ultracet, Pantocid 40mg"
  }
];

// Let's create 3 simple high-concept synthetic prescription mock canvas images
// so of which returns a realistic handwritten prescription layout converted to base64!
const generateSyntheticPrescription = (type: "sample1" | "sample2" | "sample3"): string => {
  const canvas = document.createElement("canvas");
  canvas.width = 600;
  canvas.height = 700;
  const ctx = canvas.getContext("2d");
  if (!ctx) return "";

  // Background
  ctx.fillStyle = "#fafaf9"; // stone-50
  ctx.fillRect(0, 0, 600, 700);

  // Border
  ctx.strokeStyle = "#e7e5e4"; // stone-200
  ctx.lineWidth = 10;
  ctx.strokeRect(5, 5, 590, 690);

  // Grid/lines for prescription feel
  ctx.strokeStyle = "#f3f4f6";
  ctx.lineWidth = 1;
  for (let y = 150; y < 650; y += 40) {
    ctx.beginPath();
    ctx.moveTo(35, y);
    ctx.lineTo(565, y);
    ctx.stroke();
  }

  // Clinic Header
  ctx.fillStyle = "#0f172a"; // slate-900
  ctx.font = "bold 20px 'Inter', sans-serif";
  ctx.fillText("DR. ARVIND MEHTA, MBBS, MD (General Medicine)", 40, 50);
  
  ctx.fillStyle = "#64748b"; // slate-500
  ctx.font = "12px monospace";
  ctx.fillText("Reg No: 54932-A | Mehta Health Clinic, Indiranagar, Bengaluru", 40, 72);
  ctx.fillText("Date: 13-Jun-2026 | Patient Name: Mr. Karan Sharma (Age: 32)", 40, 90);

  // Separator line
  ctx.strokeStyle = "#0d9488"; // teal-600
  ctx.lineWidth = 3;
  ctx.beginPath();
  ctx.moveTo(35, 105);
  ctx.lineTo(565, 105);
  ctx.stroke();

  // Rx symbol
  ctx.fillStyle = "#0d9488";
  ctx.font = "italic bold 44px 'Courier New', serif";
  ctx.fillText("Rx", 40, 155);

  // Doctor's handwritten text simulation using styling
  ctx.fillStyle = "#1e3a8a"; // dark blue ink
  ctx.font = "italic bold 22px 'Architects Daughter', cursive, 'Courier New', sans-serif";

  if (type === "sample1") {
    ctx.fillText("1. Augmentin 625 DUO  ----   10 Tablets", 80, 210);
    ctx.font = "14px 'Inter', sans-serif";
    ctx.fillStyle = "#4b5563";
    ctx.fillText("   (Directions: 1 Tab -- Twice Daily (BD) after meals for 5 days)", 80, 235);

    ctx.fillStyle = "#1e3a8a";
    ctx.font = "italic bold 22px 'Courier New', sans-serif";
    ctx.fillText("2. Dolo 650 mg        ----   15 Tablets", 80, 310);
    ctx.font = "14px 'Inter', sans-serif";
    ctx.fillStyle = "#4b5563";
    ctx.fillText("   (Directions: 1 Tab -- Three times daily (TDS) if fever)", 80, 335);
  } else if (type === "sample2") {
    ctx.fillText("1. Lipitor 10 mg      ----   30 Tablets", 80, 210);
    ctx.font = "14px 'Inter', sans-serif";
    ctx.fillStyle = "#4b5563";
    ctx.fillText("   (Directions: 1 Tab -- Once daily (OD) at night)", 80, 235);

    ctx.fillStyle = "#1e3a8a";
    ctx.font = "italic bold 22px 'Courier New', sans-serif";
    ctx.fillText("2. Pan-D Capsule      ----   15 Capsules", 80, 310);
    ctx.font = "14px 'Inter', sans-serif";
    ctx.fillStyle = "#4b5563";
    ctx.fillText("   (Directions: 1 Caps -- Daily in morning 30mins before food (OD))", 80, 335);
  } else {
    ctx.fillText("1. Ultracet           ----   10 Tablets", 80, 210);
    ctx.font = "14px 'Inter', sans-serif";
    ctx.fillStyle = "#4b5563";
    ctx.fillText("   (Directions: 1 Tab -- As needed for severe back pain)", 80, 235);

    ctx.fillStyle = "#1e3a8a";
    ctx.font = "italic bold 22px 'Courier New', sans-serif";
    ctx.fillText("2. Pantocid 40 mg     ----   10 Tablets", 80, 310);
    ctx.font = "14px 'Inter', sans-serif";
    ctx.fillStyle = "#4b5563";
    ctx.fillText("   (Directions: 1 Tab -- Once Daily before breakfast)", 80, 335);
  }

  // Doctor Signature
  ctx.strokeStyle = "#1e3a8a";
  ctx.lineWidth = 1.5;
  ctx.beginPath();
  ctx.arc(480, 600, 30, 0, Math.PI * 2);
  ctx.moveTo(440, 610);
  ctx.lineTo(520, 590);
  ctx.stroke();

  ctx.fillStyle = "#334155";
  ctx.font = "bold 11px monospace";
  ctx.fillText("Authorized Signature & Stamp", 410, 645);

  return canvas.toDataURL("image/jpeg", 0.9);
};

export default function PrescriptionScanner({ onAnalyze, isLoading }: PrescriptionScannerProps) {
  const [dragActive, setDragActive] = useState(false);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [selectedPresetId, setSelectedPresetId] = useState<string | null>(null);
  const [streamActive, setStreamActive] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  // File drag handlers
  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const processFile = (file: File) => {
    if (!file.type.startsWith("image/")) {
      setErrorMsg("Please upload a valid image file (PNG, JPG, or WEBP).");
      return;
    }
    setErrorMsg(null);
    setSelectedPresetId(null);
    const reader = new FileReader();
    reader.onload = (e) => {
      if (e.target?.result && typeof e.target.result === "string") {
        setImagePreview(e.target.result);
      }
    };
    reader.readAsDataURL(file);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      processFile(e.dataTransfer.files[0]);
    }
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      processFile(e.target.files[0]);
    }
  };

  // Camera integration
  const startCamera = async () => {
    setErrorMsg(null);
    setImagePreview(null);
    setSelectedPresetId(null);
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: "environment" }
      });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        videoRef.current.play();
        setStreamActive(true);
      }
    } catch (err: any) {
      console.error("Camera access failed:", err);
      setErrorMsg("Unable to access camera. Please ensure camera permissions are permitted, or drag & drop a prescription photo.");
    }
  };

  const stopCamera = () => {
    if (videoRef.current && videoRef.current.srcObject) {
      const stream = videoRef.current.srcObject as MediaStream;
      stream.getTracks().forEach((track) => track.stop());
      videoRef.current.srcObject = null;
    }
    setStreamActive(false);
  };

  const capturePhoto = () => {
    if (videoRef.current) {
      const canvas = document.createElement("canvas");
      canvas.width = videoRef.current.videoWidth || 640;
      canvas.height = videoRef.current.videoHeight || 480;
      const ctx = canvas.getContext("2d");
      if (ctx) {
        ctx.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);
        const dataUrl = canvas.toDataURL("image/jpeg");
        setImagePreview(dataUrl);
        stopCamera();
      }
    }
  };

  // Submit base64 back to parent
  const handleSubmit = () => {
    if (imagePreview) {
      onAnalyze(imagePreview, selectedPresetId || undefined);
    }
  };

  // Click on a sample prescription preset
  const selectSample = (sampleId: "sample1" | "sample2" | "sample3") => {
    stopCamera();
    setErrorMsg(null);
    setSelectedPresetId(sampleId);
    const dataUrl = generateSyntheticPrescription(sampleId);
    setImagePreview(dataUrl);
  };

  return (
    <div className="bg-white rounded-3xl p-6 border border-teal-50 shadow-md">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-lg font-semibold text-slate-800 flex items-center gap-2">
            <Camera className="w-5 h-5 text-teal-600" />
            Prescription Capture & OCR
          </h3>
          <p className="text-xs text-slate-500">Snap prescription photo or upload to automatically scan with Gemini Vision</p>
        </div>
      </div>

      {errorMsg && (
        <div className="mb-4 p-3 bg-rose-50 border border-rose-200 text-rose-700 text-xs rounded-xl flex items-start gap-2">
          <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
          <span>{errorMsg}</span>
        </div>
      )}

      {/* Main scanner container */}
      <div 
        className={`relative h-80 rounded-2xl border-2 border-dashed flex flex-col items-center justify-center overflow-hidden transition-all duration-200 ${
          dragActive ? "border-teal-400 bg-teal-50/40" : "border-slate-200 bg-slate-50/50 hover:bg-slate-50"
        }`}
        onDragEnter={handleDrag}
        onDragOver={handleDrag}
        onDragLeave={handleDrag}
        onDrop={handleDrop}
      >
        <AnimatePresence mode="wait">
          {streamActive ? (
            <motion.div 
              key="camera-stream"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 w-full h-full bg-black flex flex-col justify-end"
            >
              <video 
                ref={videoRef}
                className="w-full h-full object-cover"
                playsInline
                muted
              />
              <div className="absolute inset-x-0 bottom-4 flex justify-center gap-3">
                <button
                  type="button"
                  onClick={capturePhoto}
                  className="bg-teal-600 hover:bg-teal-700 text-white font-medium py-2.5 px-6 rounded-full text-sm shadow-lg flex items-center gap-2 active:scale-95 transition-all"
                >
                  <Camera className="w-4 h-4" />
                  Capture Photo
                </button>
                <button
                  type="button"
                  onClick={stopCamera}
                  className="bg-white hover:bg-slate-100 text-slate-700 font-medium py-2.5 px-4 rounded-full text-sm shadow-md transition-all"
                >
                  Cancel
                </button>
              </div>
            </motion.div>
          ) : imagePreview ? (
            <motion.div 
              key="image-preview"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 w-full h-full flex flex-col bg-slate-900"
            >
              <img 
                src={imagePreview} 
                alt="Prescription preview"
                className="w-full h-[calc(100%-60px)] object-contain"
                referrerPolicy="no-referrer"
              />
              <div className="h-[60px] bg-slate-950 flex items-center justify-between px-4">
                <button
                  type="button"
                  onClick={() => setImagePreview(null)}
                  className="text-slate-300 hover:text-white text-xs flex items-center gap-1.5 font-medium transition"
                >
                  <RefreshCw className="w-3.5 h-3.5" />
                  Clear & Retake
                </button>
                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={startCamera}
                    className="bg-slate-800 hover:bg-slate-700 text-white text-xs font-semibold py-1.5 px-3 rounded-lg flex items-center gap-1 transition"
                  >
                    <Camera className="w-3.5 h-3.5" />
                    Use Cam
                  </button>
                  <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    className="bg-slate-800 hover:bg-slate-700 text-white text-xs font-semibold py-1.5 px-3 rounded-lg flex items-center gap-1 transition"
                  >
                    <Upload className="w-3.5 h-3.5" />
                    File
                  </button>
                </div>
              </div>
            </motion.div>
          ) : (
            <motion.div 
              key="upload-prompt"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="flex flex-col items-center p-6 text-center"
            >
              <div className="w-16 h-16 rounded-full bg-teal-50 flex items-center justify-center text-teal-600 mb-4 shadow-sm">
                <Upload className="w-8 h-8" />
              </div>
              <p className="text-sm font-semibold text-slate-700">Drag & drop your prescription image</p>
              <p className="text-xs text-slate-400 mt-1 mb-4">Supports PNG, JPG, or WEBP up to 10MB</p>

              <div className="flex flex-wrap items-center justify-center gap-2.5">
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="bg-slate-800 hover:bg-slate-900 text-white text-xs font-semibold py-2 px-4 rounded-xl flex items-center gap-1.5 transition active:scale-95 cursor-pointer shadow-sm"
                >
                  <Upload className="w-3.5 h-3.5" />
                  Browse Device
                </button>
                <button
                  type="button"
                  onClick={startCamera}
                  className="bg-teal-600 hover:bg-teal-700 text-white text-xs font-semibold py-2 px-4 rounded-xl flex items-center gap-1.5 transition active:scale-95 cursor-pointer shadow-sm"
                >
                  <Camera className="w-3.5 h-3.5" />
                  Live Prescription Cam
                </button>
              </div>
              <input 
                type="file"
                ref={fileInputRef}
                className="hidden"
                accept="image/*"
                onChange={handleFileInput}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {imagePreview && (
        <motion.div 
          initial={{ opacity: 0, y: 5 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-4"
        >
          <button
            type="button"
            disabled={isLoading}
            onClick={handleSubmit}
            className="w-full bg-teal-600 hover:bg-teal-700 disabled:bg-teal-400 text-white text-sm font-bold py-3 px-4 rounded-xl shadow-md transition flex items-center justify-center gap-2"
          >
            {isLoading ? (
              <>
                <RefreshCw className="w-4 h-4 animate-spin" />
                Gemini Reading & Matching Medicines...
              </>
            ) : (
              <>
                <FileText className="w-4 h-4" />
                Analyze Prescription Details
              </>
            )}
          </button>
        </motion.div>
      )}

      {/* Preset Prescription Samples Section */}
      <div className="mt-5 pt-4 border-t border-slate-100">
        <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider block mb-2.5">
          Or try a demo prescription preset:
        </span>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
          {SAMPLE_PRESCRIPTIONS.map((presc) => (
            <button
              key={presc.id}
              type="button"
              disabled={isLoading}
              onClick={() => selectSample(presc.id as any)}
              className="p-2.5 text-left border border-slate-200 hover:border-teal-500 hover:bg-teal-50/10 rounded-xl transition flex flex-col justify-between group disabled:opacity-55"
            >
              <div>
                <span className="text-xs font-bold text-slate-800 group-hover:text-teal-700 line-clamp-1">
                  {presc.label}
                </span>
                <span className="text-[10px] text-slate-400 block line-clamp-1 mt-0.5">
                  {presc.description}
                </span>
              </div>
              <div className="mt-1.5 flex items-center justify-between">
                <span className="text-[9px] text-teal-600 font-medium px-1.5 py-0.5 bg-teal-50 rounded">
                  Demo Sheet
                </span>
                <ImageIcon className="w-3.5 h-3.5 text-slate-300 group-hover:text-teal-500" />
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
