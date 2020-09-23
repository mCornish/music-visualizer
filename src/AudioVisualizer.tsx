import React, { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
// import '../style/AudioVisualizer.css';
import visualize from './lib/visualize';

export default function AudioVisualizer({ audio } : {audio: any}) {
  const canvas = useRef();
  const [mainAudio, setMainAudio]: any = useState({});
  const [visAudio, setVisAudio]: any = useState({});
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true);

  useEffect(() => {
    if (!audio) return undefined;
    const mainAudio = new Audio(audio.preview);
    const visAudio = new Audio(audio.preview);

    // Prevent cross-origin issue
    mainAudio.crossOrigin = 'anonymous';
    visAudio.crossOrigin = 'anonymous';

    // Mute by default
    mute(mainAudio);

    visualize(visAudio, canvas.current);

    setMainAudio(mainAudio);
    setVisAudio(visAudio);
    play(mainAudio, visAudio);
  }, [audio])

  return (
    <div className="AudioVisualizer">
      <h1>{audio ? audio.title : 'None'}</h1>
      <h2>{audio ? audio.artist.name : 'None'}</h2>
      <div className="contents" role="main">
        <canvas ref={canvas}></canvas>
        <div className="row">
          <button
            onClick={() => isPlaying ? stop(mainAudio, visAudio) : play(mainAudio, visAudio)}
          >{isPlaying ? 'Stop' : 'Play'}</button>
          <button
            onClick={() => isMuted ? unmute(mainAudio) : mute(mainAudio)}
          >{isMuted ? 'Unmute' : 'Mute'}</button>
        </div>
      </div>
    </div>
  )

  function play(main: any = mainAudio, vis: any = visAudio) {
    main.play();
    vis.play();
    setIsPlaying(true);
  }

  function stop(main: any = mainAudio, vis: any = visAudio) {
    main.pause();
    vis.pause();
    main.currentTime = 0;
    vis.currentTime = 0;
    setMainAudio(main);
    setVisAudio(vis);
    setIsPlaying(false);
  }

  function mute(audio: any) {
    audio.muted = true;
    setIsMuted(true);
  }
  function unmute(audio: any) {
    audio.muted = false;
    setIsMuted(false);
  }
}
AudioVisualizer.propTypes = {
  audio: PropTypes.object
}
