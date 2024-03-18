import { StatusCodes } from 'http-status-codes';
import { testServer } from '../jest.setup';


describe('Cidades - GetById', () => {

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

    });
    it('Busca registro por id', async () => {
        const res1 = await testServer
            .post('/cidades')
            .set({ Authorization: `Bearer ${accessToken}` })
            .send({ name: 'Louveira' });

        expect(res1.statusCode).toEqual(StatusCodes.CREATED);
        const resBuscada = await await testServer
            .get(`/cidades/${res1.body}`)
            .set({ Authorization: `Bearer ${accessToken}` })
            .send();
        
        expect(resBuscada.statusCode).toEqual(StatusCodes.OK);
        expect(resBuscada.body).toHaveProperty('name');
    });

    it('Tenta buscar registro que não existe', async () => {
        const res1 = await testServer
            .get('/cidades/99999')
            .set({ Authorization: `Bearer ${accessToken}` })
            .send();

        expect(res1.statusCode).toEqual(StatusCodes.INTERNAL_SERVER_ERROR);
        expect(res1.body).toHaveProperty('errors.default');
    });
});