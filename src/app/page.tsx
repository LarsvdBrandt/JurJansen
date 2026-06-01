"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";

const herkenning = [
  "Je neemt keer op keer nieuwe mensen aan om problemen op te lossen — maar de problemen verdwijnen niet.",
  "Je omzet stijgt, maar je winst daalt. Van je hard verdiende omzet blijft aan het einde van de maand niets over.",
  "Je bent ondernemer geworden voor vrijheid — maar nu ben jij de gevangene van je eigen bedrijf.",
  "Je stelt alles uit. De winst, de reizen, het leven. Altijd later. En \"later\" wordt nooit nu.",
  "De stress sloopt je — maar je doet alsof het erbij hoort. Terwijl je lichaam al een ander signaal geeft.",
  "Je weet dat het anders moet. Maar je weet niet wat er precies veranderd moet worden. Dat weet je nu.",
];

const methode = [
  {
    title: "Stop met mensen als oplossing zien",
    body: "Elk probleem in je bedrijf dat je oplost met een nieuw FTE, is een systeemprobleem. En een systeem is schaalbaar. Een persoon niet.",
  },
  {
    title: "Bouw op terugkerende strategische omzet",
    body: "Niet op eenmalige projecten. Niet op geluk. Op een fundament dat voorspelbaar elke maand binnenkomt en blijft groeien.",
  },
  {
    title: "Automatiseer het handmatige werk",
    body: "Wat nu mensen kost, kost systemen niets. We brengen in kaart wat automatisch kan — en voeren dat door.",
  },
  {
    title: "Breng je team terug naar de kern",
    body: "Klein, krachtig, winstgevend. Niet meer mensen om hetzelfde te bereiken — minder mensen met de juiste systemen eronder.",
  },
  {
    title: "Creëer een aanbod dat klanten jarenlang houdt",
    body: "Terugkerende omzet zonder dat jij er constant energie in hoeft te stoppen. Dat begint met de juiste structuur in je aanbod.",
  },
  {
    title: "Laat los dat groter altijd beter is",
    body: "De overtuiging dat meer omzet, meer mensen en meer kantoor gelijkstaat aan succes — is precies wat je tegenhoudt.",
  },
];

const filter = [
  {
    title: "Op zoek naar een snelle fix",
    body: "Een hack, een cheatcode, een 30-dagenplan. Wat ik doe is echt en het is niet snel. Zoek het elders.",
  },
  {
    title: "De wereld geeft de schuld",
    body: "De markt, je team, de economie. Als dat jouw standaardmodus is, ben je er nog niet klaar voor.",
  },
  {
    title: "Niet bereid om echt te kijken",
    body: "Naar het personeel, de systemen, de verliesgevende keuzes. Als je de waarheid wil vermijden, ga dan niet aanmelden.",
  },
  {
    title: "Wil bevestiging, geen verandering",
    body: "Als je bevestigd wil worden in wat je al doet, is dit niet de plek. Dit is voor mensen die iets anders willen doen.",
  },
  {
    title: "Lage normen voor zichzelf",
    body: "De mensen waarmee ik werk brengen eerlijkheid en intensiteit mee. Doe je dat niet, meld je dan niet aan.",
  },
];

const stappen = [
  {
    title: "Je meldt je aan.",
    body: "Ik lees elke aanmelding persoonlijk en neem contact op als ik denk dat we een goede match zijn.",
  },
  {
    title: "We plannen een call in.",
    body: "Geen verkoopgesprek — een diepgaand gesprek waarbij we samen jouw bedrijf induiken.",
  },
  {
    title: "We kijken naar alles wat er speelt.",
    body: "Je personeel, je omzet, je systemen, het handmatige werk dat automatisch kan, en waar je winst naartoe verdwijnt.",
  },
  {
    title: "Je verlaat het gesprek met helderheid.",
    body: "Precies waar de lek zit, wat er veranderd moet worden, en wat de eerste concrete stap is.",
  },
  {
    title: "Als ik denk dat ik je verder kan helpen,",
    body: "gaan we van daaruit verder. Zo niet — dan zeg ik je dat eerlijk en direct.",
  },
];

export default function Home() {
  const heroCtaRef = useRef<HTMLAnchorElement | null>(null);
  const [showFloatingCta, setShowFloatingCta] = useState(false);

  useEffect(() => {
    const ctaNode = heroCtaRef.current;
    if (!ctaNode) {
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        setShowFloatingCta(!entry.isIntersecting);
      },
      { threshold: 0.2 },
    );

    observer.observe(ctaNode);

    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <main className="bg-[var(--color-obsidian)] pb-24 text-[var(--color-paper)] sm:pb-0">
      <div className="mx-auto max-w-6xl px-6 pb-12 pt-4 sm:px-10">
        <header className="sticky top-0 z-30 hidden items-center justify-between rounded-[15px] border border-[var(--color-border)] bg-black/80 px-5 py-3 backdrop-blur sm:flex">
          <span className="text-sm font-semibold uppercase tracking-[0.14em]">Jur Jansen</span>
          <Link
            href="/apply"
            className="rounded-[15px] border border-white px-4 py-2 text-xs font-semibold uppercase tracking-[0.12em] transition hover:bg-white hover:text-black"
          >
            Aanmelden
          </Link>
        </header>

        <section className="mx-auto flex min-h-[calc(100vh-4rem)] max-w-4xl flex-col items-center justify-start pt-8 text-center sm:justify-center sm:py-14">
          <p className="rounded-[15px] border border-[var(--color-border)] px-4 py-2 text-xs uppercase tracking-[0.2em] text-neutral-300">
            Voor ondernemers die vast zitten in hun eigen bedrijf
          </p>
          <h1 className="mt-7 text-4xl font-semibold leading-[1.05] sm:mt-8 sm:text-7xl sm:leading-[1.02]">
            Je omzet groeit.
            <br />
            Je winst <em className="italic">verdwijnt.</em>
          </h1>
          <p className="mt-6 max-w-2xl text-base leading-8 text-[var(--color-muted)] sm:text-lg">
            Je hebt een team opgebouwd, kantoor uitgebreid, managers aangesteld. Op
            papier doe je het goed. Maar aan het einde van de maand blijft er niets
            over — en de vrijheid waarvoor je begon, is verder weg dan ooit.
          </p>

          <div className="mt-10 w-full max-w-3xl rounded-[15px] border border-[var(--color-border)] bg-[var(--color-surface)] p-5 sm:p-7">
            <div className="aspect-video w-full overflow-hidden rounded-[15px] border border-[var(--color-border)] bg-black">
              <iframe
                className="h-full w-full"
                src="https://www.youtube-nocookie.com/embed/8H1LPOux7Hk"
                title="Jur Jansen VSL"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                referrerPolicy="strict-origin-when-cross-origin"
                allowFullScreen
              />
            </div>
            <p className="mt-4 text-center text-xs uppercase tracking-[0.14em] text-[var(--color-muted)]">
              Kijk de video — geen registratie nodig
            </p>
          </div>

          <Link
            ref={heroCtaRef}
            href="/apply"
            className="mt-8 rounded-[15px] border border-white bg-white px-8 py-3 text-sm font-semibold uppercase tracking-[0.14em] text-black transition hover:bg-neutral-200"
          >
            Aanmelden voor de methode
          </Link>
          <p className="mt-3 text-xs uppercase tracking-[0.1em] text-[var(--color-muted)]">
            Beperkt aantal plaatsen · Elke aanmelding wordt persoonlijk bekeken
          </p>
        </section>
      </div>

      <div className="h-px w-full bg-[var(--color-border)]" />

      <section className="mx-auto max-w-6xl px-6 py-20 sm:px-10">
        <p className="text-xs uppercase tracking-[0.22em] text-[var(--color-muted)]">De spiegel</p>
        <h2 className="mt-4 text-3xl font-semibold leading-tight sm:text-5xl">
          Dit is voor jou als je
          <br />
          <span className="italic">jezelf hierin herkent</span>
        </h2>

        <div className="mt-10 grid gap-px bg-[var(--color-border)] sm:grid-cols-2 lg:grid-cols-3">
          {herkenning.map((item, index) => (
            <article key={item} className="bg-[var(--color-charcoal)] p-6">
              <p className="text-xs uppercase tracking-[0.2em] text-neutral-400">
                {String(index + 1).padStart(2, "0")}
              </p>
              <p className="mt-3 text-sm leading-7 text-neutral-100 sm:text-base">{item}</p>
            </article>
          ))}
        </div>
      </section>

      <div className="h-px w-full bg-[var(--color-border)]" />

      <section className="mx-auto max-w-4xl px-6 py-20 sm:px-10">
        <p className="text-xs uppercase tracking-[0.22em] text-[var(--color-muted)]">Hoofdstuk 01 — De opbouw</p>
        <h2 className="mt-3 text-3xl font-semibold leading-tight sm:text-5xl">
          Van 0 naar 100K omzet.
          <br />
          En toch alles verloren.
        </h2>
        <p className="mt-3 text-xs uppercase tracking-[0.16em] text-neutral-400">
          Het verhaal dat niemand vertelt
        </p>
        <p className="mt-7 text-[var(--color-muted)]">
          Ik heb mijn bedrijf in 3 jaar tijd opgebouwd naar meer dan 100K strategische,
          terugkerende omzet per maand. Een team van meer dan 20 mensen. Een dik
          kantoor. Een mooie auto. Mensen die me aanspraken op straat en zeiden dat ze
          het vet vonden wat ik deed.
        </p>
        <p className="mt-5 text-[var(--color-muted)]">
          Op papier leefde ik een droom. Achter de schermen was het een andere wereld.
        </p>
        <blockquote className="mt-8 border-l-2 border-white pl-5 text-xl italic leading-9 text-white sm:text-2xl">
          Op papier was het succes. Achter de schermen at de stress me langzaam op — en
          mijn lichaam stuurde de rekening.
        </blockquote>
        <p className="mt-8 text-[var(--color-muted)]">
          Want van die 100K omzet bleef er niets over. Elke euro die binnenkwam ging
          direct naar salarissen, huur, tools en alles wat een groot team meebrengt.
          En de slapeloze nachten, de constante stress, de druk om iedereen tevreden te
          houden — dat leverde mij psoriasis en reuma op, op 24-jarige leeftijd. Iets
          waar ik nu de rest van mijn leven mee leef.
        </p>
        <p className="mt-5 text-[var(--color-muted)]">
          Laat dat niet de reden zijn dat jij pas in actie gaat.
        </p>
      </section>

      <div className="h-px w-full bg-[var(--color-border)]" />

      <section className="mx-auto max-w-4xl px-6 py-20 sm:px-10">
        <p className="text-xs uppercase tracking-[0.22em] text-[var(--color-muted)]">Hoofdstuk 02 — De keuze</p>
        <h2 className="mt-3 text-3xl font-semibold leading-tight sm:text-5xl">
          Stoppen met groeien
          <br />
          om eindelijk te winnen.
        </h2>
        <p className="mt-3 text-xs uppercase tracking-[0.16em] text-neutral-400">
          De beslissing die alles veranderde
        </p>
        <p className="mt-7 text-[var(--color-muted)]">
          Op een dag besloot ik voor mezelf te kiezen. Niet voor mijn ego. Niet voor
          de verwachtingen van anderen. Niet voor het beeld van de succesvolle
          ondernemer dat ik jarenlang in stand had gehouden.
        </p>
        <p className="mt-5 text-[var(--color-muted)]">
          Ik liet de overtuiging los dat groei altijd groter betekent. Dat meer mensen
          meer vrijheid oplevert. Dat omzet gelijk staat aan succes. Want mijn keuzes
          in het verleden hadden me gebracht tot het moment waar ik was. En om verder
          te groeien, moest ik iets fundamenteel anders doen.
        </p>
        <blockquote className="mt-8 border-l-2 border-white pl-5 text-xl italic leading-9 text-white sm:text-2xl">
          Soms is krimpen de snelste weg naar vrijheid. Dat weet jij als ondernemer als
          geen ander.
        </blockquote>
        <p className="mt-8 text-[var(--color-muted)]">
          Ik bracht het bedrijf terug naar de kern. Geen groot team meer. Geen kantoor
          vol mensen die ik moest managen. Geen vergaderingen over vergaderingen.
          Alleen: wat werkt, wat oplevert en wat vrijheid geeft.
        </p>
      </section>

      <div className="h-px w-full bg-[var(--color-border)]" />

      <section className="mx-auto max-w-6xl px-6 py-20 sm:px-10">
        <p className="text-xs uppercase tracking-[0.22em] text-[var(--color-muted)]">Hoofdstuk 03 — Het resultaat</p>
        <h2 className="mt-3 text-3xl font-semibold leading-tight sm:text-5xl">
          80K omzet.
          <br />
          50K winst.
          <br />
          <em className="italic">2 mensen.</em>
        </h2>
        <p className="mt-3 text-xs uppercase tracking-[0.16em] text-neutral-400">
          Wat er overblijft als je stopt met opvullen
        </p>

        <div className="mt-10 grid gap-px bg-[var(--color-border)] sm:grid-cols-2 lg:grid-cols-4">
          <div className="bg-[var(--color-charcoal)] p-6">
            <p className="text-4xl font-semibold">80K</p>
            <p className="mt-2 text-sm text-[var(--color-muted)]">Strategische omzet per maand — terugkerend</p>
          </div>
          <div className="bg-[var(--color-charcoal)] p-6">
            <p className="text-4xl font-semibold">50K+</p>
            <p className="mt-2 text-sm text-[var(--color-muted)]">Winst die maandelijks overblijft</p>
          </div>
          <div className="bg-[var(--color-charcoal)] p-6">
            <p className="text-4xl font-semibold">2</p>
            <p className="mt-2 text-sm text-[var(--color-muted)]">Vaste krachten in het hele bedrijf</p>
          </div>
          <div className="bg-[var(--color-charcoal)] p-6">
            <p className="text-4xl font-semibold">0</p>
            <p className="mt-2 text-sm text-[var(--color-muted)]">Uur per dag vastzitten op kantoor</p>
          </div>
        </div>

        <ul className="mt-10 space-y-2 text-sm sm:text-base">
          <li>↑ Geen manager meer spelen</li>
          <li>↑ Doen wat ik leuk vind, niet wat het bedrijf dicteert</li>
          <li>↑ Winst die écht overblijft, elke maand</li>
          <li>↑ Een bedrijf dat draait zonder dat ik er constant bij hoef te zijn</li>
          <li>↑ Vrijheid die ik altijd al zocht — als bijproduct van de keuze</li>
        </ul>
      </section>

      <div className="h-px w-full bg-[var(--color-border)]" />

      <section className="mx-auto max-w-6xl px-6 py-20 sm:px-10">
        <p className="text-xs uppercase tracking-[0.22em] text-[var(--color-muted)]">De methode</p>
        <h2 className="mt-3 text-3xl font-semibold leading-tight sm:text-5xl">
          Niet meer mensen.
          <br />
          <em className="italic">Betere systemen.</em>
        </h2>
        <p className="mt-6 max-w-3xl text-[var(--color-muted)]">
          Dit is wat er structureel veranderd moet worden. Niet als theorie — als
          concrete ingreep in jouw bedrijf.
        </p>

        <div className="mt-10 grid gap-px bg-[var(--color-border)]">
          {methode.map((item, index) => (
            <article
              key={item.title}
              className="grid gap-4 bg-[var(--color-charcoal)] p-6 sm:grid-cols-[2.5rem_1fr] sm:items-start"
            >
              <p className="text-2xl font-semibold text-neutral-400">{String(index + 1).padStart(2, "0")}</p>
              <div>
                <h3 className="text-lg font-semibold">{item.title}</h3>
                <p className="mt-2 text-sm leading-7 text-[var(--color-muted)]">{item.body}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      <div className="h-px w-full bg-[var(--color-border)]" />

      <section className="bg-[var(--color-charcoal)]">
        <div className="mx-auto max-w-6xl px-6 py-20 sm:px-10">
          <p className="text-xs uppercase tracking-[0.22em] text-[var(--color-muted)]">De filter</p>
          <h2 className="mt-3 text-3xl font-semibold leading-tight sm:text-5xl">
            Voor wie dit <em className="italic">niet</em> is
          </h2>
          <p className="mt-6 max-w-2xl text-[var(--color-muted)]">
            Sluit deze pagina als een van deze je omschrijft. De mensen waarmee ik werk,
            werken op hoog niveau. Ik laat dat niet zakken.
          </p>

          <div className="mt-10 grid gap-px bg-[var(--color-border)] sm:grid-cols-2 lg:grid-cols-3">
            {filter.map((item, index) => (
              <article key={item.title} className="bg-black p-6">
                <p className="text-xs uppercase tracking-[0.2em] text-neutral-400">
                  {String(index + 1).padStart(2, "0")}
                </p>
                <h3 className="mt-3 text-base font-semibold text-white">{item.title}</h3>
                <p className="mt-2 text-sm leading-7 text-neutral-300">{item.body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-4xl px-6 py-24 text-center sm:px-10">
        <h2 className="text-4xl font-semibold leading-tight sm:text-6xl">
          Als jij de ondernemer bent
          <br />
          die ik net beschreef —
        </h2>
        <p className="mx-auto mt-6 max-w-2xl text-[var(--color-muted)]">
          Dan is er een beperkt aantal plaatsen beschikbaar. Dit is geen cursus die je
          koopt en vergeet. Dit is een persoonlijk traject waarbij we samen grondig
          door jouw bedrijf heen duiken.
        </p>

        <div className="mt-10 rounded-[15px] border border-[var(--color-border)] bg-[var(--color-surface)] p-6 text-left sm:p-8">
          <h3 className="text-xl font-semibold">Wat er gebeurt als we een match zijn</h3>
          <ol className="mt-5 space-y-4 text-sm text-[var(--color-muted)] sm:text-base">
            {stappen.map((stap, index) => (
              <li key={stap.title} className="grid grid-cols-[1.5rem_1fr] gap-3">
                <span className="font-semibold text-white">{index + 1}</span>
                <span>
                  <strong className="text-white">{stap.title}</strong> {stap.body}
                </span>
              </li>
            ))}
          </ol>
        </div>

        <Link
          href="/apply"
          className="mt-10 inline-block rounded-[15px] border border-white bg-white px-10 py-4 text-sm font-semibold uppercase tracking-[0.14em] text-black transition hover:bg-neutral-200"
        >
          Aanmelden voor een call
        </Link>
      </section>

      <footer className="border-t border-[var(--color-border)] px-6 py-8 text-center text-xs uppercase tracking-[0.12em] text-[var(--color-muted)] sm:px-10">
        Jur Jansen © 2026
      </footer>

      <div
        className={`fixed inset-x-0 bottom-0 z-40 p-4 transition-opacity duration-300 sm:hidden ${
          showFloatingCta ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
      >
        <Link
          href="/apply"
          className="block w-full rounded-[15px] border border-white bg-white px-6 py-3 text-center text-sm font-semibold uppercase tracking-[0.12em] text-black"
        >
          Aanmelden
        </Link>
      </div>
    </main>
  );
}
