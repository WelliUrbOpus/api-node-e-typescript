import { server } from './server/server';

server.listen(process.env.PORT || 3333, () => {
  console.log(`\nApp rodando, \nna porta: ${ process.env.PORT || 3333 }`);
});