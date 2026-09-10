import { aboutService } from '../lib/api'
import type { AboutData } from '../types/index'

export async function getAbout(): Promise<AboutData | null> {
  try {
    return await aboutService.get(true) // Get published about content
  } catch (error) {
    console.error('Error fetching about data:', error)
    return null
  }
}
