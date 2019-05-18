const QUEUE_START = Symbol.for('QUEUE_START')
export class LinkedNode {
  public val: any
  public next: LinkedNode
  constructor(val: any, next: LinkedNode = null) {
    this.val = val
    this.next = next
  }
}

export class LinkedQueue {
  // aim to reduce judgement when push and pop
  private $head:LinkedNode = new LinkedNode(QUEUE_START, null)
  private $tail:LinkedNode = this.$head
  private $length: number = 0

  // push a node to the tail
  public push(node: LinkedNode) {
    this.$tail.next = node
    this.$tail = node
    this.$length++
  }
  // pop a node from the head
  public pop(): LinkedNode {
    let temp = this.$head.next
    this.$head.next = temp.next
    this.$length--
    if (temp === this.$tail) {
      this.$tail = this.$head
    }
    return temp
  }
  public head() {
    return this.$head.next
  }
  public tail() {
    return this.$tail
  }
  public length(): number {
    return this.$length
  }

  public empty(): boolean {
    return (this.$tail.val === Symbol.for('QUEUE_START'))
  }
  public forEach(fn: Function) {
    let temp = this.$head.next
    while (temp !== null) {
      fn(temp.val)
      temp = temp.next
    }
  }
}