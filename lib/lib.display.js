const LibDate             = require("./esp.lib.date.min.js")
const Font7x11Numeric7Seg = require("./Font7x11Numeric7Seg.js")

const startedTime = Date.now()
Font7x11Numeric7Seg.add(Graphics)

/**
 *
 */
const psi2bar = function(PsiValue){
  return PsiValue / 14.5038
}

/**
 *
 */
const temperature = function(FloatValue){
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
const pressure = function(FloatValue){
  const floatValue = psi2bar(FloatValue)
  const text = floatValue.toFixed(1)
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

const elapsedTime = function(){
  const time = LibDate.elapsedTime(startedTime)
  const stringWidth = g.stringWidth(time)
  g.setFont("7x11Numeric7Seg")
  g.drawString(
    time,
    0,                 //X
    g.getHeight() - 11 //Y
  )
}

module.exports = {
  temperature,
  pressure,
  elapsedTime,
}
