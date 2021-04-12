describe('Testing the product endpoints', () => {

    let userID: string = null;
    const storeID: string = null;
    let token: string = null;
    const wrongUserID = '51458c1f-ce6b-483c-aa39-f13d8c3011ff';
    const wrongToken = 'wrongTOkenInformati0n';

    const userObj = {
        name: "Gabriel dos Santos Meireles",
        email: "newcostumer@flextore.com",
        password: "strongPassw0rd!"
    };

    const loginObj = {
        email: "newcostumer@flextore.com",
        password: "strongPassw0rd!"
    }

    const storeObj = {
        owner_id: userID,
        name: 'Vinil Shop',
        slug: 'vinishop',
        description: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries',
    }

    const productObj = {
        owner_id: userID,
        store_id: storeID,
        name: 'New Nice T-shirt',
        description: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
        price: 10.99
    }

    it('It should POST an user', async () => {
        const { body, status } = await global.testRequest.post('/user').send(userObj);
        expect(status).toBe(201);
        expect(body.success).toEqual(true);
        expect(body.data).toHaveProperty('name');
        expect(body.data).toHaveProperty('email');

        userID = body.data.id;
        storeObj.owner_id = userID;
        productObj.owner_id = userID;
    });

    it('It should do the login action and return a jwt', async () => {
        const { body, status } = await global.testRequest.post('/auth/login').send(loginObj);
        expect(status).toBe(200);
        expect(body.success).toEqual(true);
        expect(body.data).toHaveProperty('name');
        expect(body.data).toHaveProperty('email');
        expect(body.data).toHaveProperty('token');

        token = body.data.token;
    });

    describe('POST /', () => {
        it('It should POST a store', async () => {
            const { body, status } = await global.testRequest.post('/store').send(storeObj).set({'authorization': token});
            expect(status).toBe(201);
            expect(body.success).toEqual(true);
            expect(body.data).toHaveProperty('name');
            expect(body.data).toHaveProperty('id');
            expect(body.data).toHaveProperty('description');

            productObj.store_id = body.data.id;
        });
    });

    describe('POST /', () => {
        it('It should POST a product', async () => {
            const { body, status } = await global.testRequest.post('/product').send(productObj).set({ 'authorization': token });
            expect(status).toBe(201);
            expect(body.success).toEqual(true);
            expect(body.data).toHaveProperty('name');
            expect(body.data).toHaveProperty('id');
            expect(body.data).toHaveProperty('description');
        });
    });

    describe('POST /', () => {
        it("It shouldn't POST a product because the authorization header is wrong", async () => {
            const { body, status } = await global.testRequest.post('/product').send(productObj).set({'authorization': wrongToken});
            expect(status).toBe(401);
            expect(body.success).toEqual(false);
            expect(body).not.toHaveProperty('data');
        });
    });
});