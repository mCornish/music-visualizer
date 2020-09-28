// import {
//   JupyterFrontEnd,
//   JupyterFrontEndPlugin
// } from '@jupyterlab/application';

import { MainAreaWidget } from '@jupyterlab/apputils';

import { ILauncher } from '@jupyterlab/launcher';

import { reactIcon } from '@jupyterlab/ui-components';

import AudioWidget from './widget';

/**
 * Initialization data for the react-widget extension.
 */
const extension = {
  id: 'music-visualizer',
  autoStart: true,
  optional: [ILauncher],
  activate: (app, launcher) => {
    const { commands } = app;

    const command = 'create-react-widget';
    commands.addCommand(command, {
      caption: 'Create a new Music Visualizer Widget',
      label: 'Music Visualizer',
      icon: args => (args['isPalette'] ? null : reactIcon),
      execute: () => {
        const content = new AudioWidget();
        const widget = new MainAreaWidget({ content });
        widget.title.label = 'Music Visualizer';
        app.shell.add(widget, 'main');
      }
    });

    if (launcher) {
      launcher.add({
        command
      });
    }
  }
};

export default extension;
