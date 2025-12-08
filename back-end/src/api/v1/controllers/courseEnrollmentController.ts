import { Request, Response, NextFunction } from "express";
import * as courseEnrollmentService from "../services/courseEnrollmentService";
import { courseEnrollment } from "../models/courseEnrollment";
import { HTTP_STATUS } from "../middleware/validate";
import { successResponse, errorResponse } from "../models/Response";
import { sendEmail } from "../../../utils/mailer";  

/**
 * Handles the GET request to retrieve all courses enrolled
 * @param req - Request object
 * @param res - Response object
 * @param next - The express middleware chaining function
 * @returns {void} Sends a JSON response object.
 */
export const getAllCoursesEnrolled = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> => {
    try {
        const Allstudents: courseEnrollment[] = await courseEnrollmentService.getAllCoursesEnrolled();
        res.status(HTTP_STATUS.OK).json(
            successResponse(Allstudents, "All courses enrolled successfully retrieved.")
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
       const retrieveCourseEnrolled = courseEnrollmentService.getCourseById(req.params.id);
        res.status(HTTP_STATUS.OK).json(
            successResponse(retrieveCourseEnrolled, "Course successfully retrieved.")
        );
    } catch (error: unknown) {
        next(error);
    }
};

/**
 * Manages a POST request to create a enroll in a course
 * @param req - The express Request
 * @param res  - The express Response
 * @param next - The express middleware chaining function
 */
export const enrollInCourse = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> => {
    try {
        const { studentId, courseName, courseId, semester, enrolledAt } = req.body;

        const enrollCourse: courseEnrollment = await courseEnrollmentService.enrollInCourse({
            studentId,
            courseName,
            courseId,
            semester,
            enrolledAt,
        });

        await sendEmail(
            email,
            "Course Registration Successful",
                `
                <h2>Hello ${fullName},</h2>
                <p>You have successfully registered for the course:</p>
                <p><strong>${courseName}</strong></p>
                <br/>
                <p>Thank you for registering!</p>
                `
        );

        res.status(HTTP_STATUS.CREATED).json(
            successResponse(enrollCourse, "Successfully enrolled in the course")
        );
    } catch (error: unknown) {
        next(error);
    }
};

/**
 * Manages a PUT request to update a single course enrolled in
 * @param req - The express Request
 * @param res  - The express Response
 * @param next - The express middleware chaining function
 */
export const updateCourseEnrolled = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> => {
    try {
        const id = req.params.id; 

        // Extract update fields
        const { studentId, courseName, courseId, semester, enrolledAt } = req.body;

        const updatedCourse: courseEnrollment = await courseEnrollmentService.enrollInCourse({
            studentId,
            courseName,
            courseId,
            semester,
            enrolledAt,
        });
       
        
        await sendEmail(
            email,
                "Successful Updated the Course",
                    `
                    <h2>Goodday, ${studentId}</h2>
                    <p>You have successfully updated the course:</p>
                    <p><strong>${courseName}</strong></p>
                    <br/>
                    <p>Thank you!</p>
                    `
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
export const deleteCourseEnrolled = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> => {
    try {
        const id = req.params.id;

        const deletedCourse = await courseEnrollmentService.deleteCourseEnrolled(id);

        await sendEmail(
            deletedCourse.email,
            "Successfully Deleted the Course",
            `
                <h2>Goodday, ${deletedCourse.fullName}</h2>
                <p>You have successfully deleted the <strong>${deletedCourse.courseName}</strong>:</p>
                <p></p>
                <p>Thank you!</p>
            `
        );

        res.status(HTTP_STATUS.OK).json(
            successResponse("Course successfully dropped")
        );
   
    } catch (error: unknown) {
        next(error);
    }
};
