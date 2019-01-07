describe("DDragon Champion", function () {
	const axios = require('axios');
	const config = {
		baseURL : 'http://localhost:8000/ddragon/champions'
	}

	it("should retrieve all champions", async (done) => {
		try {
			let res = await axios.get('/all', config);

			expect(res.status).toBe(200);
			expect(res.data.Kindred).toBeDefined();
		} catch (ex) {
			done.fail(ex.message);
		}
		done();
	});

	it("should retrieve a champion by key", async (done) => {
		try {
			let key = '42';
			let res = await axios.get(`/${42}`, config);

			expect(res.status).toBe(200);
			expect(res.data.key).toEqual(key);
		} catch (ex) {
			done.fail(ex.message);
		}
		done();
	});

	it("should retrieve a champion by name", async (done) => {
		try {
			let name = 'Annie';
			let res = await axios.get(`/${name}`, config);

			expect(res.status).toBe(200);
			expect(res.data.name).toEqual(name);
		} catch (ex) {
			done.fail(ex.message);
		}
		done();
	});

	// it("should check to see if MonkeyKing is renamed to Wukong", async (done) => {
	// 	try {
	// 		let name = 'Wukong';
	// 		let res = await axios.get(`/${name}`, config);

	// 		expect(res.status).toBe(200);
	// 		expect(res.data.name).toEqual(name);
	// 	} catch (ex) {
	// 		done.fail(ex.message);
	// 	}
	// 	done();
	// });

	it("should retrieve a champion image url by id", async (done) => {
		try {
			let res = await axios.get('/42/image', config);

			expect(res.status).toBe(200);
			expect(res.data.src).toBeDefined();
			expect((await axios.get(res.data.src)).status).toBe(200);
		} catch (ex) {
			done.fail(ex.message);
		}
		done();
	});

	it("should retrieve a champion image url by name", async (done) => {
		try {
			let res = await axios.get('/Annie/image', config);

			expect(res.status).toBe(200);
			expect(res.data.src).toBeDefined();
			expect((await axios.get(res.data.src)).status).toBe(200);
		} catch (ex) {
			done.fail(ex.message);
		}
		done();
	});

});
