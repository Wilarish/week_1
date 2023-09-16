import express, {Request, Response} from "express";
import bodyParser from "body-parser";
import {videos, videosRouter} from "./rotes/videos-router";
import {productsRouter} from "./rotes/products-router";

export const app = express()


const parseMiddleWare = bodyParser({})
app.use(parseMiddleWare)

app.use('/videos ',videosRouter)
app.use('/products', productsRouter)

app.get('/', (req:Request, res:Response)=>{
    res.send('Hellow world!')
})
app.delete('/__tests__/data',(req, res)=>{
    videos.splice(0,videos.length)
    res.send(videos)
    res.sendStatus(200)
})
app.delete('/testing/all-data',(req, res)=>{
    videos.splice(0,videos.length)
    res.send(videos)
    res.sendStatus(200)
})