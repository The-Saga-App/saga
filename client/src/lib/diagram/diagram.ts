import { EventBus } from "./event_bus"
import type { Group } from "./group"
import type { Link } from "./link"
import type { Node } from "./node"

export class Diagram extends EventBus {
  readonly nodes: Set<Node> = new Set()
  readonly links: Set<Link> = new Set()
  readonly groups: Set<Group> = new Set()

  private ctx: CanvasRenderingContext2D
  private width: number
  private height: number

  constructor (canvas: HTMLCanvasElement) {
    super()
    const ctx = canvas.getContext('2d')
    canvas.width
    if (!ctx) throw new Error('Diagram: Failed to instantiate 2d context');
    this.ctx = ctx
    this.width = canvas.width
    this.height = canvas.height

    requestAnimationFrame(this.update.bind(this))
    console.log(this)
  }

  update(dt: DOMHighResTimeStamp) {
    this.draw()
    requestAnimationFrame(this.update.bind(this))
  }

  draw() {
    this.ctx.clearRect(0, 0, this.width, this.height)

    this.nodes.forEach(node => node.draw(this.ctx))
  }
}
