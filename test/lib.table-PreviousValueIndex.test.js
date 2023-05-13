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

/**
 *
 */
test('ADC value lower than the minimal value of the table', () => {
  const index = Table.PreviousValueIndex(TBL_BOSCH_TEMP, 0.036)
  expect(index).toBe(0)
})

/**
 *
 */
test('ADC value equal to the minimal value of the table', () => {
  const index = Table.PreviousValueIndex(TBL_BOSCH_TEMP, 0.037)
  expect(index).toBe(0)
})

/**
 *
 */
test('ADC value equal to the maximal value of the table', () => {
  const index = Table.PreviousValueIndex(TBL_BOSCH_TEMP, 0.959)
  expect(index).toBe(18)
})

/**
 *
 */
test('ADC value greather than the maximal value of the table', () => {
  const index = Table.PreviousValueIndex(TBL_BOSCH_TEMP, 0.960)
  expect(index).toBe(18)
})

/**
 *
 */
test('Typical ADC value between two values', () => {
  const index = Table.PreviousValueIndex(TBL_BOSCH_TEMP, 0.450)
  expect(index).toBe(6)
})

/**
 *
 */
test('Typical ADC value equal to a value', () => {
  const index = Table.PreviousValueIndex(TBL_BOSCH_TEMP, 0.156)
  expect(index).toBe(3)
})

