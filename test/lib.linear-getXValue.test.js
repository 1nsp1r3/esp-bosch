const Linear = require("../lib/lib.linear.js")

const byOrigin = {
  Xa: 0,
  Ya: 0,
  Xb: 5,
  Yb: 2,
}

const notByOrigin = {
  Xa: 0,
  Ya: 2,
  Xb: 5,
  Yb: 4,
}

const boschPressureSensor = {
  Xa: 0,
  Ya: 0.11111,
  Xb: 145,
  Yb: 1.0,
}

const round = function(Value){
  return Math.round(Value*100)/100
}

/**
 *
 */
test("Linear function through by origin should work", () => {
  expect(round(Linear.getXValue(byOrigin, 0))).toBe(0)
  expect(round(Linear.getXValue(byOrigin, 0.4))).toBe(1)
  expect(round(Linear.getXValue(byOrigin, 0.8))).toBe(2)
  expect(round(Linear.getXValue(byOrigin, 1.2))).toBe(3)
  expect(round(Linear.getXValue(byOrigin, 1.6))).toBe(4)
  expect(round(Linear.getXValue(byOrigin, 2))).toBe(5)
  expect(round(Linear.getXValue(byOrigin, 2.4))).toBe(6)
})

/**
 *
 */
test("Linear function doesn't through by origin should work", () => {
  expect(round(Linear.getXValue(notByOrigin, 2))).toBe(0)
  expect(round(Linear.getXValue(notByOrigin, 2.4))).toBe(1)
  expect(round(Linear.getXValue(notByOrigin, 2.8))).toBe(2)
  expect(round(Linear.getXValue(notByOrigin, 3.2))).toBe(3)
  expect(round(Linear.getXValue(notByOrigin, 3.6))).toBe(4)
  expect(round(Linear.getXValue(notByOrigin, 4))).toBe(5)
  expect(round(Linear.getXValue(notByOrigin, 4.4))).toBe(6)
})

/**
 *
 */
test("Bosch pressure sensor should work", () => {
  expect(round(Linear.getXValue(boschPressureSensor, 0.11111))).toBe(0)
  expect(round(Linear.getXValue(boschPressureSensor, 0.33179993103448274))).toBe(36)
  expect(round(Linear.getXValue(boschPressureSensor, 0.5586201379310345))).toBe(73)
  expect(round(Linear.getXValue(boschPressureSensor, 0.7793100689655172))).toBe(109)
  expect(round(Linear.getXValue(boschPressureSensor, 1))).toBe(145)
})
