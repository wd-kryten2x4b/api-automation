import * as supertest from 'supertest';
import config from '../config/base.config';
const request = supertest(config.baseURL);

class BrandContoller{
    getBrands(){
        return request.get('/brands');
    };

    getBrandsById(id:string | number){
        return request.get('/brands/' + id)
    };

    postBrands(data: {[key: string]: string}){
        return request
        .post('/brands')
        .send(data);
    };

    putBrands(id:string | number, data: {[key: string]: string | number}){
        return request
        .put('/brands/' + id)
        .send(data);
    };

    deleteBrand(id:string){
        return request
        .delete('/brands/' + id);
    };
}

export default new BrandContoller();
