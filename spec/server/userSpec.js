describe("User", function () {
    const axios = require('axios');
    const config = {
        baseURL: 'http://localhost:8000/'
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
            res = await axios.post('/user/register', user, config);
            expect(res.status).toBe(201);
            expect(res.data.user).not.toEqual({});

            session = res.data.session;
            done();
        } catch (ex) {
            console.log(ex);
            done.fail(ex.message);
        } 
    });

    it("should retrieve user data", async (done) => {
        try {
            res = await axios.get(`/user/${session}`, config);
            
            expect(res.status).toBe(200);
            expect(res.data._id).toBeUndefined();
            expect(res.data.password).toBeUndefined();
            expect(res.data.username).toBe(user.username);
            expect(res.data.email).toBe(user.email);
            expect(res.data.name).toBe(user.name);
            done();
        } catch (ex) {
            done.fail(ex.message);
        }
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

    it("should delete", async (done) => {
        // // delete
        // res = await axios.delete(`/user/${user._id}`, config);
        // expect(res.status).toBe(200);
        done.fail('unimplemented');
    });

});
