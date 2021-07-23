export const slugify = (key: string): string =>
  key
    .split("")
    .map(char => (char === char.toUpperCase() ? `-${char}` : char))
    .join("")
    .toLowerCase()
