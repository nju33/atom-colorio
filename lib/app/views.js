'use babel';

import html from 'choo/html';
import rootView from './views/root-view';

export default function () {
  return html`
    ${rootView.apply(null, arguments)}
  `;
}
