import { useEffect, useState } from 'react'
import Header from './components/header.jsx'

const ICONS = {
  laptop: (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M4.5 6.5h15a1 1 0 0 1 1 1v8a1 1 0 0 1-1 1h-15a1 1 0 0 1-1-1v-8a1 1 0 0 1 1-1Z" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M2 17.5h20" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
    </svg>
  ),
  wrench: (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M21 6.5 17.5 3 14 6.5l1.5 1.6-7.8 7.8a5.5 5.5 0 0 0 7.8 7.8l7.8-7.8L21 6.5Z" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M16.5 7.5 13.5 10.5" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
    </svg>
  ),
  shield: (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M12 3 5 6.5v5.4c0 5.4 3.5 9.8 7 9.8s7-4.4 7-9.8V6.5L12 3Z" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M9 11.5 10.5 13 15 8.5" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
    </svg>
  ),
  code: (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M8.5 6.5 3.5 12l5 5.5" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M15.5 6.5 20.5 12l-5 5.5" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M12 4.5v15" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  ),
  spark: (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M12 2.5 13.5 8l5.5.5-4.2 3.6 1.5 5.4L12 14.5 8.7 17.5l1.5-5.4L6 8.5l5.5-.5L12 2.5Z" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  ),
  map: (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M12 2.5c-3.8 0-7 3-7 6.8 0 4.4 5.8 10.5 6.3 11.1a1 1 0 0 0 1.4 0c.6-.6 6.3-6.7 6.3-11.1C19 5.5 15.8 2.5 12 2.5Z" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx="12" cy="9.5" r="1.5" fill="currentColor" />
    </svg>
  ),
  phone: (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M7.2 3.8c.9-.5 2.5 0 3.2.8l1.3 1.4c.6.7.7 1.8.3 2.7l-.7 1.8c-.2.5 0 1.1.4 1.4l2.1 1.5c-.2.4-.5.9-.8 1.3a4 4 0 0 1-2.7 1.8l-1.8.3a2.7 2.7 0 0 1-2.7-1.1L6.2 13a3 3 0 0 1-.9-2.1l.1-1.9a4 4 0 0 1 1.8-2.7Z" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  ),
  instagram: (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <rect x="4.5" y="4.5" width="15" height="15" rx="4.5" fill="none" stroke="currentColor" strokeWidth="1.7" />
      <circle cx="12" cy="12" r="3" fill="none" stroke="currentColor" strokeWidth="1.7" />
      <path d="M17.5 6.5h.01" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
    </svg>
  ),
  mail: (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M4.5 7.5h15v9a1 1 0 0 1-1 1h-13a1 1 0 0 1-1-1v-9Z" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
      <path d="m4.5 7.5 7.5 5 7.5-5" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  ),
  whatsapp: (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M17.5 6.5H6.5A2 2 0 0 0 4.5 8.5v7c0 1.1.9 2 2 2h1.5l-1.4 3.5 3.8-1.9h6.1a2 2 0 0 0 2-2v-7a2 2 0 0 0-2-2Z" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M8.8 11.5c.7 1.3 3 2.3 4.5 2.2.5 0 .8 0 1.1-.1" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
    </svg>
  ),
}

const services = [
  {
    title: 'Perbaikan & Troubleshooting',
    description: 'Diagnostik dan perbaikan hardware maupun software untuk mengembalikan performa laptop terbaik.',
    icon: 'wrench',
  },
  {
    title: 'Instalasi Software',
    description: 'Instalasi sistem operasi, aplikasi produktivitas, driver, dan konfigurasi turnkey untuk perangkat yang siap pakai.',
    icon: 'laptop',
  },
  {
    title: 'IT Support & Consultation',
    description: 'Pendampingan teknis, perencanaan, dan solusi cepat untuk dukungan IT stabil dan tanpa hambatan.',
    icon: 'shield',
  },
  {
    title: 'Optimasi Performa',
    description: 'Pembersihan, tuning, dan troubleshooting agar laptop berjalan lancar dan bebas lag.',
    icon: 'code',
  },
]

const stats = [
  { id: 'handled', end: 10000, suffix: '+', label: 'Laptop Berhasil Ditangani' },
  { id: 'experience', end: 2, suffix: '+', label: 'Partner tim & 2 Tahun Pengalaman' },
  { id: 'satisfaction', end: 95, suffix: '%', label: 'Tingkat Kepuasan Pelanggan' },
]

const skills = [
  'Troubleshooting',
  'Windows',
  'Microsoft Office',
  'Hardware',
  'Networking',
  'IT Support',
  'Software Installation',
  'Maintenance',
  'Customer Service',
  'Problem Solving',
  'Communication',
]

const skillLevels = [
  { label: 'Troubleshooting', value: 95 },
  { label: 'Hardware Diagnosis', value: 87 },
  { label: 'Windows & Software', value: 90 },
  { label: 'Customer Support', value: 92 },
]

const portfolioItems = [
  {
    title: 'Service Laptop',
    category: 'Perbaikan & Troubleshooting',
    summary: 'Menangani berbagai masalah laptop seperti lemot, gagal booting, error sistem, driver bermasalah, dan optimasi performa.',
    icon: 'laptop',
  },
  {
    title: 'IT Support & Consultation',
    category: 'Instalasi & Konfigurasi',
    summary: 'Instalasi ulang Windows, Office, driver, software pendukung, dan konfigurasi jaringan untuk kebutuhan bisnis dan personal.',
    icon: 'shield',
  },
  {
    title: 'Website Development',
    category: 'Website Portfolio & Personal',
    summary: 'Membangun website modern dan responsif dengan fokus pada pengalaman pengguna interaktif dan desain yang bersih.',
    icon: 'code',
  },
  {
    title: 'Cleaner Laptop & Optimasi',
    category: 'Perawatan & Optimasi Laptop',
    summary: 'Membersihkan laptop, menjaga suhu ideal, dan mengoptimalkan software agar perangkat tetap cepat dan responsif.',
    icon: 'spark',
  },
]

const timelineItems = [
  { label: 'Team Partner', value: '2 orang', detail: 'Tim kolaboratif untuk solusi yang lebih cepat dan terstruktur.' },
  { label: 'Pengalaman', value: '2 tahun', detail: 'Pengalaman langsung menangani layanan laptop dan IT support di lapangan.' },
  { label: 'Client Focus', value: '100% perhatian', detail: 'Pendekatan customer-first untuk hasil yang terukur dan terpercaya.' },
]

const testimonials = [
  {
    name: 'BH',
    role: 'Pelanggan UMKM',
    quote: 'Respons cepat dan hasil service laptop sangat memuaskan. Perangkat kembali lancar tanpa kendala.',
  },
  {
    name: 'AA',
    role: 'Client Personal',
    quote: 'Solusi IT yang jelas, profesional, dan harga terjangkau. Sangat recommended untuk service laptop dan konsultasi.',
  },
  {
    name: 'AP',
    role: 'Karyawan Swasta',
    quote: 'Dukungan teknisnya rapi dan komunikasi sangat baik. Laptop kantor kembali stabil dan cepat.',
  },
  {
    name: 'YH',
    role: 'Pelanggan Startup',
    quote: 'Instalasi software dan optimasi laptop berjalan lancar. Sangat membantu untuk kebutuhan bisnis kami.',
  }
]

const contactItems = [
  {
    label: 'Alamat',
    value: 'KMP RAIMIN GG. HJ. Malik RT008 / RW003, CILINCING, SUKAPURA, JAKARTA UTARA',
    icon: 'map',
  },
  {
    label: 'Telepon',
    value: 'Fauzil : +62-889-7564-2070',
    icon: 'phone',
  },
  {
    label: 'Instagram',
    value: '@_fauzilazm',
    icon: 'instagram',
  },
  {
    label: 'Email',
    value: 'mohammadfauzilazim11@gmail.com',
    icon: 'mail',
  },
]

function App() {
  const [animatedStats, setAnimatedStats] = useState({ handled: 0, experience: 0, satisfaction: 0 })
  const [formValues, setFormValues] = useState({ name: '', contact: '', message: '' })
  const [formValidity, setFormValidity] = useState({ name: null, contact: null, message: null })

  const renderIcon = (iconName) => ICONS[iconName] || ICONS.spark

  useEffect(() => {
    const revealElements = document.querySelectorAll('.reveal')
    const observer = new IntersectionObserver(
      (entries, obs) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('active')
            obs.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.18 },
    )

    revealElements.forEach((element) => observer.observe(element))
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    const statsSection = document.querySelector('.stats-grid')
    if (!statsSection) return

    const observer = new IntersectionObserver(
      (entries, obs) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            stats.forEach((stat) => {
              const step = Math.max(1, Math.round(stat.end / 26))
              let value = 0
              const interval = setInterval(() => {
                value += step
                if (value >= stat.end) {
                  value = stat.end
                  clearInterval(interval)
                }
                setAnimatedStats((prev) => ({ ...prev, [stat.id]: value }))
              }, 36)
            })

            obs.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.4 },
    )

    observer.observe(statsSection)
    return () => observer.disconnect()
  }, [])

  const validateField = (name, value) => {
    const cleanValue = value.trim()
    if (!cleanValue) return false
    if (name === 'contact') {
      return /@|\d{5,}/.test(cleanValue)
    }
    if (name === 'message') {
      return cleanValue.length > 10
    }
    return cleanValue.length >= 2
  }

  const handleFieldChange = (event) => {
    const { name, value } = event.target
    setFormValues((current) => ({ ...current, [name]: value }))
    setFormValidity((current) => ({ ...current, [name]: validateField(name, value) }))
  }

  const handleSendMessage = (event) => {
    event.preventDefault()
    const { name, contact, message } = formValues
    const nameValid = validateField('name', name)
    const contactValid = validateField('contact', contact)
    const messageValid = validateField('message', message)

    setFormValidity({ name: nameValid, contact: contactValid, message: messageValid })

    if (!nameValid || !contactValid || !messageValid) {
      return
    }

    const subject = encodeURIComponent('Pesan dari Website')
    const body = encodeURIComponent(`Nama: ${name}\nKontak: ${contact}\n\n${message}`)
    window.location.href = `mailto:mohammadfauzilazim11@gmail.com?subject=${subject}&body=${body}`
  }

  return (
    <main className="app-shell">
      <div className="page-shell">
        <Header name="Mohammad Fauzil Azim S.Kom" />

        <section className="hero-card reveal">
          <div className="hero-badge">
            <span className="badge-icon">{ICONS.spark}</span>
            <span>LAYANAN SERVICE LAPTOP & DUKUNGAN IT</span>
          </div>
          <h1>
            Solusi Service Laptop dan Dukungan IT <span className="text-gradient">Profesional</span>
          </h1>
          <p className="subtitle">
            Saya menyediakan layanan service laptop, instal ulang sistem operasi, pemasangan software, dan troubleshooting untuk membantu perangkat Anda tetap optimal dan siap digunakan.
          </p>

          <div className="hero-actions">
            <a href="#services" className="button button-primary">Jelajahi Layanan</a>
            <a href="#skills" className="button button-secondary">Lihat Keahlian</a>
            <a href="#portfolio" className="button button-secondary">Lihat Portofolio</a>
          </div>

          <div className="hero-decorations" aria-hidden="true">
            <div className="hero-blob" />
            <div className="hero-ring" />
            <div className="hero-line" />
          </div>

          <div className="stats-grid">
            {stats.map((stat) => (
              <article key={stat.id} className="stat-card">
                <strong>{animatedStats[stat.id]}{stat.suffix}</strong>
                <span>{stat.label}</span>
              </article>
            ))}
          </div>
        </section>

        {/* Services */}
        <section id="services" className="section-block reveal">
          <div className="section-header">
            <h2>Layanan</h2>
            <p>Fokus pada keahlian teknis dan solusi yang dapat langsung membantu perangkat Anda kembali optimal.</p>
          </div>
          <div className="services-grid">
            {services.map((s) => (
              <article key={s.title} className="service-card">
                <div className="service-icon">{renderIcon(s.icon)}</div>
                <h3>{s.title}</h3>
                <p>{s.description}</p>
              </article>
            ))}
          </div>
        </section>

        {/* Skills */}
        <section id="skills" className="section-block reveal">
          <div className="section-header">
            <h2>Keahlian</h2>
            <p>Keahlian saya tetap tidak berubah — fokus teknis dan dukungan lapangan.</p>
          </div>
          <div className="skills-list">
            {skills.map((s) => (
              <span key={s} className="skill-pill">
                <span className="skill-pill-icon">✦</span>
                {s}
              </span>
            ))}
          </div>
        </section>

        {/* Portfolio & About & Testimonials & Contact */}
        <section id="portfolio" className="section-block reveal">
          <div className="section-header">
            <h2>Portofolio</h2>
            <p>Contoh pekerjaan dan layanan yang telah diberikan tanpa menggunakan gambar, hanya deskripsi dan ikon.</p>
          </div>
          <div className="portfolio-grid">
            {portfolioItems.map((p) => (
              <article key={p.title} className="portfolio-card">
                <div className="service-icon">{renderIcon(p.icon)}</div>
                <h3>{p.title}</h3>
                <p>{p.summary}</p>
              </article>
            ))}
          </div>
        </section>

        <section id="about" className="section-block reveal">
          <div className="section-header">
            <h2>Tentang</h2>
            <p>Ringkasan pengalaman dan nilai layanan profesional.</p>
          </div>
          <div className="about-intro-grid">
            <article className="about-profile-card">
              <div className="profile-avatar">MF</div>
              <div>
                <h3>Profesional IT yang fokus pada hasil nyata</h3>
                <p>Saya membantu pengguna dan bisnis menjaga perangkat tetap stabil, cepat, dan aman melalui layanan laptop, dukungan IT, serta solusi digital yang terarah.</p>
              </div>
              <div className="timeline-list">
                {timelineItems.map((item) => (
                  <div key={item.label} className="timeline-item">
                    <strong>{item.value}</strong>
                    <p>{item.label}</p>
                    <span>{item.detail}</span>
                  </div>
                ))}
              </div>
            </article>

            <article className="about-skill-card">
              <h3>Level Keahlian</h3>
              <p>Progress visual skill memberikan gambaran profesional untuk setiap fokus layanan.</p>
              <div className="skill-bars">
                {skillLevels.map((skill) => (
                  <div key={skill.label} className="skill-track">
                    <div className="skill-track-head">
                      <span>{skill.label}</span>
                      <strong>{skill.value}%</strong>
                    </div>
                    <div className="skill-track-bar">
                      <div className="skill-track-fill" style={{ width: `${skill.value}%` }} />
                    </div>
                  </div>
                ))}
              </div>
            </article>
          </div>
        </section>

        <section id="testimonials" className="section-block reveal">
          <div className="section-header">
            <h2>Testimoni</h2>
            <p>Pelanggan dan klien memberikan penilaian positif tanpa menggunakan foto, hanya bukti kualitas layanan dan reputasi.</p>
          </div>
          <div className="testimonial-grid">
            {testimonials.map((item) => (
              <article key={item.name} className="testimonial-card">
                <div className="testimonial-head">
                  <div className="testimonial-avatar">{item.name}</div>
                  <div>
                    <strong>{item.role}</strong>
                    <span>{item.name}</span>
                  </div>
                </div>
                <p>{item.quote}</p>
                <div className="testimonial-stars">★★★★★</div>
              </article>
            ))}
          </div>
        </section>

        <section id="contact" className="section-block reveal">
          <div className="section-header">
            <h2>Kontak & Layanan</h2>
            <p>Siap membantu kebutuhan service laptop, dukungan IT, dan pembuatan website yang profesional.</p>
          </div>
          <div className="contact-card-grid">
            <div className="contact-summary-card">
              {contactItems.map((item) => (
                <div key={item.label} className="contact-item">
                  <div className="contact-icon-bg">{renderIcon(item.icon)}</div>
                  <div>
                    <strong>{item.label}</strong>
                    <p>{item.value}</p>
                  </div>
                </div>
              ))}
            </div>
            <form className="contact-form" onSubmit={handleSendMessage}>
              <label className={`floating-label ${formValidity.name === false ? 'invalid' : formValidity.name === true ? 'valid' : ''}`}>
                <input
                  type="text"
                  name="name"
                  value={formValues.name}
                  onChange={handleFieldChange}
                  placeholder=" "
                  required
                />
                <span>Nama</span>
                <small>{formValidity.name === false ? 'Nama minimal 2 karakter.' : ' '}</small>
              </label>

              <label className={`floating-label ${formValidity.contact === false ? 'invalid' : formValidity.contact === true ? 'valid' : ''}`}>
                <input
                  type="text"
                  name="contact"
                  value={formValues.contact}
                  onChange={handleFieldChange}
                  placeholder=" "
                  required
                />
                <span>Kontak</span>
                <small>{formValidity.contact === false ? 'Masukan email atau WhatsApp yang valid.' : ' '}</small>
              </label>

              <label className={`floating-label ${formValidity.message === false ? 'invalid' : formValidity.message === true ? 'valid' : ''}`}>
                <textarea
                  name="message"
                  value={formValues.message}
                  onChange={handleFieldChange}
                  placeholder=" "
                  required
                />
                <span>Pesan</span>
                <small>{formValidity.message === false ? 'Tulis pesan minimal 10 karakter.' : ' '}</small>
              </label>

              <button type="submit" className="button button-primary">
                Kirim Pesan
              </button>
            </form>
          </div>
        </section>

        <footer className="site-footer reveal">
          <div className="footer-copy">
            <p className="eyebrow">Siap dibantu</p>
            <h2>Hubungi saya untuk layanan laptop dan dukungan IT profesional.</h2>
          </div>
          <div className="footer-bar">
            <div className="footer-social">
              <a href="mailto:mohammadfauzilazim11@gmail.com">{ICONS.mail}<span>Email</span></a>
              <a href="https://instagram.com/_fauzilazm" target="_blank" rel="noreferrer">{ICONS.instagram}<span>Instagram</span></a>
              <a href="https://wa.me/6288975642070" target="_blank" rel="noreferrer">{ICONS.whatsapp}<span>WhatsApp</span></a>
            </div>
            <p className="footer-note">© 2026 Mohammad Fauzil Azim. All rights reserved.</p>
          </div>
        </footer>
      </div>
    </main>
  )
}

export default App
