import useAuthStore from '../zustand-store/authStore'
import errorHandler from './errorHandler'

async function parseResponse(response) {
  const contentType = response.headers.get('content-type') || ''

  if (contentType.includes('application/json')) {
    try {
      return await response.json()
    } catch {
      return null
    }
  }

  try {
    const text = await response.text()
    return text || null
  } catch {
    return null
  }
}

function buildHeaders(customHeaders = {}) {
  const { accessToken } = useAuthStore.getState()

  const headers = {
    'Content-Type': 'application/json',
    ...customHeaders,
  }

  if (accessToken) {
    headers.Authorization = `Bearer ${accessToken}`
  }

  return headers
}

export async function request({ url, method = 'GET', body, headers = {} }) {
  const config = {
    method,
    headers: buildHeaders(headers),
  }

  if (body !== undefined && body !== null && method !== 'GET') {
    config.body = JSON.stringify(body)
  }

  let response

  try {
    response = await fetch(url, config)
  } catch (error) {
    throw errorHandler(error)
  }

  const data = await parseResponse(response)

  if (!response.ok) {
    throw errorHandler(null, response.status, data)
  }

  return data
}

const api = {
  request,
}

export default api
