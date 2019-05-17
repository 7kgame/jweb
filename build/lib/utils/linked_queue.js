"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const QUEUE_START = Symbol.for('QUEUE_START');
class LinkedNode {
    constructor(val, next = null) {
        this.val = val;
        this.next = next;
    }
}
exports.LinkedNode = LinkedNode;
class LinkedQueue {
    constructor() {
        // aim to reduce judgement when push and pop
        this.$head = new LinkedNode(QUEUE_START, null);
        this.$tail = this.$head;
        this.$length = 0;
    }
    // push a node to the tail
    push(node) {
        this.$tail.next = node;
        this.$tail = node;
        this.$length++;
    }
    // pop a node from the head
    pop() {
        let temp = this.$head.next;
        this.$head.next = temp.next;
        this.$length--;
        if (temp === this.$tail) {
            this.$tail = this.$head;
        }
        return temp;
    }
    head() {
        return this.$head.next;
    }
    tail() {
        return this.$tail;
    }
    length() {
        return this.$length;
    }
    empty() {
        return (this.$tail.val === Symbol.for('QUEUE_START'));
    }
    forEach(fn) {
        let temp = this.$head.next;
        while (temp !== null) {
            fn(temp.val);
            temp = temp.next;
        }
    }
}
exports.LinkedQueue = LinkedQueue;
