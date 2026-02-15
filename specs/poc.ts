import * as supertest from 'supertest';
import { describe, it } from 'node:test';
const request = supertest('https://jsonplaceholder.typicode.com');

describe('POC Tests', () => {

   it('GET /posts', async () => {
      const res = await request.get('/posts');  
      console.log(res);
   })
})