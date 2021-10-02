const os = require('os');
const io = require('socket.io-client');
const socket = io('http://127.0.0.1:8181');

socket.on('connect', () => {
  // We need to identify our machine
  const nI = os.networkInterfaces();

  let macA = '';

  for (let key in nI) {
    // We need to find non-internal MAC address
    if (!nI[key][0].internal) {
      macA = nI[key][0].mac;
      break;
    }
  }

  socket.emit('clientAuth', 'jklg;fdsajfgaisd');

  const perfDataInterval = setInterval(() => {
    performanceData().then((data) => {
      socket.emit('perfData', data);
    });
  }, 1000);
});

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
