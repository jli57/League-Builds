describe("User", function () {
	const axios = require('axios');
	const config = {
		baseURL: 'http://localhost:8000/user'
	};
	const user = {
		form: {
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
			expect(res.data.user.username).toBe(user.form.username);
			expect(res.data.user.email).toBe(user.form.email);
			expect(res.data.user.name).toBe(user.form.name);
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

	it("should validate", async (done) => {
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

			user.form.newEmail = newEmail;
			user.form.newName = newName;
			user.form.newUsername = newUsername;
			user.form.newPassword = newPassword;
			res = await axios.post(`/update/${session}`, user, config);
			expect(res.status).toBe(200);

			res = await axios.get(`/session/${session}`, config);
			expect(res.status).toBe(200);
			expect(res.data.user.username).toBe(newUsername);
			expect(res.data.user.email).toBe(newEmail);
			expect(res.data.user.name).toBe(newName);

			user.form.password = newPassword;
			user.form.username = newUsername;
			res = await axios.post(`/validate`, user, config);
			expect(res.status).toBe(200);

		} catch (ex) {
			done.fail(ex.message);
		}
		done();

	});

	describe('Build API', () => {
		it('should create a new build', async (done) => {
			try {
				res = await axios.post(`/build/${session}`);

				expect(res.status).toBe(201);
			} catch (ex) {
				fail(ex.msg);
			}

			done();
		})

		it('should return 404 when creating more than 10 builds', async (done) => {
			try {
				for (var i = 0; i < 10; i++) {
					res = await axios.post(`/build/${session}`);
					expect(res.status).toBe(201);
				}
			} catch (ex) {
				expect(res.status).toBe(406);
			}

			done();
		})

		it('should return all builds', async (done) => {
			try {
				res = await axios.get(`/build/${session}`, config);

				expect(res.status).toBe(200);
				expect(res.data).toBeDefined();

			} catch (ex) {
				fail(ex.msg);
			}

			done();
		})

		it('should return a specific build', async (done) => {
			try {
				let build = res.data[0]._id;
				res = await axios.get(`/build/${session}/${build}`, config);

				expect(res.status).toBe(200);
				expect(res.data).toBeDefined();
				expect(res.data._id).toEqual(build);
			} catch (ex) {
				fail(ex.msg);
			}

			done();
		})

		it('should return a 404 if a build is not found', async (done) => {
			try {
				res = await axios.get(`/build/${session}/${-1}`, config);
			} catch (ex) {
				expect(res.status).toBe(404);
			}

			done();
		})

		it('should update a specific build', async (done) => {
			try {
				
			} catch (ex) {
				fail(ex.msg);
			}

			done();
		})

		it('should delete a specific build', async (done) => {
			try {

			} catch (ex) {
				fail(ex.msg);
			}

			done();
		})

		it('should return a 404 if a build was not found for deletion', async (done) => {
			try {

			} catch (ex) {
				fail(ex.msg);
			}

			done();
		})

		it('should delete all builds', async (done) => {
			try {

			} catch (ex) {
				fail(ex.msg);
			}

			done();
		})
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

	afterAll(async (done) => {
		const { testURI } = require('../../config/keys');
		const mongoose = require('mongoose');

		let d = await mongoose.connect(testURI, { useNewUrlParser: true });

		d.connection.db.dropDatabase();
		done();
	})
});
