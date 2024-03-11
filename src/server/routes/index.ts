//import path from 'path';
import { Router } from 'express';
import { CidadesController } from './../controllers';



const router = Router();

router.get('/', (_, res) => {
    return res.send('<h1 style ="color: blue;">Router home</h1>');
    //res.sendFile(path.join(__dirname, 'index.html'));//Teste para usar um html OK
});


router.get('/cidades', CidadesController.getAllValidation, CidadesController.getAll);
router.post('/cidades', CidadesController.createValidation, CidadesController.create);
router.get('/cidades/:id', CidadesController.getByIdValidation, CidadesController.getById);
router.put('/cidades/:id', CidadesController.updateByIdValidation, CidadesController.updateById);
router.delete('/cidades/:id', CidadesController.deleteByIdValidation, CidadesController.deleteById);

router.get('/pessoas');
router.post('/pessoas');
router.get('/pessoas/:id');
router.put('/pessoas/:id');
router.delete('/pessoas/:id');


export { router };