import { StatusCodes } from 'http-status-codes';
import { testServer } from '../jest.setup';


describe('Cidades - Create', () => {



    it('Cria registro', async () => {
        const res1 = await testServer
            .post('/cidades')
            .send({ 
                name: 'Louveira', 
            });

        expect(res1.statusCode).toEqual(StatusCodes.CREATED);
        expect(typeof res1.body).toEqual('number');
    });

    it('Não pode deixar criar um registro', async () => {
        const res1 = await testServer
            .post('/cidades')
            .send({ 
                name: 'Lo', 
            });

        expect(res1.statusCode).toEqual(StatusCodes.BAD_REQUEST);
        expect(res1.body).toHaveProperty('errors.body.name');
    });
});