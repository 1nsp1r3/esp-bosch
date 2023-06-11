const LibQueue  = require("../lib/esp.lib.queue.min.js")
const LibLinear = require("../lib/esp.lib.linear.min.js")
const LibTable  = require("../lib/esp.lib.table.min.js")
const Display   = require("../lib/lib.display.js")

/**
 * See doc/temperature.ods
 * ADC value <-> temperature °C
 */
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
 * See doc/pressure.ods
 * X: psi
 * Y: ADC value
 */
const BOSCH_PRESSUR_SENSOR = {
  Xa: 0,
  Ya: 0.111,
  Xb: 145,
  Yb: 1.0,
}

const queueTemperature = new LibQueue()
const queuePressure = new LibQueue()

/*
 *
 */
function loop(){
	g.clear()

  /**
  * TEMPERATURE
  */
  let rawTemperature = LibTable.getValue( //-40 - 140 °C
    TBL_BOSCH_TEMP,
    analogRead(A0)
  )
  if (rawTemperature < 0) rawTemperature = 0 //This first version does not manage negativ temperature
  queueTemperature.add(rawTemperature)
  const avgTemperature = queueTemperature.averageValue

  /**
  * PRESSURE
  */
  let rawPressure = LibLinear.getXValue( //0 - 145 PSI
    BOSCH_PRESSUR_SENSOR,
    analogRead(A1)
  ) //psi
  if (rawPressure < 0) rawPressure = 0 //Pressure can not ne negative
  queuePressure.add(rawPressure)
  const avgPressure = queuePressure.averageValue

  //console.log(`Temperature ${rawTemperature} (${avgTemperature}) Pressure ${rawPressure} (${avgPressure})`)

  NRF.setAdvertising({ //data
    0x1809: [Math.round(rawTemperature), Math.round(rawPressure)], //[UByte, UByte]
  }
  ,{ //options
    name: 'MX5',
    interval: 1000, //ms
  })

  Display.temperature(avgTemperature)
  Display.pressure(avgPressure) //display in bars
  Display.elapsedTime()
	g.flip()
}

LED1.set()
setInterval(loop, 1000)
loop()
