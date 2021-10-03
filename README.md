# Простой системный монитор

Проект, реализующий простой системный монитор. Написан по видео-курсу [Socket.IO (with websockets) - the details. (socket io v2)][1], третий проект.

## Библиотеки

- react
- express
- socket.io
- redis, socket.io-redis
- farmhash
- mongoose

### Опсание

Node клиент, запущенный на машине, собирает системную информацию и отсылает ее на сервер использую socket.io.

Сервер, запущенный в cluster mode сохраняет инфрормацию в БД. Redis необходим socket.io для организации взаимодействия между
сокетами в режиме нескольких кластеров.

React клиент обращается к серверу, получает данные и выводит их на экран.

[1]: https://www.udemy.com/course/socketio-with-websockets-the-details/ 'Socket.IO (with websockets) - the details. (socket io v2)'
