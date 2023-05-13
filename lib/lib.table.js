const Linear = require("./lib.linear.js")

/**
 * Table should respect this format:
 * [
 *   [adcValue1, displayValue1],
 *   [adcValue2, displayValue2],
 *   ...
 * ]
 * Order is important, adcValue1 should be lower than adcValue2
 */

/*
 * How it works ?
 * We use a table and the values of the table respect this format:
 * [ADC, Temperature],
 *
 * Let's take an example, we have 0.450 on ADC
 * [...]
 * [0.407, 20], <- Before 0.450
 * [0.503, 30], <- Next 0.450
 * [...]
 *
 * We are between 0.407 & 0.503, we use a linear function to interpolate the wanted value
 */

/**
 * AdcValue = 0.450
 * [...]
 * 0.450 - 0.313 = 0.137
 * 0.450 - 0.407 = 0.043
 * 0.450 - 0.503 = -0.053
 */
var PreviousValueIndex = function(Table, AdcValue){
  let i = 0
  while( (AdcValue - Table[i][0]) >= 0){
    i++
    if (i >= Table.length) break
  }
  if (!i) return 0 //AdcValue is lower than the minimal value of the table
  return i-1
}

var NextValueIndex = function(Table, AdcValue){
  const previousValueIndex = PreviousValueIndex(Table, AdcValue)
  return previousValueIndex >= Table.length-1 ? previousValueIndex : previousValueIndex+1
}

var GetValue = function(Table, AdcValue){
  const previousValueIndex = PreviousValueIndex(Table, AdcValue)
  const nextValueIndex = NextValueIndex(Table, AdcValue)

  if (AdcValue < Table[0][0])               return Table[0][1]              //ADC value is out of bounds (lower than the minimal value)
  if (AdcValue >= Table[Table.length-1][0]) return Table[Table.length-1][1] //ADC value is out of bounds (greather than the maximal value)
  
  //Between 2 values ? Apply a linear function
  return Linear.getXValue(
    {
      Xa: Table[previousValueIndex][1],
      Ya: Table[previousValueIndex][0],
      Xb: Table[nextValueIndex][1],
      Yb: Table[nextValueIndex][0],
    },
    AdcValue //YValue
  )
}

module.exports = {
  "PreviousValueIndex": PreviousValueIndex,
  "NextValueIndex"    : NextValueIndex,
  "GetValue"   : GetValue,
}
