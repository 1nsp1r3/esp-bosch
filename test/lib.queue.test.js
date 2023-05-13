const Queue = require("../lib/lib.queue.js")

/**
 *
 */
test("One value", () => {
  const q = new Queue()
  q.add(0)
  expect(q.text).toBe("0")
  expect(q.averageValue).toBe(0)
})

/**
 *
 */
test("Two values", () => {
  const q = new Queue()
  q.add(0)
  q.add(1)
  expect(q.text).toBe("0 1")
  expect(q.averageValue).toBe(0.5)
})

/**
 *
 */
test("Full (default size=10)", () => {
  const q = new Queue()
  q.add(0)
  q.add(1)
  q.add(2)
  q.add(3)
  q.add(4)
  q.add(5)
  q.add(6)
  q.add(7)
  q.add(8)
  q.add(9)
  expect(q.text).toBe("0 1 2 3 4 5 6 7 8 9")
  expect(q.averageValue).toBe(4.5)
})

/**
 *
 */
test("Full (default size=10) + one value", () => {
  const q = new Queue()
  q.add(0)
  q.add(1)
  q.add(2)
  q.add(3)
  q.add(4)
  q.add(5)
  q.add(6)
  q.add(7)
  q.add(8)
  q.add(9)
  q.add(10)
  expect(q.text).toBe("1 2 3 4 5 6 7 8 9 10")
  expect(q.averageValue).toBe(5.5)
})

/**
 *
 */
test("Full (size=5)", () => {
  const q = new Queue(5)
  q.add(0)
  q.add(1)
  q.add(2)
  q.add(3)
  q.add(4)
  expect(q.text).toBe("0 1 2 3 4")
  expect(q.averageValue).toBe(2)
})

/**
 *
 */
test("Full (size=5) + one value", () => {
  const q = new Queue(5)
  q.add(0)
  q.add(1)
  q.add(2)
  q.add(3)
  q.add(4)
  q.add(5)
  expect(q.text).toBe("1 2 3 4 5")
  expect(q.averageValue).toBe(3)
})
