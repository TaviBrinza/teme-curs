let display = document.getElementById('display');

let buttons = Array.from(document.getElementsByClassName('button'));

buttons.map( button => {
    button.addEventListener('click', (e) => {
        switch(e.target.innerText){
            case 'C':
                display.innerText = '';
                break;

             case '←':
                    if (display.innerText){
                       display.innerText = display.innerText.slice(0, -1);
                    }
                    break;
            case '=':
                try{
                    display.innerText = eval(display.innerText);
                } catch {
                    display.innerText = "Error"
                }
                break;
            default:
                display.innerText += e.target.innerText;
        }
    });
});

const videoElement = document.getElementById('video-input');
const canvasElement = document.getElementById('canvas-output');
const canvasCtx = canvasElement.getContext('2d');

const holistic = new Holistic({locateFile: (file) => {
    return `https://cdn.jsdelivr.net/npm/@mediapipe/holistic/${file}`;
  }});
  holistic.setOptions({
    modelComplexity: 1,
    smoothLandmarks: true,
    minDetectionConfidence: 0.5,
    minTrackingConfidence: 0.5
  });
  function onResults(results) {
    canvasCtx.save();
    canvasCtx.clearRect(0, 0, canvasElement.width, canvasElement.height);
    canvasCtx.drawImage(
        results.image, 0, 0, canvasElement.width, canvasElement.height);
    drawConnectors(canvasCtx, results.leftHandLandmarks, HAND_CONNECTIONS,
                   {color: '#CC0000', lineWidth: 5});
    drawLandmarks(canvasCtx, results.leftHandLandmarks,
                  {color: '#00FF00', lineWidth: 2});
    drawConnectors(canvasCtx, results.rightHandLandmarks, HAND_CONNECTIONS,
                   {color: '#00CC00', lineWidth: 5});
    drawLandmarks(canvasCtx, results.rightHandLandmarks,
                  {color: '#FF0000', lineWidth: 2});
    canvasCtx.restore();
  }
  holistic.onResults(onResults);

  const camera =new Camera(
      videoElement ,{
          onFrame : async() => {
              await holistic.send({image:videoElement});
          },
          widt:450,
          height:450,

      }
  )
  camera.start();
