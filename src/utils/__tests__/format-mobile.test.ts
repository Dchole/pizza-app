import { formatMobile } from "../format-mobile"

test("Phone number input with expected format", () => {
  expect(formatMobile("233248245692")).toBe("233248245692")
})

test("Phone number input with country code format", () => {
  expect(formatMobile("+233248245692")).toBe("233248245692")
})

test("Phone number input with country code and spacing format", () => {
  expect(formatMobile("+233 24 824 5692")).toBe("233248245692")
})

test("Phone number input with local format", () => {
  expect(formatMobile("0248245692")).toBe("233248245692")
})

test("Phone number input with local spacing format", () => {
  expect(formatMobile("024 824 5692")).toBe("233248245692")
})
