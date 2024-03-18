import { StatusCodes } from 'http-status-codes';
import { testServer } from '../jest.setup';


describe('Teste controller - SignIn => Login de usuário', () => {
    beforeAll(async () => {
        await testServer.post('/cadastrar').send({
            name: 'Eder Login',
            password: '123456',
            email: 'ederlogin@teste',
            levelId: 1
        });
    });

    it('Faz login - typeLogin: name', async () => {
        const res1 = await testServer
            .post('/entrar')
            .send({
                typeLogin: 'name',
                user: 'Eder Login',
                password: '123456'
            });

        expect(res1.statusCode).toEqual(StatusCodes.OK);
        expect(res1.body).toHaveProperty('accessToken');
    });

    it('Faz login - typeLogin: email', async () => {
        const res1 = await testServer
            .post('/entrar')
            .send({
                typeLogin: 'email',
                user: 'ederlogin@teste',
                password: '123456'
            });

        expect(res1.statusCode).toEqual(StatusCodes.OK);
        expect(res1.body).toHaveProperty('accessToken');
    });

    it('Logar com senha errada - typeLogin: name', async () => {
        const res1 = await testServer
            .post('/entrar')
            .send({
                typeLogin: 'name',
                user: 'Eder Login',
                password: '12345678'
            });

        expect(res1.statusCode).toEqual(StatusCodes.UNAUTHORIZED);
        expect(res1.body).toHaveProperty('errors.default');
    });

    it('Logar com senha errada - typeLogin: email', async () => {
        const res1 = await testServer
            .post('/entrar')
            .send({
                typeLogin: 'email',
                user: 'ederlogin@teste',
                password: '12345678'
            });

        expect(res1.statusCode).toEqual(StatusCodes.UNAUTHORIZED);
        expect(res1.body).toHaveProperty('errors.default');
    });

    it('Logar com usuário errada - typeLogin: name', async () => {
        const res1 = await testServer
            .post('/entrar')
            .send({
                typeLogin: 'name',
                user: 'Eder Login errado',
                password: '123456'
            });

        expect(res1.statusCode).toEqual(StatusCodes.UNAUTHORIZED);
        expect(res1.body).toHaveProperty('errors.default');
    });

    it('Logar com usuário errada - typeLogin: email', async () => {
        const res1 = await testServer
            .post('/entrar')
            .send({
                typeLogin: 'email',
                user: 'ederlogin@testeerrado',
                password: '123456'
            });

        expect(res1.statusCode).toEqual(StatusCodes.UNAUTHORIZED);
        expect(res1.body).toHaveProperty('errors.default');
    });

    it('Logar sem typeLogin informado', async () => {
        const res1 = await testServer
            .post('/entrar')
            .send({
                user: 'ederlogin@teste',
                password: '123456'
            });

        expect(res1.statusCode).toEqual(StatusCodes.BAD_REQUEST);
        expect(res1.body).toHaveProperty('errors.body.typeLogin');
    });

    it('Logar com typeLogin invalido', async () => {
        const res1 = await testServer
            .post('/entrar')
            .send({
                typeLogin: 'e-mail',
                user: 'ederlogin@teste',
                password: '123456'
            });

        expect(res1.statusCode).toEqual(StatusCodes.BAD_REQUEST);
        expect(res1.body).toHaveProperty('errors.body.typeLogin');
    });

    it('Formato de email invalido', async () => {
        const res1 = await testServer
            .post('/entrar')
            .send({
                typeLogin: 'email',
                user: 'ederloginteste',
                password: '1234'
            });

        expect(res1.statusCode).toEqual(StatusCodes.UNAUTHORIZED);
        expect(res1.body).toHaveProperty('errors.default');
    });

    it('Erro de senha muito pequena - typeLogin: name', async () => {
        const res1 = await testServer
            .post('/entrar')
            .send({
                typeLogin: 'name',
                user: 'Eder Login',
                password: '123'
            });

        expect(res1.statusCode).toEqual(StatusCodes.BAD_REQUEST);
        expect(res1.body).toHaveProperty('errors.body.password');
    });

    it('Erro de senha muito pequena - typeLogin: email', async () => {
        const res1 = await testServer
            .post('/entrar')
            .send({
                typeLogin: 'email',
                user: 'ederlogin@teste',
                password: '123'
            });

        expect(res1.statusCode).toEqual(StatusCodes.BAD_REQUEST);
        expect(res1.body).toHaveProperty('errors.body.password');
    });

    it('Não informar a senha - typeLogin: name', async () => {
        const res1 = await testServer
            .post('/entrar')
            .send({
                typeLogin: 'name',
                user: 'Eder Login'
            });

        expect(res1.statusCode).toEqual(StatusCodes.BAD_REQUEST);
        expect(res1.body).toHaveProperty('errors.body.password');
    });

    it('Não informar a senha - typeLogin: email', async () => {
        const res1 = await testServer
            .post('/entrar')
            .send({
                typeLogin: 'email',
                user: 'ederlogin@teste'                
            });

        expect(res1.statusCode).toEqual(StatusCodes.BAD_REQUEST);
        expect(res1.body).toHaveProperty('errors.body.password');
    });

    it('Não informar o usuário - typeLogin: name', async () => {
        const res1 = await testServer
            .post('/entrar')
            .send({
                typeLogin: 'name',
                password:'1234'
            });

        expect(res1.statusCode).toEqual(StatusCodes.BAD_REQUEST);
        expect(res1.body).toHaveProperty('errors.body.user');
    });

    it('Não informar o usuário - typeLogin: email', async () => {
        const res1 = await testServer
            .post('/entrar')
            .send({
                typeLogin: 'email',
                password:'1234'
            });

        expect(res1.statusCode).toEqual(StatusCodes.BAD_REQUEST);
        expect(res1.body).toHaveProperty('errors.body.user');
    });
    

});