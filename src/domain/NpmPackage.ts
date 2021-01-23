// Libraries
import axios from 'axios'

/**
 * API Documentation
 * https://github.com/npm/registry/blob/master/docs/download-counts.md
 */

const api = axios.create({
  baseURL: 'https://api.npmjs.org/downloads/',
})

interface CountResult {
  downloads: number
  start: string
  end: string
}

export default class NpmPackage {
  constructor(readonly name: string) {}

  async getLastWeekDownloads(): Promise<CountResult> {
    const { data } = await api.get(`point/last-week/${this.name}`)
    return {
      downloads: data.downloads,
      start: data.start,
      end: data.end,
    }
  }
}
