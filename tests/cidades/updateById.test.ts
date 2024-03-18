import { StatusCodes } from 'http-status-codes';
import { testServer } from '../jest.setup';


describe('Cidades - UpdateById', () => {

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
    it('Atualiza registro', async () => {
        const res1 = await testServer
            .post('/cidades')
            .set({ Authorization: `Bearer ${accessToken}` })
            .send({ name: 'Louveira' });

        expect(res1.statusCode).toEqual(StatusCodes.CREATED);

        const resAtualizada = await testServer
            .put(`/cidades/${res1.body}`)
            .set({ Authorization: `Bearer ${accessToken}` })
            .send({ name: 'Jundiai' });

        expect(resAtualizada.statusCode).toEqual(StatusCodes.NO_CONTENT);
    });

    it('Tenta atualizar registro que não existe', async () => {
        const res2 = await testServer
            .put('/cidades/99999')
            .set({ Authorization: `Bearer ${accessToken}` })
            .send({ name: 'Jundiai' });

        expect(res2.statusCode).toEqual(StatusCodes.INTERNAL_SERVER_ERROR);
        expect(res2.body).toHaveProperty('errors.default');
    });
    
});

