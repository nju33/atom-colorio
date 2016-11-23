'use babel';

import html from 'choo/html';
import input from './input';
import palette from './palette';

export default function (state) {
  const view = (() => {
    if (state.original === '') {
      return html`
        <div class="colorio__box">
          ${input.apply(null, arguments)}
          <ul class='background-message centered'>
            <li>Colorio</li>
          </ul>
        </div>
      `;
    }

    return html`
      <div class="colorio__box">
        ${input.apply(null, arguments)}
        ${palette.apply(null, arguments)}
      </div>
    `;
  })();

  return view;
}
