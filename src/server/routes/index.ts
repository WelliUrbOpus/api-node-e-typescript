//import path from 'path';
//import { StatusCodes } from 'http-status-codes';
import { Router } from 'express';
import { CidadesController } from './../controllers';



const router = Router();

router.get('/', (_, res) => {
    return res.send('<h1 style ="color: blue;">Router home</h1>');
    //res.sendFile(path.join(__dirname, 'index.html'));//Teste para usar um html OK
});

router.post('/cidades', CidadesController.create);


export { router };