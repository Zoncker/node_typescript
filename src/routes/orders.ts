import { Orders } from "../models/Orders";
import { Request, Response, Router } from "express";

export const orders = Router();

orders.get('/', function (req: Request, res: Response) {

    if(!req.session.key) {
        res.status(401).redirect('/')
    }

    console.log(req.session);

    let limit = parseInt(req.query.items);
    let offset = 0;

    Orders.findAndCountAll()
        .then((data) => {
            let page = parseInt(req.query.page);
            let pages = Math.ceil(data.count / limit);
            offset = limit * (page - 1);


            Orders.findAll({
                limit: limit,
                offset: offset,
            })
                .then(orders => res.json({
                    error: false,
                    data: orders,
                    count: data.count,
                    pages: pages
                }))
                .catch(error => res.json({
                    error: true,
                    data: [],
                    error: error
                }));
        })
});

orders.get('/:id', function (req: Request, res: Response) {
    if(!req.session.key) {
        res.status(401).redirect('/')
    }

    Orders.findById(req.params.id)
        .then(order => res.json({
            error: false,
            data: order
        }))
        .catch(error => res.json({
            error: true,
            data: [],
            error: error
        }));

});

orders.post('/', function (req, res) {
    if(!req.session.key) {
        res.status(401).redirect('/')
    }

    const { title, description, price } = req.body;

    Orders.create({
        title: title,
        description: description,
        price: price
    })
        .then(order => res.status(200).json({
            error: false,
            data: order,
            message: 'order created.'
        }))
        .catch(error => res.json({
            error: true,
            data: [],
            error: error
        }));
});

orders.put('/:id', function (req: Request, res: Response) {

    if(!req.session.key) {
        res.status(401).redirect('/')
    }

    const order_id = req.params.id;

    Orders.update({
        title: req.body.title,
        description: req.body.description,
        price: req.body.price
    }, {
        where: {
            id: order_id
        }
    })
        .then(order => res.status(200).json({
            error: false,
            message: 'order updated'
        }))
        .catch(error => res.json({
            error: true,
            error: error
        }));
});

orders.delete('/:id', function (req: Request, res: Response) {
    if(!req.session.key) {
        res.status(401).redirect('/')
    }

    const order_id = req.params.id;

    Orders.destroy({ where: {
            id: order_id
        }})
        .then(status => res.status(200).json({
            error: false,
            message: 'order deleted'
        }))
        .catch(error => res.json({
            error: true,
            error: error
        }));
});
