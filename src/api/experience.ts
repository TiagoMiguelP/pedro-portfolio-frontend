import { experiencesService } from '../lib/api'
import type { ExperienceData } from '../types/index'

export async function getExperiences(): Promise<ExperienceData[]> {
  try {
    const experiences = await experiencesService.getAll()
    return experiences.filter(e => e.published).sort((a, b) => {
      const dateA = new Date(a.start_date).getTime()
      const dateB = new Date(b.start_date).getTime()
      return dateB - dateA
    })
  } catch (error) {
    console.error('Error fetching experiences:', error)
    return []
  }
}
