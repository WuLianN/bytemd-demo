export function request(url: string, options = {}) {
  const baseUrl = import.meta.env.VITE_APP_BASE_API
  const fullUrl = baseUrl + url
  return fetch(fullUrl, options)
}