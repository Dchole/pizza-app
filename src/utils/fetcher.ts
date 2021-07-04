type TFetcher = (input: RequestInfo, init?: RequestInit) => Promise<unknown>

export const fetcher: TFetcher = async (...args) => {
  const response = await fetch(...args)

  if (!response.ok) {
    throw new Error(response.statusText)
  }

  const data = await response.json()

  return data
}
