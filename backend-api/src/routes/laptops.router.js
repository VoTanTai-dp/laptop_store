const express = require("express");
const laptopsController = require("../controllers/laptops.controller");
const { methodNotAllowed } = require("../controllers/errors.controller");
const imageUpload = require("../middlewares/image-upload.middleware");

const router = express.Router();

module.exports.setup = (app) => {
  app.use("/api/v1/laptops", router);

  /**
   * @swagger
   * /api/v1/laptops:
   *   get:
   *     summary: Get laptops by filter
   *     description: Get laptops by filter
   *     parameters:
   *       - in: query
   *         name: L_NAME
   *         schema:
   *           type: string
   *         description: Filter by laptop name
   *       - in: query
   *         name: L_MODEL
   *         schema:
   *           type: string
   *         description: Filter by laptop model
   *       - in: query
   *         name: L_CPU
   *         schema:
   *           type: string
   *         description: Filter by laptop CPU
   *       - in: query
   *         name: L_RAM
   *         schema:
   *           type: string
   *         description: Filter by laptop RAM
   *       - in: query
   *         name: L_STORAGE
   *         schema:
   *           type: string
   *         description: Filter by laptop storage
   *       - in: query
   *         name: L_GPU
   *         schema:
   *           type: string
   *         description: Filter by laptop GPU
   *       - in: query
   *         name: L_SCREEN_SIZE
   *         schema:
   *           type: string
   *         description: Filter by laptop screen size
   *       - in: query
   *         name: L_WEIGHT
   *         schema:
   *           type: string
   *         description: Filter by laptop storage
   *       - $ref: '#/components/parameters/limitParam'
   *       - $ref: '#/components/parameters/pageParam'
   *     tags:
   *       - laptops
   *     responses:
   *       200:
   *         description: A list of laptops
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
   *                     laptops:
   *                       type: array
   *                       items:
   *                         $ref: '#/components/schemas/Laptop'
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
  router.get("/", laptopsController.getLaptopsByFilter);

  /**
   * @swagger
   * /api/v1/laptops:
   *   post:
   *     summary: Create a new laptop
   *     description: Create a new laptop
   *     requestBody:
   *       required: true
   *       content:
   *         multipart/form-data:
   *           schema:
   *             $ref: '#/components/schemas/Laptop'
   *     tags:
   *       - laptops
   *     responses:
   *       201:
   *         description: A new laptop
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
   *                     laptop:
   *                       $ref: '#/components/schemas/Laptop'
   *       405:
   *         description: Method not allowed
   *         $ref: '#/components/responses/405MethodNotAllowed'
   *       500:
   *         description: Internal Server Error
   *         $ref: '#/components/responses/500InternalServerError'
   */
  router.post("/", imageUpload, laptopsController.createLaptop);

  /**
   * @swagger
   * /api/v1/laptops:
   *   delete:
   *     summary: Delete all laptops
   *     description: Delete all laptops
   *     tags:
   *       - laptops
   *     responses:
   *       200:
   *         description: All laptops deleted
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
  router.delete("/", laptopsController.deleteAllLaptops);

  router.all("/", methodNotAllowed);

  /**
   * @swagger
   * /api/v1/laptops/{id}:
   *   get:
   *     summary: Get laptop by ID
   *     description: Get laptop by ID
   *     parameters:
   *       - $ref: '#/components/parameters/idParam'
   *     tags:
   *       - laptops
   *     responses:
   *       200:
   *         description: A laptop
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
   *                     laptop:
   *                       $ref: '#/components/schemas/Laptop'
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
  router.get("/:id", laptopsController.getLaptop);

  /**
   * @swagger
   * /api/v1/laptops/{id}:
   *   put:
   *     summary: Update laptop by ID
   *     description: Update a laptop by its unique ID
   *     parameters:
   *       - name: id
   *         in: path
   *         required: true
   *         schema:
   *           type: string
   *         description: The ID of the laptop to update
   *     requestBody:
   *       required: true
   *       content:
   *         multipart/form-data:
   *           schema:
   *             $ref: '#/components/schemas/Laptop'
   *     tags:
   *       - laptops
   *     responses:
   *       200:
   *         description: An updated laptop
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
   *                     laptop:
   *                       $ref: '#/components/schemas/Laptop'
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
  router.put("/:id", imageUpload, laptopsController.updateLaptop);

  /**
   *  @swagger
   *    /api/v1/laptops/{id}:
   *      delete:
   *        summary: Delete laptop by ID
   *        description: Delete laptop by ID
   *        parameters:
   *          - $ref: '#/components/parameters/idParam'
   *        tags:
   *          - laptops
   *        responses:
   *          200:
   *            description: Laptop deleted
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
  router.delete("/:id", laptopsController.deleteLaptop);

  router.all("/:id", methodNotAllowed);
};
