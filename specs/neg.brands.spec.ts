import { clearScreenDown } from 'node:readline';
import * as supertest from 'supertest';
//import { describe, it } from 'node:test';
const request = supertest('https://practice-react.sdetunicorns.com/api/test');

describe('Brands Test', () => {
    let newBrandId: any;
    
describe('Create brand Test',() => {
it('POST a new /brands', async () => {
    
        const bNumber = Math.floor(Math.random() * 10000)
        const data = {
        name: 'Test Brand Samsung ' + bNumber,
        description: 'Test Brand Samsung brand'
      }  
      const res = await request.post('/brands')
      .send(data);  

      //expect result code to be 200 (good)
      expect(res.statusCode).toEqual(200);
      //expect name to be A Plus 5694'
      expect(res.body.name).toEqual(data.name); //use any other name value as a negative test
      //expect the body to have createdAt filed
      expect(res.body).toHaveProperty('createdAt');

      newBrandId = res.body;
        });
it('Schema Verification - Name is mandatory filed', async () => {
    
        const data = {
        name: '',
        description: 'Test Brand Samsung brand'
      }  
      const res = await request.post('/brands')
      .send(data);  

      //expect result code to be 200 (good)
      expect(res.statusCode).toEqual(200);
      //expect name to be A Plus 5694'
      expect(res.body.name).toEqual(data.name); //use any other name value as a negative test
      //expect the body to have createdAt filed
      expect(res.body).toHaveProperty('createdAt');

      newBrandId = res.body;
        });

    });

    describe('Fetch a new brand Test',() => {
    it('GET /brands/:id', async () => {

      const res = await request.get('/brands/' + newBrandId._id);  
      console.log(res.body);
      //expect result code to be 200 (good)
        expect(res.statusCode).toBe(200);
      //expect name to be the  same as the one created'
        expect(res.body.name).toEqual(newBrandId.name); //use any other name value as a negative test
        //newBrandId = res.body;  
         });

    });

    describe('PUT for a new brand Test',() => {
      it('PUT brands', async () => {
        const data = {
        name: 'Test Brand Samsung ' + 'updated',
      };
      const res = await request.put('/brands/' + newBrandId._id)
      .send(data);  
      console.log(res.body);
      //expect result code to be 200 (good)
      expect(res.statusCode).toEqual(200);
      //expect name to be A Plus 5694'
      expect(res.body.name).toEqual(data.name); //use any other name value as a negative test

      //update newBrandId to equal the body of the resPut body
      newBrandId = res.body;  
         });     
    });

   describe('DELETE a new brand Test',() => {
      it('DELETE brands', async () => {

      //Now delete the same brand
      const res = await request.delete('/brands/' + newBrandId._id);

      //print it out for clarification
      console.log(res.body);
      //check the status code
      expect(res.statusCode).toEqual(200)
      //check the body
      expect(res.body).toEqual(null)
         });     
    });

})
