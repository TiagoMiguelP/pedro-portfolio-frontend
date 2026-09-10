import { contactService } from '../lib/api'
import type { ContactData } from '../types/index'

export async function getContact(): Promise<ContactData | null> {
  try {
    return await contactService.get(true)
  } catch (error) {
    console.error('Error fetching contact data:', error)
    return null
  }
}