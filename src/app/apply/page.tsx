"use client";

import Link from "next/link";
import { FormEvent, useMemo, useState } from "react";

type QuestionType = "text" | "email" | "tel" | "textarea" | "multi-select" | "single-select";

type Question = {
  id: string;
  label: string;
  subtitle?: string;
  placeholder?: string;
  type: QuestionType;
  options?: string[];
};

const questions: Question[] = [
  {
    id: "naam",
    label: "Wat is je naam?",
    placeholder: "Voornaam en achternaam",
    type: "text",
  },
  {
    id: "email",
    label: "Wat is je e-mailadres?",
    placeholder: "jouw@email.nl",
    type: "email",
  },
  {
    id: "telefoon",
    label: "Telefoonnummer?",
    placeholder: "+31 6 12345678",
    type: "tel",
  },
  {
    id: "bedrijf",
    label: "Wat doet je bedrijf en hoeveel mensen heb je in dienst?",
    subtitle: "Kort is prima - ik wil weten wat je doet en hoe groot je team is.",
    placeholder: "Bijv: ik run een installatiebedrijf met 12 mensen in dienst...",
    type: "textarea",
  },
  {
    id: "pijnpunten",
    label: "Waar loop je nu het hardst tegenaan?",
    subtitle: "Selecteer alles wat van toepassing is.",
    type: "multi-select",
    options: [
      "Mijn omzet groeit maar er blijft geen winst over",
      "Ik los elk probleem op met een nieuw personeelslid",
      "Ik heb geen vrijheid meer - het bedrijf draait op mij",
      "Chronische stress en slapeloze nachten",
      "Te veel handmatig werk dat eigenlijk geautomatiseerd kan worden",
      "Geen systemen - alles loopt via mij of via mensen",
      "Iets anders...",
    ],
  },
  {
    id: "echte_pijn",
    label: "Van buiten ziet je bedrijf er waarschijnlijk goed uit. Wat speelt er echt?",
    subtitle: "Wees eerlijk. Dit is alleen voor mij - en hoe directer je bent, hoe beter ik kan helpen.",
    placeholder:
      "Bijv: op papier draait het goed, maar ik verdien zelf nauwelijks iets. Mijn team kost me meer dan het oplevert...",
    type: "textarea",
  },
  {
    id: "doel",
    label: "Wat wil je bereiken? Hoe ziet je bedrijf eruit als het goed gaat?",
    subtitle: "Niet wat je denkt dat ik wil horen - wat jij echt wil.",
    placeholder:
      "Bijv: ik wil een bedrijf dat 50K winst per maand maakt met een klein team, en waarbij ik niet elke dag aanwezig hoef te zijn...",
    type: "textarea",
  },
  {
    id: "geprobeerd",
    label: "Wat heb je al geprobeerd om dit te veranderen?",
    subtitle:
      "Coaches, boeken, cursussen, nieuwe mensen aannemen, reorganisaties - wat heb je gedaan en waarom werkte het niet?",
    placeholder:
      "Bijv: ik heb een bedrijfscoach gehad, een manager aangenomen, processen beschreven - maar na een paar maanden was alles weer zoals het was...",
    type: "textarea",
  },
  {
    id: "investering",
    label: "Als we een match zijn - ben je klaar om te investeren om dit op te lossen?",
    subtitle: "Eerlijkheid hier bespaart ons allebei tijd.",
    type: "single-select",
    options: [
      "Ja, ik ben er klaar voor",
      "Ja, maar ik wil het graag spreiden",
      "Ja, maar ik heb 30 dagen nodig",
      "Nee, financieel is het er nu niet naar",
    ],
  },
];

const OTHER_PAIN_OPTION = "Iets anders...";
const OTHER_PAIN_DETAILS_KEY = "pijnpunten_anders";

const initialAnswers = Object.fromEntries(
  questions.map((q) => [q.id, q.type === "multi-select" ? [] : ""]),
) as Record<string, string | string[]>;

initialAnswers[OTHER_PAIN_DETAILS_KEY] = "";

function isNonEmptyString(value: string | string[]): value is string {
  return typeof value === "string" && value.trim().length > 0;
}

export default function ApplyPage() {
  const [started, setStarted] = useState(false);
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string | string[]>>(initialAnswers);
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [showError, setShowError] = useState(false);

  const current = questions[step];
  const progress = useMemo(() => ((step + 1) / questions.length) * 100, [step]);

  function updateTextAnswer(value: string) {
    setAnswers((previous) => ({ ...previous, [current.id]: value }));
    setShowError(false);
    setSubmitError(null);
  }

  function updateAnswerById(id: string, value: string) {
    setAnswers((previous) => ({ ...previous, [id]: value }));
    setShowError(false);
    setSubmitError(null);
  }

  function toggleMultiOption(option: string) {
    const selected = answers[current.id];
    if (!Array.isArray(selected)) {
      return;
    }

    const nextSelection = selected.includes(option)
      ? selected.filter((item) => item !== option)
      : [...selected, option];

    setAnswers((previous) => ({ ...previous, [current.id]: nextSelection }));
    setShowError(false);
    setSubmitError(null);
  }

  function selectSingleOption(option: string) {
    setAnswers((previous) => ({ ...previous, [current.id]: option }));
    setShowError(false);
    setSubmitError(null);
  }

  function getStringAnswer(key: string) {
    const value = answers[key];
    return typeof value === "string" ? value.trim() : "";
  }

  function getPainPointsAnswer() {
    const selected = answers.pijnpunten;
    if (!Array.isArray(selected)) {
      return "";
    }

    const otherDetails = getStringAnswer(OTHER_PAIN_DETAILS_KEY);

    return selected
      .map((option) => {
        if (option === OTHER_PAIN_OPTION && otherDetails.length > 0) {
          return `Iets anders: ${otherDetails}`;
        }
        return option;
      })
      .join(" | ");
  }

  async function sendApplyWebhook() {
    const fullName = getStringAnswer("naam");
    const firstName = fullName.split(/\s+/).filter(Boolean)[0] ?? fullName;

    const payload = {
      source: "jur-jansen-apply-form",
      submitted_at: new Date().toISOString(),
      naam: fullName,
      voornaam: firstName,
      email: getStringAnswer("email"),
      telefoon: getStringAnswer("telefoon"),
      bedrijf: getStringAnswer("bedrijf"),
      pijnpunten: getPainPointsAnswer(),
      echte_pijn: getStringAnswer("echte_pijn"),
      doel: getStringAnswer("doel"),
      geprobeerd: getStringAnswer("geprobeerd"),
      investering: getStringAnswer("investering"),
    };

    const formBody = new URLSearchParams(payload);

    const response = await fetch(
      "https://hooks.zapier.com/hooks/catch/14955932/4bmvzsb/",
      {
        method: "POST",
        body: formBody,
      },
    );

    if (!response.ok) {
      throw new Error(`Webhook request failed with status ${response.status}`);
    }
  }

  function validateCurrentStep() {
    const value = answers[current.id];

    if (current.type === "multi-select") {
      if (!Array.isArray(value) || value.length === 0) {
        return false;
      }

      if (current.id === "pijnpunten" && value.includes(OTHER_PAIN_OPTION)) {
        const otherValue = answers[OTHER_PAIN_DETAILS_KEY];
        return isNonEmptyString(otherValue);
      }

      return true;
    }

    if (current.type === "single-select") {
      return isNonEmptyString(value);
    }

    if (!isNonEmptyString(value)) {
      return false;
    }

    if (current.type === "email") {
      return value.includes("@");
    }

    return true;
  }

  async function goNext() {
    if (!validateCurrentStep()) {
      setShowError(true);
      return;
    }

    setShowError(false);
    setSubmitError(null);

    if (step === questions.length - 1) {
      try {
        setIsSubmitting(true);
        await sendApplyWebhook();
        setSubmitted(true);
      } catch {
        setSubmitError("Versturen mislukt. Probeer het opnieuw.");
      } finally {
        setIsSubmitting(false);
      }
      return;
    }

    setStep((prev) => prev + 1);
  }

  function goBack() {
    setShowError(false);
    setStep((prev) => Math.max(0, prev - 1));
  }

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();
    await goNext();
  }

  function getErrorMessage() {
    switch (current.id) {
      case "naam":
        return "Vul je naam in.";
      case "email":
        return "Vul een geldig e-mailadres in.";
      case "telefoon":
        return "Vul je telefoonnummer in.";
      case "bedrijf":
        return "Vertel iets over je bedrijf.";
      case "pijnpunten":
        return "Selecteer minimaal een optie. Kies je 'Iets anders...', licht dit dan toe.";
      case "echte_pijn":
        return "Beantwoord deze vraag.";
      case "doel":
        return "Deel je doel.";
      case "geprobeerd":
        return "Beantwoord deze vraag.";
      case "investering":
        return "Kies een optie.";
      default:
        return "Vul dit veld in.";
    }
  }

  if (submitted) {
    return (
      <main className="min-h-screen bg-[var(--color-obsidian)] px-6 py-12 text-[var(--color-paper)] sm:px-10">
        <div className="mx-auto w-full max-w-3xl rounded-[15px] border border-[var(--color-border)] bg-[var(--color-charcoal)] p-8 sm:p-11">
          <p className="text-xs uppercase tracking-[0.25em] text-[var(--color-muted)]">
            Aanmelding ontvangen
          </p>
          <h1 className="mt-4 text-4xl uppercase leading-none sm:text-5xl">
            Aanmelding gelukt.
          </h1>
          <p className="mt-5 text-lg text-neutral-300">
            Je aanmelding wordt persoonlijk gelezen. Als er een match is, nemen we
            binnen 48 uur contact op om een call in te plannen.
          </p>

          <Link
            href="/"
            className="mt-8 inline-block rounded-[15px] border border-white bg-white px-7 py-3 text-sm font-semibold uppercase tracking-[0.14em] text-black transition hover:bg-neutral-200"
          >
            Terug naar home
          </Link>
        </div>
      </main>
    );
  }

  if (!started) {
    return (
      <main className="min-h-screen bg-[var(--color-obsidian)] px-6 py-12 text-[var(--color-paper)] sm:px-10">
        <div className="mx-auto w-full max-w-3xl rounded-[15px] border border-[var(--color-border)] bg-[var(--color-charcoal)] p-8 sm:p-11">
          <Link
            href="/"
            className="text-xs uppercase tracking-[0.2em] text-neutral-400 transition hover:text-white"
          >
            Terug naar Jur Jansen home
          </Link>
          <p className="mt-8 text-xs uppercase tracking-[0.25em] text-neutral-400">
            Aanmelding · Persoonlijk bekeken
          </p>
          <h1 className="mt-4 text-4xl leading-none sm:text-6xl">
            Vertel me wie je
            <br />
            echt bent.
          </h1>
          <p className="mt-6 text-lg text-neutral-300">
            Hoe eerlijker je hier bent, hoe nuttiger ons gesprek wordt. Elke
            aanmelding wordt persoonlijk gelezen.
          </p>

          <div className="mt-8 rounded-[15px] border border-[var(--color-border)] bg-black p-5 text-sm text-neutral-300">
            <p>9 vragen · ongeveer 4 minuten</p>
            <p className="mt-1">Persoonlijk gelezen door Jur Jansen. Nooit gedeeld.</p>
          </div>

          <button
            type="button"
            onClick={() => setStarted(true)}
            className="mt-8 rounded-[15px] border border-white bg-white px-8 py-4 text-sm font-semibold uppercase tracking-[0.14em] text-black transition hover:bg-neutral-200"
          >
            Begin
          </button>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[var(--color-obsidian)] px-6 py-12 text-[var(--color-paper)] sm:px-10">
      <div className="mx-auto w-full max-w-3xl rounded-[15px] border border-[var(--color-border)] bg-[var(--color-charcoal)] p-8 sm:p-11">
        <p className="text-xs uppercase tracking-[0.2em] text-neutral-400">
          Vraag {step + 1} van {questions.length}
          {step === questions.length - 1 ? " · Laatste" : ""}
        </p>
        <div className="mt-4 h-2 rounded-[15px] bg-neutral-800">
          <div
            className="h-full rounded-[15px] bg-white transition-all duration-500"
            style={{ width: `${progress}%` }}
          />
        </div>

        <form onSubmit={handleSubmit} className="mt-8">
          <label className="block text-3xl leading-tight sm:text-4xl" htmlFor={current.id}>
            {current.label}
          </label>
          {current.subtitle ? (
            <p className="mt-3 text-sm leading-7 text-neutral-400">{current.subtitle}</p>
          ) : null}

          {current.type === "textarea" ? (
            <textarea
              id={current.id}
              name={current.id}
              value={typeof answers[current.id] === "string" ? answers[current.id] : ""}
              onChange={(event) => updateTextAnswer(event.target.value)}
              placeholder={current.placeholder}
              rows={6}
              className="mt-5 w-full rounded-[15px] border border-[var(--color-border)] bg-black px-4 py-3 text-white outline-none ring-white/40 transition focus:ring"
            />
          ) : null}

          {current.type === "text" || current.type === "email" || current.type === "tel" ? (
            <input
              id={current.id}
              name={current.id}
              type={current.type}
              value={typeof answers[current.id] === "string" ? answers[current.id] : ""}
              onChange={(event) => updateTextAnswer(event.target.value)}
              placeholder={current.placeholder}
              className="mt-5 w-full rounded-[15px] border border-[var(--color-border)] bg-black px-4 py-3 text-white outline-none ring-white/40 transition focus:ring"
            />
          ) : null}

          {current.type === "multi-select" ? (
            <div className="mt-5 space-y-3">
              {current.options?.map((option) => {
                const selected = Array.isArray(answers[current.id])
                  ? answers[current.id].includes(option)
                  : false;

                return (
                  <button
                    key={option}
                    type="button"
                    onClick={() => toggleMultiOption(option)}
                    className={`w-full rounded-[15px] border px-4 py-3 text-left text-sm transition ${
                      selected
                        ? "border-white bg-white text-black"
                        : "border-[var(--color-border)] bg-black text-neutral-200 hover:border-white"
                    }`}
                  >
                    {option}
                  </button>
                );
              })}

              {current.id === "pijnpunten" &&
              Array.isArray(answers[current.id]) &&
              answers[current.id].includes(OTHER_PAIN_OPTION) ? (
                <textarea
                  id={OTHER_PAIN_DETAILS_KEY}
                  name={OTHER_PAIN_DETAILS_KEY}
                  value={
                    typeof answers[OTHER_PAIN_DETAILS_KEY] === "string"
                      ? answers[OTHER_PAIN_DETAILS_KEY]
                      : ""
                  }
                  onChange={(event) =>
                    updateAnswerById(OTHER_PAIN_DETAILS_KEY, event.target.value)
                  }
                  placeholder="Vertel kort waar je verder tegenaan loopt..."
                  rows={4}
                  className="mt-3 w-full rounded-[15px] border border-[var(--color-border)] bg-black px-4 py-3 text-white outline-none ring-white/40 transition focus:ring"
                />
              ) : null}
            </div>
          ) : null}

          {current.type === "single-select" ? (
            <div className="mt-5 space-y-3">
              {current.options?.map((option) => {
                const selected = answers[current.id] === option;

                return (
                  <button
                    key={option}
                    type="button"
                    onClick={() => selectSingleOption(option)}
                    className={`w-full rounded-[15px] border px-4 py-3 text-left text-sm transition ${
                      selected
                        ? "border-white bg-white text-black"
                        : "border-[var(--color-border)] bg-black text-neutral-200 hover:border-white"
                    }`}
                  >
                    {option}
                  </button>
                );
              })}
            </div>
          ) : null}

          {showError ? <p className="mt-3 text-sm text-red-400">{getErrorMessage()}</p> : null}
          {submitError ? <p className="mt-3 text-sm text-red-400">{submitError}</p> : null}

          <div className="mt-8 flex flex-wrap items-center justify-between gap-3">
            <button
              type="button"
              onClick={goBack}
              disabled={step === 0}
              className="rounded-[15px] border border-[var(--color-border)] px-5 py-3 text-sm uppercase tracking-[0.12em] text-neutral-200 transition hover:border-white disabled:cursor-not-allowed disabled:opacity-40"
            >
              Terug
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="rounded-[15px] border border-white bg-white px-6 py-3 text-sm font-semibold uppercase tracking-[0.12em] text-black transition hover:bg-neutral-200"
            >
              {step === questions.length - 1
                ? isSubmitting
                  ? "Versturen..."
                  : "Aanmelden"
                : "Volgende"}
            </button>
          </div>
        </form>
      </div>

      <footer className="mx-auto mt-8 w-full max-w-3xl border-t border-[var(--color-border)] px-2 pt-5 text-center text-xs uppercase tracking-[0.1em] text-neutral-500">
        Persoonlijk gelezen door Jur Jansen. Nooit gedeeld.
      </footer>
    </main>
  );
}
