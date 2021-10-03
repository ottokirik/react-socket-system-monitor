import { useRef } from 'react';
import { drawCircle } from '../utilites';

export const Mem = ({ freeMem, totalMem, useageMem, usedMem }) => {
  const canvasRef = useRef();

  const totalMemInGB = (totalMem / Math.pow(1024, 3)).toFixed(2);
  const freeMemInGB = (freeMem / Math.pow(1024, 3)).toFixed(2);

  drawCircle(canvasRef.current, useageMem);

  return (
    <div className="mem">
      <h3>Memory Useage</h3>
      <div className="canvas-wrapper">
        <canvas ref={canvasRef} width="200" height="200"></canvas>
        <div className="mem-text">{useageMem}%</div>
      </div>
      <div>Total Memory: {totalMemInGB}gb</div>
      <div>Free Memory: {freeMemInGB}gb</div>
    </div>
  );
};
