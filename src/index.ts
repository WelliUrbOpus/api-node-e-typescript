import { Knex } from './server/database/knex';
import { server } from './server/server';


const startServer = () => {
    server.listen(process.env.PORT || 3333, () => {
        console.log(`\nApp rodando, \nna porta: ${process.env.PORT || 3333}`);
        console.log(`Servidor está rodando em http://localhost:${process.env.PORT || 3333}`);
    });
};

if (process.env.IS_LOCALHOST !== 'true') {

    Knex.migrate.latest().then(() => {
        startServer();
    }).catch(console.log);
} else {
    startServer();
}