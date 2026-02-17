import { generatePrime } from 'node:crypto';
import { clearScreenDown } from 'node:readline';
import * as supertest from 'supertest';
//import { describe, it } from 'node:test';
const request = supertest('https://practice-react.sdetunicorns.com/api/test');

describe('Brands Negative Test', () => {
    let newBrandId: any;
    
describe('Brand Schema Validation Test',() => {
it('POST an existing brand /brands', async () => {
    
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
      expect(res.body).toHaveProperty('createdAt');      //expect result code to be 200 (good)
      expect(res.statusCode).toEqual(200);

      newBrandId = res.body;
        });
    it('Business Logic - Brand doesnt exist', async () => {
    
      const res = await request.get('/brands/69930f093a8ec410bfeece88');  

      //expect result code to be 200 (good)
      expect(res.statusCode).toEqual(404);
      //expect name to be A Plus 5694'
      expect(res.body.error).toEqual('Brand not found.');
        }); 

    }); 

  describe('Fetch a new brand Test',() => {
    it('GET /brands/:id', async () => {

      const res = await request.get('/brands/' + newBrandId._id);  
      //expect result code to be 200 (good)
        expect(res.statusCode).toBe(200);
      //expect name to be the  same as the one created'
        expect(res.body.name).toEqual(newBrandId.name); //use any other name value as a negative test
        //newBrandId = res.body;  
         });

    });

    describe('PUT Schema & Business Logic validation',() => {
      it('PUT brands fail on name >30 chars', async () => {
        const data = {
        name: newBrandId.name + 'updated to be greater than 30',
      };
      const res = await request.put('/brands/' + newBrandId._id)
      .send(data); 
      //expect result code to be 422 (error)
      expect(res.statusCode).toEqual(422);
      //expect name to be A Plus 5694'
      expect(res.body.error).toEqual('Brand name is too long'); //use any other name value as a negative test
         });
    
        it('PUT brands description must be string', async () => {
        
        const numericName = Math.floor(Math.random() * 10000)
          const data = {
        name: newBrandId.name,
        description: numericName
      };
      const res = await request.put('/brands/' + newBrandId._id)
      .send(data);  
      //expect result code to be 422 (error)
      expect(res.statusCode).toEqual(422);
      //expect name to be A Plus 5694'
      expect(res.body.error).toEqual('Brand description must be a string');
 
         });
         
       it('PUT brands Business Logic - Invalid Brand', async () => {
        //generate a 24 digit number
        const data = {
        name: 'Brand to be updated',
      };
      const res = await request.put('/brands/' + 123) //_id is 24 digits long. this is a hardcoded value
      .send(data);
      //expect result code to be 422 (error)
      expect(res.statusCode).toEqual(422);
      //expect name to be A Plus 5694'
      expect(res.body.error).toEqual('Unable to update brands'); //use any other name value as a negative test
         });        
        
    });

   describe('DELETE a new brand Test',() => {
      it('DELETE brands', async () => {

      //Now delete the same brand
      const res = await request.delete('/brands/' + newBrandId._id);

      //check the status code
      expect(res.statusCode).toEqual(200)
      //check the body
      expect(res.body).toEqual(null)
         }); 

      it('DELETE Invalid brand', async () => {

      //Now delete the same brand
      const res = await request.delete('/brands/' + 1213);

      //print it out for clarification
      console.log(res.body);
      //check the status code
      expect(res.statusCode).toEqual(422)
      //check the body
      expect(res.body.error).toEqual('Unable to delete brand');
         });          
         
    });

})
