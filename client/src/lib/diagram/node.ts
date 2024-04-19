import { GRID_PIXEL_SIZE, NODE_SIZE } from "./constants";
import { Vector } from "./vector";

export class Node {
  readonly position = new Vector(0, 0)

  constructor(x: number, y: number) {
    this.position.setXY(x, y)
  }

  draw (ctx: CanvasRenderingContext2D) {
    ctx.fillStyle = "blue";
    ctx.fillRect(
      this.position.x * GRID_PIXEL_SIZE, 
      this.position.y * GRID_PIXEL_SIZE, 
      NODE_SIZE * GRID_PIXEL_SIZE, 
      NODE_SIZE * GRID_PIXEL_SIZE
    )
  }
}
