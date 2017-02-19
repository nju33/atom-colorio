'use babel';

import html from 'choo/html';
import noUiSlider from 'nouislider';
import {SET_STEP_VALUE} from '../models';
import card from './card';

const cacheEl = {
  Lighten: null,
  Darken: null,
  Saturate: null,
  Desaturate: null
};

export default function (state, prev, send, {headline, prop, inline, slider}) {
  let colors = state[prop];
  if (!Array.isArray(colors)) {
    colors = colors ? [colors] : [];
  }

  const start = (() => {
    if (headline === 'Lighten') {
      return state.lightenStepValue;
    } else if (headline === 'Darken') {
      return state.darkenStepValue;
    } else if (headline === 'Saturate') {
      return state.saturateStepValue;
    } else if (headline === 'Desaturate') {
      return state.desaturateStepValue;
    }
  })();

  if (slider && cacheEl[headline] === null) {
    cacheEl[headline] = document.createElement('div');
    noUiSlider.create(cacheEl[headline], {
      start,
      step: 1,
      range: {
        min: 1,
        max: 20
      }
    });
    cacheEl[headline].noUiSlider.on('change', value => {
      send(SET_STEP_VALUE, {headline, value: value[0]});
    });
  }

  return html`
    <section class="colorio__section ${inline && 'colorio__section--inline'}">
      <div>
        <h3 class="colorio__headline">${headline}</h3>
        <div class="colorio__slider">
          <span class="colorio__slider-value">${start}</span>
          ${cacheEl[headline]}
        </div>
      </div>
      <ul class="colorio__cards">
        ${colors.map((color, idx) => (
          card(state, prev, send, {prop, color, idx})
        ))}
      </ul>
    </section>
  `;
}
