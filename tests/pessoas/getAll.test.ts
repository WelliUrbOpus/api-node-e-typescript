import { StatusCodes } from 'http-status-codes';
import { testServer } from '../jest.setup';

describe('Pessoas - GetAll', () => {
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


    it('Buscar todos os registro', async () => {
        const res1 = await testServer
            .post('/pessoas')
            .set({ Authorization: `Bearer ${accessToken}` })
            .send({
                firstName: 'Wellington',
                lastName: 'da Silva Urbano',
                email: 'welligtongetallb@gmail.com',
                cidadeId: cidadeId
            });

        expect(res1.statusCode).toEqual(StatusCodes.CREATED);

        const resBuscada = await testServer
            .get('/pessoas')
            .set({ Authorization: `Bearer ${accessToken}` })
            .send();

        expect(Number(resBuscada.header['x-total-count'])).toBeGreaterThan(0);
        expect(resBuscada.statusCode).toEqual(StatusCodes.OK);
        expect(resBuscada.body.length).toBeGreaterThan(0);
    });
});