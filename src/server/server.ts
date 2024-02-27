import express from 'express';

const server = express();

server.delete('/teste', (_, res) => {
  return res.send('Ola, DEV');
});


export { server };