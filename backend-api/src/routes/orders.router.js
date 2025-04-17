const express = require("express");
const ordersController = require("../controllers/orders.controller");
const { methodNotAllowed } = require("../controllers/errors.controller");
const imageUpload = require("../middlewares/image-upload.middleware");

const router = express.Router();

module.exports.setup = (app) => {
  app.use("/api/v1/orders", router);

  /**
   * @swagger
   * /api/v1/orders:
   *   get:
   *     summary: Get orders by filter
   *     description: Get orders by filter
   *     parameters:
   *       - in: query
   *         name: O_ID
   *         schema:
   *           type: integer
   *         description: Filter by order id
   *       - in: query
   *         name: O_DATE
   *         schema:
   *           type: string
   *         description: Filter by order date
   *       - $ref: '#/components/parameters/limitParam'
   *       - $ref: '#/components/parameters/pageParam'
   *     tags:
   *       - orders
   *     responses:
   *       200:
   *         description: A list of orders
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
   *                     orders:
   *                       type: array
   *                       items:
   *                         $ref: '#/components/schemas/Order'
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
  router.get("/", ordersController.getOrdersByFilter);

  /**
   * @swagger
   * /api/v1/orders:
   *   post:
   *     summary: Create a new order
   *     description: Create a new order
   *     requestBody:
   *       required: true
   *       content:
   *         multipart/form-data:
   *           schema:
   *             $ref: '#/components/schemas/Order'
   *     tags:
   *       - orders
   *     responses:
   *       201:
   *         description: A new order
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
   *                     order:
   *                       $ref: '#/components/schemas/Order'
   *       405:
   *         description: Method not allowed
   *         $ref: '#/components/responses/405MethodNotAllowed'
   *       500:
   *         description: Internal Server Error
   *         $ref: '#/components/responses/500InternalServerError'
   */
  router.post("/", imageUpload, ordersController.createOrder);

  /**
   * @swagger
   * /api/v1/orders:
   *   delete:
   *     summary: Delete all orders
   *     description: Delete all orders
   *     tags:
   *       - orders
   *     responses:
   *       200:
   *         description: All orders deleted
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
  router.delete("/", ordersController.deleteAllOrders);

  router.all("/", methodNotAllowed);

  /**
   * @swagger
   * /api/v1/orders/{id}:
   *   get:
   *     summary: Get order by ID
   *     description: Get order by ID
   *     parameters:
   *       - $ref: '#/components/parameters/idParam'
   *     tags:
   *       - orders
   *     responses:
   *       200:
   *         description: A order
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
   *                     order:
   *                       $ref: '#/components/schemas/Order'
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
  router.get("/:id", ordersController.getOrder);

  /**
   * @swagger
   * /api/v1/orders/{id}:
   *   put:
   *     summary: Update order by ID
   *     description: Update a order by its unique ID
   *     parameters:
   *       - name: id
   *         in: path
   *         required: true
   *         schema:
   *           type: string
   *         description: The ID of the order to update
   *     requestBody:
   *       required: true
   *       content:
   *         multipart/form-data:
   *           schema:
   *             $ref: '#/components/schemas/Order'
   *     tags:
   *       - orders
   *     responses:
   *       200:
   *         description: An updated order
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
   *                     order:
   *                       $ref: '#/components/schemas/Order'
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
  router.put("/:id", imageUpload, ordersController.updateOrder);

  /**
   *  @swagger
   *    /api/v1/orders/{id}:
   *      delete:
   *        summary: Delete order by ID
   *        description: Delete order by ID
   *        parameters:
   *          - $ref: '#/components/parameters/idParam'
   *        tags:
   *          - orders
   *        responses:
   *          200:
   *            description: Order deleted
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
  router.delete("/:id", ordersController.deleteOrder);

  router.all("/:id", methodNotAllowed);
};
