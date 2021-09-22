const os = require('os');

const performanceData = async () => {
  // OS
  const osType = os.type();

  // Working time
  const upTime = os.uptime();

  // Memory
  const totalMem = os.totalmem();
  const freeMem = os.freemem();
  const usedMem = totalMem - freeMem;
  const useageMem = Math.floor((usedMem / totalMem) * 100);

  // CPU
  const cpus = os.cpus(); // Array of CPU cores
  const cpuModel = cpus[0].model;
  const cpusNumOfCores = cpus.length;
  const cpuSpeed = cpus[0].speed;

  const cpuLoad = await getCpuLoad();

  return {
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
  };
};

const cpuAverage = () => {
  const cpus = os.cpus(); // When call, this info will be new
  let idleMs = 0;
  let totalMs = 0;

  cpus.forEach((aCore) => {
    for (type in aCore.times) {
      totalMs += aCore.times[type];
    }
    idleMs += aCore.times.idle;
  });

  return {
    idle: idleMs / cpus.length,
    total: totalMs / cpus.length,
  };
};

const getCpuLoad = () => {
  return new Promise((resolve, reject) => {
    const start = cpuAverage();

    setTimeout(() => {
      const end = cpuAverage();

      const idleDifference = end.idle - start.idle;
      const totalDifference = end.total - start.total;

      const percentageCpu =
        100 - Math.floor((100 * idleDifference) / totalDifference);

      resolve(percentageCpu);
    }, 100);
  });
};

performanceData().then((data) => console.log(data));
