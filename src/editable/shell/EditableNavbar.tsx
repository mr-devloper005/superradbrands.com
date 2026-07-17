'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Menu, Search, X, PlusCircle } from 'lucide-react'
import { SITE_CONFIG } from '@/lib/site-config'
import { useEditableLocalAuthSession } from '@/editable/components/EditableLocalAuthForms'

export function EditableNavbar() {
  const [open, setOpen] = useState(false)
  const { session, logout } = useEditableLocalAuthSession()
  const staticLinks = [{ label: 'About', href: '/about' }, { label: 'Contact', href: '/contact' }]
  return (
    <header className="sticky top-4 z-50 px-4 sm:px-6">
      <nav className="mx-auto flex min-h-[58px] w-full max-w-[560px] items-center rounded-full border border-white/[.06] bg-[#151515]/95 px-2 text-[var(--editable-nav-text)] shadow-[0_10px_40px_rgba(0,0,0,.2)] backdrop-blur">
        <Link href="/" className="editable-display flex shrink-0 items-center rounded-full bg-white/[.03] px-4 py-2 text-base font-semibold tracking-[-.03em]">{SITE_CONFIG.name}</Link>
        <div className="ml-2 hidden items-center gap-1 sm:flex">
          {staticLinks.map((item) => <Link key={item.href} href={item.href} className="rounded-full px-3 py-2 text-sm text-[var(--slot4-muted-text)] transition hover:bg-white/[.04] hover:text-white">{item.label}</Link>)}
        </div>
        <div className="ml-auto flex items-center gap-1">
          <Link href="/search" aria-label="Search" className="rounded-full p-2.5 text-[var(--slot4-muted-text)] transition hover:bg-white/[.05] hover:text-white"><Search className="h-4 w-4" /></Link>
          {session ? <>
            <Link href="/create" className="hidden items-center gap-1.5 rounded-full bg-[var(--editable-cta-bg)] px-4 py-2 text-sm font-semibold text-[var(--editable-cta-text)] sm:inline-flex"><PlusCircle className="h-3.5 w-3.5" /> Submit</Link>
            <button type="button" onClick={logout} className="hidden rounded-full px-3 py-2 text-sm text-[var(--slot4-muted-text)] hover:text-white sm:block">Logout</button>
          </> : <>
            <Link href="/login" className="hidden rounded-full px-3 py-2 text-sm text-[var(--slot4-muted-text)] hover:text-white sm:block">Sign in</Link>
            <Link href="/signup" className="hidden rounded-full bg-[var(--editable-cta-bg)] px-4 py-2 text-sm font-semibold text-[var(--editable-cta-text)] sm:block">Get started</Link>
          </>}
          <button type="button" onClick={() => setOpen(v => !v)} className="rounded-full p-2 text-[var(--slot4-muted-text)] sm:hidden" aria-label="Toggle menu">{open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}</button>
        </div>
      </nav>
      {open ? <div className="mx-auto mt-2 max-w-[560px] rounded-[1.5rem] border border-[var(--editable-border)] bg-[#151515] p-3 sm:hidden">
        {[...staticLinks, ...(session ? [{ label: 'Submit', href: '/create' }] : [{ label: 'Sign in', href: '/login' }, { label: 'Get started', href: '/signup' }])].map(item => <Link key={item.href} href={item.href} onClick={() => setOpen(false)} className="block rounded-xl px-4 py-3 text-sm text-[var(--slot4-muted-text)] hover:bg-white/[.04] hover:text-white">{item.label}</Link>)}
        {session ? <button type="button" onClick={logout} className="block w-full rounded-xl px-4 py-3 text-left text-sm text-[var(--slot4-muted-text)] hover:bg-white/[.04] hover:text-white">Logout</button> : null}
      </div> : null}
    </header>
  )
}
