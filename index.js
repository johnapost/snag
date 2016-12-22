'use strict';

const meaningOfLife = require('./lib/meaningOfLife');
const multiply = require('./lib/multiply');

const Hapi = require('hapi');

const server = new Hapi.Server();
server.connection({ 
    host: '0.0.0.0',
    port: 8888
});

// Add routes
server.route({
    method: 'GET',
    path:'/', 
    handler: function (request, reply) {
        return reply('at the rootzzzz');
    }
});

server.route({
    method: 'GET',
    path:'/hello', 
    handler: function (request, reply) {
        return reply('hello world');
    }
});

// Start the server
server.start((err) => {
    if (err) {
        throw err;
    }
    console.log('Server running at:', server.info.uri);
});

module.exports = () => multiply(meaningOfLife());
