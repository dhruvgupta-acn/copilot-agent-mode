import { useEffect, useState } from 'react'

const codespaceName = import.meta.env.VITE_CODESPACE_NAME

export const apiBaseUrl = codespaceName
  ? `https://${codespaceName}-8000.app.github.dev/api`
  : 'http://localhost:8000/api'

export async function fetchResource(resource) {
  const response = await fetch(`${apiBaseUrl}/${resource}/`)
  if (!response.ok) throw new Error(`Unable to load ${resource} (${response.status})`)
  const payload = await response.json()
  if (Array.isArray(payload)) return payload
  const records = payload.results ?? payload.data ?? payload.items
  return Array.isArray(records) ? records : []
}

export function useResource(resource) {
  const [state, setState] = useState({ data: [], loading: true, error: '' })

  useEffect(() => {
    let active = true
    fetchResource(resource)
      .then((data) => active && setState({ data, loading: false, error: '' }))
      .catch((error) => active && setState({ data: [], loading: false, error: error.message }))
    return () => { active = false }
  }, [resource])

  return state
}