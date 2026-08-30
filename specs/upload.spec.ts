import controller from "../Controller/upload.controller.spec"; 

describe('Upload files', () => {

    it('POST /upload/single', async ()=> {
        const res = await controller.postUploadSingle('data/Dogs.jpg');
        expect(res.body.filename).toEqual('Dogs.jpg');  
        });

    it('POST /upload/multiple', async ()=> {
        const files = [
            'data/Dogs.jpg',
            'data/Dogs2.jpg'
        ]
        const res = await controller.postUploadMultiple(files);
        expect(res.statusCode).toBe(200);        
        expect(res.body.length).toEqual(2);
        expect(res.body[0].filename).toEqual('Dogs.jpg');
        expect(res.body[1].filename).toEqual('Dogs2.jpg');         
        });
    });
