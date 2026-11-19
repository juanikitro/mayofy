"use client";

import Link from "next/link";
import { FormEvent, useEffect, useRef, useState } from "react";

import {
  type ContactDetails,
  type ContactOptionField,
  contactOptions,
  formatContactMessage,
} from "@/content/contact-options";
import { getWhatsAppHref } from "@/lib/whatsapp";

type SubmissionState = "idle" | "submitting" | "success" | "error";

type ContactFormProps = {
  whatsappHref: string;
};

function readDetails(form: FormData): ContactDetails {
  const read = (key: string) => String(form.get(key) ?? "").trim();

  return {
    name: read("name"),
    business: read("business"),
    contact: read("contact"),
    pack: read("pack"),
    timeline: read("timeline"),
    budget: read("budget"),
    reference: read("reference"),
    need: read("need"),
  };
}

function SelectField({
  field,
  label,
  placeholder,
}: {
  field: ContactOptionField;
  label: string;
  placeholder: string;
}) {
  return (
    <label className="field">
      <span>{label}</span>
      <select name={field} defaultValue="">
        <option value="" disabled>
          {placeholder}
        </option>
        {contactOptions[field].map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </label>
  );
}

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

    const submitter = (event.nativeEvent as SubmitEvent).submitter;
    const form = new FormData(event.currentTarget);
    const details = readDetails(form);

    if (submitter?.getAttribute("value") === "whatsapp") {
      // window.open returns null with "noopener", so an anchor click is the
      // reliable way to open WhatsApp in a new tab and keep mayofy.dev open.
      const anchor = document.createElement("a");
      anchor.href = getWhatsAppHref(formatContactMessage(details));
      anchor.target = "_blank";
      anchor.rel = "noopener noreferrer";
      document.body.appendChild(anchor);
      anchor.click();
      anchor.remove();
      setSubmissionState("success");
      setFeedback("Abrimos WhatsApp con tu consulta lista para enviar.");
      return;
    }

    setSubmissionState("submitting");
    setFeedback("Enviando tu consulta…");

    const payload = {
      ...details,
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
      setFeedback("Consulta enviada. Te respondemos en menos de 24 horas hábiles.");
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
          <input name="name" type="text" autoComplete="name" maxLength={80} />
        </label>
        <label className="field">
          <span>Negocio o actividad</span>
          <input name="business" type="text" autoComplete="organization" maxLength={120} />
        </label>
      </div>
      <label className="field">
        <span>¿Dónde querés que te respondamos?</span>
        <input
          name="contact"
          type="text"
          autoComplete="email"
          maxLength={160}
          placeholder="WhatsApp o correo"
        />
      </label>
      <div className="contact-form__row">
        <SelectField field="pack" label="¿Qué necesitás?" placeholder="Elegí una opción" />
        <SelectField field="timeline" label="Plazo estimado" placeholder="Elegí un plazo" />
      </div>
      <div className="contact-form__row">
        <SelectField
          field="budget"
          label="Presupuesto aproximado"
          placeholder="Elegí un rango"
        />
        <label className="field">
          <span>Una web o negocio que te guste como referencia</span>
          <input name="reference" type="text" maxLength={300} placeholder="Un nombre o un enlace" />
        </label>
      </div>
      <label className="field">
        <span>Contanos sobre tu proyecto</span>
        <textarea name="need" maxLength={1800} />
      </label>
      <label className="field field--trap" aria-hidden="true">
        <span>Empresa</span>
        <input name="company" type="text" tabIndex={-1} autoComplete="off" />
      </label>
      <div className="contact-form__footer">
        <button
          className="btn btn--moss"
          type="submit"
          name="channel"
          value="whatsapp"
        >
          Enviar por WhatsApp
        </button>
        <button
          className="btn btn--quiet"
          type="submit"
          name="channel"
          value="callback"
          disabled={submissionState === "submitting"}
        >
          {submissionState === "submitting" ? "Enviando…" : "Prefiero que me contacten"}
        </button>
      </div>
      <p
        id="contact-feedback"
        className={`contact-form__feedback contact-form__feedback--${submissionState}`}
        aria-live="polite"
      >
        {feedback || "Te respondemos en menos de 24 horas hábiles."}
      </p>
      <p className="contact-form__privacy">
        Usamos tus datos solo para responder tu consulta. No los vendemos ni los
        cedemos. <Link href="/privacidad">
          <span className="link-label">Política de privacidad</span>
        </Link>.
      </p>
      {submissionState === "error" ? (
        <a className="contact-form__fallback" href={whatsappHref} target="_blank" rel="noreferrer">
          <span className="link-label">Continuar por WhatsApp</span>
        </a>
      ) : null}
    </form>
  );
}
