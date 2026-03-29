import Link from "next/link";
import React from "react";

import type { LegalDocument } from "@/data/legalContent";

type LegalDocumentPageProps = {
  document: LegalDocument;
  companion: {
    label: string;
    href: string;
  };
};

const LegalDocumentPage = ({
  document,
  companion,
}: LegalDocumentPageProps) => {
  return (
    <div className="relative overflow-hidden">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-[-8rem] top-20 h-72 w-72 rounded-full bg-primary/12 blur-3xl" />
        <div className="absolute right-[-6rem] top-80 h-80 w-80 rounded-full bg-secondary/15 blur-3xl" />
      </div>

      <section className="relative w-11/12 max-w-7xl mx-auto pt-16 pb-10 lg:pt-24">
        <div className="grid gap-8 lg:grid-cols-[1.35fr_0.8fr] lg:items-end">
          <div className="space-y-6">
            <div className="inline-flex items-center rounded-full border border-primary/25 bg-primary/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.28em] text-primary">
              {document.eyebrow}
            </div>
            <div className="space-y-4">
              <h1 className="max-w-4xl text-4xl font-extrabold leading-tight tracking-tight text-white lg:text-7xl">
                {document.title}
              </h1>
              <p className="max-w-3xl text-base leading-8 text-slate-300 lg:text-lg">
                {document.subtitle}
              </p>
            </div>

            <div className="grid gap-4 sm:grid-cols-3">
              {document.quickFacts.map((fact) => (
                <div
                  key={fact.label}
                  className="rounded-3xl border border-white/8 bg-gray-900/45 p-5 backdrop-blur-md"
                >
                  <p className="text-xs font-semibold uppercase tracking-[0.24em] text-slate-500">
                    {fact.label}
                  </p>
                  <p className="mt-3 text-sm leading-6 text-slate-200">
                    {fact.value}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <aside className="rounded-[2rem] border border-white/10 bg-linear-to-br from-gray-900/70 to-gray-950/50 p-6 shadow-2xl backdrop-blur-xl">
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-slate-500">
              Policy Snapshot
            </p>
            <div className="mt-5 space-y-3">
              {document.highlights.map((item) => (
                <div
                  key={item}
                  className="flex gap-3 rounded-2xl border border-white/6 bg-white/3 px-4 py-3"
                >
                  <span className="mt-1 h-2.5 w-2.5 shrink-0 rounded-full bg-primary" />
                  <p className="text-sm leading-6 text-slate-200">{item}</p>
                </div>
              ))}
            </div>

            <div className="mt-6 rounded-2xl border border-primary/15 bg-primary/8 p-4">
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-primary">
                Need Help?
              </p>
              <p className="mt-2 text-sm leading-6 text-slate-300">
                Questions about this document can be sent to{" "}
                <a
                  href={`mailto:${document.contactEmail}`}
                  className="font-semibold text-white transition-colors hover:text-primary"
                >
                  {document.contactEmail}
                </a>
                .
              </p>
            </div>
          </aside>
        </div>
      </section>

      <section className="relative w-11/12 max-w-7xl mx-auto py-8 lg:py-12">
        <div className="grid gap-10 lg:grid-cols-[0.82fr_1.45fr]">
          <div className="space-y-6">
            <div className="rounded-[2rem] border border-white/10 bg-gray-900/45 p-6 backdrop-blur-md">
              <p className="text-xs font-semibold uppercase tracking-[0.24em] text-slate-500">
                Document Details
              </p>
              <div className="mt-5 space-y-4">
                <div className="flex items-center justify-between gap-4 border-b border-white/6 pb-4">
                  <span className="text-sm text-slate-400">Last updated</span>
                  <span className="text-sm font-semibold text-white">
                    {document.lastUpdated}
                  </span>
                </div>
                <div className="flex items-center justify-between gap-4">
                  <span className="text-sm text-slate-400">Effective date</span>
                  <span className="text-sm font-semibold text-white">
                    {document.effectiveDate}
                  </span>
                </div>
              </div>
            </div>

            <div className="rounded-[2rem] border border-white/10 bg-gray-950/45 p-6 backdrop-blur-md">
              <p className="text-xs font-semibold uppercase tracking-[0.24em] text-slate-500">
                Related Page
              </p>
              <h2 className="mt-4 text-2xl font-bold text-white">
                Review our {companion.label.toLowerCase()}
              </h2>
              <p className="mt-3 text-sm leading-6 text-slate-400">
                Legal pages work best together, so we linked the companion
                document here for quick reference.
              </p>
              <Link
                href={companion.href}
                className="mt-6 inline-flex items-center rounded-full border border-primary/30 px-5 py-3 text-sm font-semibold text-primary transition-all hover:bg-primary/10 hover:text-white"
              >
                Open {companion.label}
              </Link>
            </div>
          </div>

          <div className="space-y-6">
            {document.sections.map((section, index) => (
              <article
                key={section.title}
                className="rounded-[2rem] border border-white/8 bg-gray-900/40 p-6 lg:p-8 backdrop-blur-md"
              >
                <div className="mb-5 flex items-center gap-4">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-primary/12 text-sm font-black text-primary">
                    {String(index + 1).padStart(2, "0")}
                  </div>
                  <h2 className="text-2xl font-bold text-white lg:text-3xl">
                    {section.title}
                  </h2>
                </div>

                <div className="space-y-4">
                  {section.body.map((paragraph) => (
                    <p
                      key={paragraph}
                      className="text-sm leading-7 text-slate-300 lg:text-base"
                    >
                      {paragraph}
                    </p>
                  ))}
                </div>

                {section.bullets?.length ? (
                  <div className="mt-6 grid gap-3">
                    {section.bullets.map((bullet) => (
                      <div
                        key={bullet}
                        className="flex items-start gap-3 rounded-2xl border border-white/6 bg-black/15 px-4 py-3"
                      >
                        <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-secondary" />
                        <p className="text-sm leading-6 text-slate-200">
                          {bullet}
                        </p>
                      </div>
                    ))}
                  </div>
                ) : null}
              </article>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default LegalDocumentPage;
