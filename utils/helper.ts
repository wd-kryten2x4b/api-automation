import adminToken from '../Controller/admin.controller.spec'
import categoriesController from '../Controller/categories.controller.spec'

export const login = async(email: string, password: string) => {       
        const data ={"email": email,"password": password};
        const res = await adminToken.postAdminLogin(data);
        return res.body.token;        
}

export const getCatergoryId  = async(token: string) => {
        const body = {"name": "William Test Category " + Math.floor(Math.random() * 10000)};
        const res = await categoriesController
            .postCategories(body)
            .set("Authorization", "Bearer " + token);
        return res.body._id;
} 
//login('mod@mail.com', 'Modpass123!')