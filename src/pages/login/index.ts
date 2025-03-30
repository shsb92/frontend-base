import type { PageComponent } from '@interfaces/page';
import { route } from '@/utils/router';
import { renderer, DOMElement } from '@/utils';

export default class LoginPage extends DOMElement implements PageComponent {

  constructor() {
    super(document.createElement('div'));
    console.log('Login Page loaded');
    this.render();
  }

  private render() {
    this.setClass('min-h-screen flex items-center justify-center bg-gray-100');
    this.add(new DOMElement(document.createElement('h1')).setTextContent('Login'));
    this.add(new DOMElement(document.createElement('input')).setType('text').setPlaceholder('Username'));
    this.add(new DOMElement(document.createElement('input')).setType('password').setPlaceholder('Password'));
    this.add(new DOMElement(document.createElement('button')).setTextContent('Login').onClick(this.handleLogin));
    renderer.render(this);
  }

  private handleLogin = () => {
    // Simulate successful login and navigate to home page
    // In a real app, you would set a token here first
    route('/'); // Navigate to home route
  }

  dispose() {
    console.log('Login Page disposed');
    renderer.render(null);
  }
}