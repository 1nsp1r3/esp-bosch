const Table  = require("lib.table.js")
const Linear = require("lib.linear.js")
const Queue  = require("lib.queue.js")

/**
 * 
 * 
 * Table de correspondance Valeur ADC (Proportionnelle à la résistance (Ohms) de la sonde) <-> Température (°C)
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

const BOSCH_PRESSUR_SENSOR = {
  Xa: 0,
  Ya: 0.05, //See README.md to understand with I have replace the 0.111 value
  Xb: 145,
  Yb: 1.0,
}

const queueTemperature = new Queue()
const queuePressure = new Queue()

/**
 * 
 */
function psi2bar(PsiValue){
	return PsiValue / 14.5038 
}

/**
 * 
 */
function displayTemperature(FloatValue){
	const text = FloatValue.toFixed(1)
	g.setFontVector(40) //Big font
	g.drawString(
		text,
		0, //X
		0  //Y
	)
	const stringWidth = g.stringWidth(text)
	g.setFont("4x6")
	g.drawString(
		"o",
		stringWidth, //X
		0            //Y
	)
}

/**
 * 
 */
function displayPressure(FloatValue){
	const text = FloatValue.toFixed(1).toString()
	const stringWidth = g.stringWidth(text)
	const fontHeight = 30
	g.setFontVector(fontHeight) //Big font
	g.drawString(
		text,
		g.getWidth() - g.stringWidth(text)-9, //X
		g.getHeight() - fontHeight+6          //Y
	)
	g.setFont("4x6")
	g.drawString(
		"bar",
		117, //X
		59   //Y
	)
}

/**
 * 
 */
function getTemperatureValue(){
	const temperatureValue = Table.GetValue(
		TBL_BOSCH_TEMP,
		analogRead(A0)
	)
	queueTemperature.add(temperatureValue)
	//queueTemperature.toConsole()
	//console.log("averageValue", queueTemperature.averageValue)

	return queueTemperature.averageValue
}

/**
 * 
 */
function getPressureValue(){
	const pressureValue = Linear.getXValue(
		BOSCH_PRESSUR_SENSOR,
		analogRead(A1)
	) //psi

	queuePressure.add(pressureValue)
	//queuePressure.toConsole()
	//console.log("averageValue", queuePressure.averageValue)

	return psi2bar(queuePressure.averageValue)
}


/**
 * 
 */
function loop(){
	g.clear()
	displayTemperature(
		getTemperatureValue()
	)
	displayPressure(
		getPressureValue()
	)
	g.flip()	
}

LED1.set()
setInterval(loop, 1000)
loop()
