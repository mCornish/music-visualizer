import React, { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import '../style/AudioVisualizer.css';
import visualize from './lib/visualize';

export default function AudioVisualizer({ audio, width, height }) {
  const canvas = useRef();
  const [mainAudio, setMainAudio]= useState({});
  const [visAudio, setVisAudio] = useState({});
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

    visualize(visAudio, canvas.current, { width, height });

    setMainAudio(mainAudio);
    setVisAudio(visAudio);
    play(mainAudio, visAudio);
  }, [audio, width, height]);

  return (
    <div className="AudioVisualizer">
      <h1>{audio ? audio.title : 'None'}</h1>
      <h2>{audio ? audio.artist.name : 'None'}</h2>
      <div className="contents" role="main">
        <canvas ref={canvas} width={width} height={height}/>
        <div className="row">
          <button
            onClick={() =>
              isPlaying ? stop(mainAudio, visAudio) : play(mainAudio, visAudio)
            }
          >
            {isPlaying ? 'Stop' : 'Play'}
          </button>
          <button
            onClick={() => (isMuted ? unmute(mainAudio) : mute(mainAudio))}
          >
            {isMuted ? 'Unmute' : 'Mute'}
          </button>
        </div>
      </div>
    </div>
  );

  function play(main = mainAudio, vis = visAudio) {
    main.play();
    vis.play();
    setIsPlaying(true);
  }

  function stop(main = mainAudio, vis = visAudio) {
    main.pause();
    vis.pause();
    main.currentTime = 0;
    vis.currentTime = 0;
    setMainAudio(main);
    setVisAudio(vis);
    setIsPlaying(false);
  }

  function mute(audio) {
    audio.muted = true;
    setIsMuted(true);
  }
  function unmute(audio) {
    audio.muted = false;
    setIsMuted(false);
  }
}
AudioVisualizer.propTypes = {
  audio: PropTypes.object,
  width: PropTypes.number,
  height: PropTypes.number
};
