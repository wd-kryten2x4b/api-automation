import controller from "../Controller/brand.Controller.spec";

describe('Brands API Test Cases', () => {
    let newBrandId: any;

  describe('Fetch brands', () => {
    it('GET /brands', async () => {
      const res = await controller.getBrands();
      expect(res.statusCode).toEqual(200);
      expect(res.body.length).toBeGreaterThan(1);
      expect(Object.keys(res.body[0])).toEqual(['_id', 'name']);
    });
  });
    
describe('Create Brands',() => {
  //new variable
  let postBrand:any;
  //set the Data body
  const bNumber = Math.floor(Math.random() * 10000)
  const data = {
       name: 'Test Brand Samsung ' + bNumber,
       description: 'Test Brand Samsung brand'
      };
  //add a before all hook here
    beforeAll(async () => {
        postBrand = await controller.postBrands(data);
    });
   
  //add a after all hooks to remove all the created data
    afterAll(async () => {
      await controller.deleteBrand(postBrand.body._id);
    });
it('POST /brands', async () => {
    
      //expect result code to be 200 (good)
      expect(postBrand.statusCode).toEqual(200);
      //expect name to be A Plus 5694'
      expect(postBrand.body.name).toEqual(data.name); //use any other name value as a negative test
      //expect the body to have createdAt filed
      expect(postBrand.body).toHaveProperty('createdAt');      //expect result code to be 200 (good)
        });

    it('Schema Verification - Name is mandatory field', async () => {
    
        const data = {
        name: '',
        description: 'Test Brand Samsung brand'
      }  
      const res = await controller.postBrands(data);  

      //expect result code to be 200 (good)
      expect(res.statusCode).toEqual(422);
      //expect name to be A Plus 5694'
      expect(res.body.error).toEqual('Name is required');
        });     

      it('Schema Verification - Name minimum length >1', async () => {
    
        const data = {
        name: 'A',
        description: 'Test Brand Samsung brand'
      }  
      const res = await controller.postBrands(data);  

      //expect result code to be 200 (good)
      expect(res.statusCode).toEqual(422);
      //expect name to be A Plus 5694'
      expect(res.body.error).toEqual('Brand name is too short');
        });

it('Business Logig - brands name >30 chars', async () => {
        const data = {
        name: postBrand.name + 'updated to be greater than 30',
      };
      const res = await controller.putBrands(postBrand.body._id, data); 
      //expect result code to be 422 (error)
      expect(res.statusCode).toEqual(422);
      //expect name to be A Plus 5694'
      expect(res.body.error).toEqual('Brand name is too long'); //use any other name value as a negative test
         });        

it('Business Logic - Duplicate brand entries not allowed', async () => {
      //1st request is created by the before all hook
      
      //2nd Request
       const res2 = await controller.postBrands(data);
           
      //First request assertions
      //expect result code to be 200 (good)
      expect(postBrand.statusCode).toEqual(200);
      //expect name to be A Plus 5694'
      expect(postBrand.body.name).toEqual(data.name); //use any other name value as a negative test
      //expect the body to have createdAt filed
      expect(postBrand.body).toHaveProperty('createdAt');

      //2nd request assertions
      expect(res2.statusCode).toEqual(422);
      //expect the body to have createdAt filed
      expect(res2.body.error).toEqual(data.name +' already exists');

      //newBrandId = res.body;
        });        
    }); 

  describe('Fetch Individual Brand',() => {
    //new vairable specifically for GET
    let postBrand: any;
    //add a before all hook to create a new brand so that the test can be run independantly
    beforeAll(async () => {
       const bNumber = Math.floor(Math.random() * 10000)
        const data = {
        name: 'Test Brand Samsung ' + bNumber,
        description: 'Test Brand Samsung brand'
      }
      postBrand = await controller.postBrands(data);
    });

        //add a after all hooks to remove all the created data
    afterAll(async () => {
        await controller.deleteBrand(postBrand.body._id);
    });

    it('GET /brands/:id', async () => { 
      const res = await controller.getBrandsById(postBrand.body._id);  
      //expect result code to be 200 (good)
        expect(res.statusCode).toBe(200);
      //expect name to be the  same as the one created'
        expect(res.body.name).toEqual(postBrand.body.name); //use any other name value as a negative test
        //newBrandId = res.body;  
         });

    it('Business Logic - Brand doesnt exist', async () => {
    
      const res = await controller.getBrandsById('69930f093a8ec410bfeece88');  

      //expect result code to be 200 (good)
      expect(res.statusCode).toEqual(404);
      //expect name to be A Plus 5694'
      expect(res.body.error).toEqual('Brand not found.');
        }); 

    });

  describe('Update Brands',() => {

  //new variable
  let postBrand:any;
  //set the Data body
  const bNumber = Math.floor(Math.random() * 10000)
  const data = {
       name: 'Test Brand Samsung ' + bNumber,
       description: 'Test Brand Samsung brand'
      };
  //add a before all hook here
    beforeAll(async () => {
        postBrand = await controller.postBrands(data);
    });

    //add a after all hooks to remove all the created data
    afterAll(async () => {
        await controller.deleteBrand(postBrand.body._id);
    });

      it('PUT brands fail on name >30 chars', async () => {
        //Send the PUT Request
        const data = {
          name: postBrand.body.name + ' updated to be greater than 30',
        };
        const res = await controller.putBrands(postBrand.body._id, data);
      //expect result code to be 422 (error)
      expect(res.statusCode).toEqual(422);
      //expect name to be A Plus 5694'
      expect(res.body.error).toEqual('Brand name is too long'); //use any other name value as a negative test
         });
    
        it('PUT brands description must be string', async () => {
      
        const numericName = Math.floor(Math.random() * 10000)
        const data = {
        name: postBrand.body.name,
        description: numericName
      };      
      const res = await controller.putBrands(postBrand.body._id, data);
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
      const res = await controller.putBrands(123, data); //_id is 24 digits long. this is a hardcoded value
      //expect result code to be 422 (error)
      expect(res.statusCode).toEqual(422);
      //expect name to be A Plus 5694'
      expect(res.body.error).toEqual('Unable to update brands'); //use any other name value as a negative test
         });        
        
    });

  describe('DELETE Brands',() => {
    //Set the before all hook for delete
  //new variable
  let postBrand:any;
  //set the Data body
  const bNumber = Math.floor(Math.random() * 10000)
  const data = {
       name: 'Test Brand Samsung ' + bNumber,
       description: 'Test Brand Samsung brand'
      };
  //add a before all hook here
    beforeAll(async () => {
        postBrand = await controller.postBrands(data);
    });

    it('DELETE brands', async () => {

      //Now delete the same brand
      const res = await controller.deleteBrand(postBrand.body._id);
      //check the status code
      expect(res.statusCode).toEqual(200)
      //check the body
      expect(res.body).toEqual(null)
         }); 

      it('DELETE Invalid brand', async () => {

      //Now delete the same brand
      const res = await controller.deleteBrand('1213');

  
      //check the status code
      expect(res.statusCode).toEqual(422)
      //check the body
      expect(res.body.error).toEqual('Unable to delete brand');
         });          
         
    });
})
