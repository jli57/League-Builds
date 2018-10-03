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

            user._id = res.data.user_id;
        } catch (ex) {
            done.fail(ex.message);
        } finally {
            done();
        }
    });

    it("should login", async (done) => {
        try {
            res = await axios.post('/user/login', user, config);

            expect(res.status).toBe(201)
            expect(res.data.session).not.toBeUndefined();
            session = res.data.session;
        } catch (ex) {
            done.fail(ex.message);
        }
        finally {
            done();
        }
    });

    it("should retrieve user data", async (done) => {
        // // retrieve
        // res = await axios.get(`/user/${user._id}`, config);
        // expect(res.status).toBe(200);
        // expect(res.data.username).toBe(user.username); 
        // expect(res.data._id).toBe(user._id);
        // expect(res.data.email).toBe(user.email);
        // expect(res.data.name).toBe(user.name);
    });

    it("should delete", async (done) => {
        // // delete
        // res = await axios.delete(`/user/${user._id}`, config);
        // expect(res.status).toBe(200);
    });
});
