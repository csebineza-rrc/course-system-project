import express, { Router } from "express";
import * as courseEnrollmentController from "../controllers/courseEnrollmentController";
import authenticate from "../middleware/authenticate";
import isAuthorized from "../middleware/authorize";
import { AuthorizationOptions } from "../models/authorizationOptions";
import { validateRequest } from "../middleware/validate";
import { courseEnrollmentSchemas } from "../validations/courseEnrollmentSchemas";

const router: Router = express.Router();

/**
 * @openapi
 * /registrations:
 *   get:
 *     summary: Retrieve a list of all courses registered.
 *     tags: [Student]
 *     parameters:
 *       - name: limit
 *         in: query
 *         required: false
 *         schema:
 *           type: integer
 *           minimum: 1
 *           maximum: 100
 *           default: 10
 *         description: Maximum number of courses to return
 *     responses:
 *       '200':
 *         description: Successfully retrieved all courses registered
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 registrations:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/validations/Registrations'
 *                 total:
 *                   type: integer
 *                 page:
 *                   type: integer
 */
router.get(
    "/", 
    authenticate,
    isAuthorized({ hasRole: ["student"]} as AuthorizationOptions),
    courseEnrollmentController.getAllCoursesEnrolled
);

/**
 * @openapi
 * /registrations/{id}:
 *   get:
 *     summary: Get course registered by ID.
 *     tags: [Registrations]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the course to retrieve
 *     responses:
 *       '200':
 *         description: Successfully retrieved the student
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/validations/Registrations'
 *       '404':
 *         description: Course not found
 */
router.get(
    "/:id",
    authenticate,
    isAuthorized({ hasRole: ["student"]} as AuthorizationOptions),
    courseEnrollmentController.getCourseByID
);

/**
 * @openapi
 * /registrations:
 *   post:
 *     summary: Enroll in a new course.
 *     tags: [Student]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/validations/RegistrationInput'
 *     responses:
 *       '201':
 *         description: Successfully registered for the course
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 enrollment:
 *                   $ref: '#/components/validations/Registration'
 *                 total:
 *                   type: integer
 *                 page:
 *                   type: integer
 */
router.post(
    "/", 
    authenticate,
    isAuthorized({ hasRole: ["student"]} as AuthorizationOptions),
    validateRequest(courseEnrollmentSchemas.create),
    courseEnrollmentController.enrollInCourse
);

/**
 * @openapi
 * /registrations:
 *   put:
 *     summary: Updates a single course registered by ID.
 *     tags: [Registrations]
 *     parameters:
 *       - name: limit
 *         in: query
 *         required: true
 *         schema:
 *           type: integer
 *           minimum: 1
 *           maximum: 1
 *           default: 1
 *         description: Update an existing course from the database.
 *     responses:
 *       '200':
 *         description: Successfully updated a course
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 users:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/validations/Registration'
 */
router.put(
    "/:id", 
    authenticate,
    isAuthorized({ hasRole: ["student"]} as AuthorizationOptions), 
    validateRequest(courseEnrollmentSchemas.updateById),
    courseEnrollmentController.updateCourseEnrolled 
);

/**
 * @openapi
 * /registrations/{id}:
 *   delete:
 *     summary: Delete a registered course.
 *     tags: [Registrations]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the course to delete.
 *     responses:
 *       '204':
 *         description: Course deleted successfully. No content returned.
 */
router.delete(
    "/:id", 
    authenticate,
    isAuthorized({ hasRole: ["student"]} as AuthorizationOptions),
    validateRequest(courseEnrollmentSchemas.deleteById),
    courseEnrollmentController.deleteCourseEnrolled   
);

export default router;
