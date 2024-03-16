import { StatusCodes } from 'http-status-codes';
import { testServer } from '../jest.setup';


describe('Usuários - GetAll', () => {

    it('Buscar todos os registro', async () => {
        const res1 = await testServer
            .post('/cadastrar')
            .send({
                name: 'Frank GetAll',
                password: '1234',
                email: 'frankgetall@teste',
                levelId: 1
            });

        expect(res1.statusCode).toEqual(StatusCodes.CREATED);
        expect(typeof res1.body).toEqual('number');

        const resBuscada = await testServer
            .get('/usuarios')
            .send();

        expect(Number(resBuscada.header['x-total-count'])).toBeGreaterThan(0);
        expect(resBuscada.statusCode).toEqual(StatusCodes.OK);
        expect(resBuscada.body.length).toBeGreaterThan(0);
    });
});