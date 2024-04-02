// electron-drag.d.ts

declare module 'electron-drag' {
  function drag(element: HTMLElement): () => void
  const supported: boolean
  // Add any other types or interfaces as needed
}

export = drag
