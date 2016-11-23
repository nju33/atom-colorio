'use babel';

import uniqid from 'uniqid';
import subscriptions from '../subscriptions';
import config from '../config';

const UPDATE_CONFIG = 'UPDATE_CONFIG';
export const SET_VALUE = 'SET_VALUE';
export const SET_COLOR = 'SET_COLOR';
export const SUCCESS_BTN = 'SUCCESS_BTN';
export const RESET_BTN = 'RESET_BTN';
export const CANCEL_BTN = 'CANCEL_BTN';

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
      darkenColors: uniqid()
    },
    value: '',
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
    darkenColors: []
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
      return Object.assign({}, state, {
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
        ))
      });
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
    send => {
      subscriptions.add(atom.config.onDidChange('colorio.hex', value => {
        send(UPDATE_CONFIG, {hex: value});
      }));
      subscriptions.add(atom.config.onDidChange('colorio.rgb', value => {
        send(UPDATE_CONFIG, {rgb: value});
      }));
      subscriptions.add(atom.config.onDidChange('colorio.hsv', value => {
        send(UPDATE_CONFIG, {hsv: value});
      }));
      subscriptions.add(atom.config.onDidChange('colorio.hsl', value => {
        send(UPDATE_CONFIG, {hsl: value});
      }));
    }
  ]
};
