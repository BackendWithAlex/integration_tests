const request = require('supertest');

let server;

let car = {
    name: 'Hyundai Verna',
    price: '$20000',
    available_quantity: 10
};

let updatedCar;

describe('cars', () => {
    beforeEach(() => { server = require('../../server'); });
    afterEach( async () => { server.close(); });

    describe('POST /', () => {
        it('should add the car to DB', async () => {
            const res = await request(server)
                .post('/cars')
                .send(car);
            expect(res.status).toBe(200);
        });
    });

    describe('GET /', () => {
        it('should get the car from DB', async () => {
            const res = await request(server).get('/cars');
            expect(res.status).toBe(200);
            expect(res.body).toMatchObject([car]);

            car = res.body[0];
            console.log('car', car);
        });
    });

    describe('PUT /', () => {
        it('should update the car in DB', async () => {

            updatedCar = car;
            updatedCar.available_quantity = 5;

            const res = await request(server)
                .put('/cars')
                .send(updatedCar);
            expect(res.status).toBe(200);
        });

        it('should get the updatedCar from DB', async () => {
            const res = await request(server).get('/cars');
            expect(res.status).toBe(200);
            expect(res.body).toMatchObject([updatedCar]);
        });
    });

    describe('DELETE /', () => {
        it('should delete the car from DB', async () => {
            const res = await request(server)
                .delete('/cars')
                .send(updatedCar);
            expect(res.status).toBe(200);
        });

        it('should get no cars from DB', async () => {
            const res = await request(server).get('/cars');
            expect(res.status).toBe(200);
            expect(res.body.length).toBe(0);
        });
    });
});