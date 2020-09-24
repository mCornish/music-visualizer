# Music Visualizer

This JupyterLab extension plays music and visualizes the frequencies.

To get started:

As a prerequisite, you will need [Anaconda](https://docs.anaconda.com/anaconda/install/) to install JupyterLab. After that is installed, run the commands below to install all dependencies and start JupyterLab.

```bash
  conda env create && \
  conda activate music-visualizer && \
  jlpm && \
  jlpm run build && \
  jupyter labextension install . && \
  jupyter lab
```

After JupyterLab has started, take a look at the Launcher tab and find the "Music Visualizer" extension (it uses the React icon). Click on that to open the extension and enjoy!

## Install

```bash
jlpm
jlpm build
jupyter labextension install .

# Rebuild Typescript source after making changes
jlpm build
# Rebuild JupyterLab after making any changes
jupyter lab build
```

You can watch the source directory and run JupyterLab in watch mode to watch for changes in the extension's source and automatically rebuild the extension and application.

```bash
# Watch the source directory in another terminal tab
jlpm watch
# Run jupyterlab in watch mode in one terminal tab
jupyter lab --watch
```
