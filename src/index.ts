import express, {Request, Response} from 'express'
import cors from 'cors'
import bodyParser from 'body-parser'

const app = express()
const port =process.env.PORT || 3000

const corsMiddleware = cors();
app.use(corsMiddleware)
const jsonBodyMiddleware = bodyParser.json
app.use(jsonBodyMiddleware)




app.get('/', (req: Request, res: Response) => {
    res.send('Helloh World!!!!!!')
})
app.get('/what', (req: Request, res: Response) => {
    res.send('what?')
})
app.get('/videos', (req: Request, res: Response) => {
    res.send('more videos')
})
app.get('/videos/:id', (req: Request, res: Response) => {
    res.send('video number....')
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})