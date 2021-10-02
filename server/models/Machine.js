const { Schema, model } = require('mongoose');

const Machine = new Schema({
  macA: String,
  cpuLoad: Number,
  freeMem: Number,
  totalMem: Number,
  osType: String,
  upTime: Number,
  usedMem: Number,
  useageMem: Number,
  cpuModel: String,
  cpusNumOfCores: Number,
  cpuSpeed: Number,
});

module.exports = model('Machine', Machine);
