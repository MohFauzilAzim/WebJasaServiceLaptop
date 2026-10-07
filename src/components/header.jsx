import { useEffect, useState } from 'react'

const navItems = [
  { href: '#services', label: 'Layanan' },
  { href: '#skills', label: 'Keahlian' },
  { href: '#portfolio', label: 'Portofolio' },
  { href: '#about', label: 'Tentang' },
  { href: '#contact', label: 'Kontak' },
]

export default function Header({ name }) {
  const [menuOpen, setMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 18)
    window.addEventListener('scroll', onScroll, { passive: true })

    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header className={`site-header ${scrolled ? 'scrolled' : ''} ${menuOpen ? 'menu-open' : ''}`}>
      <div className="brand">
        <button type="button" className="brand-mark" aria-label="Logo">
          <span>F</span>
          <span>A</span>
        </button>
        <div className="brand-copy">
          <p className="brand-name">{name || 'Fauzil'}</p>
          <small>Information Technology</small>
        </div>
      </div>

      <button
        type="button"
        className="menu-toggle"
        onClick={() => setMenuOpen((value) => !value)}
        aria-expanded={menuOpen}
        aria-label="Toggle navigation"
      >
        <span />
        <span />
        <span />
      </button>

      <nav className="site-nav">
        {navItems.map((item) => (
          <a key={item.href} href={item.href} onClick={() => setMenuOpen(false)}>
            {item.label}
          </a>
        ))}
      </nav>
    </header>
  )
}

