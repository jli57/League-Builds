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
            expect(res.data.user._id).toBeUndefined();
            expect(res.data.user.password).toBeUndefined();
            expect(res.data.user.username).toBe(user.application.username);
            expect(res.data.user.email).toBe(user.application.email);
            expect(res.data.user.name).toBe(user.application.name);
        } catch (ex) {
            done.fail(ex.message);
        }
        done();
    });

    it("should logout", async (done) => {
        try {
            res = await axios.delete(`/logout/${session}`, config);
            expect(res.status).toBe(200);

            res = await axios.delete(`/logout/${session}`, config);

        } catch (ex) {
            expect(ex.response.status).toBe(404);
        }
        done();
    });

    it("should login", async (done) => {
        try {
            res = await axios.post('/login', user, config);

            expect(res.status).toBe(201)
            expect(res.data.session).not.toBeUndefined();
            session = res.data.session;
        } catch (ex) {
            done.fail(ex.message);
        }

        done();
    });

    it ("should validate", async (done) => {
        try {
            res = await axios.post(`/validate`, user, config);
            expect(res.status).toBe(200);

        } catch (ex) {
            done.fail(ex.message);
        }

        done();
    });

    it("should update", async (done) => {
        try {
            const newEmail = 'lljruffin@outlook.com';
            const newUsername = 'farcry';
            const newPassword = 'password2';
            const newName = 'Levi';

            user.application.newEmail = newEmail;            
            user.application.newName = newName;
            user.application.newUsername = newUsername;
            user.application.newPassword = newPassword;
            res = await axios.post(`/update/${session}`, user, config);
            expect(res.status).toBe(200);

            res = await axios.get(`/session/${session}`, config);
            expect(res.status).toBe(200);
            expect(res.data.user.username).toBe(newUsername);
            expect(res.data.user.email).toBe(newEmail);
            expect(res.data.user.name).toBe(newName);

            user.application.password = newPassword;
            user.application.username = newUsername;
            res = await axios.post(`/validate`, user, config);
            expect(res.status).toBe(200);

        } catch (ex) {
            done.fail(ex.message);
        }
        done();

    });

    it("should delete user", async (done) => {
        try {
            config.data = user;
            res = await axios.delete(`/delete/${session}`, config);
            expect(res.status).toBe(200);

            res = await axios.get(`/session/${session}`, config);
        } catch (ex) {
            expect(ex.response.status).toBe(404);
        }

        done();
    });
});
