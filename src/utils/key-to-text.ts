import { capitalize } from "@material-ui/core/utils"

export const keyToText = (key: string): string => {
  const delimiter = key.split("").find(char => char === char.toUpperCase())

  return !delimiter
    ? capitalize(key)
    : key
        .split(delimiter)
        .map((word, index) =>
          index === 1 ? capitalize(delimiter + word) : capitalize(word)
        )
        .join(" ")
}
