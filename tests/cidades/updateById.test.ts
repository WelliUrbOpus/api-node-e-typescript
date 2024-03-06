import { StatusCodes } from 'http-status-codes';
import { testServer } from '../jest.setup';


describe('Cidades - UpdateById', () => {



    it('Atualiza registro', async () => {
        const res1 = await testServer
            .post('/cidades')
            .send({ name: 'Louveira' });

        expect(res1.statusCode).toEqual(StatusCodes.CREATED);

        const resAtualizada = await testServer
            .put(`/cidades/${res1.body}`).send({ name: 'Jundiai' });

        expect(resAtualizada.statusCode).toEqual(StatusCodes.NO_CONTENT);
    });

    it('Tenta atualizar registro que não existe', async () => {
        const res2 = await testServer
            .put('/cidades/99999')
            .send({ name: 'Jundiai' });

        expect(res2.statusCode).toEqual(StatusCodes.INTERNAL_SERVER_ERROR);
        expect(res2.body).toHaveProperty('errors.default');
    });
});

function expect(statusCode: any) {
    throw new Error('Function not implemented.');
}
