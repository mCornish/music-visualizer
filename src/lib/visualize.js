// The bulk of this logic was derived from here:
// https://developer.mozilla.org/en-US/docs/Web/API/Web_Audio_API/Visualizations_with_Web_Audio_API

export default function visualize(audio, canvas, { width = 300, height = 100} = {}) {
  let audioCtx = null;

  // Avoids error when testing
  try {
    audioCtx = new (window.AudioContext)();
  } catch(err) {
    if (err.message.indexOf('is not a constructor') >= 0) {
      return undefined;
    }
  }

  const analyser = audioCtx.createAnalyser();

  const source = audioCtx.createMediaElementSource(audio);
  source.connect(analyser);

  analyser.fftSize = 2048;
  const bufferLength = analyser.frequencyBinCount;
  const dataArray = new Uint8Array(bufferLength);

  const canvasCtx = canvas.getContext('2d');

  canvasCtx.clearRect(0, 0, width, height);

  function draw() {
    requestAnimationFrame(draw);
    analyser.getByteTimeDomainData(dataArray);
    canvasCtx.fillStyle = 'rgba(10,10,10)';
    canvasCtx.fillRect(0, 0, width, height);
    canvasCtx.lineWidth = 2;
    canvasCtx.strokeStyle = 'rgb(128,21,155)';
    canvasCtx.beginPath();

    var sliceWidth = width * 1.0 / bufferLength;
    var x = 0;

    for (var i = 0; i < bufferLength; i++) {
      var v = dataArray[i] / 128.0;
      var y = v * height / 2;

      if (i === 0) {
        canvasCtx.moveTo(x, y);
      } else {
        canvasCtx.lineTo(x, y);
      }

      x += sliceWidth;
    }

    canvasCtx.lineTo(canvas.width, canvas.height/2);
    canvasCtx.stroke();
  }

  draw();
}
