const Linear = require("../lib/lib.linear.js")

const UNITE = 145
const REFERENCE = 1
const MIN_VALUE = 0.11111

/**
 *
 */
test("REFERENCE should return UNITE", () => {
  const estimatedValue = Linear.getEstimatedValue(UNITE, REFERENCE, MIN_VALUE, 1)
  expect(estimatedValue).toBe(145)
})

/**
 *
 */
test("MIN_VALUE should return 0", () => {
  const estimatedValue = Linear.getEstimatedValue(UNITE, REFERENCE, MIN_VALUE, MIN_VALUE)
  expect(estimatedValue).toBe(0)
})

/**
 *
 */
test("0 should return 0", () => {
  const estimatedValue = Linear.getEstimatedValue(UNITE, REFERENCE, MIN_VALUE, 0)
  expect(estimatedValue).toBe(0)
})


/**
 *
 */
test("Test with ADC value=0.83333", () => {
  let estimatedValue = Linear.getEstimatedValue(UNITE, REFERENCE, MIN_VALUE, 0.83333)
  estimatedValue = Math.round(estimatedValue*100)/100
  expect(estimatedValue).toBe(117.81)
})

/**
 *
 */
test("Test with ADC value=0.22222", () => {
  let estimatedValue = Linear.getEstimatedValue(UNITE, REFERENCE, MIN_VALUE, 0.22222)
  estimatedValue = Math.round(estimatedValue*100)/100
  expect(estimatedValue).toBe(18.12)
})


/**
 *
 */
test("Test with ADC value=0.124", () => {
  const estimatedValue = Linear.getEstimatedValue(UNITE, REFERENCE, MIN_VALUE, 0.124)
  expect(estimatedValue).toBe(2.102678621651723)
})
