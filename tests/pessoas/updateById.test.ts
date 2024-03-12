import { StatusCodes } from 'http-status-codes';
import { testServer } from '../jest.setup';


describe('Pessoas - UpdateById', () => {
    let cidadeId: number | undefined = undefined;
    //Cria uma cidade para testar
    beforeAll(async()=>{
        const resCidade = await testServer
            .post('/cidades')
            .send({name:'Teste'});

        cidadeId = resCidade.body;
    });

    it('Atualiza registro', async () => {
        const res1 = await testServer
            .post('/pessoas')
            .send({
                firstName: 'Wellington',
                lastName: 'da Silva Urbano',
                email: 'welligton.update@ggmail.com',
                cidadeId: '255'
            });

        expect(res1.statusCode).toEqual(StatusCodes.CREATED);

        const resAtualizada = await testServer
            .put(`/pessoas/${res1.body}`)
            .send({
                firstName: 'Welli',
                lastName: 'da Silva',
                email: 'welligtonupdate@gmail.com',
                cidadeId: cidadeId
            });

        expect(resAtualizada.statusCode).toEqual(StatusCodes.NO_CONTENT);
    });

    it('Tenta atualizar registro que não existe', async () => {
        const res2 = await testServer
            .put('/pessoas/99999')
            .send({
                firstName: 'Wellington',
                lastName: 'da Silva Urbano',
                email: 'welligtonupdate@gmail.com',
                cidadeId: cidadeId
            });

        expect(res2.statusCode).toEqual(StatusCodes.INTERNAL_SERVER_ERROR);
        expect(res2.body).toHaveProperty('errors.default');
    });

});

