describe("User", function () {
    const axios = require('axios');
    const config = {        
        baseURL: 'http://localhost:8000/user'
    };
    const user = {
        application: {
            username: 'test_username',
            password: 'password123',
            email: 'example@domain.test',
            name: 'john doe'
        }
    }

    let res = null;
    let session = null;
    it("should create a user", async (done) => {
        try {
            res = await axios.post('/register', user, config);
            expect(res.status).toBe(201);
            expect(res.data.user).not.toEqual({});

            session = res.data.session;
        } catch (ex) {
            done.fail(ex.message);
        }
        done();
    });

    it("should retrieve user data", async (done) => {
        try {
            res = await axios.get(`/session/${session}`, config);

            expect(res.status).toBe(200);
            expect(res.data._id).toBeUndefined();
            expect(res.data.password).toBeUndefined();
            expect(res.data.username).toBe(user.username);
            expect(res.data.email).toBe(user.email);
            expect(res.data.name).toBe(user.name);

        } catch (ex) {
            done.fail(ex.message);
        }
        done();
    });

    it("should logout", async (done) => {
        // try {
        //     res = await axios.post('/user/login', user, config);

        //     expect(res.status).toBe(201)
        //     expect(res.data.session).not.toBeUndefined();
        //     session = res.data.session;
        // } catch (ex) {
        //     done.fail(ex.message);
        // }
        // finally {
        //     done();
        // }
        done.fail('unimplemented');
    });

    it("should login", async (done) => {
        // try {
        //     res = await axios.post('/user/login', user, config);

        //     expect(res.status).toBe(201)
        //     expect(res.data.session).not.toBeUndefined();
        //     session = res.data.session;
        // } catch (ex) {
        //     done.fail(ex.message);
        // }
        // finally {
        //     done();
        // }
        done.fail('unimplemented');
    });

    it("should update", async (done) => {
        // try {
        //     res = await axios.post('/user/login', user, config);

        //     expect(res.status).toBe(201)
        //     expect(res.data.session).not.toBeUndefined();
        //     session = res.data.session;
        // } catch (ex) {
        //     done.fail(ex.message);
        // }
        // finally {
        //     done();
        // }
        done.fail('unimplemented');
    });

    it("should delete user", async (done) => {
        try {
            config.data = user;
            res = await axios.delete(`/delete/${session}`, config);
            expect(res.status).toBe(204);

            res = await axios.get(`/session/${session}`, config);
        } catch (ex) {
            expect(ex.response.status).toBe(404);
        }

        done();
    });
});
