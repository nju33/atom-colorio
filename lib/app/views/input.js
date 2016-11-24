'use babel';

import html from 'choo/html';
import tinycolor from 'tinycolor2';
import {SET_VALUE, SET_COLOR} from '../models';

export default function (state, prev, send) {
  return html`
    <form class="colorio__form">
      <input type="text" class="colorio__input native-key-bindings"
        value = ${state.value}
        placeholder="#fff000"
        onkeyup=${handleKeyup} />

      <ul class="colorio__history">
        ${state.history.slice(0, -1).map(color => (
          html`
            <li class="colorio__history-color"
                style="background-color: ${color.toHexString()}"
                onclick=${handleSearch(color)}>
            </li>
          `
        ))}
      </ul>
    </form>
  `;

  function handleKeyup(e) {
    const {value} = e.target;
    send(SET_VALUE, {value});
    const color = tinycolor(value);
    if (color.isValid()) {
      send(SET_COLOR, {color});
    }
  }

  function handleSearch(color) {
    return () => {
      send(SET_VALUE, {value: color.toHexString()});
      send(SET_COLOR, {color});
    };
  }
}
