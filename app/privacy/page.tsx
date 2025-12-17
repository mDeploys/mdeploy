"use client"

import { useLanguage } from "@/lib/language-context"
import { translations } from "@/lib/translations"

export default function PrivacyPage() {
  const { language } = useLanguage()
  const t = translations[language]

  return (
    <div className="min-h-screen pt-32 pb-24">
      <div className="container mx-auto max-w-4xl px-4 lg:px-8">
        <h1 className="mb-8 text-4xl font-bold">{t.privacy.title}</h1>
        <div className="prose prose-neutral max-w-none space-y-6 dark:prose-invert">
          <p className="text-muted-foreground">
            {t.privacy.updatedLabel}: {new Date().toLocaleDateString()}
          </p>

          {t.privacy.sections.map((section) => (
            <section key={section.title}>
              <h2 className="mb-4 text-2xl font-semibold">{section.title}</h2>
              {section.body && <p className="leading-relaxed text-muted-foreground">{section.body}</p>}
              {section.intro && <p className="leading-relaxed text-muted-foreground">{section.intro}</p>}
              {section.items && (
                <ul className="list-disc space-y-2 pl-6 text-muted-foreground">
                  {section.items.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              )}
            </section>
          ))}
        </div>
      </div>
    </div>
  )
}
