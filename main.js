const Table = require("lib.table.js")
const Queue = require("lib.queue.js")

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

const queueTemperature = new Queue()

function displayHeader(){
	g.setFontBitmap() //Small font
	g.drawString("Temperature :")	
}

function displayFloat(FloatValue){
	const val = FloatValue.toFixed(1)
	g.setFontVector(40) //Big font
	g.drawString(val, (g.getWidth()-g.stringWidth(val))/2, 10)
}


function loop(){
	const temperatureValue = Table.GetDisplayValue(
		TBL_BOSCH_TEMP,
		analogRead(A0)
	)

	queueTemperature.add(temperatureValue)
	queueTemperature.toConsole()
	console.log('averageValue', queueTemperature.averageValue)

	g.clear()
	displayHeader()
	displayFloat(queueTemperature.averageValue)
	g.flip()	
}


setInterval(loop, 1000)
loop()
