import { useEffect, useState } from 'react'

const codespaceName = import.meta.env.VITE_CODESPACE_NAME

export const apiOrigin = codespaceName
  ? `https://${codespaceName}-8000.app.github.dev/api`
  : 'http://localhost:8000/api'

export const apiBaseUrl = apiOrigin

export async function fetchResource(endpoint) {
  const requestUrl = endpoint.startsWith('/api/')
    ? `${apiOrigin.replace(/\/api$/, '')}${endpoint}`
    : `${apiOrigin}/${endpoint}/`
  const response = await fetch(requestUrl)
  if (!response.ok) throw new Error(`Unable to load ${endpoint} (${response.status})`)
  const payload = await response.json()
  if (Array.isArray(payload)) return payload
  const records = payload.results ?? payload.data ?? payload.items
  return Array.isArray(records) ? records : []
}

export function useResource(endpoint) {
  const [state, setState] = useState({ data: [], loading: true, error: '' })

  useEffect(() => {
    let active = true
    fetchResource(endpoint)
      .then((data) => active && setState({ data, loading: false, error: '' }))
      .catch((error) => active && setState({ data: [], loading: false, error: error.message }))
    return () => { active = false }
  }, [endpoint])

  return state
}