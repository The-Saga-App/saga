import { GRID_PIXEL_SIZE, NODE_SIZE } from "./constants";
import { Vector } from "./vector";

export class Node {
  readonly position = new Vector(0, 0)
  draw (ctx: CanvasRenderingContext2D) {
    ctx.fillStyle = "blue";
    ctx.fillRect(this.position.x, this.position.y, NODE_SIZE * GRID_PIXEL_SIZE, NODE_SIZE * GRID_PIXEL_SIZE)
  }
}
