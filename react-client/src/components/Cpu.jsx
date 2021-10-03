import { useRef } from 'react';
import { drawCircle } from '../utilites';

export const Cpu = ({ cpuLoad }) => {
  const canvasRef = useRef();

  drawCircle(canvasRef.current, cpuLoad);

  return (
    <div className="cpu">
      <h3>CPU Load:</h3>
      <div className="canvas-wrapper">
        <canvas ref={canvasRef} width="200" height="200"></canvas>
        <div className="cpu-text">{`${cpuLoad} %`}</div>
      </div>
    </div>
  );
};
