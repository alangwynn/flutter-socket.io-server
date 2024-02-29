const { io } = require('../index');
const Band = require('../models/band');
const Bands = require('../models/bands');

const bands = new Bands();

bands.addBand(new Band('Queen'));
bands.addBand(new Band('Bon Jovi'));
bands.addBand(new Band('Heroes del Silencio'));
bands.addBand(new Band('Metallica'));

io.on('connection', client => {
    console.log('cliente conectado');

    client.emit('active-bands', bands.getBands());

    client.on('disconnect', () => {
        console.log('cliente desconectado');
    });

    client.on('mensaje', (payload) => {

        io.emit('mensaje', {admin: 'Nuevo mensaje'});

    });

    client.on('vote-band', (payload) => {
        bands.voteBand(payload.id);
        io.emit('active-bands', bands.getBands());
    });

    client.on('create-band', (payload) => {
        const band = new Band(payload.name);
        bands.addBand(band);
        io.emit('active-bands', bands.getBands());
    });

    client.on('delete-band', (payload) => {
        bands.deleteBand(payload)
        io.emit('active-bands', bands.getBands());
    });

    // client.on('emitir-mensaje', (payload) => {

    //     // io.emit('nuevo-mensaje', payload);
    //     client.broadcast.emit('nuevo-mensaje', payload);

    // });

});