'use babel';

import subscriptions from './subscriptions';

export default {
  panel: null,
  subscriptions: subscriptions,

  config: {
    hex: {
      type: 'boolean',
      title: 'Show hex',
      default: true
    },
    rgb: {
      type: 'boolean',
      title: 'Show rgb',
      default: true
    },
    hsv: {
      type: 'boolean',
      title: 'Show hsv',
      default: false
    },
    hsl: {
      type: 'boolean',
      title: 'Show hsl',
      default: false
    }
  },

  activate() {
    const app = require('./app');
    this.panel = atom.workspace.addRightPanel({item: app.start()});
    this.subscriptions.add(atom.commands.add('atom-workspace', {
      'Colorio: Toggle': () => this.toggle()
    }));
  },

  deactivate() {
    this.panel.destroy();
    this.subscriptions.dispose();
  },

  toggle() {
    return (
      this.panel.isVisible() ?
      this.panel.hide() :
      this.panel.show()
    );
  }
};
