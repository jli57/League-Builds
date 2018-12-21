describe('DDragon Item', function () {
	const axios = require('axios');
	const config = {
		baseURL: 'http://localhost:8000/ddragon/items'
	}

	it('should get all items', async (done) => {
		try {
			let res = await axios.get('/all', config);
			
			expect(res.status).toBe(200);
			expect(res).toBeDefined();
			expect(res.data['1001']).toBeDefined();
		} catch (ex) {
			fail(ex.msg);
		}
		done();
	});
});