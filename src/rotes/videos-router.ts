import {Request, Response, Router} from "express";
import {productsRouter} from "./products-router";
import {app} from "../settings";


export let videos = [
    {id: 1, name: 'video: cool'},
    {id: 2, name:'video: beast'},
    {id: 3, name:'video: soap'}
]

export const videosRouter = Router({})

videosRouter.get('/', (req: Request, res: Response) => {
    res.send(videos)
})
videosRouter.post('/', (req: Request, res: Response) => {
    const newVideo ={
        id: +(new Date()),
        name: req.body.name
    }
    videos.push(newVideo)
    res.status(201).send(newVideo)
})
videosRouter.get('/:id', (req: Request, res: Response) => {
    let video = videos.find(v => v.id === +req.params.id)
    if (video) res.send(video)
    else res.send (404)
})
videosRouter.put('/:id', (req: Request, res: Response) => {
    let video = videos.find(v => v.id === +req.params.id)
    if (video)
    {
        if(req.body.name !== ''){
            video.name = req.body.name
            res.status(200).send(video)
        }
        else res.send(400)

    }
    else{
        res.send (404)
    }
})
videosRouter.delete('/:id', (req: Request, res: Response) => {
    for (let i = 0; i < videos.length; i++){
        if(videos[i].id === +req.params.id){
            videos.splice(i,1);
            res.send(204)
            return;
        }
    }
    res.send(404)
})
