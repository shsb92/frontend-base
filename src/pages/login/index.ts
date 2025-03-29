// src/pages/login/index.ts
import type { PageComponent } from '@interfaces/page';
import { route } from '@router/router';

export default class LoginPage implements PageComponent {
  private rootElement: HTMLElement | null;

  constructor() {
    console.log('Login Page loaded');
    this.rootElement = document.getElementById('root');
    this.render();
  }

  private render() {
    if (this.rootElement) {
      this.rootElement.innerHTML = `
        <div class="p-4">
          <h1 class="text-2xl font-bold mb-4">Login Page</h1>
          <p class="mb-4">Please log in.</p>
          <button id="login-button" class="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">
            Simulate Login (Go Home)
          </button>
        </div>
      `;
      this.rootElement.querySelector('#login-button')?.addEventListener('click', this.handleLogin);
    }
  }

  private handleLogin = () => {
    // Simulate successful login and navigate to home page
    // In a real app, you would set a token here first
    route('/'); // Navigate to home route
  }

  dispose() {
    console.log('Login Page disposed');
    this.rootElement?.querySelector('#login-button')?.removeEventListener('click', this.handleLogin);
    if (this.rootElement) {
      this.rootElement.innerHTML = '';
    }
  }
}