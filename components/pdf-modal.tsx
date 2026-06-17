"use client";

import { useEffect, useState } from "react";
import { X, Download } from "lucide-react";

interface PdfModalProps {
  isOpen: boolean;
  onClose: () => void;
  pdfUrl: string;
  title: string;
}

export function PdfModal({ isOpen, onClose, pdfUrl, title }: PdfModalProps) {
  const [mounted, setMounted] = useState(false);

  // Set mounted state and manage body scroll locking
  useEffect(() => {
    if (isOpen) {
      setMounted(true);
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  // Keyboard navigation & Escape key handling
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen || !mounted) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 md:p-6 bg-black/80 backdrop-blur-md transition-opacity duration-300">
      <div className="relative w-full max-w-5xl h-[88vh] flex flex-col premium-panel rounded-2xl overflow-hidden border border-white/10 bg-[#0B0F14]/95 shadow-[0_0_80px_rgba(0,0,0,0.8)]">
        
        {/* Modal Header */}
        <div className="flex items-center justify-between border-b border-white/10 px-5 py-4 bg-[#121820]/90">
          <div>
            <h3 className="text-lg font-black text-white">{title}</h3>
            <p className="text-xs text-[#17C3B2] mt-0.5 font-bold">المكتبة الرقمية</p>
          </div>
          
          <div className="flex items-center gap-3">
            {/* Download Link */}
            <a
              href={pdfUrl}
              download
              className="inline-flex h-9 items-center justify-center gap-2 rounded-full border border-[#D4AF37]/40 bg-[#D4AF37]/12 text-[#F6E3A8] hover:border-[#D4AF37]/70 hover:bg-[#D4AF37]/18 active:scale-95 transition duration-200 px-4 text-xs font-bold cursor-pointer"
              title="تحميل الملف مباشرة"
            >
              <Download size={14} />
              <span>تحميل PDF</span>
            </a>
            
            {/* Close Button */}
            <button
              onClick={onClose}
              className="rounded-full p-2 text-white/60 hover:text-white bg-white/5 hover:bg-white/10 active:scale-95 transition duration-200 cursor-pointer"
              aria-label="إغلاق النافذة"
            >
              <X size={20} />
            </button>
          </div>
        </div>

        {/* Modal Body (Native Browser PDF Viewer Iframe) */}
        <div className="flex-1 w-full bg-[#070A0E] relative">
          {(() => {
            const readUrl = pdfUrl.replace("/books/", "/read/");
            return (
              <iframe
                src={`${readUrl}#toolbar=1&navpanes=0`}
                className="w-full h-full border-0"
                title={title}
              />
            );
          })()}
        </div>

      </div>
    </div>
  );
}
