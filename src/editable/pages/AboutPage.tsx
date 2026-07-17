import { SITE_CONFIG } from '@/lib/site-config'
import { pagesContent } from '@/editable/content/pages.content'
import { EditableSiteShell } from '@/editable/shell/EditableSiteShell'

export default function AboutPage() {
  return (
    <EditableSiteShell>
      <main className="px-4 py-20 sm:px-6 lg:px-10">
        <section className="mx-auto grid max-w-[var(--editable-container)] gap-5 lg:grid-cols-[1.2fr_.8fr]">
          <article className="rounded-[2rem] border border-[var(--editable-border)] bg-[var(--slot4-surface-bg)] p-8 lg:p-14">
            <p className="editable-mono text-[11px] uppercase tracking-[.14em] text-[#9fecff]">{pagesContent.about.badge}</p>
            <h1 className="editable-display mt-6 max-w-3xl text-5xl font-normal leading-[.96] tracking-[-.055em] sm:text-7xl">About {SITE_CONFIG.name}</h1>
            <p className="mt-5 max-w-2xl text-base leading-8 text-[var(--slot4-muted-text)]">{pagesContent.about.description}</p>
            <div className="mt-8 space-y-4 text-sm leading-8 text-[var(--slot4-muted-text)]">
              {pagesContent.about.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
            </div>
          </article>
          <aside className="space-y-4">
            {pagesContent.about.values.map((value) => (
              <div key={value.title} className="rounded-[1.5rem] border border-[var(--editable-border)] bg-[var(--slot4-panel-bg)] p-7">
                <p className="editable-mono text-[10px] uppercase tracking-[.12em] text-[#9fecff]">0{pagesContent.about.values.indexOf(value) + 1}</p><h2 className="editable-display mt-5 text-2xl font-normal">{value.title}</h2>
                <p className="mt-3 text-sm leading-7 text-[var(--slot4-muted-text)]">{value.description}</p>
              </div>
            ))}
          </aside>
        </section>
      </main>
    </EditableSiteShell>
  )
}
