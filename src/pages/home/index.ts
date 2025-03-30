import type { PageComponent } from '@interfaces/page';
import { route } from '@/utils/router';
import { renderer, DOMElement } from '@/utils';

export default class HomePage extends DOMElement implements PageComponent {

  constructor() {
    super(document.createElement('div'));
    console.log('Home Page loaded');
    this.render();
  }

  private render() {
    this.setClass('min-h-screen bg-gray-100');
    this.add(new DOMElement(document.createElement('h1')).setTextContent('Welcome Home'));
    this.add(new DOMElement(document.createElement('button')).setTextContent('Logout').onClick(this.handleLogout));
    renderer.render(this);
  }

  private handleLogout = () => {
    // Navigate to the login page
    route('/login');
  }

  dispose() {
    console.log('Home Page disposed');
    renderer.render(null);
  }
}