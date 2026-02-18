import * as supertest from 'supertest';
const request = supertest('https://practice-react.sdetunicorns.com/api/test');

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
