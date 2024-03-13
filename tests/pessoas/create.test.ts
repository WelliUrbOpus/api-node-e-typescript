import { StatusCodes } from 'http-status-codes';
import { testServer } from '../jest.setup';


describe('Pessoas - Create', () => {
    let cidadeId: number | undefined = undefined;
    //Cria uma cidade para testar
    beforeAll(async () => {
        const resCidade = await testServer
            .post('/cidades')
            .send({ name: 'Teste' });

        cidadeId = resCidade.body;
    });

    it('Cria registro', async () => {
        const res1 = await testServer
            .post('/pessoas')
            .send({
                firstName: 'Wellington',
                lastName: 'create 1',
                email: 'welligtoncreate@gmail.com',
                cidadeId: cidadeId
            });

        expect(res1.statusCode).toEqual(StatusCodes.CREATED);
        expect(typeof res1.body).toEqual('number');
    });

    it('Cria registro 2', async () => {
        const res1 = await testServer
            .post('/pessoas')
            .send({
                firstName: 'WellingtonCreate2',
                lastName: 'create 2',
                email: 'welligtoncreate2@gmail.com',
                cidadeId: cidadeId
            });

        expect(res1.statusCode).toEqual(StatusCodes.CREATED);
        expect(typeof res1.body).toEqual('number');
    });

    it('Não pode deixar criar um registro => E-mail repetido ', async () => {
        const res1 = await testServer
            .post('/pessoas')
            .send({
                firstName: 'Wellington',
                lastName: 'da Silva Urbano',
                email: 'welligtoncreate@gmail.com',
                cidadeId: cidadeId
            });

        expect(res1.statusCode).toEqual(StatusCodes.INTERNAL_SERVER_ERROR);
        expect(res1.body).toHaveProperty('errors.default');
    });

    it('Criar registro com firstName curto', async () => {
        const res1 = await testServer
            .post('/pessoas')
            .send({
                firstName: 'We',
                lastName: 'firstName curto',
                email: 'welligtonfirstnamecurto@gmail.com',
                cidadeId: cidadeId
            });

        expect(res1.statusCode).toEqual(StatusCodes.BAD_REQUEST);
        expect(res1.body).toHaveProperty('errors.body');
    });

    it('Criar registro com lastName curto', async () => {
        const res1 = await testServer
            .post('/pessoas')
            .send({
                firstName: 'LastNameCurto',
                lastName: 'da',
                email: 'welligtonlastnamecurto@gmail.com',
                cidadeId: cidadeId
            });

        expect(res1.statusCode).toEqual(StatusCodes.BAD_REQUEST);
        expect(res1.body).toHaveProperty('errors.body');
    });

    it('Criar registro sem e-mail', async () => {
        const res1 = await testServer
            .post('/pessoas')
            .send({
                firstName: 'Wellington',
                lastName: 'sem email',
                email: '',
                cidadeId: cidadeId
            });

        expect(res1.statusCode).toEqual(StatusCodes.BAD_REQUEST);
        expect(res1.body).toHaveProperty('errors.body');
    });

    it('Criar registro com e-mail inválido', async () => {
        const res1 = await testServer
            .post('/pessoas')
            .send({
                firstName: 'Wellington',
                lastName: 'da',
                email: 'welligtongmail.com',
                cidadeId: cidadeId
            });

        expect(res1.statusCode).toEqual(StatusCodes.BAD_REQUEST);
        expect(res1.body).toHaveProperty('errors.body');
    });

    it('Criar registro sem cidadeId', async () => {
        const res1 = await testServer
            .post('/pessoas')
            .send({
                firstName: 'Wellington',
                lastName: 'sem cidadeId',
                email: 'welligtonsemcidadeid@gmail.com'
            });

        expect(res1.statusCode).toEqual(StatusCodes.BAD_REQUEST);
        expect(res1.body).toHaveProperty('errors.body');
    });

    it('Criar registro com cidadeId inválida', async () => {
        const res1 = await testServer
            .post('/pessoas')
            .send({
                firstName: 'Wellington',
                lastName: 'sem cidadeId',
                email: 'welligtonsemcidadeid@gmail.com',
                cidadeId: 9999999
            });

        expect(res1.statusCode).toEqual(StatusCodes.INTERNAL_SERVER_ERROR);
        expect(res1.body).toHaveProperty('errors.default');
    });

    it('Criar registro sem enviar nenhuma propiedade', async () => {
        const res1 = await testServer
            .post('/pessoas')
            .send({
                firstName: '',
                lastName: '',
                email: '',
                cidadeId: ''
            });

        expect(res1.statusCode).toEqual(StatusCodes.BAD_REQUEST);
        expect(res1.body).toHaveProperty('errors.body');
    });



});