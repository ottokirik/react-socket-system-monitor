import { Cpu, Info, Mem } from '.';

export const Widget = ({
  data: {
    freeMem,
    totalMem,
    osType,
    upTime,
    usedMem,
    useageMem,
    cpuModel,
    cpusNumOfCores,
    cpuSpeed,
    cpuLoad,
    macA,
    isActive,
  },
}) => {
  const cpu = { cpuLoad };
  const mem = { freeMem, totalMem, useageMem, usedMem };
  const info = { osType, upTime, cpuModel, cpusNumOfCores, cpuSpeed, macA };

  return (
    <div className="widget">
      {!isActive && <div className="not-active">Offline</div>}
      <Cpu {...cpu} />
      <Mem {...mem} />
      <Info {...info} />
    </div>
  );
};
