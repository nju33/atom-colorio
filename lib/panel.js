'use babel';

export default {
  _panel: null,
  get() {
    return this._panel;
  },
  create(item) {
    this._panel = atom.workspace.addRightPanel({item, visible: false});
    return this._panel;
  }
};
