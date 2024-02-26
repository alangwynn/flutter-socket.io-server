const { io } = require('../index');

io.on('connection', client => {
    console.log('cliente conectado');

    client.on('disconnect', () => {
        console.log('cliente desconectado');
    });

    client.on('mensaje', (payload) => {
        console.log('mensaje');

        io.emit('mensaje', {admin: 'Nuevo mensaje'});

    });

});