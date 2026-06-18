"use client";

import { useEffect, useState } from "react";
import { X, Download, BookOpen } from "lucide-react";

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

  const readUrl = pdfUrl.replace("/books/", "/read/");

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md transition-opacity duration-300">
      <div className="relative w-full max-w-lg premium-panel rounded-2xl border border-white/10 bg-[#0B0F14]/95 shadow-[0_0_80px_rgba(0,0,0,0.8)] p-6 md:p-8 flex flex-col text-center">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 rounded-full p-2 text-white/60 hover:text-white bg-white/5 hover:bg-white/10 active:scale-95 transition duration-200 cursor-pointer"
          aria-label="إغلاق النافذة"
        >
          <X size={20} />
        </button>

        {/* Icon Preview Indicator */}
        <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full border border-[#17C3B2]/30 bg-[#17C3B2]/10 text-[#17C3B2] shadow-[0_0_30px_rgba(23,195,178,0.2)]">
          <BookOpen size={30} />
        </div>

        {/* Info */}
        <p className="text-xs font-bold tracking-[0.08em] text-[#17C3B2] mb-2">المكتبة الرقمية</p>
        <h3 className="text-xl md:text-2xl font-black text-white mb-3 px-4 leading-tight">{title}</h3>
        
        <p className="text-sm leading-relaxed text-[#D6D6D6]/70 mb-8 px-2">
          انقر فوق &quot;قراءة الكتاب&quot; لفتح الملف مباشرة وقراءته في علامة تبويب جديدة باستخدام قارئ الملفات المدمج بالمتصفح، أو انقر فوق &quot;تحميل PDF&quot; لحفظه على جهازك.
        </p>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 w-full">
          <a
            href={readUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={onClose}
            className="w-full sm:flex-1 inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-[#17C3B2] text-[#07100F] shadow-[0_0_30px_rgba(23,195,178,.15)] hover:bg-[#35E0D0] hover:-translate-y-0.5 active:translate-y-0 transition duration-300 text-sm font-extrabold cursor-pointer"
          >
            <BookOpen size={16} />
            <span>قراءة الكتاب</span>
          </a>

          <a
            href={pdfUrl}
            download
            className="w-full sm:flex-1 inline-flex min-h-12 items-center justify-center gap-2 rounded-full border border-[#D4AF37]/40 bg-[#D4AF37]/12 text-[#F6E3A8] hover:border-[#D4AF37]/70 hover:bg-[#D4AF37]/18 hover:-translate-y-0.5 active:translate-y-0 transition duration-300 text-sm font-extrabold cursor-pointer"
          >
            <Download size={16} />
            <span>تحميل PDF</span>
          </a>
        </div>

      </div>
    </div>
  );
}
