/**
 * Throw Error if a variable is unexpectedly undefined or null.
 * Return a variable or constant without undefined or null.
 * @param entry - variable or constant to check. If it doesn't exist throw error
 * @param message - custom error message
 */
export const deNullify = <TEntry>(entry?: TEntry | null, message?: string) => {
  if (!entry) {
    throw new Error(
      message || "Something went wrong. Please refresh and try again"
    )
  }

  return entry
}
