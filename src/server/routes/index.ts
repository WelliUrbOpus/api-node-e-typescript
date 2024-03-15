//import path from 'path';
import { Router } from 'express';
import { CidadesController, NivelUsuariosController, PessoasController, UsuariosController } from './../controllers';



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

router.get('/pessoas', PessoasController.getAllValidation, PessoasController.getAll);
router.post('/pessoas', PessoasController.createValidation, PessoasController.create);
router.get('/pessoas/:id', PessoasController.getByIdValidation, PessoasController.getById);
router.put('/pessoas/:id', PessoasController.updateByIdValidation, PessoasController.updateById);
router.delete('/pessoas/:id', PessoasController.deleteByIdValidation, PessoasController.deleteById);

router.get('/leveluser', NivelUsuariosController.getAllValidation, NivelUsuariosController.getAll);
router.post('/leveluser', NivelUsuariosController.createValidation, NivelUsuariosController.create);
router.get('/leveluser/:id', NivelUsuariosController.getByIdValidation, NivelUsuariosController.getById);

router.get('/usuarios', UsuariosController.getAllValidation, UsuariosController.getAll);
router.post('/usuarios', UsuariosController.createValidation, UsuariosController.create);
router.get('/usuarios/email/:email', UsuariosController.getByEmailValidation, UsuariosController.getByEmail);
router.get('/usuarios/name/:name', UsuariosController.getByNameValidation, UsuariosController.getByName);
router.put('/usuarios/:id', UsuariosController.updateByIdValidation, UsuariosController.updateById);

export { router };