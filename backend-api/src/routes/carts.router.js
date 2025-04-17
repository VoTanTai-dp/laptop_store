const express = require("express");
const cartsController = require("../controllers/carts.controller");
const { methodNotAllowed } = require("../controllers/errors.controller");
const imageUpload = require("../middlewares/image-upload.middleware");

const router = express.Router();

module.exports.setup = (app) => {
  app.use("/api/v1/carts", router);

  /**
   * @swagger
   * /api/v1/carts:
   *   get:
   *     summary: Get carts by filter
   *     description: Get carts by filter
   *     parameters:
   *       - in: query
   *         name: C_ID
   *         schema:
   *           type: integer
   *         description: Filter by customer id
   *       - in: query
   *         name: L_ID
   *         schema:
   *           type: integer
   *         description: Filter by laptop id
   *       - in: query
   *         name: CAR_DATE
   *         schema:
   *           type: string
   *         description: Filter by cart date
   *       - $ref: '#/components/parameters/limitParam'
   *       - $ref: '#/components/parameters/pageParam'
   *     tags:
   *       - carts
   *     responses:
   *       200:
   *         description: A list of carts
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 status:
   *                   type: string
   *                   description: The response status
   *                   enum: [success]
   *                 data:
   *                   type: object
   *                   properties:
   *                     carts:
   *                       type: array
   *                       items:
   *                         $ref: '#/components/schemas/Cart'
   *                     metadata:
   *                       $ref: '#/components/schemas/PaginationMetadata'
   *       404:
   *         description: Page not found
   *         $ref: '#/components/responses/404NotFound'
   *       405:
   *         description: Method not allowed
   *         $ref: '#/components/responses/405MethodNotAllowed'
   *       500:
   *         description: Internal Server Error
   *         $ref: '#/components/responses/500InternalServerError'
   */
  router.get("/", cartsController.getCartsByFilter);

  /**
   * @swagger
   * /api/v1/carts:
   *   post:
   *     summary: Create a new cart
   *     description: Create a new cart
   *     requestBody:
   *       required: true
   *       content:
   *         multipart/form-data:
   *           schema:
   *             $ref: '#/components/schemas/Cart'
   *     tags:
   *       - carts
   *     responses:
   *       201:
   *         description: A new cart
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 status:
   *                   type: string
   *                   description: The response status
   *                   enum: [success]
   *                 data:
   *                   type: object
   *                   properties:
   *                     cart:
   *                       $ref: '#/components/schemas/Cart'
   *       405:
   *         description: Method not allowed
   *         $ref: '#/components/responses/405MethodNotAllowed'
   *       500:
   *         description: Internal Server Error
   *         $ref: '#/components/responses/500InternalServerError'
   */
  router.post("/", imageUpload, cartsController.createCart);

  /**
   * @swagger
   * /api/v1/carts:
   *   delete:
   *     summary: Delete all carts
   *     description: Delete all carts
   *     tags:
   *       - carts
   *     responses:
   *       200:
   *         description: All carts deleted
   *         $ref: '#/components/responses/200NoData'
   *       404:
   *         description: Page not found
   *         $ref: '#/components/responses/404NotFound'
   *       405:
   *         description: Method not allowed
   *         $ref: '#/components/responses/405MethodNotAllowed'
   *       500:
   *         description: Internal Server Error
   *         $ref: '#/components/responses/500InternalServerError'
   */
  router.delete("/", cartsController.deleteAllCarts);

  router.all("/", methodNotAllowed);

  /**
   * @swagger
   * /api/v1/carts/{id}:
   *   get:
   *     summary: Get cart by ID
   *     description: Get cart by ID
   *     parameters:
   *       - $ref: '#/components/parameters/idParam'
   *     tags:
   *       - carts
   *     responses:
   *       200:
   *         description: A cart
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 status:
   *                   type: string
   *                   description: The response status
   *                   enum: [success]
   *                 data:
   *                   type: object
   *                   properties:
   *                     cart:
   *                       $ref: '#/components/schemas/Cart'
   *       404:
   *         description: Page not found
   *         $ref: '#/components/responses/404NotFound'
   *       405:
   *         description: Method not allowed
   *         $ref: '#/components/responses/405MethodNotAllowed'
   *       500:
   *         description: Internal Server Error
   *         $ref: '#/components/responses/500InternalServerError'
   */
  router.get("/:id", cartsController.getCart);

  /**
   * @swagger
   * /api/v1/carts/{id}:
   *   put:
   *     summary: Update cart by ID
   *     description: Update a cart by its unique ID
   *     parameters:
   *       - name: id
   *         in: path
   *         required: true
   *         schema:
   *           type: string
   *         description: The ID of the cart to update
   *     requestBody:
   *       required: true
   *       content:
   *         multipart/form-data:
   *           schema:
   *             $ref: '#/components/schemas/Cart'
   *     tags:
   *       - carts
   *     responses:
   *       200:
   *         description: An updated cart
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 status:
   *                   type: string
   *                   description: The response status
   *                   enum: [success]
   *                 data:
   *                   type: object
   *                   properties:
   *                     cart:
   *                       $ref: '#/components/schemas/Cart'
   *       404:
   *         description: Page not found
   *         $ref: '#/components/responses/404NotFound'
   *       405:
   *         description: Method not allowed
   *         $ref: '#/components/responses/405MethodNotAllowed'
   *       500:
   *         description: Internal Server Error
   *         $ref: '#/components/responses/500InternalServerError'
   */
  router.put("/:id", imageUpload, cartsController.updateCart);

  /**
   *  @swagger
   *    /api/v1/carts/{id}:
   *      delete:
   *        summary: Delete cart by ID
   *        description: Delete cart by ID
   *        parameters:
   *          - $ref: '#/components/parameters/idParam'
   *        tags:
   *          - carts
   *        responses:
   *          200:
   *            description: Cart deleted
   *            $ref: '#/components/responses/200NoData'
   *          404:
   *            description: Page not found
   *            $ref: '#/components/responses/404NotFound'
   *          405:
   *            description: Method not allowed
   *            $ref: '#/components/responses/405MethodNotAllowed'
   *          500:
   *            description: Internal Server Error
   *            $ref: '#/components/responses/500InternalServerError'
   */
  router.delete("/:id", cartsController.deleteCart);

  router.all("/:id", methodNotAllowed);
};
