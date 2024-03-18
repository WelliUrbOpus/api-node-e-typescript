import { StatusCodes } from 'http-status-codes';
import { testServer } from '../jest.setup';


describe('Pessoas - GetById', () => {

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


    it('Busca registro por id', async () => {
        const res1 = await testServer
            .post('/pessoas')
            .set({ Authorization: `Bearer ${accessToken}` })
            .send({
                firstName: 'Wellington',
                lastName: 'da Silva Urbano',
                email: 'welligtongetbyid@gmail.com',
                cidadeId: cidadeId
            });

        expect(res1.statusCode).toEqual(StatusCodes.CREATED);
        const resBuscada = await await testServer
            .get(`/pessoas/${res1.body}`)
            .set({ Authorization: `Bearer ${accessToken}` })
            .send();

        expect(resBuscada.statusCode).toEqual(StatusCodes.OK);
        expect(resBuscada.body).toHaveProperty('firstName');
        expect(resBuscada.body).toHaveProperty('lastName');
        expect(resBuscada.body).toHaveProperty('email');
        expect(resBuscada.body).toHaveProperty('cidadeId');
    });

    it('Tenta buscar registro que não existe', async () => {
        const res1 = await testServer
            .get('/pessoas/99999')
            .set({ Authorization: `Bearer ${accessToken}` })
            .send();

        expect(res1.statusCode).toEqual(StatusCodes.INTERNAL_SERVER_ERROR);
        expect(res1.body).toHaveProperty('errors.default');
    });
});