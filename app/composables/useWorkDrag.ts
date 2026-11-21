export function useWorkDrag(step: (direction: number) => void) {
  let gesture: { id: number, x: number, y: number, frame: HTMLElement, dragging: boolean } | undefined

  function cancel() {
    if (!gesture) return
    const { frame, id } = gesture
    gesture = undefined
    frame.classList.remove('is-dragging')
    frame.style.removeProperty('--work-drag')
    if (frame.hasPointerCapture(id)) frame.releasePointerCapture(id)
  }

  function begin(event: PointerEvent) {
    if (!event.isPrimary || event.button !== 0 || !(event.currentTarget instanceof HTMLElement)) return
    cancel()
    gesture = { id: event.pointerId, x: event.clientX, y: event.clientY, frame: event.currentTarget, dragging: false }
  }

  function move(event: PointerEvent) {
    if (!gesture || gesture.id !== event.pointerId) return
    const x = event.clientX - gesture.x
    const y = event.clientY - gesture.y

    if (!gesture.dragging) {
      if (Math.abs(y) > 12 && Math.abs(y) > Math.abs(x)) return cancel()
      if (Math.abs(x) < 12 || Math.abs(x) < Math.abs(y) * 1.25) return
      gesture.dragging = true
      gesture.frame.setPointerCapture(event.pointerId)
      gesture.frame.classList.add('is-dragging')
    }

    const offset = Math.max(-120, Math.min(120, x * 0.44))
    gesture.frame.style.setProperty('--work-drag', `${offset}px`)
  }

  function end(event: PointerEvent) {
    if (!gesture || gesture.id !== event.pointerId) return
    const distance = event.clientX - gesture.x
    const threshold = Math.min(96, Math.max(44, gesture.frame.clientWidth * 0.13))
    const shouldStep = gesture.dragging && Math.abs(distance) >= threshold
    cancel()
    if (shouldStep) step(distance < 0 ? 1 : -1)
  }

  function leave(event: PointerEvent) {
    if (gesture?.id === event.pointerId && !gesture.dragging) cancel()
  }

  onBeforeUnmount(cancel)
  return { begin, move, end, leave, cancel }
}
