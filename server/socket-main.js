const mongoose = require('mongoose');

mongoose.connect('mongodb://127.0.0.1:27017/perfData');

const Machine = require('./models/Machine');

const socketMain = (io, socket) => {
  let macA;

  socket.on('clientAuth', (token) => {
    if (token === 'TqhhIICJCKesUUdOYNnOyb9LoQtnb+B9d/') {
      socket.join('clients');
    } else if (token === 'tdeuVhMa7+hj983d2cOdFo6s2bbIegNqh6v67M') {
      // valid ui token has joined
      socket.join('ui');
      Machine.find({}, (err, docs) => {
        docs.forEach((aMachine) => {
          // on load, assume that all machines are offline
          aMachine.isActive = false;
          io.to('ui').emit('data', aMachine);
        });
      });
    } else {
      // an invalid token
      socket.disconnect(true);
    }
  });

  socket.on('initPerfData', async (data) => {
    macA = data.macA;
    const mongooseResponse = await checkAndAdd(data);
  });

  socket.on('perfData', (data) => {
    console.log('Tick...');
    io.to('ui').emit('data', data);
  });

  socket.on('disconnect', () => {
    Machine.find({ macA: macA }, (err, docs) => {
      if (docs.length > 0) {
        // send one last emit to React
        const data = { ...docs[0]._doc, isActive: false };

        io.to('ui').emit('data', data);
      }
    });
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
