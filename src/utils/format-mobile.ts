export const formatMobile = (phoneNumber: string): string => {
  const result = phoneNumber.startsWith("0")
    ? phoneNumber.replace("0", "233")
    : phoneNumber.startsWith("+")
    ? phoneNumber.replace("+", "")
    : phoneNumber

  return result.split(" ").join("")
}
