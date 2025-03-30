import { renderer, DOMElement } from '@/utils';
import type { PageComponent } from '@interfaces/page';
import { route } from '@utils/router';

export default class NotFoundPage extends DOMElement implements PageComponent {

  constructor() {
    super(document.createElement('div'));
    console.log('404 Page loaded');
    this.render();
  }

  private render() {
    this.setClass('p-4 text-center');
    this.setTextContent('404 Page'); 
    this.add(new DOMElement(document.createElement('h1')).setTextContent('404 Page'));
    this.add(new DOMElement(document.createElement('p')).setTextContent('Oops! Page not found.'));
    this.add(new DOMElement(document.createElement('button')).setTextContent('Go Back Home').onClick(this.goHome));
    renderer.render(this);
  }

  private goHome = () => {
    route('/'); // Navigate to home route
  }

  dispose() {
    console.log('404 Page disposed');
    renderer.render(null);
  }
}