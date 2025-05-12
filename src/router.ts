import { Router } from 'express'
import { createProduct, deleteProduct, getProductById, getProducts, updateAvailability, updateProduct } from './handlers/product'
import { body, param, validationResult} from 'express-validator'
import { handleInputErrors } from './middleware'

const router = Router()
/**
 * @swagger
 *  components: 
 *      schemas: 
 *          Product: 
 *              type: object
 *              properties:
 *                  id:
 *                      type: integer
 *                      description: The Product ID
 *                      example: 1
 *                  name:
 *                      type: string
 *                      description: The Product name
 *                      example: Monitor Curvo de 49 pulgadas
 *                  price:
 *                      type: integer
 *                      description: The Product price
 *                      example: 300
 *                  availability:
 *                      type: boolean
 *                      description: The Product availability
 *                      example: true   
 */

// Routing
/** 
 * @swagger
 *  /api/products:
 *      get:
 *          summary: Get a list of products
 *          tags:
 *              - Products
 *          description: Return a list of products
 *          responses: 
 *              200: 
 *                  description: Successful response
 *                  content:
 *                      application/json:
 *                          schema:
 *                              type: array
 *                              items:
 *                                  $ref: '#/components/schemas/Product'
*/
router.get('/', getProducts)

/** 
 * @swagger
 * /api/products/{id}:
 *  get:
 *      summary: Get a product by ID
 *      tags:
 *          - Products
 *      description: Return a product based on its unique ID
 *      parameters:
 *          - in: path
 *            name: id
 *            description: The ID oh the product to retrive
 *            required: true
 *            schema:
 *              type: integer
 *      responses:
 *          200:
 *              description: Successful Response
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/Product'
 *          404:
 *              description: Not found
 *          400:
 *              description: Bad Request - Invalid ID
*/
router.get('/:id', 
    param('id').isInt().withMessage('ID no valido'),
    handleInputErrors,
    getProductById)

/** 
 * @swagger
 * /api/products:
 *  post:
 *      summary: Creates a new product
 *      tags:
 *          - Products
 *      description: Return a new record in the database
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      properties: 
 *                          name: 
 *                              type: string
 *                              example: "Monitor Curvo 49 pulgadas"
 *                          price: 
 *                              type: number
 *                              example: 399
 *      responses:
 *          201:
 *              description: Successful response
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/Product'
 *          400:
 *              description: Bad Request - invalid data
 *
*/
router.post('/', 
     // Validacion  body se usa en funciones no asincronas
    body('name').notEmpty().withMessage('El nombre de Producto no puede ir vacio'),
    body('price')
        .isNumeric().withMessage('Valor no valido')
        .notEmpty().withMessage('El nombre de Producto no puede ir vacio')
        .custom(value => value > 0).withMessage('Precio no valido'),
    handleInputErrors,
    createProduct)

/**
 * @swagger
 * /api/products/{id}:
 *  put: 
 *      summary: Updates a product with user input
 *      tags: 
 *          - Products
 *      description: Returns the updated product 
 *      parameters:
 *          - in: path
 *            name: id
 *            description: The ID oh the product to retrive
 *            required: true
 *            schema:
 *              type: integer
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      properties: 
 *                          name: 
 *                              type: string
 *                              example: "Monitor Curvo 49 pulgadas"
 *                          price: 
 *                              type: number
 *                              example: 399
 *                          availability: 
 *                              type: boolean
 *                              example: true
 *      responses:
 *          200:
 *              description: Successful response
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/Product'
 *          400:
 *              description: Bad Request - Invalid ID or Invalid input data
 *          404:
 *              description: Product Not Found
 */
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

/**
 * @swagger
 * /api/products/{id}:
 *  patch: 
 *      summary: Updates product availability
 *      tags: 
 *          - Products
 *      description: Returns the updated availability 
 *      parameters:
 *          - in: path
 *            name: id
 *            description: The ID oh the product to retrive
 *            required: true
 *            schema:
 *              type: integer
 *      responses:
 *          200:
 *              description: Successful response
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/Product'
 *          400:
 *              description: Bad Request - Invalid ID
 *          404:
 *              description: Product Not Found
 */
// patch solo remplaza lo que se esta enviando
router.patch('/:id', 
    param('id').isInt().withMessage('ID no valido'),
    handleInputErrors,
    updateAvailability)

/**
 * @swagger
 * /api/products/{id}:
 *  delete: 
 *      summary: Delete a product by a gicen ID
 *      tags: 
 *          - Products
 *      description: Returns a confirmation message
 *      parameters:
 *          - in: path
 *            name: id
 *            description: The ID oh the product to delete
 *            required: true
 *            schema:
 *              type: integer
 *      responses:
 *          200:
 *              description: Successful response
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: string
 *                          value: 'Producto Eliminado'
 *          400:
 *              description: Bad Request - Invalid ID
 *          404:
 *              description: Product Not Found
 */
router.delete('/:id', 
    param('id').isInt().withMessage('ID no valido'),
    handleInputErrors,
    deleteProduct)


export default router
