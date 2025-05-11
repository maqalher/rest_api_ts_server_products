import { Request, Response } from 'express'
// import { check, validationResult} from 'express-validator'
import Product from '../models/Product.model'

export const getProducts = async(req: Request, res: Response) => {
    const products = await Product.findAll({
        order: [
            ['id', 'DESC']
        ],
        attributes: {exclude: ['updatedAt', 'createdAt']}
    })
    res.json({data: products})
}

export const getProductById = async (req: Request, res: Response) => {
    const { id } = req.params
    const product = await Product.findByPk(id)

    if(!product){
        res.status(404).json({
            error: 'Prodcuto no encontrado'
        })
        return
    }

        res.json({data: product})
}

export const createProduct = async (req: Request, res: Response) => {

    // // Validacion  // check se usa en funciones asincronas
    // await check('name').notEmpty().withMessage('El nombre de Producto no puede ir vacio')
    //     .run(req)
    // await check('price')
    //     .isNumeric().withMessage('Valor no valido')
    //     .notEmpty().withMessage('El nombre de Producto no puede ir vacio')
    //     .custom(value => value > 0).withMessage('Precio no valido')
    //     .run(req)

    // let errors = validationResult(req)
    // if(!errors.isEmpty()){
    //     res.status(400).json({errors: errors.array()})
    //     return
    // }

    try {
        // const product = new Product(req.body)
        // const savedProduct = await product.save()
        const product = await Product.create(req.body)
        res.status(201).json({data: product})
    } catch (error) {
        console.log(error);
    }
}

export const updateProduct = async(req: Request, res: Response) => {
    const { id } = req.params
    const product = await Product.findByPk(id)

    if(!product){
        res.status(404).json({
            error: 'Prodcuto no encontrado'
        })
        return
    }

    // Actualizar
    await product.update(req.body)
    await product.save()

        res.json({data: product})
}

export const updateAvailability = async(req: Request, res: Response) => {
    const { id } = req.params
    const product = await Product.findByPk(id)

    if(!product){
        res.status(404).json({
            error: 'Prodcuto no encontrado'
        })
        return
    }

    // Actualizar
    product.availability = !product.dataValues.availability
    await product.save()

        res.json({data: product})
}

export const deleteProduct = async(req: Request, res: Response) => {
    const { id } = req.params
    const product = await Product.findByPk(id)

    if(!product){
        res.status(404).json({
            error: 'Prodcuto no encontrado'
        })
        return
    }

    await product.destroy()
    res.json({data: 'Producto Eliminado'})
}