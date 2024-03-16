//import path from 'path';
import { Router } from 'express';
import { CidadesController, NivelUsuariosController, PessoasController, UsuariosController } from './../controllers';
import { ensureAuthenticated } from '../shared/middleware';



const router = Router();

router.get('/', (_, res) => {
    return res.send('<h1 style ="color: blue;">Router home</h1>');
    //res.sendFile(path.join(__dirname, 'index.html'));//Teste para usar um html OK
});


router.get('/cidades',ensureAuthenticated, CidadesController.getAllValidation, CidadesController.getAll);
router.post('/cidades',ensureAuthenticated, CidadesController.createValidation, CidadesController.create);
router.get('/cidades/:id',ensureAuthenticated, CidadesController.getByIdValidation, CidadesController.getById);
router.put('/cidades/:id',ensureAuthenticated, CidadesController.updateByIdValidation, CidadesController.updateById);
router.delete('/cidades/:id',ensureAuthenticated, CidadesController.deleteByIdValidation, CidadesController.deleteById);

router.get('/pessoas',ensureAuthenticated, PessoasController.getAllValidation, PessoasController.getAll);
router.post('/pessoas',ensureAuthenticated, PessoasController.createValidation, PessoasController.create);
router.get('/pessoas/:id',ensureAuthenticated, PessoasController.getByIdValidation, PessoasController.getById);
router.put('/pessoas/:id',ensureAuthenticated, PessoasController.updateByIdValidation, PessoasController.updateById);
router.delete('/pessoas/:id',ensureAuthenticated, PessoasController.deleteByIdValidation, PessoasController.deleteById);

//router.post('/leveluser', NivelUsuariosController.createValidation, NivelUsuariosController.create);
router.get('/leveluser',ensureAuthenticated, NivelUsuariosController.getAllValidation, NivelUsuariosController.getAll);
router.get('/leveluser/:id',ensureAuthenticated, NivelUsuariosController.getByIdValidation, NivelUsuariosController.getById);

router.get('/usuarios',ensureAuthenticated, UsuariosController.getAllValidation, UsuariosController.getAll);
router.put('/usuarios/update',ensureAuthenticated, UsuariosController.updateByIdValidation, UsuariosController.updateById);
router.post('/cadastrar', UsuariosController.createValidation, UsuariosController.create);
router.get('/entrar', UsuariosController.signInValidation, UsuariosController.signIn);

export { router };