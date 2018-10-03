describe("User", function () {
    const axios = require('axios');
    const config = {
        baseURL: 'http://localhost:8000/'
    };
    const user = {
        username: 'test_username',
        password: 'password123',
        email: 'example@domain.test',
        name: 'john doe'
    }


    it("should create a user", async (done) => {
        // create
        try{
            let res = await axios.post('/user/register', user, config);
            expect(res.status).toBe(200);
            user._id = res.data._id;
            console.log(res.data);
        }catch(ex){
            done.fail(ex.message);
        }
        
        

        // // retrieve
        // res = await axios.get(`/user/${user._id}`, config);
        // expect(res.status).toBe(200);
        // expect(res.data.username).toBe(user.username); 
        // expect(res.data._id).toBe(user._id);
        // expect(res.data.email).toBe(user.email);
        // expect(res.data.name).toBe(user.name);

        // // delete
        // res = await axios.delete(`/user/${user._id}`, config);
        // expect(res.status).toBe(200);

        done();
    });

    it('blah', () => {
        console.log(true);
        expect(true).toBe(true);
    })
});
