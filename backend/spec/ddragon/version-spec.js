const axios = require('axios');
const config = {
	baseURL: 'http://localhost:8000/api/ddragon/version'
};
describe('Version api', () => {
	it('should get the latest version', async (done) => {
		try {
			let res = await axios.get('/', config);

			expect(res.status).toBe(200);
			expect(res.data.version).toBeDefined();
		} catch (ex) {
			fail(ex.msg);
		}

		done();
	});

	it('should get all versions', async (done) => {
		try {
			let res = await axios.get('/', config);

			expect(res.status).toBe(200);
			expect(res.data.version.length).toBeGreaterThan(1);
		} catch (ex) {
			fail(ex.msg);
		}

		done();
	});

	it('should get a specific key', async (done) => {
		try {
			let version = '1';
			let res = await axios.get(`/${version}`, config);

			expect(res.status).toBe(200);
			expect(res.data.version).toBeDefined();

		} catch (ex) {
			fail(ex.msg);
		}

		done();
	});
});