export const fetcher = async <TReturnType>(
  input: RequestInfo,
  requestBody?: string | Record<string, any>,
  method: "POST" | "GET" = "POST"
): Promise<TReturnType> => {
  const response = await fetch(input, {
    method,
    headers: {
      "Content-type": "application/json"
    },
    body: JSON.stringify(requestBody)
  })

  const data = await response.json()

  if (!response.ok) {
    throw new Error(data.message)
  }

  return data
}
