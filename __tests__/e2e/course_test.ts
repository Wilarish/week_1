
import request from 'supertest'
import {app} from "../../src/settings";

describe('/videos', ()=>{
    beforeAll(async ()=>{
        await  request(app).delete('/__tests__/data')
    })


    it('should return 200 and empty array', async () => {
        await request(app)
            .get('/videos')
            .expect(200, [])
    })

    let createdVideo: any = null
    let createdVideo_2: any = null

    it('should create video with correct data', async () => {
        const createResponse = await request(app)
            .post('/videos')
            .send({name:'video: shortcut'})
            .expect(201)

        createdVideo = createResponse.body;

        expect(createdVideo).toEqual({
            id: expect.any(Number),
            name:'video: shortcut'
        })

        await request(app)
            .get('/videos')
            .expect(200, [createdVideo])
    });
    it('should сreate course correct ', async () => {
        const createResponse = await request(app)
            .post('/videos')
            .send({name:'video: shortcut_2'})
            .expect(201)

        createdVideo_2 = createResponse.body;

        expect(createdVideo_2).toEqual({
            id: expect.any(Number),
            name:'video: shortcut_2'
        })

        await request(app)
            .get('/videos')
            .expect(200, [createdVideo,createdVideo_2])
    });

    it('shouldn`t update video ', async () => {
        await request(app)
            .put('/videos/' + createdVideo.id)
            .send({name:''})
            .expect(400)

        await request(app)
            .get('/videos/'+ createdVideo.id)
            .expect(200, createdVideo)
    });
    it('should update unexpected video ', async () => {
        await request(app)
            .put('/videos/' + -100)
            .send({name:null})
            .expect(404)

    });
    it('should update course correct ', async () => {
        await request(app)
            .put('/videos/' + createdVideo.id)
            .send({name:'video: change'})
            .expect(200)

        await request(app)
            .get('/videos/'+ createdVideo.id)
            .expect(200, {
                ...createdVideo,
                name:'video: change'
            })
    });


})

