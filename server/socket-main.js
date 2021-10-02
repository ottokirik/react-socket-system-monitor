const socketMain = (io, socket) => {
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

  socket.on('perfData', (data) => {
    console.log(data);
  });
};

module.exports = socketMain;
