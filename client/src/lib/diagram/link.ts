import type { Vector } from "./vector"

export class Link {
  from: Vector
  to: Vector
  constructor(from: Vector, to: Vector) {
    this.from = from
    this.to = to
  }
  draw (ctx: CanvasRenderingContext2D) {
    
  }
}
