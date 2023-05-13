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

/**
 *
 */
test('ADC value lower than the minimal value of the table', () => {
  const index = Table.NextValueIndex(TBL_BOSCH_TEMP, 0.037)
  expect(index).toBe(1)
})

/**
 *
 */
test('ADC value equal to the minimal value of the table', () => {
  const index = Table.NextValueIndex(TBL_BOSCH_TEMP, 0.038)
  expect(index).toBe(1)
})

/**
 *
 */
test('ADC value equal to the maximal value of the table', () => {
  const index = Table.NextValueIndex(TBL_BOSCH_TEMP, 0.961)
  expect(index).toBe(18)
})

/**
 *
 */
test('ADC value greather than the maximal value of the table', () => {
  const index = Table.NextValueIndex(TBL_BOSCH_TEMP, 0.962)
  expect(index).toBe(18)
})

/**
 *
 */
test('Typical ADC value between two values', () => {
  const index = Table.NextValueIndex(TBL_BOSCH_TEMP, 0.450)
  expect(index).toBe(11)
})

/**
 *
 */
test('Typical ADC value equal to a value', () => {
  const index = Table.NextValueIndex(TBL_BOSCH_TEMP, 0.152)
  expect(index).toBe(7)
})
