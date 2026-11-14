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
    domain: read("domain"),
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
      const href = getWhatsAppHref(formatContactMessage(details));
      const opened = window.open(href, "_blank", "noopener");
      if (!opened) window.location.href = href;
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
        <SelectField
          field="domain"
          label="¿Ya tenés dominio o hosting?"
          placeholder="Elegí una opción"
        />
      </div>
      <label className="field">
        <span>Una web que te guste como referencia (opcional)</span>
        <input
          name="reference"
          type="url"
          inputMode="url"
          maxLength={300}
          placeholder="https://"
        />
      </label>
      <label className="field">
        <span>Contanos sobre tu proyecto</span>
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
          name="channel"
          value="whatsapp"
          data-magnetic
        >
          Enviar por WhatsApp
        </button>
        <button
          className="button button--quiet"
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
        cedemos. <Link href="/privacidad">Política de privacidad</Link>.
      </p>
      {submissionState === "error" ? (
        <a className="contact-form__fallback" href={whatsappHref}>
          Continuar por WhatsApp
        </a>
      ) : null}
    </form>
  );
}
