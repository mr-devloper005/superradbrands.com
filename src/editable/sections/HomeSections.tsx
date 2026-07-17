import Link from 'next/link'
import { ArrowRight, FileText, Search, Sparkles } from 'lucide-react'
import type { SitePost } from '@/lib/site-connector'
import type { HomeTimeSection } from '@/lib/task-data'
import type { TaskKey } from '@/lib/site-config'
import { SITE_CONFIG } from '@/lib/site-config'
import { pagesContent } from '@/editable/content/pages.content'
import { getEditablePostImage, postHref, toPlainText } from '@/editable/cards/PostCards'
import { EditableReveal } from '@/editable/shell/EditableReveal'

type HomeSectionProps = { primaryTask: TaskKey; primaryRoute: string; posts: SitePost[]; timeSections: HomeTimeSection[] }
const container = 'mx-auto w-full max-w-[var(--editable-container)] px-4 sm:px-6 lg:px-10'
const excerpt = (post: SitePost) => toPlainText(post.summary || String((post.content as Record<string, unknown>)?.description || '')).slice(0, 130)

export function EditableHomeHero({ posts }: HomeSectionProps) {
  const images = posts.map(getEditablePostImage).filter(Boolean).slice(0, 4)
  const title = pagesContent.home.hero.title?.join(' ') || 'A better place to find what matters nearby.'
  return <section className="overflow-hidden pt-16 sm:pt-20">
    <div className={container}>
      <EditableReveal className="mx-auto max-w-5xl text-center">
        <p className="editable-mono text-[11px] uppercase tracking-[.14em] text-[#9fecff]">{pagesContent.home.hero.badge || 'A considered collection'}</p>
        <h1 className="mt-6 text-balance text-5xl font-semibold leading-[.98] tracking-[-.055em] sm:text-7xl lg:text-[5.7rem]">{title.split(' ').slice(0, Math.ceil(title.split(' ').length / 2)).join(' ')} <span className="editable-display font-normal">{title.split(' ').slice(Math.ceil(title.split(' ').length / 2)).join(' ')}</span></h1>
        <p className="mx-auto mt-7 max-w-2xl text-lg leading-8 text-[var(--slot4-muted-text)]">{pagesContent.home.hero.description}</p>
        <form action="/search" className="mx-auto mt-8 flex max-w-xl rounded-full border border-[var(--editable-border)] bg-[#151515] p-1.5">
          <label className="flex min-w-0 flex-1 items-center gap-3 px-4"><Search className="h-4 w-4 text-[#9fecff]" /><input name="q" placeholder="Search places and reference material" className="min-w-0 flex-1 bg-transparent py-2 text-sm outline-none placeholder:text-[var(--slot4-muted-text)]" /></label>
          <button className="rounded-full bg-[var(--slot4-accent)] px-5 py-2.5 text-sm font-semibold text-black">Search</button>
        </form>
      </EditableReveal>
      <div className="mt-14 grid grid-cols-2 gap-3 sm:grid-cols-4">
        {images.map((image, i) => <EditableReveal key={`${image}-${i}`} index={i} className={`overflow-hidden rounded-[1.5rem] border border-white/[.06] bg-[#151515] ${i % 2 ? 'mt-10' : ''}`}><img src={image} alt="" className="aspect-[4/5] h-full w-full object-cover opacity-90" /></EditableReveal>)}
      </div>
    </div>
  </section>
}

export function EditableStoryRail({ posts }: HomeSectionProps) {
  const count = posts.length
  return <section className="border-y border-[var(--editable-border)] bg-[#151515]">
    <div className={`${container} grid gap-6 py-10 text-center sm:grid-cols-3 sm:text-left`}>
      {[['01', `${count}+`, 'fresh discoveries'], ['02', String(SITE_CONFIG.tasks.filter(x => x.enabled).length), 'ways to explore'], ['03', 'One', 'place to return to']].map(([n, value, label], i) => <EditableReveal key={n} index={i} className="border-l border-white/[.08] px-6"><span className="editable-mono text-[10px] text-[#9fecff]">{n}</span><p className="editable-display mt-3 text-4xl">{value}</p><p className="mt-1 text-sm text-[var(--slot4-muted-text)]">{label}</p></EditableReveal>)}
    </div>
  </section>
}

function PostTile({ post, index, task = 'article' }: { post: SitePost; index: number; task?: TaskKey }) {
  const href = postHref(task, post)
  const image = getEditablePostImage(post)
  return <EditableReveal index={index}><Link href={href} className="group block overflow-hidden rounded-[1.5rem] border border-[var(--editable-border)] bg-[#151515] transition duration-500 hover:border-white/25"><div className="aspect-[16/10] overflow-hidden bg-[#202020]">{image ? <img src={image} alt="" className="h-full w-full object-cover transition duration-700 group-hover:scale-[1.025]" /> : <FileText className="m-8 h-8 w-8 text-[#9fecff]" />}</div><div className="p-5"><p className="editable-mono text-[10px] uppercase tracking-[.12em] text-[#9fecff]">{post.tags?.[0] || 'Discovery'}</p><h3 className="editable-display mt-3 text-2xl leading-tight">{post.title}</h3><p className="mt-3 line-clamp-2 text-sm leading-6 text-[var(--slot4-muted-text)]">{excerpt(post)}</p></div></Link></EditableReveal>
}

export function EditableMagazineSplit({ posts, primaryRoute, primaryTask }: HomeSectionProps) {
  const feature = posts[0]
  return <section className={container + ' py-20 sm:py-24 lg:py-[7.5rem]'}><EditableReveal className="flex flex-wrap items-end justify-between gap-6"><div><p className="editable-mono text-[11px] uppercase tracking-[.14em] text-[#9fecff]">Selected finds</p><h2 className="mt-4 max-w-2xl text-4xl leading-[1.02] tracking-[-.04em] sm:text-5xl">Useful things, <span className="editable-display font-normal">beautifully collected.</span></h2></div><Link href={primaryRoute} className="inline-flex items-center gap-2 rounded-full border border-[var(--editable-border)] px-5 py-3 text-sm hover:border-white/30">Browse all <ArrowRight className="h-4 w-4" /></Link></EditableReveal>{feature ? <div className="mt-12 grid gap-5 lg:grid-cols-[1.35fr_.65fr]"><PostTile post={feature} index={0} task={primaryTask} /><div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-1">{posts.slice(1, 3).map((post, i) => <PostTile key={post.id || post.slug} post={post} index={i + 1} task={primaryTask} />)}</div></div> : null}</section>
}

export function EditableTimeCollections({ timeSections, posts, primaryTask }: HomeSectionProps) {
  const collection = timeSections.find(s => s.posts.length) || { title: 'Recently added', posts }
  return <section className="border-y border-[var(--editable-border)] bg-[#151515]"><div className={container + ' py-20 sm:py-24'}><EditableReveal><p className="editable-mono text-[11px] uppercase tracking-[.14em] text-[#9fecff]">The index</p><h2 className="mt-4 text-4xl tracking-[-.04em] sm:text-5xl">{collection.title}</h2></EditableReveal><div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">{collection.posts.slice(0, 4).map((post, i) => <PostTile key={post.id || post.slug} post={post} index={i} task={primaryTask} />)}</div></div></section>
}

export function EditableHomeCta() { return <section className={container + ' py-20 sm:py-28'}><EditableReveal className="rounded-[2rem] bg-[var(--slot4-accent)] px-7 py-14 text-black sm:px-14 sm:py-20"><Sparkles className="h-6 w-6" /><h2 className="mt-7 max-w-3xl text-5xl leading-[.95] tracking-[-.055em] sm:text-7xl">Have something worth <span className="editable-display font-normal">sharing?</span></h2><p className="mt-6 max-w-xl text-base leading-7 text-black/70">Add a local place or a useful reference to the collection, then let the right people find it.</p><Link href="/create" className="mt-8 inline-flex items-center gap-2 rounded-full bg-black px-6 py-3 text-sm font-semibold text-white">Submit a discovery <ArrowRight className="h-4 w-4" /></Link></EditableReveal></section> }
