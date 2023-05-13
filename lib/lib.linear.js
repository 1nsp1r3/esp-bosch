/**
 * Librairie développé pour la sonde de pression Bosch
 * A la pression atmosphérique (Environ 15 PSI)
 * La sonde doit sortir quelque chose entre 0.5 et 0.75V (Valeur mesurée: 0.541v)
 * Si 0.541v, en sortie de pont diviseur, je dois avoir 0.40v (Valeur mesurée: 0.39v)
 * Si 0.39v, alors 0.118 en valeur espruino (Valeur constatée: 0.123)
 * Si 0.123, alors ma fonction linéaire retourne 1.96 psi (Soit 0.13 bar)
 */

/**
 * Unite = 145 psi
 * Reference = 1 (ADC Espruino for 3.3V)
 * MinValue = 0.111 (Correspond au 0 de l'unité)
 * Coef calculé = 163.1046
 * Si AdcValue=0.111 -> (0.111-0.111) -> 0.000 x 163.1046 -> 000.00 psi
 * Si AdcValue=0.203 -> (0.203-0.111) -> 0.092 x 163.1046 -> 015.01 psi
 * Si AdcValue=1.000 -> (1.000-0.111) -> 0.889 x 163.1046 -> 145.00 psi
 */
var getEstimatedValue = function(Unite, Reference, MinValue, AdcValue){
  const coef = Unite / (Reference - MinValue) //104.1666666666667
  const ret = (AdcValue - MinValue) * coef
  return ret > 0 ? ret : 0
}


/**
 * Information = {
 *   Ya: 0,
 *   Yb: 2,
 *   Xa: 0,
 *   Xb: 5,
 * }
 */
var getValue = function(Information, X){
  const slope = (Information.Yb - Information.Ya) / (Information.Xb - Information.Xa)

  //Calculate b if the linear function cut doesn't the origin  
  const b = (Information.Xa || Information.Ya) ? Information.Ya - slope * Information.Xa : 0

  return X * slope + b  
}

module.exports = {
  "getEstimatedValue": getEstimatedValue,
  "getValue"         : getValue,
}
