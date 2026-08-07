"use client";

import { FormEvent, useEffect, useRef, useState } from "react";

type SubmissionState = "idle" | "submitting" | "success" | "error";

type ContactFormProps = {
  whatsappHref: string;
};

export function ContactForm({ whatsappHref }: ContactFormProps) {
  const [submissionState, setSubmissionState] =
    useState<SubmissionState>("idle");
  const [feedback, setFeedback] = useState("");
  const startedAt = useRef(0);
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    startedAt.current = Date.now();
  }, []);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmissionState("submitting");
    setFeedback("Enviando tu consulta…");

    const form = new FormData(event.currentTarget);
    const payload = {
      name: String(form.get("name") ?? ""),
      business: String(form.get("business") ?? ""),
      contact: String(form.get("contact") ?? ""),
      need: String(form.get("need") ?? ""),
      company: String(form.get("company") ?? ""),
      startedAt: startedAt.current,
    };

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const result = (await response.json()) as {
        ok?: boolean;
        message?: string;
      };

      if (!response.ok || !result.ok) {
        throw new Error(result.message || "No pudimos enviar la consulta.");
      }

      setSubmissionState("success");
      setFeedback("Consulta enviada. Te vamos a responder por el canal indicado.");
      formRef.current?.reset();
      startedAt.current = Date.now();
    } catch (error) {
      setSubmissionState("error");
      setFeedback(
        error instanceof Error
          ? error.message
          : "No pudimos enviar la consulta. Probá por WhatsApp.",
      );
    }
  }

  return (
    <form
      ref={formRef}
      className="contact-form"
      onSubmit={handleSubmit}
      aria-describedby="contact-feedback"
    >
      <div className="contact-form__row">
        <label className="field">
          <span>Tu nombre</span>
          <input
            name="name"
            type="text"
            autoComplete="name"
            minLength={2}
            maxLength={80}
            required
          />
        </label>
        <label className="field">
          <span>Negocio o actividad</span>
          <input
            name="business"
            type="text"
            autoComplete="organization"
            minLength={2}
            maxLength={120}
            required
          />
        </label>
      </div>
      <label className="field">
        <span>¿Dónde querés que te respondamos?</span>
        <input
          name="contact"
          type="text"
          autoComplete="email"
          minLength={5}
          maxLength={160}
          placeholder="WhatsApp o correo"
          required
        />
      </label>
      <label className="field">
        <span>Contanos qué necesitás</span>
        <textarea name="need" minLength={20} maxLength={1800} required />
      </label>
      <label className="field field--trap" aria-hidden="true">
        <span>Empresa</span>
        <input name="company" type="text" tabIndex={-1} autoComplete="off" />
      </label>
      <div className="contact-form__footer">
        <button
          className="button button--accent"
          type="submit"
          data-magnetic
          disabled={submissionState === "submitting"}
        >
          {submissionState === "submitting" ? "Enviando…" : "Enviar consulta"}
        </button>
        <p
          id="contact-feedback"
          className={`contact-form__feedback contact-form__feedback--${submissionState}`}
          aria-live="polite"
        >
          {feedback || "Respondemos de forma directa, sin listas ni automatizaciones invasivas."}
        </p>
      </div>
      {submissionState === "error" ? (
        <a className="contact-form__fallback" href={whatsappHref}>
          Continuar por WhatsApp
        </a>
      ) : null}
    </form>
  );
}
