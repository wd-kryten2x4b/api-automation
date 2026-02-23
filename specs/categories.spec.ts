import controller from "../Controller/categories.controller.spec";
import adminToken from "../Controller/admin.controller.spec";   

describe('Categories API Test Cases', () => {

    it('GET /categories', async () =>{
        const res = await controller.getCategories();
        expect(res.statusCode).toEqual(200);
        expect(res.body.length).toBeGreaterThan(1);
        expect(Object.keys(res.body[0])).toEqual(['_id', 'name']);

        });

describe('Create Categories', () => {

    it('Verify Login', async () => {
        const data ={
            "email": "mod@mail.com",
            "password": "Modpass123!",
        };
        const res = await adminToken.postAdminLogin(data);
        console.log(res)
        expect(res.statusCode).toEqual(200);
        

    });
    
    it('POST /categories', async () => {
        const body = {"name": "Test Category" + Math.floor(Math.random() * 10000)};
        const res = await controller
                    .postCategories(body);
        expect(res.statusCode).toEqual(200);

            });

        });

    });
