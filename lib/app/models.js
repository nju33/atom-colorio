'use babel';

import uniqid from 'uniqid';
import tinycolor from 'tinycolor2';
import _panel from '../panel';
import subscriptions from '../subscriptions';
import config from '../config';

const UPDATE_CONFIG = 'UPDATE_CONFIG';
export const SET_VALUE = 'SET_VALUE';
export const SET_COLOR = 'SET_COLOR';
export const SUCCESS_BTN = 'SUCCESS_BTN';
export const RESET_BTN = 'RESET_BTN';
export const CANCEL_BTN = 'CANCEL_BTN';

let panel = null;

export const models = {
  state: {
    _config: config,
    _uid: {
      original: uniqid(),
      monochromaticColors: uniqid(),
      analogousColors: uniqid(),
      greyscaleColor: uniqid(),
      complementColor: uniqid(),
      splitComplementColors: uniqid(),
      triadicColors: uniqid(),
      tetradicColors: uniqid(),
      lightenColors: uniqid(),
      darkenColors: uniqid(),
      saturateColors: uniqid(),
      desaturateColors: uniqid()
    },
    value: '',
    history: [],
    successBtns: [],
    original: '',
    monochromaticColors: [],
    analogousColors: [],
    greyscaleColor: '',
    complementColor: '',
    splitComplementColors: [],
    triadicColors: [],
    tetradicColors: [],
    lightenColors: [],
    darkenColors: [],
    saturateColors: [],
    desaturateColors: []
  },

  reducers: {
    [UPDATE_CONFIG](config, state) {
      const nextState = Object.assign({}, state);
      Object.assign(nextState._config, config);
      return nextState;
    },
    [SET_VALUE]({value}, state) {
      return Object.assign({}, state, {value});
    },
    [SET_COLOR]({color}, state) {
      if (state.history.length > 10) {
        state.history.shift();
      }

      const nextState = Object.assign({}, state, {
        original: color,
        monochromaticColors: color.monochromatic(),
        analogousColors: color.analogous(),
        greyscaleColor: color.clone().greyscale(),
        complementColor: color.clone().complement(),
        splitComplementColors: color.splitcomplement(),
        triadicColors: color.triad(),
        tetradicColors: color.tetrad(),
        lightenColors: Array(6).fill().map((item, idx) => (
          color.clone().lighten((idx + 1) * 10)
        )),
        darkenColors: Array(6).fill().map((item, idx) => (
          color.clone().darken((idx + 1) * 10)
        )),
        saturateColors: Array(6).fill().map((item, idx) => (
          color.clone().saturate((idx + 1) * 10)
        )),
        desaturateColors: Array(6).fill().map((item, idx) => (
          color.clone().desaturate((idx + 1) * 10)
        ))
      });

      nextState.history.push(color.clone());
      return nextState;
    },

    [SUCCESS_BTN]({uid}, state) {
      const nextState = Object.assign({}, state);
      nextState.successBtns.push(uid);
      return nextState;
    },

    [RESET_BTN]({uid}, state) {
      const nextState = Object.assign({}, state);
      (btns => {
        nextState.successBtns.splice(btns.indexOf(uid), 1);
      })(nextState.successBtns);
      return nextState;
    }
  },

  effects: {
    [CANCEL_BTN]({uid}, state, send, done) {
      setTimeout(() => {
        send(RESET_BTN, {uid}, done);
      }, 4000);
    }
  },

  subscriptions: [
    (send, done) => {
      subscriptions.add(atom.commands.onDidDispatch(ev => {
        if (ev.type !== 'core:copy') {
          return;
        }
        determineAndProcess(atom.clipboard.read(), send, done);
      }));
      subscriptions.add(atom.config.onDidChange('colorio.hex', value => {
        send(UPDATE_CONFIG, {hex: value}, done);
      }));
      subscriptions.add(atom.config.onDidChange('colorio.rgb', value => {
        send(UPDATE_CONFIG, {rgb: value}, done);
      }));
      subscriptions.add(atom.config.onDidChange('colorio.hsv', value => {
        send(UPDATE_CONFIG, {hsv: value}, done);
      }));
      subscriptions.add(atom.config.onDidChange('colorio.hsl', value => {
        send(UPDATE_CONFIG, {hsl: value}, done);
      }));
      subscriptions.add(atom.commands.add('atom-workspace', {
        'Colorio: Search': () => {
          const item = atom.workspace.getActivePaneItem();
          if (({}).toString.call(item.selections) === '[object Undefined]') {
            return;
          }

          const colorText = item.selections[0].getText();
          determineAndProcess(colorText, send, done);
        }
      }));
      function determineAndProcess(text, send, done) {
        const color = tinycolor(text);
        if (!color.isValid()) {
          return;
        }

        if (panel === null) {
          panel = _panel.get();
        }

        if (!panel.isVisible()) {
          panel.show();
        }
        send(SET_VALUE, {value: color.toHexString()}, done);
        send(SET_COLOR, {color}, done);
      }
    }
  ]
};
