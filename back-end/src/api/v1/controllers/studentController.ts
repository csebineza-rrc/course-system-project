import { Request, Response, NextFunction } from "express";
import * as studentService from "../services/studentService";
import { Student } from "../models/student";
import { HTTP_STATUS } from "../middleware/validate";
import { successResponse } from "../models/Response";

/**
 * Handles the GET request to retrieve all student
 * @param req - Request object
 * @param res - Response object
 * @param next - The express middleware chaining function
 * @returns {void} Sends a JSON response object.
 */
export const getAllStudents = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> => {
    try {
        const allStudents: Student[] = await studentService.getAllCourses();
        res.status(HTTP_STATUS.OK).json(
            successResponse(allStudents, "All students successfully retrieved.")
        );
    } catch (error: unknown) {
        next(error);
    }
};

/**
 * Handles the GET request to retrieve a single student
 * @param req - Request object
 * @param res - Response object
 * @param next - The express middleware chaining function
 * @returns {void} Sends a JSON response object.
 */
export const getStudentByID = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> => {
    try {
       const retrievedStudent = await studentService.getCourseById(req.params.id);
        res.status(HTTP_STATUS.OK).json(
            successResponse(retrievedStudent, "Student successfully retrieved.")
        );
    } catch (error: unknown) {
        next(error);
    }
};

/**
 * Manages a POST request to create a single student
 * @param req - The express Request
 * @param res  - The express Response
 * @param next - The express middleware chaining function
 */
export const createNewStudent = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> => {
    try {
        const { studentId, fullName, email, program, programYear} = req.body;

        const createNewCourse: Student = await studentService.CreateNewCourse({
            studentId,
            fullName,
            email,
            program,
            programYear,
        });

        res.status(HTTP_STATUS.CREATED).json(
            successResponse(createNewCourse, "New student created successfully")
        );
    } catch (error: unknown) {
        next(error);
    }
};

/**
 * Manages a PUT request to update a single student
 * @param req - The express Request
 * @param res  - The express Response
 * @param next - The express middleware chaining function
 */
export const updateStudent = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> => {
    try {
        const id = req.params.id;

        // Extract update fields
        const {
            studentId,
            fullName,
            email,
            program,
            programYear,
        } = req.body;

        const updatedStudent: Student = await studentService.updateCourse(
            id,
            {
                studentId,
                fullName,
                email,
                program,
                programYear,
            }
        );

        res.status(HTTP_STATUS.OK).json(
            successResponse(updatedStudent, "Student updated successfully")
        );
    } catch (error: unknown) {
        next(error);
    }
};


/**
 * Manages a DELETE request to remove/delete a student
 * @param req - The express Request
 * @param res  - The express Response
 * @param next - The express middleware chaining function
 */
export const deleteStudent = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> => {
    try {
        const id = req.params.id;

        await studentService.deleteStudent(id);
        res.status(HTTP_STATUS.OK).json(
            successResponse("Student successfully deleted")
        );
    } catch (error: unknown) {
        next(error);
    }
};
