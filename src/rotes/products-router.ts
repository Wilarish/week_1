import {Request, Response, Router} from "express";

export let products = [
    {id: 1, name: 'oranges'},
    {id: 2, name:'tomato'}
]
export const productsRouter = Router({})

productsRouter.get('/', (req: Request, res: Response) => {
    res.send('Hellow World!')
})
productsRouter.get('/', (req: Request, res: Response) => {
    if (req.query.name){
        let search = req.query.name.toString()
        res.send(products.filter(p => p.name.indexOf(search) > -1))
    }
    else res.send(products)
})
productsRouter.get('/:productTitle', (req: Request, res: Response) => {

    let product = products.find(p => p.name === req.params.productTitle)
    if (product) res.send(product)
    else res.send(404)
})
