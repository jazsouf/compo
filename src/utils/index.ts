export function registerElement(
  name: string,
  constructor: CustomElementConstructor,
  options?: ElementDefinitionOptions,
): void {
  if (!customElements.get(name)) {
    customElements.define(name, constructor, options);
  }
}

export function onComponentLoad<T extends HTMLElement>(
  tagName: string,
  clazz: new (...args: any[]) => T,
  consumer: (el: T) => void,
  opts?: {
    selector?: string;
    root?: HTMLElement | Document;
    maxAttempts?: number;
  },
): void {
  let attempts = 0;
  const maxAttempts = opts?.maxAttempts || 100;
  const root = opts?.root || document;
  const selector = opts?.selector || tagName;

  const checkAndRun = () => {
    const el = root.querySelector(selector) as HTMLElement;
    if (el instanceof clazz) {
      consumer(el);
    } else if (attempts++ < maxAttempts) {
      // Wait for the next frame since browser doesn't upgrade all instances simultaneously
      requestAnimationFrame(checkAndRun);
    } else {
      console.warn(`${selector} not ready after maximum attempts`);
    }
  };

  // whenDefined returns a promise that resolves immediately if the tag is already defined
  // or when the tag is eventually registered.
  customElements.whenDefined(tagName).then(checkAndRun);
}
