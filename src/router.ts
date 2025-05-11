import { Router } from 'express'
import { createProduct, deleteProduct, getProductById, getProducts, updateAvailability, updateProduct } from './handlers/product'
import { body, param, validationResult} from 'express-validator'
import { handleInputErrors } from './middleware'

const router = Router()

// Routing
router.get('/', getProducts)

router.get('/:id', 
    param('id').isInt().withMessage('ID no valido'),
    handleInputErrors,
    getProductById)

router.post('/', 
     // Validacion  body se usa en funciones no asincronas
    body('name').notEmpty().withMessage('El nombre de Producto no puede ir vacio'),
    body('price')
        .isNumeric().withMessage('Valor no valido')
        .notEmpty().withMessage('El nombre de Producto no puede ir vacio')
        .custom(value => value > 0).withMessage('Precio no valido'),
    handleInputErrors,
    createProduct)

// put actualiza completamente el recurso existente 
router.put('/:id', 
    // Validacion  body se usa en funciones no asincronas
    param('id').isInt().withMessage('ID no valido'),
    body('name').notEmpty().withMessage('El nombre de Producto no puede ir vacio'),
    body('price')
        .isNumeric().withMessage('Valor no valido')
        .notEmpty().withMessage('El nombre de Producto no puede ir vacio')
        .custom(value => value > 0).withMessage('Precio no valido'),
    body('availability')
        .isBoolean().withMessage('Valor para disponibilidad no valido'),
    handleInputErrors,
    updateProduct)

// patch solo remplaza lo que se esta enviando
router.patch('/:id', 
    param('id').isInt().withMessage('ID no valido'),
    handleInputErrors,
    updateAvailability)

router.delete('/:id', 
    param('id').isInt().withMessage('ID no valido'),
    handleInputErrors,
    deleteProduct)


export default router
