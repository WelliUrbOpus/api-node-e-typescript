import { StatusCodes } from 'http-status-codes';
import { testServer } from '../jest.setup';


describe('Pessoas - Create', () => {
    let cidadeId: number | undefined = undefined;
    let accessToken = '';

    beforeAll(async () => {
        const email = 'dev@teste.com';
        const name = 'Dev Teste';
        await testServer
            .post('/cadastrar')
            .send({
                name: name,
                email: email,
                password: '123456',
                levelId: 1
            });

        const signInRes = await testServer
            .post('/entrar')
            .send({
                typeLogin: 'name',
                user: name,
                password: '123456'
            });

        accessToken = signInRes.body.accessToken;
        //console.log(`### Token de acesso: => ${signInRes.body.accessToken}`);
        
        const resCidade = await testServer
            .post('/cidades')
            .set({ Authorization: `Bearer ${accessToken}` })
            .send({ name: 'Teste' });

        cidadeId = resCidade.body;
    });


    it('Cria registro', async () => {
        const res1 = await testServer
            .post('/pessoas')
            .set({ Authorization: `Bearer ${accessToken}` })
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
            .set({ Authorization: `Bearer ${accessToken}` })
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
            .set({ Authorization: `Bearer ${accessToken}` })
            .send({
                firstName: 'Wellington',
                lastName: 'da Silva Urbano',
                email: 'welligtoncreateduplicado@gmail.com',
                cidadeId: cidadeId
            });

        expect(res1.statusCode).toEqual(StatusCodes.CREATED);
        expect(typeof res1.body).toEqual('number');


        const res2 = await testServer
            .post('/pessoas')
            .set({ Authorization: `Bearer ${accessToken}` })
            .send({
                firstName: 'Welli',
                lastName: 'da Silva',
                email: 'welligtoncreateduplicado@gmail.com',
                cidadeId: cidadeId
            });

        expect(res2.statusCode).toEqual(StatusCodes.INTERNAL_SERVER_ERROR);
        expect(res2.body).toHaveProperty('errors.default');
    });

    it('Criar registro com firstName curto', async () => {
        const res1 = await testServer
            .post('/pessoas')
            .set({ Authorization: `Bearer ${accessToken}` })
            .send({
                firstName: 'We',
                lastName: 'firstName curto',
                email: 'welligtonfirstnamecurto@gmail.com',
                cidadeId: cidadeId
            });

        expect(res1.statusCode).toEqual(StatusCodes.BAD_REQUEST);
        expect(res1.body).toHaveProperty('errors.body.firstName');
    });

    it('Criar registro com lastName curto', async () => {
        const res1 = await testServer
            .post('/pessoas')
            .set({ Authorization: `Bearer ${accessToken}` })
            .send({
                firstName: 'LastNameCurto',
                lastName: 'da',
                email: 'welligtonlastnamecurto@gmail.com',
                cidadeId: cidadeId
            });

        expect(res1.statusCode).toEqual(StatusCodes.BAD_REQUEST);
        expect(res1.body).toHaveProperty('errors.body.lastName');
    });

    it('Criar registro sem firstName', async () => {
        const res1 = await testServer
            .post('/pessoas')
            .set({ Authorization: `Bearer ${accessToken}` })
            .send({
                lastName: ' Sem firstName',
                email: 'welligtonsemfirstname@gmail.com',
                cidadeId: cidadeId
            });

        expect(res1.statusCode).toEqual(StatusCodes.BAD_REQUEST);
        expect(res1.body).toHaveProperty('errors.body.firstName');
    });

    it('Criar registro sem lastName', async () => {
        const res1 = await testServer
            .post('/pessoas')
            .set({ Authorization: `Bearer ${accessToken}` })
            .send({
                firstName: 'Sem lastName',
                email: 'welligtonsemlastname@gmail.com',
                cidadeId: cidadeId
            });

        expect(res1.statusCode).toEqual(StatusCodes.BAD_REQUEST);
        expect(res1.body).toHaveProperty('errors.body.lastName');
    });

    it('Criar registro sem e-mail', async () => {
        const res1 = await testServer
            .post('/pessoas')
            .set({ Authorization: `Bearer ${accessToken}` })
            .send({
                firstName: 'Wellington',
                lastName: 'sem email',
                cidadeId: cidadeId
            });

        expect(res1.statusCode).toEqual(StatusCodes.BAD_REQUEST);
        expect(res1.body).toHaveProperty('errors.body.email');
    });

    it('Criar registro com e-mail inválido', async () => {
        const res1 = await testServer
            .post('/pessoas')
            .set({ Authorization: `Bearer ${accessToken}` })
            .send({
                firstName: 'Wellington',
                lastName: 'da',
                email: 'welligtongmail.com',
                cidadeId: cidadeId
            });

        expect(res1.statusCode).toEqual(StatusCodes.BAD_REQUEST);
        expect(res1.body).toHaveProperty('errors.body.email');
    });

    it('Criar registro sem cidadeId', async () => {
        const res1 = await testServer
            .post('/pessoas')
            .set({ Authorization: `Bearer ${accessToken}` })
            .send({
                firstName: 'Wellington',
                lastName: 'sem cidadeId',
                email: 'welligtonsemcidadeid@gmail.com'
            });

        expect(res1.statusCode).toEqual(StatusCodes.BAD_REQUEST);
        expect(res1.body).toHaveProperty('errors.body.cidadeId');
    });

    it('Criar registro com cidadeId inválida', async () => {
        const res1 = await testServer
            .post('/pessoas')
            .set({ Authorization: `Bearer ${accessToken}` })
            .send({
                firstName: 'Wellington',
                lastName: 'sem cidadeId',
                email: 'welligtonsemcidadeid@gmail.com',
                cidadeId: 'teste'
            });

        expect(res1.statusCode).toEqual(StatusCodes.BAD_REQUEST);
        expect(res1.body).toHaveProperty('errors.body.cidadeId');
    });

    it('Criar registro sem enviar nenhuma propiedade', async () => {
        const res1 = await testServer
            .post('/pessoas')
            .set({ Authorization: `Bearer ${accessToken}` })
            .send({});

        expect(res1.statusCode).toEqual(StatusCodes.BAD_REQUEST);
        expect(res1.body).toHaveProperty('errors.body.firstName');
        expect(res1.body).toHaveProperty('errors.body.lastName');
        expect(res1.body).toHaveProperty('errors.body.email');
        expect(res1.body).toHaveProperty('errors.body.cidadeId');
    });



});