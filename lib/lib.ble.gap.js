/**
 * Advertising({
 *   name: 'MX5',
 *   interval: 1000, //ms
 *   UUID: 0x1809,
 *   value: temperature
 * })
 */
var Advertising = function(Params){
  const data = {
    0x1809 : [Params.value]
  }

  const options = {
    name: Params.name,
    interval: Params.interval
  }

  NRF.setAdvertising(data, options)
}

module.exports = {
  "Advertising": Advertising,
}
