const express = require("express");
const customersController = require("../controllers/customers.controller");
const { methodNotAllowed } = require("../controllers/errors.controller");
const imageUpload = require("../middlewares/image-upload.middleware");

const router = express.Router();

module.exports.setup = (app) => {
  app.use("/api/v1/customers", router);

  /**
   * @swagger
   * /api/v1/customers:
   *   get:
   *     summary: Get customers by filter
   *     description: Get customers by filter
   *     parameters:
   *       - in: query
   *         name: C_NAME
   *         schema:
   *           type: string
   *         description: Filter by customer name
   *       - in: query
   *         name: C_EMAIL
   *         schema:
   *           type: string
   *         description: Filter by customer model
   *       - in: query
   *         name: C_PHONE
   *         schema:
   *           type: string
   *         description: Filter by customer CPU
   *       - $ref: '#/components/parameters/limitParam'
   *       - $ref: '#/components/parameters/pageParam'
   *     tags:
   *       - customers
   *     responses:
   *       200:
   *         description: A list of customers
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
   *                     customers:
   *                       type: array
   *                       items:
   *                         $ref: '#/components/schemas/Customer'
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
  router.get("/", customersController.getCustomersByFilter);

  /**
   * @swagger
   * /api/v1/customers:
   *   post:
   *     summary: Create a new customer
   *     description: Create a new customer
   *     requestBody:
   *       required: true
   *       content:
   *         multipart/form-data:
   *           schema:
   *             $ref: '#/components/schemas/Customer'
   *     tags:
   *       - customers
   *     responses:
   *       201:
   *         description: A new customer
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
   *                     customer:
   *                       $ref: '#/components/schemas/Customer'
   *       405:
   *         description: Method not allowed
   *         $ref: '#/components/responses/405MethodNotAllowed'
   *       500:
   *         description: Internal Server Error
   *         $ref: '#/components/responses/500InternalServerError'
   */
  router.post("/", imageUpload, customersController.createCustomer);

  /**
   * @swagger
   * /api/v1/customers:
   *   delete:
   *     summary: Delete all customers
   *     description: Delete all customers
   *     tags:
   *       - customers
   *     responses:
   *       200:
   *         description: All customers deleted
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
  router.delete("/", customersController.deleteAllCustomers);

  router.all("/", methodNotAllowed);

  /**
   * @swagger
   * /api/v1/customers/{id}:
   *   get:
   *     summary: Get customer by ID
   *     description: Get customer by ID
   *     parameters:
   *       - $ref: '#/components/parameters/idParam'
   *     tags:
   *       - customers
   *     responses:
   *       200:
   *         description: A customer
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
   *                     customer:
   *                       $ref: '#/components/schemas/Customer'
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
  router.get("/:id", customersController.getCustomer);

  /**
   * @swagger
   * /api/v1/customers/{id}:
   *   put:
   *     summary: Update customer by ID
   *     description: Update a customer by its unique ID
   *     parameters:
   *       - name: id
   *         in: path
   *         required: true
   *         schema:
   *           type: string
   *         description: The ID of the customer to update
   *     requestBody:
   *       required: true
   *       content:
   *         multipart/form-data:
   *           schema:
   *             $ref: '#/components/schemas/Customer'
   *     tags:
   *       - customers
   *     responses:
   *       200:
   *         description: An updated customer
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
   *                     customer:
   *                       $ref: '#/components/schemas/Customer'
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
  router.put("/:id", imageUpload, customersController.updateCustomer);

  /**
   *  @swagger
   *    /api/v1/customers/{id}:
   *      delete:
   *        summary: Delete customer by ID
   *        description: Delete customer by ID
   *        parameters:
   *          - $ref: '#/components/parameters/idParam'
   *        tags:
   *          - customers
   *        responses:
   *          200:
   *            description: Customer deleted
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
  router.delete("/:id", customersController.deleteCustomer);

  router.all("/:id", methodNotAllowed);
};
