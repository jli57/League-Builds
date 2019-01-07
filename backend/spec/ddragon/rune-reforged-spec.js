describe('DDragon Rune Reforged', () => {
	const axios = require('axios');
	const config = {
		baseURL: 'http://localhost:8000/ddragon/api/runesreforged'
	}

	it('should retrieve all reforged runes', async (done) => {
		try {
			let res = await axios.get('/', config);

			expect(res.status).toBe(200);
			expect(res.data).toBeDefined();
		} catch (ex) {
			fail(ex.msg);
		}
		done();
	})

	it('should retrieve a reforged rune tree', async (done) => {
		try {
			let trees = [8000, 8100, 8200, 8300, 8400];
			for (var i = 0; i < trees.length; i++) {
				let res = await axios.get(`/tree/${trees[i]}`, config);

				expect(res.status).toBe(200);
				expect(res.data).toBeDefined();
				expect(res.data.id).toEqual(trees[i]);
			}

		} catch (ex) {
			fail(ex.msg);
		}
		done();
	})

	it('should retrieve a reforged rune by id', async (done) => {
		try {
			let trees = [8100, 8214];
			for (var i = 0; i < trees.length; i++) {
				let res = await axios.get(`/${trees[i]}`, config);

				expect(res.status).toBe(200);
				expect(res.data).toBeDefined();				
				expect(res.data.id).toEqual(trees[i]);				
			}
		} catch (ex) {
			fail(ex.msg);
		}
		done();
	})

	it('should retrieve all reforged rune image url by id', async (done) => {
		try {
			let id = '8230';
			let res = await axios.get(`/${id}/image`, config);

			expect(res.status).toBe(200);
			expect(res.data).toBeDefined();
			expect((await axios.get(res.data.src)).status).toBe(200);
		} catch (ex) {
			fail(ex.msg);
		}
		done();
	})
});