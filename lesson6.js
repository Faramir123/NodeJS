const socket = require('socket.io');
const http = require('http');
const path = require('path');
const fs = require('fs');

const server = http.createServer((req, res) => {
    const indexPath = path.join(__dirname, 'index.html');
    const readStream = fs.createReadStream(indexPath);

    readStream.pipe(res);
});

const io = socket(server);
let counterUser = 0;
let userOnServer = ''
io.on('connection', (client) => {
    console.log('New client:', client.id);
    //увеличиваем счетчик при подключении нового пользователя
    counterUser+=1;
    //подписка на сообщения от клиента
    client.on('client-msg', data => {
        console.log(data);
       const payload = {
            message: data.message.split('').reverse().join(''),
            author: data.author,
            color: data.color
        };
        //возврат сообщений переданных от клиента обратно клиенту через событие
        client.broadcast.emit('server-msg', payload);
        client.emit('server-msg', payload);
    });
    //подписались на событие реконнекта пользователя по нажатию кнопки на стороне клиента
    client.on('reconnect', (user)=>{
         console.log('reconnection CLIENT', user)
         userOnServer = user
         client.broadcast.emit('server-reconnect', userOnServer)
         client.emit('server-reconnect', userOnServer)
        });
    //подписались на событие подключения пользователя  
    client.on('client-connect', (user)=>{
        userOnServer = user
        client.broadcast.emit('server-user-connect', userOnServer)
        client.emit('server-user-connect', userOnServer)
    });
//В случае дисконнекта будет стрелять событие и на клиентской части глобально отражаться кто вышел из сети
    client.on('disconnect', ()=> {
        const userClient = userOnServer
        console.log('DISCONNECT CLIENT',userClient)
        counterUser-=1
        console.log('userOnServer', userClient)
        client.emit('server-user-disconnect', userClient)
        client.broadcast.emit('server-user-disconnect', userClient)  
    });
    //создали событие количества пользователей на сервере, для подписки и передачи данных на клиента
    client.emit('server-cnt', counterUser)
});

server.listen(5555);
