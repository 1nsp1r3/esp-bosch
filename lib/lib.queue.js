/*
 * Time evolution of the queue
 * N+0 [ 0, 1, 2, 3 ]
 * N+1 [ 1, 2, 3, 4 ]
 * N+2 [ 2, 3, 4, 5 ]
 */

const MAX_QUEUE_SIZE = 10

class Queue {
  constructor(Size){
    this.queue = []
    this.size = Size == undefined ? MAX_QUEUE_SIZE : Size
  }

  add(Value) { 
    this.queue.push(Value)
    if (this.queue.length > this.size) this.queue.shift() //Remove oldest value
  }

  get text() {
    let text = ""
    this.queue.forEach(value => text += " " + value)
    return text.trim()
  }

  get averageValue() {
    let sum = 0
    this.queue.forEach(value => sum += value)
    return sum / this.queue.length 
  }

  toConsole() {
    console.log(this.text)
  }
}

module.exports = Queue
