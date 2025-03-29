// src/pages/home/index.ts
import type { PageComponent } from '@interfaces/page';
import { route } from '@router/router'; // Import the route function

export default class HomePage implements PageComponent {
  private rootElement: HTMLElement | null;

  constructor() {
    console.log('Home Page loaded');
    this.rootElement = document.getElementById('root'); // Assuming you have a <div id="root"></div>
    this.render();
  }

  private render() {
    if (this.rootElement) {
      // Simple HTML content with Tailwind classes
      this.rootElement.innerHTML = `
        <div class="p-4">
          <h1 class="text-2xl font-bold mb-4">Home Page</h1>
          <p class="mb-4">Welcome to the home page!</p>
          <button id="logout-button" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
            Go to Login
          </button>
        </div>
      `;

      // Add event listener after rendering
      this.rootElement.querySelector('#logout-button')?.addEventListener('click', this.handleLogout);
    }
  }

  private handleLogout = () => {
    // Navigate to the login page
    route('/login');
  }

  dispose() {
    console.log('Home Page disposed');
    // Remove event listeners to prevent memory leaks
    this.rootElement?.querySelector('#logout-button')?.removeEventListener('click', this.handleLogout);
    // Clear content if needed
    if (this.rootElement) {
        this.rootElement.innerHTML = '';
    }
  }
}