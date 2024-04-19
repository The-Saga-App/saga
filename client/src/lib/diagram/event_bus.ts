export class EventBus {
  private listeners: Record<string, Set<Function>> = {}

  on(name: string, handler: Function): void {
    if (!this.listeners[name]) {
      this.listeners[name] = new Set()
    }

    this.listeners[name].add(handler)
  }

  off(name: string, handler: Function): boolean {
    if (!this.listeners[name]) return false
    this.listeners[name].delete(handler)
    return true
  }

  emit (name: string, args: Array<any>): void {
    if (!this.listeners[name]) return
    this.listeners[name].forEach((fn) => {
      try {
        fn(...args)
      } catch (err) {
        console.warn('emit: one of the handlers of event ' + name + ' failed with error:', err)
      }
    })
  }
}
