import * as supertest from 'supertest';
//import { describe, it } from 'node:test';
const request = supertest('https://jsonplaceholder.typicode.com');

describe('POC Tests', () => {

   describe('Get Requests', () => {

      it('GET /posts', async () => {
      const res = await request.get('/posts');  
      //console.log(res);
      expect(res.statusCode).toBe(200);
      expect(res.body[0].id).toBe(1);
   });

it('GET /comments with query params', async () => {
      //const res = await request.get('/comments?podtId=1'); 
      const res = await request.get('/comments').query({postId: 1, limit: 10});
      console.log(res);
      expect(res.statusCode).toBe(200);
      expect(res.body[0].postId).toBe(1);
   });

   });

   describe('Post Requests', () => {
      //adding .only will run just that test
      it('POST to /posts', async () =>{

         const data = {
            title: 'My First Post',
            body: 'My first post using jest/supertest',
            userId: 1,
         }

         const res = await request
            .post('/posts')
            .send(data)

         console.log(res.body);
         expect(res.statusCode).toBe(201);
         expect(res.body.title).toBe(data.title);
      });
   });

   describe('PUT Requests', () => {
      //adding .only will run just that test
      it('PUT to update  /posts{id}', async () =>{

         const data = {
            title: 'My updated to my First Post',
            body: 'My update to my first post using jest/supertest',
            userId: 5,
         }

         //get detals of existing post
         const getRes = await request.get('/posts/1');
         const beforeTitle = getRes.body.title;

         const res = await request
            .put('/posts/1')
            .send(data)

         console.log(res.body);
         expect(res.statusCode).toBe(200);
         expect(res.body.title).not.toBe(beforeTitle);
         expect(res.body.title).toBe(data.title); //check in case the update didn't work

         //add another get to ensure that the update worked but won't work on the test database as it shows as
         //being updated but doesn't actually do that
         const afterRes = await request.get('/posts/1');
         const newTitle = afterRes.body.title;
         const newBody = afterRes.body.body;
         const userId = afterRes.body.userId;

         expect(res.body.title).toBe(newTitle);
         expect(res.body.body).toBe(newBody);
         expect(res.body.userId).toBe(userId);


      });
   });

   describe('PATCH Requests', () => {
      //adding .only will run just that test
      it('PATCH to update  /posts{id}', async () =>{

         const data = {
            title: 'My 2nd update to my First Post'
         }

         //get detals of existing post which is optional
         const getRes = await request.get('/posts/1');
         const beforeTitle = getRes.body.title;

         const res = await request
            .patch('/posts/1')
            .send(data)

         console.log(res.body);
         expect(res.statusCode).toBe(200);
         expect(res.body.title).not.toBe(beforeTitle);
         expect(res.body.title).toBe(data.title); //check in case the update didn't work

         //add another get to ensure that the update worked but won't work on the test database as it shows as
         //being updated but doesn't actually do that
         // const afterRes = await request.get('/posts/1');
         // const newTitle = afterRes.body.title;
         // const newBody = afterRes.body.body;
         // const userId = afterRes.body.userId;

         // expect(res.body.title).toBe(newTitle);
         // expect(res.body.body).toBe(newBody);
         // expect(res.body.userId).toBe(userId);


      });
   });

   describe('DELETE Requests', () => {
      //adding .only will run just that test
      it.only('PATCH to update  /posts{id}', async () =>{

         const res = await request
            .delete('/posts/1')

         console.log(res.body);
         expect(res.statusCode).toBe(200);
         expect(res.body).toEqual({}); //check in case the update didn't work
      });
   });


})