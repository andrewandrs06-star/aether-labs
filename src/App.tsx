import { useTranslation } from 'react-i18next'
import { motion } from 'framer-motion'
import { useEffect, useRef, memo, useState } from 'react'
import Hls from 'hls.js'
import logo from '../image.png'
import macPreview from '../image copy.png'
import instagramIcon from './assets/instagram.png'
import whatsappIcon from './assets/whatsapp.png'

const VideoPlayer = () => {
  const videoRef = useRef<HTMLVideoElement>(null)
  const [hasError, setHasError] = useState(false)

  useEffect(() => {
    if (!videoRef.current) return

    const video = videoRef.current
    const handleVideoError = () => setHasError(true)
    video.addEventListener('error', handleVideoError)

    if (Hls.isSupported()) {
      const hls = new Hls()
      hls.loadSource('https://stream.mux.com/9JXDljEVWYwWu01PUkAemafDugK89o01BR6zqJ3aS9u00A.m3u8')
      hls.attachMedia(video)

      hls.on(Hls.Events.ERROR, (_event, data) => {
        if (data.fatal) {
          setHasError(true)
          hls.destroy()
        }
      })

      return () => {
        video.removeEventListener('error', handleVideoError)
        hls.destroy()
      }
    }

    return () => video.removeEventListener('error', handleVideoError)
  }, [])

  if (hasError) {
    return <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-slate-950 to-black" />
  }

  return (
    <video
      ref={videoRef}
      autoPlay
      muted
      loop
      playsInline
      className="absolute bottom-[35vh] h-[80vh] w-full object-cover"
    />
  )
}

const MemoizedVideoPlayer = memo(VideoPlayer)

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.2
    }
  }
}

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8 } }
}

function App() {
  const { t, i18n } = useTranslation()
  const [activeFaqIndex, setActiveFaqIndex] = useState<number | null>(null)
  const faqItems = t('faq.questions', { returnObjects: true }) as string[]
  const faqAnswers = t('faq.answers', { returnObjects: true }) as string[]
  const featureSection = t('featureSection', { returnObjects: true }) as {
    label: string
    title: string
    description: string
    cards: Array<{ title: string; description: string; icon: string }>
  }
  const smartExamSection = t('smartExam', { returnObjects: true }) as {
    label: string
    title: string
    description: string
    cards: Array<{ title: string; description: string }>
    imageLabels: string[]
  }
  const sessionPanel = t('sessionPanel', { returnObjects: true }) as {
    title: string
    startedAt: string
    attempt: string
    attemptValue: string
    actions: string[]
    actionsTitle: string
  }
  const howItWorksSection = t('howItWorks', { returnObjects: true }) as {
    label: string
    title: string
    description: string
    cards: Array<{ title: string; description: string; icon: string }>
  }
  const reviewLogos = [
    { src: 'https://vectorseek.com/wp-content/uploads/2023/08/Universidad-Anahuac-del-Mayab-Logo-Vector.svg-.png', alt: 'Universidad Anahuac del Mayab' },
    { src: 'https://images.credly.com/images/b8e6d134-79fe-4f11-a50c-309463334760/blob.png', alt: 'Tecmilenio' },
    { src: 'https://cdn.freelogovectors.net/wp-content/uploads/2020/01/tecnologico-de-monterrey-logo.png', alt: 'Tecnológico de Monterrey' },
    { src: 'https://logos-world.net/wp-content/uploads/2020/12/Harvard-Logo.png', alt: 'Harvard University' },
    { src: 'https://logos-world.net/wp-content/uploads/2022/02/University-of-Texas-at-Austin-Logo.png', alt: 'UT Austin' },
    { src: 'https://media.discordapp.net/attachments/1458947385571938349/1500566979965092001/1859054-removebg-preview.png?ex=69f8e767&is=69f795e7&hm=49202da1a684185ceca763e54727017b8170e727033690940e8f06f713ecd222&=&format=webp&quality=lossless&width=942&height=1283', alt: 'Arizona State University' }
  ]

  return (
    <div className="relative w-full bg-black text-white">
      {/* Navbar */}
      <div className="fixed top-0 w-full backdrop-blur-md bg-transparent border-b border-white/10 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4 gap-8">
            {/* Logo */}
            <div className="flex items-center gap-2 shrink-0">
              <img src={logo} alt="Aether Labs logo" className="w-12 h-12 object-contain" />
              <span className="text-white font-bold tracking-tight text-xl">Aether Labs</span>
            </div>
            {/* Navigation Center */}
            <nav className="flex space-x-12 items-center flex-1 justify-center">
              <a href="#home" className="text-white hover:text-gray-300 transition text-sm">Home</a>
              <a href="#features" className="text-white hover:text-gray-300 transition text-sm">{t('nav.features')}</a>
              <a href="#pricing" className="text-white hover:text-gray-300 transition text-sm">{t('nav.pricing')}</a>
              <a href="#changelog" className="text-white hover:text-gray-300 transition text-sm">{t('nav.changelog')}</a>
              <a href="#downloads" className="text-white hover:text-gray-300 transition text-sm">{t('nav.download')}</a>
              <a href="#contact" className="text-white hover:text-gray-300 transition text-sm">{t('nav.contact')}</a>
              <a href="#faq" className="text-white hover:text-gray-300 transition text-sm">{t('nav.faq')}</a>
            </nav>
            {/* Right Section */}
            <div className="flex items-center gap-4 shrink-0">
              {/* Language Selector */}
              <div className="flex gap-2 border border-white/20 rounded-lg p-1">
                <button
                  onClick={() => i18n.changeLanguage('es')}
                  className={`px-3 py-1 rounded transition text-xs ${i18n.language === 'es' ? 'bg-white/20 text-white' : 'text-gray-400 hover:text-white'}`}
                >
                  ES
                </button>
                <button
                  onClick={() => i18n.changeLanguage('en')}
                  className={`px-3 py-1 rounded transition text-xs ${i18n.language === 'en' ? 'bg-white/20 text-white' : 'text-gray-400 hover:text-white'}`}
                >
                  EN
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Hero Section */}
      <div id="home" className="relative min-h-screen bg-black overflow-hidden pt-20">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="relative z-10 flex flex-col items-center justify-center min-h-screen text-center px-4 pt-20"
        >
          <motion.div variants={itemVariants} className="flex flex-wrap justify-center gap-3 mb-8">
            <span className="inline-flex items-center rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs uppercase tracking-[0.24em] text-slate-200">
              Powered by ChatGPT
            </span>
            <span className="inline-flex items-center rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs uppercase tracking-[0.24em] text-slate-200">
              Offline
            </span>
            <span className="inline-flex items-center rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs uppercase tracking-[0.24em] text-slate-200">
              Privacy
            </span>
          </motion.div>

          <motion.h1
            variants={itemVariants}
            className="text-5xl md:text-7xl lg:text-8xl font-semibold tracking-tight text-white mb-6 leading-tight"
          >
            {t('hero.title')
              .split('\n')
              .map((line, index) => (
                <span key={index} className="block">
                  {line}
                </span>
              ))}
          </motion.h1>

          <motion.p
            variants={itemVariants}
            className="text-lg md:text-xl text-slate-300 mb-10 max-w-3xl mx-auto leading-relaxed"
          >
            {t('hero.description')}
          </motion.p>

          <motion.div
            variants={itemVariants}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <a href="#downloads" className="inline-flex items-center justify-center bg-white text-black px-10 py-4 rounded-full font-semibold shadow-lg shadow-black/20 transition hover:scale-[1.01]">
              {t('downloads.windows')}
            </a>
            <a href="#downloads" className="inline-flex items-center justify-center border border-white/20 bg-white/5 text-white px-10 py-4 rounded-full font-semibold transition hover:bg-white/10">
              {t('downloads.mac')}
            </a>
          </motion.div>

        </motion.div>

        {/* Logo Marquee */}
        <div className="absolute bottom-0 w-full bg-black py-8 border-t border-white/10">
          <div className="flex justify-center items-center space-x-12 opacity-40">
            <svg className="w-12 h-12 text-white" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>
            </svg>
            <svg className="w-12 h-12 text-white" fill="currentColor" viewBox="0 0 24 24">
              <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/>
            </svg>
            <svg className="w-12 h-12 text-white" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 0C5.374 0 0 5.373 0 12 0 18.627 5.374 24 12 24c6.627 0 12-5.373 12-12C24 5.373 18.627 0 12 0zm5.568 8.16c-.113.254-.254.475-.424.662-.169.187-.354.347-.555.479-.2.132-.418.235-.653.308-.235.073-.486.11-.752.11-.266 0-.517-.037-.752-.11-.235-.073-.453-.176-.653-.308-.2-.132-.386-.292-.555-.479-.169-.187-.311-.408-.424-.662-.113-.254-.17-.53-.17-.83 0-.3.057-.576.17-.83.113-.254.255-.475.424-.662.169-.187.355-.347.555-.479.2-.132.418-.235.653-.308.235-.073.486-.11.752-.11.266 0 .517.037.752.11.235.073.453.176.653.308.2.132.386.292.555.479.169.187.311.408.424.662.113.254.17.53.17.83 0 .3-.057.576-.17.83z"/>
            </svg>
          </div>
        </div>

        {/* Background Video */}
        <MemoizedVideoPlayer />
      </div>

      <section id="features" className="w-full py-24 px-4 bg-black">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between mb-12">
            <div className="max-w-3xl">
              <p className="text-sm uppercase tracking-[0.35em] text-slate-400 mb-4">{featureSection.label}</p>
              <h2 className="text-5xl md:text-6xl font-semibold tracking-tight text-white leading-tight">
                {featureSection.title}
              </h2>
              <p className="mt-4 max-w-2xl text-base text-slate-300">
                {featureSection.description}
              </p>
            </div>
            <div className="flex items-center gap-3">
              <button className="h-12 px-5 rounded-full border border-white/10 bg-white/5 text-white transition hover:bg-white/10">←</button>
              <button className="h-12 px-5 rounded-full border border-white/10 bg-white/10 text-white transition hover:bg-white/15">→</button>
            </div>
          </div>

          <div className="grid gap-6 xl:grid-cols-3 mb-24">
            {featureSection.cards.map((feature, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="group rounded-[2rem] border border-white/10 bg-white/5 p-8 shadow-[0_30px_60px_rgba(0,0,0,0.25)] hover:border-white/20 hover:bg-white/10 transition min-h-[320px]"
              >
                <div className="flex h-16 w-16 items-center justify-center rounded-3xl bg-white/10 mb-6 transition group-hover:bg-white/15">
                  <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d={feature.icon} />
                  </svg>
                </div>
                <h3 className="text-2xl font-semibold text-white mb-3">{feature.title}</h3>
                <p className="text-slate-400 leading-7">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section id="smartExam" className="w-full py-24 bg-black">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] mb-24 items-center">
            <div className="space-y-8">
              <span className="text-sm uppercase tracking-[0.35em] text-slate-400">{smartExamSection.label}</span>
              <h3 className="text-5xl md:text-6xl font-semibold text-white leading-tight">
                {smartExamSection.title}
              </h3>
              <p className="text-slate-300 max-w-xl leading-8">
                {smartExamSection.description}
              </p>
              <div className="grid gap-4 sm:grid-cols-2">
                {smartExamSection.cards.map((card, idx) => (
                  <div key={idx} className="rounded-[1.75rem] border border-white/10 bg-black/30 p-6">
                    <p className="text-sm uppercase tracking-[0.25em] text-slate-400 mb-3">{card.title}</p>
                    <p className="text-slate-300 leading-6">{card.description}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-black/60 min-h-[420px] p-8">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(255,255,255,0.08),transparent_30%),radial-gradient(circle_at_bottom_right,rgba(255,255,255,0.03),transparent_20%)]" />
              <div className="relative z-10 h-full w-full rounded-[2rem] border border-white/10 bg-white/5 backdrop-blur-xl p-8 shadow-[0_40px_80px_rgba(0,0,0,0.25)]">
                <div className="space-y-8 h-full">
                  <div className="space-y-4">
                    <div className="text-sm uppercase tracking-[0.35em] text-slate-300/80">{sessionPanel.title}</div>
                    <div className="rounded-[1.75rem] border border-white/10 bg-black/30 p-6 backdrop-blur-xl">
                      <div className="flex flex-wrap gap-3 text-sm text-slate-200">
                        <span className="font-medium text-white">{sessionPanel.startedAt}</span>
                        <span>{t('sessionPanel.startedAtValue')}</span>
                      </div>
                      <div className="mt-4 flex flex-wrap items-center gap-3">
                        <span className="font-medium text-white">{sessionPanel.attempt}</span>
                        <span className="rounded-md bg-white/10 px-3 py-1 text-sm text-slate-100">{sessionPanel.attemptValue}</span>
                      </div>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <h4 className="text-3xl font-semibold text-white">{sessionPanel.actionsTitle}</h4>
                    <div className="rounded-[1.75rem] border border-white/10 bg-black/25 p-6 backdrop-blur-xl">
                      <div className="space-y-4">
                        {(sessionPanel.actions as string[]).map((text, idx) => (
                          <div key={idx} className="flex items-start gap-4 text-slate-200">
                            <span className="w-16 text-sm font-medium text-slate-400">{['00:01','00:16','00:18','00:30','00:31','00:35'][idx]}</span>
                            <span className="mt-1 h-3 w-3 rounded-full border border-white/20 bg-slate-800" />
                            <p className="text-sm leading-6 text-slate-300">{text}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="grid gap-16 lg:grid-cols-[0.75fr_1.25fr] mb-20 items-start">
            <div className="max-w-xl">
              <p className="text-sm uppercase tracking-[0.35em] text-slate-400 mb-4">{howItWorksSection.label}</p>
              <h3 className="text-5xl md:text-6xl font-semibold text-white leading-tight">
                {howItWorksSection.title}
              </h3>
              <p className="text-slate-300 leading-8 mt-6">
                {howItWorksSection.description}
              </p>
            </div>
            <div className="space-y-6">
              {howItWorksSection.cards.map((info, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                  className="rounded-[2rem] border border-white/10 bg-white/5 p-8 shadow-[0_30px_60px_rgba(0,0,0,0.25)]"
                >
                  <div className="flex h-16 w-16 items-center justify-center rounded-3xl bg-white/10 mb-6">
                    <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
                      <path d={info.icon} />
                    </svg>
                  </div>
                  <h4 className="text-2xl font-semibold text-white mb-3">{info.title}</h4>
                  <p className="text-slate-400 leading-7">{info.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section id="reviews" className="w-full py-24 bg-black">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <p className="text-sm uppercase tracking-[0.35em] text-slate-400 mb-4">{t('reviews.label')}</p>
            <h2 className="text-5xl md:text-6xl font-semibold tracking-tight text-white leading-tight">
              {t('reviews.title')}
            </h2>
            <p className="mt-4 text-slate-300 max-w-2xl mx-auto leading-8">
              {t('reviews.description')}
            </p>
          </div>

          <div className="relative overflow-hidden mb-16">
            <div className="absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-black to-transparent pointer-events-none" />
            <div className="absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-black to-transparent pointer-events-none" />
            <motion.div
              className="flex gap-16 py-6"
              animate={{ x: ['-50%', '0%'] }}
              transition={{ duration: 24, ease: 'linear', repeat: Infinity }}
            >
              {reviewLogos.concat(reviewLogos).map((logo, idx) => (
                <div key={idx} className="flex-shrink-0 transition hover:scale-[1.08]">
                  <img src={logo.src} alt={logo.alt} className="h-32 md:h-36 lg:h-40 w-auto object-contain" />
                </div>
              ))}
            </motion.div>
          </div>

          <div className="grid gap-6 xl:grid-cols-3">
            {(t('reviews.cards', { returnObjects: true }) as Array<{ name: string; school: string; date: string; text: string }> ).map((review, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.08 }}
                className="group rounded-[2rem] border border-white/10 bg-white/5 p-8 shadow-[0_30px_60px_rgba(0,0,0,0.25)] hover:border-white/20 hover:bg-white/10 transition"
              >
                <div className="flex items-center justify-between gap-4 mb-6">
                  <div>
                    <p className="text-lg font-semibold text-white">{review.name}</p>
                    <p className="text-sm text-slate-400">{review.school}</p>
                  </div>
                  <div className="text-sm uppercase tracking-[0.25em] text-slate-400">{review.date}</div>
                </div>
                <div className="flex items-center gap-1 mb-6 text-amber-400">
                  {Array.from({ length: 5 }).map((_, star) => (
                    <span key={star}>★</span>
                  ))}
                </div>
                <p className="text-slate-300 leading-7">{review.text}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="relative w-full py-28 px-4 bg-black overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(255,255,255,0.06),transparent_22%),radial-gradient(circle_at_bottom_right,_rgba(255,255,255,0.08),transparent_18%)] pointer-events-none" />
        <div className="absolute inset-x-0 top-10 md:top-12 lg:top-16 flex justify-center pointer-events-none">
          <span className="whitespace-nowrap text-[9rem] md:text-[12rem] lg:text-[16rem] xl:text-[20rem] font-semibold uppercase tracking-[-0.1em] text-white leading-[0.8] select-none z-10">
            {t('pricing.title')}
          </span>
        </div>

        <div className="relative max-w-7xl mx-auto pt-24">
          <div className="relative z-20 grid gap-8 md:grid-cols-3">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="group relative overflow-hidden rounded-[2rem] border border-white/15 bg-white/10 backdrop-blur-[32px] p-8 shadow-[0_24px_70px_rgba(0,0,0,0.25)] hover:bg-white/15 transition"
            >
              <div className="pointer-events-none absolute inset-x-8 top-8 h-24 rounded-[1.5rem] bg-gradient-to-b from-white/15 to-transparent" />
              <div className="pointer-events-none absolute -top-10 -left-8 h-40 w-40 rounded-full bg-white/10 blur-3xl" />
              <p className="relative z-10 text-sm uppercase tracking-[0.35em] text-white font-semibold mb-6">{t('pricing.extension.title')}</p>
              <h3 className="relative z-10 text-4xl font-semibold text-white mb-1">{t('pricing.extension.price')}</h3>
              <p className="relative z-10 text-sm uppercase tracking-[0.25em] text-gray-400 mb-4">{t('pricing.perMonth')}</p>
              <p className="relative z-10 text-sm text-gray-400 mb-4">≈ $11.50 USD</p>
              <p className="relative z-10 text-sm text-gray-300 mb-8">{t('pricing.extension.description')}</p>
              <ul className="relative z-10 space-y-3 mb-8 text-gray-300">
                {(t('pricing.extension.features', { returnObjects: true }) as string[]).map((item, idx) => (
                  <li key={idx} className="flex items-center gap-3">
                    <span className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-white/10 text-white">✓</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <a href="#contact" className="relative z-10 inline-flex w-full justify-center rounded-full border border-white/15 bg-black/40 px-6 py-3 text-white transition hover:bg-white/10">
                {t('pricing.buy')}
              </a>
              <p className="relative z-10 text-sm text-gray-400 mt-4">{t('pricing.contactForBuy')}</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="group relative overflow-hidden rounded-[2rem] border border-white/20 bg-white/10 backdrop-blur-[32px] p-8 shadow-[0_30px_80px_rgba(0,0,0,0.35)] hover:bg-white/20 transition"
            >
              <div className="pointer-events-none absolute inset-x-8 top-8 h-24 rounded-[1.5rem] bg-gradient-to-b from-white/15 to-transparent" />
              <div className="pointer-events-none absolute -top-10 left-1/2 h-64 w-64 -translate-x-1/2 rounded-full bg-white/15 blur-3xl" />
              <div className="pointer-events-none absolute -bottom-10 right-6 h-36 w-36 rounded-full bg-white/10 blur-3xl" />
              <p className="relative z-10 text-sm uppercase tracking-[0.35em] text-white font-semibold mb-6">{t('pricing.application.title')}</p>
              <h3 className="relative z-10 text-5xl font-semibold text-white mb-1">{t('pricing.application.price')}</h3>
              <p className="relative z-10 text-sm uppercase tracking-[0.25em] text-gray-400 mb-4">{t('pricing.perMonth')}</p>
              <p className="relative z-10 text-sm text-gray-400 mb-4">≈ $14.50 USD</p>
              <p className="relative z-10 text-sm text-gray-300 mb-8">{t('pricing.application.description')}</p>
              <ul className="relative z-10 space-y-3 mb-8 text-gray-200">
                {(t('pricing.application.features', { returnObjects: true }) as string[]).map((item, idx) => (
                  <li key={idx} className="flex items-center gap-3">
                    <span className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-white/15 text-white">✓</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <a href="#contact" className="relative z-10 inline-flex w-full justify-center rounded-full bg-white px-6 py-4 text-black font-semibold transition hover:bg-slate-200">
                {t('pricing.buy')}
              </a>
              <p className="relative z-10 text-sm text-gray-400 mt-4">{t('pricing.contactForBuy')}</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="group relative overflow-hidden rounded-[2rem] border border-white/15 bg-white/10 backdrop-blur-[32px] p-8 shadow-[0_24px_70px_rgba(0,0,0,0.25)] hover:bg-white/15 transition"
            >
              <div className="pointer-events-none absolute inset-x-8 top-8 h-24 rounded-[1.5rem] bg-gradient-to-b from-white/15 to-transparent" />
              <div className="pointer-events-none absolute -top-10 -right-6 h-40 w-40 rounded-full bg-white/10 blur-3xl" />
              <p className="relative z-10 text-sm uppercase tracking-[0.35em] text-white font-semibold mb-6">{t('pricing.pro.title')}</p>
              <h3 className="relative z-10 text-4xl font-semibold text-white mb-1">{t('pricing.pro.price')}</h3>
              <p className="relative z-10 text-sm uppercase tracking-[0.25em] text-gray-400 mb-4">{t('pricing.perMonth')}</p>
              <p className="relative z-10 text-sm text-gray-400 mb-4">≈ $22.90 USD</p>
              <p className="relative z-10 text-sm text-gray-400 mb-8">{t('pricing.pro.description')}</p>
              <ul className="relative z-10 space-y-3 mb-8 text-gray-300">
                {(t('pricing.pro.features', { returnObjects: true }) as string[]).map((item, idx) => (
                  <li key={idx} className="flex items-center gap-3">
                    <span className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-white/10 text-white">✓</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <a href="#contact" className="relative z-10 inline-flex w-full justify-center rounded-full border border-white/15 bg-black/40 px-6 py-3 text-white transition hover:bg-white/10">
                {t('pricing.buy')}
              </a>
              <p className="relative z-10 text-sm text-gray-400 mt-4">{t('pricing.contactForBuy')}</p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Changelog/Updates Section */}
      <section id="changelog" className="w-full py-20 px-4 bg-black">
        <div className="max-w-6xl mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-5xl font-bold text-center mb-16"
          >
            {t('changelog.title')}
          </motion.h2>
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {[
              { version: 'v1.0.0', date: 'April 2026', features: [t('changelog.features.0'), t('changelog.features.1'), t('changelog.features.2')] },
              { version: 'v1.1.0', date: 'Coming Soon', features: [t('changelog.features.3'), t('changelog.features.4'), t('changelog.features.5')] }
            ].map((update, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.2 }}
                className="bg-white/10 backdrop-blur-xl border border-white/20 shadow-xl shadow-black/20 rounded-2xl p-8 hover:bg-white/15 hover:border-white/30 transition"
              >
                <div className="mb-4">
                  <h3 className="text-2xl font-bold text-white">{update.version}</h3>
                  <p className="text-sm text-gray-400">{update.date}</p>
                </div>
                <ul className="space-y-3">
                  {update.features.map((feature, fidx) => (
                    <li key={fidx} className="flex items-start gap-3 text-gray-300">
                      <div className="w-2 h-2 rounded-full bg-white mt-2 flex-shrink-0" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Downloads Section */}
      <section id="downloads" className="w-full py-20 px-4 bg-black">
        <div className="max-w-6xl mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-5xl font-bold text-center mb-16"
          >
            {t('downloads.title')}
          </motion.h2>
          <div className="grid md:grid-cols-2 gap-8">
            {/* Windows Download */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="bg-white/10 backdrop-blur-xl border border-white/20 shadow-xl shadow-black/20 rounded-2xl p-8 hover:bg-white/15 hover:border-white/30 transition"
            >
              <div className="flex items-center gap-4 mb-6">
                <svg className="w-12 h-12 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M11.4 24H0V12.6h11.4V24zM24 24H12.6V12.6H24V24zM11.4 11.4H0V0h11.4v11.4zm12.6 0H12.6V0H24v11.4z"/>
                </svg>
                <h3 className="text-2xl font-bold">Windows</h3>
              </div>
              <p className="text-gray-300 mb-6">{t('downloads.windowsDesc')}</p>
              <a
                href="#"
                download
                className="inline-block bg-white text-black px-8 py-3 rounded-lg font-medium hover:bg-white/90 transition"
              >
                {t('downloads.windows')}
              </a>
            </motion.div>

            {/* Mac Download */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="bg-white/10 backdrop-blur-xl border border-white/20 shadow-xl shadow-black/20 rounded-2xl p-8 hover:bg-white/15 hover:border-white/30 transition"
            >
              <div className="flex items-center gap-4 mb-6">
                <img src={macPreview} alt="Apple logo" className="w-12 h-12 object-contain" />
                <h3 className="text-2xl font-bold">macOS</h3>
              </div>
              <p className="text-gray-300 mb-6">{t('downloads.macDesc')}</p>
              <button
                onClick={() => window.open('https://github.com/andrewandrs06-star/aether-labs/releases/tag/v1.0', '_blank')}
                className="inline-block bg-gray-600 text-white px-8 py-3 rounded-lg font-medium hover:bg-gray-700 transition cursor-pointer"
              >
                {t('downloads.mac')}
              </button>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="w-full py-20 px-4 bg-black">
        <div className="max-w-4xl mx-auto text-center">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-5xl font-bold mb-6"
          >
            {t('contact.title')}
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-gray-300 text-lg mb-12"
          >
            {t('contact.description')}
          </motion.p>
          
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="flex flex-col md:flex-row gap-8 justify-center items-center"
          >
            <a
              href="https://www.instagram.com/ryuu_tatsu12/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex flex-col items-center gap-4 bg-white/10 backdrop-blur-xl border border-white/20 shadow-xl shadow-black/20 rounded-2xl p-12 hover:bg-white/15 hover:border-white/30 transition group w-full md:w-auto"
            >
              <img src={instagramIcon} alt="Instagram" className="w-16 h-16 group-hover:scale-110 transition" />
              <div>
                <p className="text-xl font-semibold text-white">{t('contact.instagramHandle')}</p>
                <p className="text-sm text-gray-400 mt-1">{t('contact.instagram')}</p>
              </div>
            </a>
            <a
              href="https://wa.me/message/OEKPQCMS7342I1"
              target="_blank"
              rel="noopener noreferrer"
              className="flex flex-col items-center gap-4 bg-white/10 backdrop-blur-xl border border-white/20 shadow-xl shadow-black/20 rounded-2xl p-12 hover:bg-white/15 hover:border-white/30 transition group w-full md:w-auto"
            >
              <img src={whatsappIcon} alt="WhatsApp" className="w-16 h-16 group-hover:scale-110 transition" />
              <div>
                <p className="text-xl font-semibold text-white">WhatsApp</p>
                <p className="text-sm text-gray-400 mt-1">{t('contact.whatsapp')}</p>
              </div>
            </a>
          </motion.div>
        </div>
      </section>

      {/* FAQ Section */}
      <section id="faq" className="w-full py-20 px-4 bg-black">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-3xl mx-auto text-center mb-16"
          >
            <h2 className="text-5xl font-bold mb-4">{t('faq.title')}</h2>
            <p className="text-gray-400 text-lg">{t('faq.description')}</p>
          </motion.div>

          <div className="grid gap-4">
            {faqItems.map((question, idx) => {
              const isActive = activeFaqIndex === idx

              return (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.05 }}
                  layout
                  className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-6 hover:bg-white/10 transition"
                  onClick={() => setActiveFaqIndex(isActive ? null : idx)}
                >
                  <div className="flex items-center justify-between gap-4 mb-4 cursor-pointer">
                    <div className="flex items-center gap-4">
                      <span className="text-sm text-gray-400">0{idx + 1}</span>
                      <p className="text-lg font-medium text-white">{question}</p>
                    </div>
                    <div className="text-white text-2xl font-bold">{isActive ? '−' : '+'}</div>
                  </div>
                  {isActive && (
                    <motion.div
                      initial={{ opacity: 0, height: 0, y: -10 }}
                      animate={{ opacity: 1, height: 'auto', y: 0 }}
                      exit={{ opacity: 0, height: 0, y: -10 }}
                      transition={{ duration: 0.4, ease: 'easeInOut' }}
                      className="overflow-hidden text-gray-300 text-base leading-relaxed pl-8"
                    >
                      <div className="py-2">{faqAnswers[idx]}</div>
                    </motion.div>
                  )}
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="w-full py-12 px-4 border-t border-white/10 bg-black">
        <div className="max-w-6xl mx-auto text-center text-gray-400">
          <p>&copy; 2026 Aether Labs. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}

export default App
