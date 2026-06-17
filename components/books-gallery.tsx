"use client";

import { useState } from "react";
import Image from "next/image";
import dynamic from "next/dynamic";
import { BookOpen, Download } from "lucide-react";
import { FadeIn } from "@/components/motion";
import type { Book } from "@/lib/books-data";

// Dynamically import PdfModal with SSR disabled to prevent server bundling errors
const PdfModal = dynamic(
  () => import("@/components/pdf-modal").then((mod) => mod.PdfModal),
  { ssr: false }
);

interface BooksGalleryProps {
  books: Book[];
}

export function BooksGallery({ books }: BooksGalleryProps) {
  const [selectedBook, setSelectedBook] = useState<Book | null>(null);

  const handleReadNow = (book: Book) => {
    setSelectedBook(book);
  };

  const handleCloseModal = () => {
    setSelectedBook(null);
  };

  return (
    <>
      <section className="section-shell grid gap-6 py-16 md:grid-cols-2 lg:grid-cols-3 md:py-24">
        {books.map((book, index) => (
          <FadeIn
            key={book.id}
            delay={index * 0.05}
            className="premium-panel flex flex-col justify-between rounded-lg p-5 transition duration-300 hover:border-[#17C3B2]/30"
          >
            <div>
              {/* Cover Card */}
              <div className="relative h-80 overflow-hidden rounded-lg border border-white/10 bg-[#0B0F14] group">
                <Image
                  src={book.coverImage || "/honest-fendy/library.png"}
                  alt={book.title}
                  fill
                  className="object-cover opacity-45 transition duration-500 group-hover:scale-105"
                  sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
                />
                <div className="absolute inset-0 bg-gradient-to-br from-[#0B0F14]/82 via-[#121820]/54 to-[#17C3B2]/16" />
                {/* Arabic book spine indicator (RTL - on the right side) */}
                <div className="absolute right-0 top-0 h-full w-2 bg-[#D4AF37]" />
                
                <div className="absolute inset-x-6 bottom-6">
                  <BookOpen className="mb-6 text-[#17C3B2]" size={28} />
                  <p className="text-xs font-bold tracking-[0.08em] text-[#D4AF37]">{book.category}</p>
                  <h2 className="mt-3 text-2xl font-black leading-tight text-white">{book.title}</h2>
                </div>
              </div>
              
              {/* Description */}
              <p className="mt-5 text-sm leading-7 text-[#D6D6D6]/70 min-h-[56px] text-balance">
                {book.description}
              </p>
            </div>

            {/* Actions */}
            <div className="mt-6 flex items-center gap-3">
              <button
                onClick={() => handleReadNow(book)}
                className="flex-1 inline-flex min-h-11 items-center justify-center gap-2 rounded-full bg-[#17C3B2] text-[#07100F] shadow-[0_0_30px_rgba(23,195,178,.15)] hover:bg-[#35E0D0] hover:-translate-y-0.5 active:translate-y-0 transition duration-300 text-sm font-extrabold cursor-pointer"
              >
                <BookOpen size={16} />
                <span>اقرأ الآن</span>
              </button>

              <a
                href={book.pdfUrl}
                download
                className="inline-flex min-h-11 items-center justify-center gap-2 rounded-full border border-[#D4AF37]/40 bg-[#D4AF37]/12 text-[#F6E3A8] hover:border-[#D4AF37]/70 hover:bg-[#D4AF37]/18 hover:-translate-y-0.5 active:translate-y-0 transition duration-300 px-4 text-xs font-extrabold cursor-pointer"
                title="تحميل الملف"
              >
                <Download size={14} />
                <span>تحميل PDF</span>
              </a>
            </div>
          </FadeIn>
        ))}
      </section>

      {/* PDF Reading Modal */}
      {selectedBook && (
        <PdfModal
          isOpen={!!selectedBook}
          onClose={handleCloseModal}
          pdfUrl={selectedBook.pdfUrl}
          title={selectedBook.title}
        />
      )}
    </>
  );
}
