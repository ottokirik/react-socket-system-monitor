import { io } from 'socket.io-client';

const socketURL = 'http://127.0.0.1:8181';

const socket = io(socketURL);

socket.emit('clientAuth', 'tdeuVhMa7+hj983d2cOdFo6s2bbIegNqh6v67M');

export { socket };
