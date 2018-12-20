describe("DDragon Champion", function () {
	const axios = require('axios');
	const config = {
		baseURL : 'http://localhost:8000/ddragon/champions'
	}

	it("should retrieve all champions", async (done) => {
		try {
			let res = await axios.get('/all', config);
			
			expect(res.status).toBe(200);
			expect(res.data).not.toEqual({});
		} catch (ex) {
			done.fail(ex.message);
		}
		done();
	});

	it("should retrieve a champion by id", async (done) => {
		try {
			let res = await axios.get('/42', config);

			expect(res.status).toBe(200);
			expect(res.data).not.toEqual({});
		} catch (ex) {
			done.fail(ex.message);
		}
		done();
	});

	it("should retrieve a champion by name", async (done) => {
		try {
			let res = await axios.get('/Annie', config);

			expect(res.status).toBe(200);
			expect(res.data).not.toEqual({});
		} catch (ex) {
			done.fail(ex.message);
		}
		done();
	});

	it("should retrieve a champion image url by id", async (done) => {
		try {
			let res = await axios.get('/42/image', config);

			expect(res.status).toBe(200);
			expect(res.data).toBeDefined()
		} catch (ex) {
			done.fail(ex.message);
		}
		done();
	});

	it("should retrieve a champion image url by name", async (done) => {
		try {
			fail('unimplemented');
		} catch (ex) {
			done.fail(ex.message);
		}
		done();
	});

});
