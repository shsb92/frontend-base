// src/pages/404/index.ts
import type { PageComponent } from '@interfaces/page';
import { route } from '@router/router';

export default class NotFoundPage implements PageComponent {
  private rootElement: HTMLElement | null;

  constructor() {
    console.log('404 Page loaded');
    this.rootElement = document.getElementById('root');
    this.render();
  }

  private render() {
    if (this.rootElement) {
      this.rootElement.innerHTML = `
        <div class="p-4 text-center">
          <h1 class="text-4xl font-bold text-red-600 mb-4">404</h1>
          <p class="mb-4">Oops! Page not found.</p>
          <button id="home-button" class="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded">
            Go Back Home
          </button>
        </div>
      `;
      this.rootElement.querySelector('#home-button')?.addEventListener('click', this.goHome);
    }
  }

  private goHome = () => {
    route('/'); // Navigate to home route
  }

  dispose() {
    console.log('404 Page disposed');
    this.rootElement?.querySelector('#home-button')?.removeEventListener('click', this.goHome);
    if (this.rootElement) {
      this.rootElement.innerHTML = '';
    }
  }
}