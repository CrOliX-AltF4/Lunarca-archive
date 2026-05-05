export function dispatch(trigger, scene) {
  window.dispatchEvent(new CustomEvent('natsume:trigger', { detail: { trigger, scene } }))
}
