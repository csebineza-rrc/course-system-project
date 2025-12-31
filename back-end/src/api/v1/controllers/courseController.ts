import { Request, Response, NextFunction } from "express";
import * as courseService from "../services/courseService";
import { Course} from "../models/course";
import { HTTP_STATUS } from "../constants/httpConstants";
import { successResponse } from "../models/Response";

/**
 * Handles the GET request to retrieve all courses
 * @param req - Request object
 * @param res - Response object
 * @param next - The express middleware chaining function
 * @returns {void} Sends a JSON response object.
 */
export const getAllCourses = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> => {
    try {
        const AllCourses: Course[] = await courseService.getAllCourses();
        res.status(HTTP_STATUS.OK).json(
            successResponse(AllCourses, "All courses successfully retrieved.")
        );
    } catch (error: unknown) {
        next(error);
    }
};

/**
 * Handles the GET request to retrieve a single course
 * @param req - Request object
 * @param res - Response object
 * @param next - The express middleware chaining function
 * @returns {void} Sends a JSON response object.
 */
export const getCourseByID = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> => {
    try {
       const retrieveCourse = await courseService.getCourseById(req.params.id);
        res.status(HTTP_STATUS.OK).json(
            successResponse(retrieveCourse, "Course successfully retrieved.")
        );
    } catch (error: unknown) {
        next(error);
    }
};

/**
 * Manages a POST request to create a single course
 * @param req - The express Request
 * @param res  - The express Response
 * @param next - The express middleware chaining function
 */
export const createNewCourse = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> => {
    try {
        const { courseName, courseId, credits, instructor, roomNumber, deliveryFormat, cost} = req.body;

        const createNewCourse: Course = await courseService.createNewCourse({
            courseName,
            courseId,
            credits,
            instructor,
            roomNumber,
            deliveryFormat,
            cost,
        });

        res.status(HTTP_STATUS.CREATED).json(
            successResponse(createNewCourse, "New Course created successfully")
        );
    } catch (error: unknown) {
        next(error);
    }
};

/**
 * Manages a PUT request to update a single Course
 * @param req - The express Request
 * @param res  - The express Response
 * @param next - The express middleware chaining function
 */
export const updateCourse = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> => {
    try {
        const id = req.params.id;

        const {
            courseName,
            courseId,
            credits,
            instructor,
            roomNumber,
            deliveryFormat,
            cost,
        } = req.body;

        const updatedCourse: Course = await courseService.updateCourse(
            id,
            {
                courseName,
                courseId,
                credits,
                instructor,
                roomNumber,
                deliveryFormat,
                cost,
            }
        );

        res.status(HTTP_STATUS.OK).json(
            successResponse(updatedCourse, "Course updated successfully")
        );
    } catch (error: unknown) {
        next(error);
    }
};

/**
 * Manages a DELETE request to remove/delete a course
 * @param req - The express Request
 * @param res  - The express Response
 * @param next - The express middleware chaining function
 */
export const deleteCourse = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> => {
    try {
        const id = req.params.id;

        await courseService.deleteCourse(id);
        res.status(HTTP_STATUS.OK).json(
            successResponse("Course successfully deleted")
        );
    } catch (error: unknown) {
        next(error);
    }
};
