"use client";

import { AnimatePresence, motion } from "framer-motion";
import { CheckCircle2, Loader2, Send } from "lucide-react";
import { FormEvent, useState } from "react";

type Status = "idle" | "loading" | "success" | "error";

export function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [message, setMessage] = useState("");

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("loading");
    setMessage("");

    const form = event.currentTarget;
    const formData = new FormData(form);
    const payload = {
      name: String(formData.get("name") || ""),
      email: String(formData.get("email") || ""),
      details: String(formData.get("details") || "")
    };

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });

      const data = (await response.json()) as { message?: string };
      if (!response.ok) throw new Error(data.message || "تعذر إرسال الرسالة");

      setStatus("success");
      setMessage("تم إرسال رسالتك بنجاح. سنعود إليك قريباً.");
      form.reset();
    } catch (error) {
      setStatus("error");
      setMessage(error instanceof Error ? error.message : "حدث خطأ غير متوقع.");
    }
  }

  return (
    <form onSubmit={onSubmit} className="premium-panel rounded-[34px] p-6 md:p-8">
      <div className="grid gap-5">
        <label className="grid gap-2">
          <span className="text-sm font-bold text-foreground/82">الاسم</span>
          <input className="field" name="name" placeholder="اكتب اسمك" required minLength={2} />
        </label>
        <label className="grid gap-2">
          <span className="text-sm font-bold text-foreground/82">البريد الإلكتروني</span>
          <input className="field" name="email" type="email" placeholder="name@example.com" required />
        </label>
        <label className="grid gap-2">
          <span className="text-sm font-bold text-foreground/82">تفاصيل المشروع</span>
          <textarea
            className="field min-h-40 resize-none"
            name="details"
            placeholder="حدثنا عن الفكرة، الهدف، والمرحلة الحالية"
            required
            minLength={12}
          />
        </label>
      </div>

      <button
        type="submit"
        disabled={status === "loading"}
        className="mt-6 inline-flex min-h-13 w-full items-center justify-center gap-3 rounded-full bg-brand-blue px-6 py-4 text-sm font-extrabold text-white shadow-glow transition hover:-translate-y-0.5 hover:bg-brand-purple disabled:cursor-not-allowed disabled:opacity-70"
      >
        {status === "loading" ? <Loader2 className="animate-spin" size={18} /> : <Send size={18} />}
        إرسال الرسالة
      </button>

      <AnimatePresence>
        {message ? (
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            className={`mt-5 flex items-center gap-3 rounded-2xl border px-4 py-3 text-sm font-bold ${
              status === "success"
                ? "border-brand-sky/40 bg-brand-sky/10 text-brand-sky"
                : "border-brand-pink/40 bg-brand-pink/10 text-brand-pink"
            }`}
          >
            <CheckCircle2 size={18} />
            {message}
          </motion.div>
        ) : null}
      </AnimatePresence>
    </form>
  );
}
