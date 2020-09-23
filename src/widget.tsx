import { ReactWidget } from '@jupyterlab/apputils';
import React, { useEffect, useState } from 'react';
import fetchAudio from './lib/fetchAudio';
import AudioVisualizer from './AudioVisualizer';

function Widget() {
  const [audio, setAudio] = useState();
  // Fetch audio
  useEffect(() => {
    (async () => {
      const audio: any = await fetchAudio();
      setAudio(audio);
      localStorage.setItem('audio-vis-audio', JSON.stringify(audio));
    })();
  }, [])
  return (
    <AudioVisualizer
      audio={audio}
    />
  )
}

/**
 * A Lumino Widget that wraps a Widget.
 */
export default class AudioWidget extends ReactWidget {
  /**
   * Constructs a new CounterWidget.
   */
  constructor() {
    super();
    this.addClass('jp-ReactWidget');
  }

  render(): JSX.Element {
    return <Widget />;
  }
}
