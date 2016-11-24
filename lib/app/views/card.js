'use babel';

import html from 'choo/html';
import {SET_VALUE, SET_COLOR, SUCCESS_BTN, CANCEL_BTN} from '../models';

export default function (state, prev, send, {prop, color, idx}) {
  const uid = state._uid[prop];
  const hexData = (() => {
    if (!state._config.hex) {
      return null;
    }
    return html`
      <li class="colorio__card__data-item">
        <span>${color.toHexString()}</span>
        <a role="button" data-uid="${uid + idx + '.hex'}"
           class="icon icon-clippy ${(() => (
             state.successBtns.indexOf(uid + idx + '.hex') === -1 ?
               '' :
               'icon--success'
           ))()}"
           onclick=${handleCopy}></a>
      </li>
    `;
  })();

  const rgbData = (() => {
    if (!state._config.rgb) {
      return null;
    }
    return html`
      <li class="colorio__card__data-item">
        <span>${color.toRgbString()}</span>
        <a role="button" data-uid="${uid + idx + '.rgb'}"
           class="icon icon-clippy ${(() => (
             state.successBtns.indexOf(uid + idx + '.rgb') === -1 ?
               '' :
               'icon--success'
           ))()}"
           onclick=${handleCopy}></a>
      </li>
    `;
  })();

  const hsvData = (() => {
    if (!state._config.hsv) {
      return null;
    }
    return html`
      <li class="colorio__card__data-item">
        <span>${color.toHsvString()}</span>
        <a role="button" data-uid="${uid + idx + '.hsv'}"
           class="icon icon-clippy ${(() => (
             state.successBtns.indexOf(uid + idx + '.hsv') === -1 ?
               '' :
               'icon--success'
           ))()}"
           onclick=${handleCopy}></a>
      </li>
    `;
  })();

  const hslData = (() => {
    if (!state._config.hsl) {
      return null;
    }
    return html`
      <li class="colorio__card__data-item">
        <span>${color.toHslString()}</span>
        <a role="button" data-uid="${uid + idx + '.hsl'}"
           class="icon icon-clippy ${(() => (
             state.successBtns.indexOf(uid + idx + '.hsl') === -1 ?
               '' :
               'icon--success'
           ))()}"
           onclick=${handleCopy}></a>
      </li>
    `;
  })();

  return html`
    <li class="colorio__card__box">
      <div class="colorio__card__color"
           style="background-color:${color.toHexString()}"
           onclick=${handleSearch(color)}>
      </div>
      <ul class="colorio__card__data-list">
        ${hexData}
        ${rgbData}
        ${hsvData}
        ${hslData}
      </ul>
    </li>
  `;

  function handleSearch(color) {
    return () => {
      send(SET_VALUE, {value: color.toHexString()});
      send(SET_COLOR, {color});
    };
  }

  function handleCopy(e) {
    const btn = e.target;
    const uid = btn.dataset.uid;
    atom.clipboard.write(btn.previousElementSibling.innerText);
    send(SUCCESS_BTN, {uid});
    send(CANCEL_BTN, {uid});
  }
}
