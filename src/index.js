import React, {
  useRef,
} from 'react';

export default function Canvas({
  /*A callback function provided to the canvas*/
  callback,
  /*All other props are passed directly to the canvas,
    so it behaves as a regular canvas would.*/
  ...otherProps
}) {
  const canvasRef = useRef(null);
  return (
    <canvas
      ref={canvasRef}
      {...otherProps}
    />
  );
}

