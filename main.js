const Table  = require("lib.table.js")
const Linear = require("lib.linear.js")
const Queue  = require("lib.queue.js")

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
 * Ya devrait valoir 0.11111 si on s'en tient à la spécification de la sonde
 * Sauf qu'elle délivre une tension plus basse que prévue, ce qui donne 0.1 bar à pression ambiante au lieu de 1 bar
 * Donc je bidouille la fonction linéaire pour qu'elle s'adapte à la réalité de la sonde
 */
const BOSCH_PRESSUR_SENSOR = {
  Xa: 0,
  Ya: 0.030,
  Xb: 145,
  Yb: 1.0,
}

const UNITE = 145
const REFERENCE = 1
const MIN_VALUE = 0.030 //Normalement c'est 0.11111 mais la sonde Bosch délivre une tension plus basse que sa spécification, ce qui donne 0.1 bar à pression ambiante au lieu de 1 bar

const queueTemperature = new Queue()

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
		stringWidth + 5, //X
		0                //Y
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
	const A1 = analogRead(A1)
	console.log("A1", A1)

	const pressureValue = Linear.getXValue(BOSCH_PRESSUR_SENSOR, A1)
	const bar = psi2bar(pressureValue)

	console.log("pressureValue", pressureValue, "psi", bar, "bar")
	return bar
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
