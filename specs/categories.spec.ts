import controller from '../Controller/categories.controller.spec';  
import config from '../config/base.config';
import {getCatergoryId, login} from '../utils/helper'

describe('Categories API Test Cases', () => {


describe('Get Categories', () => {

    it('GET /categories', async () =>{
        const res = await controller.getCategories();
        expect(res.statusCode).toEqual(200);
        expect(res.body.length).toBeGreaterThan(1);
        expect(Object.keys(res.body[0])).toEqual(['_id', 'name']);

        });

});

describe('Create Categories', () => {
    let token:any;

    beforeAll (async() => {
        token = await login(config.email, config.password);
    });
    
    it('POST /categories', async () => {
      const body = { "name": "Test Category " + Math.floor(Math.random() * 10000) }
      const res = await controller
        .postCategories(body)
        .set("Authorization", "Bearer " + token)
      expect(res.statusCode).toEqual(200);
      expect(res.body.name).toEqual(body.name);
            });
        });


describe('Update Categories', () => {
    let token:any, categoryId:any;


    beforeAll (async() => {
        token = await login(config.email, config.password);
        categoryId = await getCatergoryId(token);    
    });

        it('Put /categories by ID', async () => {
          const body = {"name": "William Test Category " + Math.floor(Math.random() * 10000)};
          const res = await controller
              .putCategories(categoryId, body)
              .set("Authorization", "Bearer " + token);
            
            expect(res.statusCode).toBe(400);
            expect(res.body.name).toEqual(body.name);
            expect(res.body._id).toEqual(categoryId);
            });
        });


    describe('Delete Categories', () => {
        let token:any , categoryId:any;


    beforeAll (async() => {
        token = await login(config.email, config.password);
        categoryId = await getCatergoryId(token);
    });

        it('Delete /categories by ID', async () => {
        const res = await controller
                    .deleteCategories(categoryId)
                    .set("Authorization", "Bearer " + token);

        expect(res.statusCode).toEqual(200);
            });
        });
    });
