const mongoose = require('mongoose');

mongoose.connect('mongodb://127.0.0.1:27017/perfData');

const Machine = require('./models/Machine');

const socketMain = (io, socket) => {
  let macA;

  socket.on('clientAuth', (token) => {
    if (token === 'fdsajfgaisd') {
      socket.join('clients');
    } else if (token === 'hlkjjlkhulhj;') {
      // valid ui token has joined
      socket.join('ui');
    } else {
      // an invalid token
      socket.disconnect(true);
    }
  });

  socket.on('initPerfData', async (data) => {
    macA = data.macA;
    const mongooseResponse = await checkAndAdd(data);

    console.log(mongooseResponse);
  });

  socket.on('perfData', (data) => {
    console.log(data);
  });
};

const checkAndAdd = async (data) => {
  try {
    const doc = await Machine.findOne({ macA: data.macA });

    if (doc === null) {
      new Machine(data).save();
      return 'added';
    }

    return 'found';
  } catch (err) {
    throw new Error('DB is unreachable');
  }
};

module.exports = socketMain;
