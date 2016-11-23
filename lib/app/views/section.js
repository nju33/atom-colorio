'use babel';

import html from 'choo/html';
import card from './card';

export default function (state, prev, send, {headline, prop, inline}) {
  let colors = state[prop];
  if (!Array.isArray(colors)) {
    colors = colors ? [colors] : [];
  }

  return html`
    <section class="colorio__section ${inline && 'colorio__section--inline'}">
      <h3 class="colorio__headline">${headline}</h3>
      <ul class="colorio__cards">
        ${colors.map((color, idx) => (
          card(state, prev, send, {prop, color, idx})
        ))}
      </ul>
    </section>
  `;
}
