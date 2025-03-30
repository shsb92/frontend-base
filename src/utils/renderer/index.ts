import { DOMElement } from '../domElement';

export default class Renderer {
  private static instance: Renderer;
  private rootElement: DOMElement;

  private constructor() {
    const appElement = document.getElementById('app');
    if (!appElement) {
      throw new Error('Root element with id "app" not found');
    }
    this.rootElement = new DOMElement(appElement);
  }

  static getInstance(): Renderer {
    if (!Renderer.instance) {
      Renderer.instance = new Renderer();
    }
    return Renderer.instance;
  }

  render(content: DOMElement | null) {
    if (!content) {
      this.rootElement.clear();
    } else {
      this.rootElement.clear();
      this.rootElement.add(content);
    }
  }

  getRootElement(): DOMElement {
    return this.rootElement;
  }
}

export const renderer = Renderer.getInstance(); 