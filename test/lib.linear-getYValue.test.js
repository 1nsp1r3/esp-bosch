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

/**
 *
 */
test("Linear function through by origin should work", () => {
  expect(Linear.getYValue(byOrigin, 0)).toBe(0)
  expect(Linear.getYValue(byOrigin, 1)).toBe(0.4)
  expect(Linear.getYValue(byOrigin, 2)).toBe(0.8)
  expect(Linear.getYValue(byOrigin, 3)).toBe(1.2000000000000002)
  expect(Linear.getYValue(byOrigin, 4)).toBe(1.6)
  expect(Linear.getYValue(byOrigin, 5)).toBe(2.0)
  expect(Linear.getYValue(byOrigin, 6)).toBe(2.4000000000000004)
})

/**
 *
 */
test("Linear function doesn't through by origin should work", () => {
  expect(Linear.getYValue(notByOrigin, 0)).toBe(2)
  expect(Linear.getYValue(notByOrigin, 1)).toBe(2.4)
  expect(Linear.getYValue(notByOrigin, 2)).toBe(2.8)
  expect(Linear.getYValue(notByOrigin, 3)).toBe(3.2000000000000002)
  expect(Linear.getYValue(notByOrigin, 4)).toBe(3.6)
  expect(Linear.getYValue(notByOrigin, 5)).toBe(4.0)
  expect(Linear.getYValue(notByOrigin, 6)).toBe(4.4000000000000004)
})

/**
 *
 */
test("Bosch pressure sensor should be a linear function which doesn't through by origin", () => {
  expect(Linear.getYValue(boschPressureSensor, 0)).toBe(0.11111)
  expect(Linear.getYValue(boschPressureSensor, 36)).toBe(0.33179993103448274)
  expect(Linear.getYValue(boschPressureSensor, 73)).toBe(0.5586201379310345)
  expect(Linear.getYValue(boschPressureSensor, 109)).toBe(0.7793100689655172)
  expect(Linear.getYValue(boschPressureSensor, 145)).toBe(1.0)
})
