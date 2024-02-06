import { Directive, DirectiveBinding } from 'vue'

export const VClickOutside: Directive = {
  mounted(el: HTMLElement, binding: DirectiveBinding) {
    function handleClick(e: MouseEvent) {
      if (el.style.display === 'none' || el.contains(e.target as HTMLElement)) {
        return
      } else {
        binding.value()
      }
    }
    console.log(binding, 'binding')
    ;(el as any).__vueClickOutside__ = handleClick
    console.log(document, 'document')

    document.addEventListener('click', handleClick)
  },
  beforeUnmount(el: HTMLElement) {
    document.removeEventListener('click', (el as any).__vueClickOutside__)
    delete (el as any).__vueClickOutside__
  }
}
