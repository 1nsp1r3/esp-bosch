const Table = require("../lib/lib.table.js")

 const TBL_BOSCH_TEMP = [
   [0.037, -40], //0
   [0.062, -30],
   [0.101, -20],
   [0.156, -10],
   [0.227, 0],
   [0.313, 10], //5
   [0.407, 20],
   [0.503, 30],
   [0.593, 40],
   [0.674, 50],
   [0.741, 60], //10
   [0.796, 70],
   [0.840, 80],
   [0.875, 90],
   [0.901, 100],
   [0.922, 110], //15
   [0.938, 120],
   [0.950, 130],
   [0.959, 140], //18
]

const round = function(Value){
  return Math.round(Value*100)/100
}

/**
 *
 */
test('ADC value lower than the minimal value of the table', () => {
  const displayValue = Table.GetValue(TBL_BOSCH_TEMP, 0.036)
  expect(round(displayValue)).toBe(-40)
})

/**
 *
 */
test('ADC value equal to the minimal value of the table', () => {
  const displayValue = Table.GetValue(TBL_BOSCH_TEMP, 0.037)
  expect(round(displayValue)).toBe(-40)
})

/**
 *
 */
test('Test1 with a negative display value', () => {
  const displayValue = Table.GetValue(TBL_BOSCH_TEMP, 0.038)
  expect(round(displayValue)).toBe(-39.6)
})

/**
 *
 */
test('Test2 with a negative display value', () => {
  const displayValue = Table.GetValue(TBL_BOSCH_TEMP, 0.050)
  expect(round(displayValue)).toBe(-34.8)
})


/**
 *
 */
test('Test3 with a negative display value', () => {
  const displayValue = Table.GetValue(TBL_BOSCH_TEMP, 0.061)
  expect(round(displayValue)).toBe(-30.4)
})

/**
 *
 */
test('Test4 with a negative display value', () => {
  const displayValue = Table.GetValue(TBL_BOSCH_TEMP, 0.062)
  expect(round(displayValue)).toBe(-30)
})

/**
 *
 */
test('ADC value equal to the maximal value of the table', () => {
  const displayValue = Table.GetValue(TBL_BOSCH_TEMP, 0.959)
  expect(round(displayValue)).toBe(140)
})

/**
 *
 */
test('ADC value greather than the maximal value of the table', () => {
  const displayValue = Table.GetValue(TBL_BOSCH_TEMP, 0.960)
  expect(round(displayValue)).toBe(140)
})

/**
 *
 */
test('Typical ADC value between two values', () => {
  const displayValue = Table.GetValue(TBL_BOSCH_TEMP, 0.450)
  expect(round(displayValue)).toBe(24.48)
})

/**
 *
 */
test('Typical ADC value equal to a value', () => {
  const displayValue = Table.GetValue(TBL_BOSCH_TEMP, 0.313)
  expect(round(displayValue)).toBe(10)
})


