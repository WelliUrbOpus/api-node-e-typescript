import { StatusCodes } from 'http-status-codes';
import { testServer } from '../jest.setup';


describe('Pessoas - Create', () => {

    it('Cria registro', async () => {
        const res1 = await testServer
            .post('/pessoas')
            .send({ 
                firstName: 'Wellington',
                lastName: 'da Silva Urbano',
                email: 'welligton.urb@gmail.com',
                cidadeId: '255'
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
                email: 'welligton.urb@gmail.com',
                cidadeId: '255'
            }); 

        expect(res1.statusCode).toEqual(StatusCodes.INTERNAL_SERVER_ERROR);
        expect(res1.body).toHaveProperty('errors.default');
    });
});