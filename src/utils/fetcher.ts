export const fetcher = async <TReturnType>(
  input: RequestInfo,
  init?: RequestInit
): Promise<TReturnType> => {
  const response = await fetch(input, init)

  if (!response.ok) {
    throw new Error(response.statusText)
  }

  const data = await response.json()

  return data
}
