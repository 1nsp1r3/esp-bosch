const Linear = require("./lib.linear.js")

/**
 * Comportement de l'ADC selon alim labo
 * 1.0V = 0.31
 * 1.5V = 0.47
 * 3.3V = 0.99
 */

/*
 * Explication sur le fonctionnement de cette lib
 * Prenons une entrée ADC à 1.30
 * 1) On va parcourir la table pour trouver la valeur inférieure  la plus proche : [1.03, 10]
 * 2) On peut ensuite déduire la valeur supérieur la plus proche: [1.34, 20]
  * 3) On calcul un prorata entre les 2 bornes
 *   1) Normalise les bornes
 *      1.30 - 1.03 = 0.27
 *      1.34 - 1.03 = 0.31
 *   2) Situe la valeur parmi les bornes
 *      0 < 0.27 < 0.31
 *      0.27 / 0.31 = 87%
 *   3) Calcul une approximation de la valeur à afficher
 *      20 - 10 = 10
 *      10 x 87% = 8.7
 *      8.7 + 10 = 18.7
 */

/**
 * Table should respect this format:
 * [
 *   [adcValue1, displayValue1],
 *   [adcValue2, displayValue2],
 *   ...
 * ]
 * Order is important, adcValue1 should be lower than adcValue2
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

  //Apply a linear function
  const estimatedValue = Linear.getEstimatedValue(
    Table[nextValueIndex][1] - Table[previousValueIndex][1], //Unite (10)
    Table[nextValueIndex][0], //Reference (0.096)
    Table[previousValueIndex][0], //Min value
    AdcValue
  )

  return estimatedValue + Table[previousValueIndex][1]

/*
  //Normalize
  const min = AdcValue - Table[previousValueIndex][0]  
  const max = Table[nextValueIndex][0] - Table[previousValueIndex][0]  
  const percent = min / max

  //Prorata
  const gap = Table[nextValueIndex][1] - Table[previousValueIndex][1]
  const ratio = gap * percent
  return ratio + Table[previousValueIndex][1]
*/
}

module.exports = {
  "PreviousValueIndex": PreviousValueIndex,
  "NextValueIndex"    : NextValueIndex,
  "GetValue"   : GetValue,
}
