import {
  JupyterFrontEnd,
  JupyterFrontEndPlugin
} from '@jupyterlab/application';

import { MainAreaWidget } from '@jupyterlab/apputils';

import { ILauncher } from '@jupyterlab/launcher';

import { reactIcon } from '@jupyterlab/ui-components';

import AudioWidget from './widget';

/**
 * The command IDs used by the react-widget plugin.
 */
// namespace CommandIDs {
//   export const create = 'create-react-widget';
// }

/**
 * Initialization data for the react-widget extension.
 */
const extension: JupyterFrontEndPlugin<void> = {
  id: 'react-widget',
  autoStart: true,
  optional: [ILauncher],
  activate: (app: JupyterFrontEnd, launcher: ILauncher) => {
    const { commands } = app;

    const command = 'create-react-widget';
    commands.addCommand(command, {
      caption: 'Create a new Music Visualizer Widget',
      label: 'Music Visualizer',
      icon: args => (args['isPalette'] ? null : reactIcon),
      execute: () => {
        const content = new AudioWidget();
        const widget = new MainAreaWidget<AudioWidget>({ content });
        widget.title.label = 'React Widget';
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
