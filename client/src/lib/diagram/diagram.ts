import { GRID_PIXEL_SIZE } from "./constants"
import { EventBus } from "./event_bus"
import type { Group } from "./group"
import type { Link } from "./link"
import type { Node } from "./node"

export class Diagram extends EventBus {
  readonly nodes: Set<Node> = new Set()
  readonly links: Set<Link> = new Set()
  readonly groups: Set<Group> = new Set()

  private ctx: CanvasRenderingContext2D
  private width: number = 1600
  private height: number = 900

  constructor (canvas: HTMLCanvasElement) {
    super()
    const ctx = canvas.getContext('2d')
    canvas.width
    if (!ctx) throw new Error('Diagram: Failed to instantiate 2d context');
    this.ctx = ctx

    requestAnimationFrame(this.update.bind(this))
    console.log(this)
  }

  update(dt: DOMHighResTimeStamp) {
    this.draw()
    requestAnimationFrame(this.update.bind(this))
  }

  draw() {
    this.ctx.clearRect(0, 0, this.width, this.height)

    this.drawGrid()
    this.nodes.forEach(node => node.draw(this.ctx))
  }

  drawGrid() {
    this.ctx.strokeStyle = "rgba(245, 39, 145, 0.5)"

    for (let x = GRID_PIXEL_SIZE; x < this.width; x += GRID_PIXEL_SIZE) {
      this.ctx.beginPath()
      this.ctx.moveTo(x, 0)
      this.ctx.lineTo(x, this.height)
      this.ctx.stroke()
    }

    for (let y = GRID_PIXEL_SIZE; y < this.height; y += GRID_PIXEL_SIZE) {
      this.ctx.beginPath()
      this.ctx.moveTo(0, y)
      this.ctx.lineTo(this.width, y)
      this.ctx.stroke()
    }
  }
}
