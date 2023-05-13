const Table = require("../lib/lib.table.js")

const TBL_BOSCH_TEMP = [
  [ 0.038, 140], //0
  [ 0.048, 130],
  [ 0.059, 120],
  [ 0.074, 110],
  [ 0.094, 100],
  [ 0.119, 90], //5
  [ 0.152, 80],
  [ 0.195, 70],
  [ 0.248, 60],
  [ 0.314, 50],
  [ 0.393, 40], //10
  [ 0.483, 30],
  [ 0.579, 20],
  [ 0.675, 10],
  [ 0.763, 0],
  [ 0.837, -10], //15
  [ 0.893, -20],
  [ 0.934, -30],
  [ 0.961, -40], //18
]

const round = function(Value){
  return Math.round(Value*100)/100
}

/**
 *
 */
test('ADC value lower than the minimal value of the table', () => {
  const displayValue = Table.GetValue(TBL_BOSCH_TEMP, 0.037)
  expect(round(displayValue)).toBe(140)
})

/**
 *
 */
test('ADC value equal to the minimal value of the table', () => {
  const displayValue = Table.GetValue(TBL_BOSCH_TEMP, 0.038)
  expect(round(displayValue)).toBe(140)
})

/**
 *
 */
test('Typical ADC value between two values', () => {
  const displayValue = Table.GetValue(TBL_BOSCH_TEMP, 0.450)
  expect(round(displayValue)).toBe(33.67)
})

/**
 *
 */
test('Typical ADC value equal to a value', () => {
  const displayValue = Table.GetValue(TBL_BOSCH_TEMP, 0.314)
  expect(round(displayValue)).toBe(50)
})

/**
 *
 */
test('ADC value equal to the maximal value of the table', () => {
  const displayValue = Table.GetValue(TBL_BOSCH_TEMP, 0.961)
  expect(round(displayValue)).toBe(-40)
})

/**
 *
 */
test('ADC value greather than the maximal value of the table', () => {
  const displayValue = Table.GetValue(TBL_BOSCH_TEMP, 0.962)
  expect(round(displayValue)).toBe(-40)
})

/**
 *
 */
test('Test1 with a negative display value', () => {
  const displayValue = Table.GetValue(TBL_BOSCH_TEMP, 0.960)
  expect(round(displayValue)).toBe(-39.63)
})

/**
 *
 */
test('Test2 with a negative display value', () => {
  const displayValue = Table.GetValue(TBL_BOSCH_TEMP, 0.935)
  expect(round(displayValue)).toBe(-30.37)
})


/**
 *
 */
test('Test3 with a negative display value', () => {
  const displayValue = Table.GetValue(TBL_BOSCH_TEMP, 0.934)
  expect(round(displayValue)).toBe(-30)
})

/**
 *
 */
test('Test4 with a negative display value', () => {
  const displayValue = Table.GetValue(TBL_BOSCH_TEMP, 0.933)
  expect(round(displayValue)).toBe(-29.76)
})
