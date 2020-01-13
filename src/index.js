import React, {
  useRef,
  useEffect,
} from 'react';

function useCanvasCallback(canvasRef, callback) {
  useEffect(() => {
    /*Only relevant if canvas and callback exist,
      otherwise there is nothing that can be done.*/
    if (canvasRef.current && callback) {
      /*Keeps track of the request ID, which we need to be
        able to cancel an animation frame.*/
      let requestID = null;
      /*Wrapper that handles the management related to
        calling the animation frames as well as calling
        the callback itself*/
      const step = () => {
        callback(canvasRef.current);
        requestID = window.requestAnimationFrame(step);
      };
      step();
      /*Prevents step function from being called anymore*/
      const cleanup = () => {
        if (requestID) {
          window.cancelAnimationFrame(requestID);
        }
      };
      return cleanup;
    }
  }, [canvasRef, callback]);
}

export default function Canvas({
  /*A callback function provided to the canvas*/
  callback,
  /*All other props are passed directly to the canvas,
    so it behaves as a regular canvas would.*/
  ...otherProps
}) {
  const canvasRef = useRef(null);
  useCanvasCallback(canvasRef, callback);
  return (
    <canvas
      ref={canvasRef}
      {...otherProps}
    />
  );
}

