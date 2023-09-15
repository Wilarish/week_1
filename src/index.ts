import express, {Request, Response} from 'express'
import bodyParser from 'body-parser'


export const app = express()
const port = process.env.PORT || 3000
let products = [
    {id: 1, name: 'oranges'},
    {id: 2, name:'tomato'}
]
let videos = [
    {id: 1, name: 'video: cool'},
    {id: 2, name:'video: beast'},
    {id: 3, name:'video: soap'}
]


const parseMiddleWare = bodyParser({})
app.use(parseMiddleWare)
app.get('/', (req: Request, res: Response) => {
    res.send('Hellow World!')
})


app.get('/products', (req: Request, res: Response) => {
    if (req.query.name){
        let search = req.query.name.toString()
        res.send(products.filter(p => p.name.indexOf(search) > -1))
    }
    else res.send(products)
})
app.get('/products/:productTitle', (req: Request, res: Response) => {

    let product = products.find(p => p.name === req.params.productTitle)
    if (product) res.send(product)
    else res.send(404)
})
app.get('/videos', (req: Request, res: Response) => {
    res.send(videos)
})
app.post('/videos', (req: Request, res: Response) => {
    const newVideo ={
        id: +(new Date()),
        name: req.body.name
    }
    videos.push(newVideo)
    res.status(201).send(newVideo)
})
app.get('/videos/:id', (req: Request, res: Response) => {
    let video = videos.find(v => v.id === +req.params.id)
    if (video) res.send(video)
    else res.send (404)
})
app.put('/videos/:id', (req: Request, res: Response) => {
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
app.delete('/videos/:id', (req: Request, res: Response) => {
    for (let i = 0; i < videos.length; i++){
        if(videos[i].id === +req.params.id){
            videos.splice(i,1);
            res.send(204)
            return;
        }
    }
    res.send(404)
})

app.delete('/__tests__/data',(req,res)=>{
    videos = [];
    res.send(videos)
    res.sendStatus(200)
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})