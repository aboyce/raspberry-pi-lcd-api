// Libraries
import axios from 'axios'

// Errors
import { RequestError } from '../middleware/errorMiddleware'

// Config
import { COIN_MARKET_CAP_API_KEY } from '../../config/api.json'

class CryptoNotFound extends RequestError {
  constructor() {
    super(404, 'Crypto does not exist')
  }
}

const PRICE_GBP = 2791

function formatPrice(price: number): string {
  return parseFloat(price.toFixed(2)).toLocaleString()
}

function formatPercent(percent: number): string {
  const isPositive = Math.sign(percent) === 1
  return `${isPositive ? '+' : ''}${percent.toFixed(2)}%`
}

const api = axios.create({
  headers: {
    'X-CMC_PRO_API_KEY': COIN_MARKET_CAP_API_KEY,
  },
  baseURL: 'https://pro-api.coinmarketcap.com/v1/cryptocurrency/',
})

interface ApiResponse {
  data: {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    [key: string]: any
  }
}

interface SummaryResult {
  name: string
  symbol: string
  price: string
  percentChange24h: string
  percentChange7d: string
}

async function getQuotesLatest(url: string): Promise<SummaryResult> {
  try {
    const { data } = await api.get<ApiResponse>(url)
    const crytoData = Object.values(data.data)[0] // first (only) result
    const priceData = crytoData.quote[PRICE_GBP] // get the price for the (only) currency
    return {
      name: crytoData.name,
      symbol: crytoData.symbol,
      price: formatPrice(priceData.price),
      percentChange24h: formatPercent(priceData.percent_change_24h),
      percentChange7d: formatPercent(priceData.percent_change_7d),
    }
  } catch (error) {
    if (error.response?.status === 400) {
      throw new CryptoNotFound()
    }
    throw error
  }
}

export default class Crypto {
  constructor(readonly name: string) {
    if (!COIN_MARKET_CAP_API_KEY) {
      throw new Error('Server is not configured for Crypto module')
    }
  }

  async getSummary(): Promise<SummaryResult> {
    return getQuotesLatest(`quotes/latest?convert_id=${PRICE_GBP}&slug=${this.name}`)
  }
}
