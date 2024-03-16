import { StatusCodes } from 'http-status-codes';
import { testServer } from '../jest.setup';


describe('Pessoas - SignUp => Create', () => {
    it('Cadastrando usuário 1', async () => {
        const res1 = await testServer
            .post('/cadastrar')
            .send({
                name: 'Eder',
                password: '1234',
                email: 'eder@teste',
                levelId: 1
            });

        expect(res1.statusCode).toEqual(StatusCodes.CREATED);
        expect(typeof res1.body).toEqual('number');
    });

    it('Cadastrando usuário 2', async () => {
        const res1 = await testServer
            .post('/cadastrar')
            .send({
                name: 'Rodrigo',
                password: '1234',
                email: 'rodrigo@teste',
                levelId: 1
            });

        expect(res1.statusCode).toEqual(StatusCodes.CREATED);
        expect(typeof res1.body).toEqual('number');
    });

    it('Não pode deixar criar um registro => E-mail repetido ', async () => {
        const res1 = await testServer
            .post('/cadastrar')
            .send({
                name: 'Frank Willian',
                password: '1234',
                email: 'frankemailduplicado@teste',
                levelId: 1
            });

        expect(res1.statusCode).toEqual(StatusCodes.CREATED);
        expect(typeof res1.body).toEqual('number');


        const res2 = await testServer
            .post('/cadastrar')
            .send({
                name: 'Willian Frank',
                password: '1234',
                email: 'frankemailduplicado@teste',
                levelId: 2
            });

        expect(res2.statusCode).toEqual(StatusCodes.INTERNAL_SERVER_ERROR);
        expect(res2.body).toHaveProperty('errors.default');
    });

    it('Erro ao cadastrar usuário sem o e-mail', async () => {
        const res1 = await testServer
            .post('/cadastrar')
            .send({
                name: 'Eder sem email',
                password: '1234',
                levelId: 1
            });

        expect(res1.statusCode).toEqual(StatusCodes.BAD_REQUEST);
        expect(res1.body).toHaveProperty('errors.body.email');
    });

    it('Erro ao cadastrar usuário sem o nome', async () => {
        const res1 = await testServer
            .post('/cadastrar')
            .send({
                password: '1234',
                email: 'Edersemnome@teste',
                levelId: 1
            });

        expect(res1.statusCode).toEqual(StatusCodes.BAD_REQUEST);
        expect(res1.body).toHaveProperty('errors.body.name');
    });

    it('Erro ao cadastrar usuário sem a senha', async () => {
        const res1 = await testServer
            .post('/cadastrar')
            .send({
                name: 'Eder sem senha',
                email: 'Edersemsenha@teste',
                levelId: 1
            });

        expect(res1.statusCode).toEqual(StatusCodes.BAD_REQUEST);
        expect(res1.body).toHaveProperty('errors.body.password');
    });

    it('Erro ao cadastrar usuário com email invalido', async () => {
        const res1 = await testServer
            .post('/cadastrar')
            .send({
                name: 'Eder Email invalido',
                password: '1234',
                email: 'eder teste',
                levelId: 1
            });

        expect(res1.statusCode).toEqual(StatusCodes.BAD_REQUEST);
        expect(res1.body).toHaveProperty('errors.body.email');
    });

    it('Erro ao cadastrar usuário com senha muito pequena', async () => {
        const res1 = await testServer
            .post('/cadastrar')
            .send({
                name: 'Eder senha pequena',
                password: '12',
                email: 'edersenhapequena@teste',
                levelId: 1
            });

        expect(res1.statusCode).toEqual(StatusCodes.BAD_REQUEST);
        expect(res1.body).toHaveProperty('errors.body.password');
    });

    it('Erro ao cadastrar usuário com nome muito pequena', async () => {
        const res1 = await testServer
            .post('/cadastrar')
            .send({
                name: 'E',
                password: '12',
                email: 'edernomepequena@teste',
                levelId: 1
            });

        expect(res1.statusCode).toEqual(StatusCodes.BAD_REQUEST);
        expect(res1.body).toHaveProperty('errors.body.password');
    });


});