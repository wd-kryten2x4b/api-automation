import * as supertest from 'supertest';
import config from '../config/base.config';
const request = supertest(config.baseURL);

class adminController{

    postAdminLogin(data: {[key: string]: string}){
        return request
        .post('/admin/login')
        .send(data);
    }

}

export default new adminController();
