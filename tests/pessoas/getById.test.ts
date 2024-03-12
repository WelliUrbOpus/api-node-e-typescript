import { StatusCodes } from 'http-status-codes';
import { testServer } from '../jest.setup';


describe('Pessoas - GetById', () => {

    it('Busca registro por id', async () => {
        const res1 = await testServer
            .post('/pessoas')
            .send({ 
                firstName: 'Wellington',
                lastName: 'da Silva Urbano',
                email: 'welligton.urb@gmail.com',
                cidadeId: '255'
            });

        expect(res1.statusCode).toEqual(StatusCodes.CREATED);
        const resBuscada = await await testServer
            .get(`/pessoas/${res1.body}`).send();
        
        expect(resBuscada.statusCode).toEqual(StatusCodes.OK);
        expect(resBuscada.body).toHaveProperty('firstName');
        expect(resBuscada.body).toHaveProperty('lastName');
        expect(resBuscada.body).toHaveProperty('email');
        expect(resBuscada.body).toHaveProperty('cidadeId');
    });

    it('Tenta buscar registro que não existe', async () => {
        const res1 = await testServer
            .get('/pessoas/99999').send();

        expect(res1.statusCode).toEqual(StatusCodes.INTERNAL_SERVER_ERROR);
        expect(res1.body).toHaveProperty('errors.default');
    });
});