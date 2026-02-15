import * as supertest from 'supertest';
//import { describe, it } from 'node:test';
const request = supertest('https://practice-react.sdetunicorns.com/api/test');

describe('Brands Test', () => {


      it('GET /brands', async () => {
      const res = await request.get('/brands');  
      //console.log(res);
      //expect result code to be 200 (good)
      expect(res.statusCode).toBe(200);
      //expect the total returned brands to be greter than 1
      expect(res.body.length).toBeGreaterThan(1);
      //expect result to have _id and name
      expect(Object.keys(res.body[0])).toEqual(['_id', 'name']);

         });
})