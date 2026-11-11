import { motion, MotionConfig, useReducedMotion, type Variants } from 'framer-motion'
import {
  Activity,
  ArrowRight,
  ArrowUpRight,
  Building2,
  ChevronRight,
  Clock3,
  Compass,
  Film,
  Home,
  MapPin,
  Menu,
  Moon,
  Pause,
  Play,
  ShoppingBasket,
  Sparkles,
  Sun,
  X,
  type LucideIcon,
} from 'lucide-react'
import { useEffect, useRef, useState } from 'react'

import {
  activityItems,
  advantages,
  bgVideo,
  commodityCards,
  contactDetails,
  facilityItems,
  marketEmail,
  marketAddress,
  marketImages,
  marketPhone,
  mapsUrl,
  marketStoryVideo,
  navItems,
  socialLinks,
  stats,
} from './data/site'
import { useHeaderScroll } from './hooks/useHeaderScroll'
import { useScrollProgress } from './hooks/useScrollProgress'
import { useSmoothScroll } from './hooks/useSmoothScroll'

const reveal: Variants = {
  hidden: { opacity: 0, y: 28 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.65, ease: [0.16, 1, 0.3, 1] },
  },
}

const heroReveal: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.65, ease: [0.16, 1, 0.3, 1] },
  },
}

const stagger: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.1, delayChildren: 0.12 },
  },
}

type Theme = 'light' | 'dark'

const navigationIcons: Record<string, LucideIcon> = {
  '#beranda': Home,
  '#tentang': Compass,
  '#video': Film,
  '#komoditas': ShoppingBasket,
  '#fasilitas': Building2,
  '#aktivitas': Activity,
  '#kontak': MapPin,
}

function App() {
  const prefersReducedMotion = useReducedMotion()
  const isScrolled = useHeaderScroll()
  const scrollProgress = useScrollProgress()
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [theme, setTheme] = useState<Theme>(() => (
    window.localStorage.getItem('pasar-sidotopo-theme') === 'dark' ? 'dark' : 'light'
  ))

  useSmoothScroll(!prefersReducedMotion)

  useEffect(() => {
    window.localStorage.setItem('pasar-sidotopo-theme', theme)
    document.documentElement.style.colorScheme = theme
  }, [theme])

  return (
    <MotionConfig reducedMotion="user">
      <div className="app-shell" data-theme={theme}>
        <motion.div className="scroll-progress" style={{ scaleX: scrollProgress }} />
        <Header
          isScrolled={isScrolled}
          isMenuOpen={isMenuOpen}
          setIsMenuOpen={setIsMenuOpen}
          theme={theme}
          onToggleTheme={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
        />

        <main>
          <HeroSection prefersReducedMotion={Boolean(prefersReducedMotion)} />
          <AboutSection />
          <MarketVideoSection />
          <StatsSection />
          <CommoditySection />
          <FacilitySection />
          <ActivitySection />
          <AdvantageSection />
          <ContactSection />
        </main>

        <Footer />
      </div>
    </MotionConfig>
  )
}

function Header({
  isScrolled,
  isMenuOpen,
  setIsMenuOpen,
  theme,
  onToggleTheme,
}: {
  isScrolled: boolean
  isMenuOpen: boolean
  setIsMenuOpen: (value: boolean) => void
  theme: Theme
  onToggleTheme: () => void
}) {
  const ThemeIcon = theme === 'dark' ? Sun : Moon
  const themeAction = theme === 'dark' ? 'Aktifkan tema terang' : 'Aktifkan tema gelap'

  return (
    <header className={`site-header ${isScrolled ? 'site-header-scrolled' : ''}`}>
      <nav className="nav-bar">
        <a href="#beranda" className="brand-wrap">
          <span className="brand-mark">P</span>
          <span className="brand-name">Pasar Induk Surabaya Sidotopo</span>
        </a>

        <div className="nav-links">
          {navItems.map((item) => {
            const Icon = navigationIcons[item.href]
            return (
              <a key={item.href} href={item.href} className="nav-link">
                <Icon size={15} aria-hidden="true" />
                {item.label}
              </a>
            )
          })}
        </div>

        <div className="nav-actions">
          <a href="#kontak" className="primary-button small-button">
            Hubungi Kami
            <ArrowRight size={15} />
          </a>
        </div>

        <button type="button" className="theme-toggle" onClick={onToggleTheme} aria-label={themeAction} title={themeAction}>
          <ThemeIcon size={18} aria-hidden="true" />
          <span>{theme === 'dark' ? 'Terang' : 'Gelap'}</span>
        </button>

        <button
          type="button"
          className="menu-button"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label={isMenuOpen ? 'Tutup menu' : 'Buka menu'}
          aria-expanded={isMenuOpen}
          aria-controls="mobile-navigation"
        >
          {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </nav>

      {isMenuOpen && (
        <div className="mobile-menu" id="mobile-navigation">
          {navItems.map((item) => {
            const Icon = navigationIcons[item.href]
            return (
              <a key={item.href} href={item.href} onClick={() => setIsMenuOpen(false)} className="mobile-menu-item">
                <Icon size={17} aria-hidden="true" />
                {item.label}
              </a>
            )
          })}
        </div>
      )}
    </header>
  )
}

function HeroSection({ prefersReducedMotion }: { prefersReducedMotion: boolean }) {
  const [shouldPlayVideo, setShouldPlayVideo] = useState(false)
  const videoRef = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    const desktopViewport = window.matchMedia('(min-width: 640px)')
    const updateVideoPlayback = () => {
      const shouldPlay = desktopViewport.matches && !prefersReducedMotion
      setShouldPlayVideo(shouldPlay)
      if (!shouldPlay) videoRef.current?.pause()
    }

    updateVideoPlayback()
    desktopViewport.addEventListener('change', updateVideoPlayback)

    return () => desktopViewport.removeEventListener('change', updateVideoPlayback)
  }, [prefersReducedMotion])

  return (
    <section id="beranda" className="hero-shell">
      <video
        ref={videoRef}
        className="hero-video"
        autoPlay={shouldPlayVideo}
        muted
        loop
        playsInline
        preload="none"
        poster={marketImages.heroPoster}
      >
        <source src={bgVideo} type="video/mp4" />
      </video>
      <div className="hero-gradient" />

      <div className="hero-content">
        <motion.div initial="hidden" animate="visible" variants={stagger}>
          <motion.p variants={heroReveal} className="eyebrow eyebrow-light">Pasar Induk Surabaya Sidotopo</motion.p>
          <motion.h1 variants={heroReveal} className="hero-title">
            Kota bergerak.<br />
            <em>Pangan menemukan jalannya.</em>
          </motion.h1>
          <motion.p variants={heroReveal} className="hero-subtitle">
            Dari hasil bumi hingga kebutuhan pokok, Pasar Induk Sidotopo merangkai cerita perdagangan yang menghidupi
            Surabaya—setiap hari, sepanjang waktu.
          </motion.p>

          <motion.div variants={heroReveal} className="hero-actions">
            <a href="#komoditas" className="primary-button">
              Jelajahi ekosistem
              <ArrowRight size={16} />
            </a>
            <a href="#tentang" className="secondary-button">
              Kisah Sidotopo
            </a>
          </motion.div>

          <motion.div variants={heroReveal} className="hero-badges">
            <span><Clock3 size={14} aria-hidden="true" /> Perdagangan 24 jam</span>
            <span><Sparkles size={14} aria-hidden="true" /> Lebih dari 100 komoditas</span>
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.9, delay: 0.2 }}
          className="floating-panel"
        >
          <div className="floating-panel-head">
            <div>
              <p className="mini-label">Sidotopo in numbers</p>
              <h2>Ekosistem niaga</h2>
            </div>
            <span className="panel-icon">
              <ArrowUpRight size={18} />
            </span>
          </div>

          <div className="floating-list">
            <div className="floating-row">
              <span>Pedagang aktif</span>
              <strong>120+</strong>
            </div>
            <div className="floating-row">
              <span>Blok perdagangan</span>
              <strong>10+</strong>
            </div>
            <div className="floating-row">
              <span>Lapak tersedia</span>
              <strong>600+</strong>
            </div>
          </div>
        </motion.div>
      </div>

      <div className="scroll-prompt">
        <span>Scroll</span>
        <span className="scroll-indicator" />
      </div>
    </section>
  )
}

function AboutSection() {
  return (
    <section id="tentang" className="section-shell light-shell">
      <div className="content-grid about-grid">
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }} variants={reveal}>
          <p className="eyebrow">Tentang Pasar</p>
          <h2 className="section-title">Dibangun oleh aktivitas. Dihidupkan oleh banyak cerita.</h2>
          <div className="rich-text">
            <p>
              Sidotopo adalah salah satu simpul perdagangan pangan Surabaya—kawasan yang mempertemukan pedagang,
              pemasok, dan pembeli dalam ritme yang terus bergerak. Setiap hari, beragam komoditas menemukan jalannya
              dari lapak menuju kebutuhan kota.
            </p>
            <p>
              Dengan lebih dari 120 pedagang aktif, 10 blok, dan 600 lapak, pasar ini tumbuh sebagai rumah bagi
              ekosistem usaha yang beragam. Bukan sekadar tempat transaksi—Sidotopo adalah bagian dari kehidupan kota.
            </p>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.8 }}
          className="image-stack"
        >
          <div className="glow-orb glow-orb-left" />
          <img src={marketImages.marketTrade} alt="Transaksi penjual dan pembeli di ruang usaha" className="feature-image" />
          <div className="stat-badge">
            <p><Clock3 size={13} aria-hidden="true" /> Berdenyut setiap hari</p>
            <strong>24<span>/7</span></strong>
            <span>perdagangan pangan</span>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

function MarketVideoSection() {
  return (
    <section id="video" className="section-shell video-shell">
      <div className="wrap video-layout">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={reveal}
          className="video-intro"
        >
          <p className="eyebrow"><Film size={15} aria-hidden="true" /> Cerita dari Sidotopo</p>
          <h2 className="section-title">Pasar yang terus bergerak, dalam satu video.</h2>
          <p className="section-summary">
            Lihat lebih dekat suasana dan aktivitas di Pasar Induk Surabaya Sidotopo.
            Tekan putar untuk memulai video dan menyalakan suara.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
          className="market-video-frame"
        >
          <video
            controls
            preload="none"
            playsInline
            poster={marketImages.videoPoster}
            aria-label="Video profil Pasar Induk Surabaya Sidotopo"
          >
            <source src={marketStoryVideo} type="video/mp4" />
            Browser Anda tidak mendukung pemutaran video.
          </video>
          <div className="video-caption">
            <span className="video-caption-icon"><Film size={17} aria-hidden="true" /></span>
            <span>Profil Pasar Induk Surabaya Sidotopo</span>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

function StatsSection() {
  return (
    <section className="section-shell warm-shell">
      <div className="wrap">
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }} variants={reveal} className="stats-heading">
          <p className="eyebrow dark-text">Skala Sidotopo</p>
          <h2 className="section-title">Angka yang bercerita tentang denyut kota.</h2>
        </motion.div>

        <div className="stats-grid">
          {stats.map(({ icon: Icon, ...stat }, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{ delay: index * 0.08, duration: 0.5 }}
              className="stat-card"
            >
              <div className="stat-card-icon"><Icon size={19} aria-hidden="true" /></div>
              <div className="stat-value">{stat.value}</div>
              <p className="stat-label">{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

function CommoditySection() {
  return (
    <section id="komoditas" className="section-shell light-shell">
      <div className="wrap">
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }} variants={reveal} className="section-header">
          <div>
            <p className="eyebrow">Komoditas</p>
            <h2 className="section-title">Ragam pangan. Satu tujuan: menghidupi kota.</h2>
          </div>
          <p className="section-summary">
            Dari hasil bumi hingga bahan pokok, lebih dari 100 jenis komoditas menjadi bagian dari perputaran niaga harian.
          </p>
        </motion.div>

        <div className="commodity-grid">
          {commodityCards.map((card, index) => {
            const Icon = card.icon
            return (
              <motion.article
                key={card.title}
                initial={{ opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ delay: index * 0.05, duration: 0.5 }}
                className="commodity-card"
              >
                <div className="commodity-image-wrap">
                  <img src={card.image} alt={card.title} className="commodity-image" loading="lazy" />
                </div>
                <div className="commodity-overlay" />
                <div className="commodity-badge">
                  <Icon size={14} />
                  {card.badge}
                </div>
                <div className="commodity-content">
                  <div className="commodity-head">
                    <h3>{card.title}</h3>
                    <span>
                      <ChevronRight size={18} />
                    </span>
                  </div>
                  <p>{card.description}</p>
                </div>
              </motion.article>
            )
          })}
        </div>
      </div>
    </section>
  )
}

function FacilitySection() {
  return (
    <section id="fasilitas" className="section-shell sage-shell">
      <div className="content-grid facility-grid">
        <motion.div
          initial={{ opacity: 0, y: 34 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.7 }}
          className="facility-visual"
        >
          <img src={marketImages.marketVendor} alt="Lapak dan display komoditas di area perdagangan" className="facility-image" loading="lazy" />
          <div className="facility-bubble">
            <p className="mini-label">Fasilitas pasar</p>
            <p className="facility-bubble-copy">Ruang usaha, peluang perdagangan.</p>
          </div>
        </motion.div>

        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }} variants={reveal}>
          <p className="eyebrow">Fasilitas</p>
          <h2 className="section-title">Dirancang untuk mendukung aktivitas tanpa henti.</h2>

          <div className="facility-list">
            {facilityItems.map((facility, index) => {
              const Icon = facility.icon
              return (
                <motion.div
                  key={facility.title}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, amount: 0.35 }}
                  variants={reveal}
                  transition={{ delay: index * 0.06 }}
                  className="facility-item"
                >
                  <div className="facility-icon">
                    <Icon size={20} />
                  </div>
                  <div>
                    <h3>{facility.title}</h3>
                    <p>{facility.description}</p>
                  </div>
                </motion.div>
              )
            })}
          </div>

          <a href="#kontak" className="primary-button dark-button">
            Temukan fasilitas
            <ArrowRight size={16} />
          </a>
        </motion.div>
      </div>
    </section>
  )
}

function ActivitySection() {
  const [isPaused, setIsPaused] = useState(false)

  return (
    <section id="aktivitas" className="section-shell light-shell">
      <div className="wrap">
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }} variants={reveal} className="section-header compact-header activity-header">
          <div>
            <p className="eyebrow">Aktivitas pasar</p>
            <h2 className="section-title">Setiap sudut punya cerita. Setiap hari punya ritme.</h2>
          </div>
          <button
            type="button"
            className="marquee-toggle"
            onClick={() => setIsPaused(!isPaused)}
            aria-label={isPaused ? 'Putar kembali galeri aktivitas' : 'Jeda galeri aktivitas'}
            aria-pressed={isPaused}
          >
            {isPaused ? <Play size={16} aria-hidden="true" /> : <Pause size={16} aria-hidden="true" />}
            <span>{isPaused ? 'Putar' : 'Jeda'}</span>
          </button>
        </motion.div>

        <div className={`marquee-wrap ${isPaused ? 'marquee-paused' : ''}`}>
          <div className="marquee-track">
            {[...activityItems, ...activityItems].map((item, index) => (
              <motion.article key={`${item.title}-${index}`} initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true, amount: 0.25 }} transition={{ delay: index * 0.04, duration: 0.55 }} className="activity-card">
                <img src={item.image} alt={item.title} className="activity-image" loading="lazy" />
                <div className="activity-body">
                  <h3>{item.title}</h3>
                  <p>{item.caption}</p>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

function AdvantageSection() {
  return (
    <section id="keunggulan" className="section-shell warm-shell">
      <div className="wrap">
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }} variants={reveal} className="section-header compact-header">
          <p className="eyebrow dark-text">Why us</p>
          <h2 className="section-title">Lebih dari pasar. Sebuah ekosistem yang terus tumbuh.</h2>
        </motion.div>

        <div className="advantage-grid">
          {advantages.map((item, index) => {
            const Icon = item.icon
            return (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.25 }}
                transition={{ delay: index * 0.08, duration: 0.5 }}
                className="advantage-card"
              >
                <div className="advantage-icon">
                  <Icon size={20} />
                </div>
                <h3>{item.title}</h3>
                <p>{item.description}</p>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

function ContactSection() {
  return (
    <section id="kontak" className="section-shell contact-shell">
      <div className="wrap contact-layout">
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }} variants={reveal}>
          <p className="eyebrow eyebrow-light">Kontak</p>
          <h2 className="section-title contact-title">Ada ruang untuk tumbuh bersama.</h2>
          <p className="contact-summary">
            Hubungi tim Pasar Induk Sidotopo untuk informasi kawasan, fasilitas, dan peluang kerja sama.
          </p>

          <div className="contact-list">
            {contactDetails.map(({ icon: Icon, label, value, href }) => (
              <div key={label} className="contact-item">
                <span className="contact-icon">
                  <Icon size={19} />
                </span>
                <div>
                  <p className="mini-label light-label">{label}</p>
                  {href ? (
                    <a className="contact-text" href={href}>{value}</a>
                  ) : (
                    <p className="contact-text">{value}</p>
                  )}
                </div>
              </div>
            ))}
          </div>

          <a href={`mailto:${marketEmail}`} className="primary-button tertiary-button">
            Hubungi Kami
            <ArrowRight size={16} />
          </a>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, amount: 0.2 }}
          className="map-card"
        >
          <div className="map-image-wrap">
            <img src={marketImages.marketStalls} alt="Area perdagangan bahan pangan" loading="lazy" />
          </div>
          <div className="map-meta">
            <div>
              <p className="mini-label light-label"><MapPin size={13} aria-hidden="true" /> Temukan kami</p>
              <p className="map-title">Pasar Induk Surabaya Sidotopo</p>
            </div>
            <a href={mapsUrl} target="_blank" rel="noreferrer" className="map-action">
              <MapPin size={15} aria-hidden="true" />
              Maps
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

function Footer() {
  return (
    <footer className="site-footer">
      <div className="footer-grid wrap">
        <div>
          <div className="brand-wrap footer-brand">
            <span className="brand-mark">P</span>
            <span className="brand-name">Pasar Induk Surabaya Sidotopo</span>
          </div>
          <p className="footer-copy">
            Ruang niaga Sidotopo—tempat komoditas, pelaku usaha, dan kehidupan kota saling terhubung.
          </p>
        </div>

        <div>
          <p className="footer-label">Navigasi</p>
          <div className="footer-links">
            {navItems.map((item) => (
              <a key={item.href} href={item.href}>
                {item.label}
              </a>
            ))}
          </div>
        </div>

        <div>
          <p className="footer-label">Kontak</p>
          <div className="footer-contact">
            <p>{marketAddress}</p>
            <p><a href={`tel:${marketPhone}`}>+62 852 2505 7885</a></p>
            <p><a href={`mailto:${marketEmail}`}>{marketEmail}</a></p>
          </div>
          <div className="footer-social-links" aria-label="Media sosial">
            {socialLinks.map(({ label, href }) => (
              <a key={label} href={href} target="_blank" rel="noreferrer">
                {label}
              </a>
            ))}
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <div className="wrap footer-bottom-inner">
          <p>© {new Date().getFullYear()} Pasar Induk Surabaya Sidotopo.</p>
          <p>Pasar Induk Surabaya Sidotopo · Perdagangan yang menghidupi kota.</p>
        </div>
      </div>
    </footer>
  )
}

export default App
