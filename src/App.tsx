import { useEffect, useState } from 'react'
import { getAbout } from './api/about'
import { getArticles } from './api/articles'
import { getContact } from './api/contact'
import { getEvents } from './api/events'
import { getExperiences } from './api/experience'
import { getExternalLinks } from './api/external-links'
import { About } from './components/About'
import { Events } from './components/Events'
import { Experience } from './components/Experience'
import { Contact } from './components/Contact'
import { Footer } from './components/Footer'
import { Header } from './components/Header'
import { Publications } from './components/Publications'
import type { AboutData, ArticleData, ContactData, EventData, ExperienceData, ExternalLinkItem } from './types/strapi'

function App() {
  const [about, setAbout] = useState<AboutData | null>(null)
  const [contact, setContact] = useState<ContactData | null>(null)
  const [articles, setArticles] = useState<ArticleData[]>([])
  const [events, setEvents] = useState<EventData[]>([])
  const [experiences, setExperiences] = useState<ExperienceData[]>([])
  const [links, setLinks] = useState<ExternalLinkItem[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function loadData() {
      try {
        const [aboutData, articleData, eventData, experienceData, linkData, contactData] = await Promise.all([
          getAbout(),
          getArticles(),
          getEvents(),
          getExperiences(),
          getExternalLinks(),
          getContact(),
        ])

        setAbout(aboutData)
        setArticles(articleData)
        setEvents(eventData)
        setExperiences(experienceData)
        setLinks(linkData?.links ?? [])
        setContact(contactData)
      } catch (err) {
        console.error(err)
        setError('The portfolio data could not be loaded. Please check your connection and try again.')
      } finally {
        setLoading(false)
      }
    }

    void loadData()
  }, [])

  if (loading) {
    return (
      <div className="min-h-screen bg-[#151515] px-4 py-16 text-center text-[#9da5b2]">
        Loading data...
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#151515] text-[#c6c8ce]">
      <Header />
      {error ? (
        <div className="mx-auto max-w-[1400px] px-4 py-8 text-sm text-[#f15a24]">
          {error}
        </div>
      ) : null}

      <main>
        <About about={about} links={links} />
        <Publications articles={articles} />
        <Events events={events} />
        <Experience experiences={experiences} />
        <Contact contact={contact} links={links} />
      </main>

      <Footer />
    </div>
  )
}

export default App
