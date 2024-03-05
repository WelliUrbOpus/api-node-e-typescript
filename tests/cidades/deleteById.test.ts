import { StatusCodes } from 'http-status-codes';
import { testServer } from '../jest.setup';


describe('Cidades - Delete', () => {



    it('Deletar um registro', async () => {
        const res1 = await testServer
            .delete('/cidades')
            .send({ 
                name: 'Loveira', 
            });

        expect(res1.statusCode).toEqual(StatusCodes.CREATED);
        expect(typeof res1.body).toEqual('number');
    });

    it('Não pode deixar deletar se não infromar um numero ', async () => {
        const res1 = await testServer
            .post('/cidades')
            .send({ 
                id: 'lote', 
            });

        expect(res1.statusCode).toEqual(StatusCodes.BAD_REQUEST);
        expect(res1.body).toHaveProperty('errors.body.name');
    });
});