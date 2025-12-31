import Joi from "joi";
import { RequestSchemas } from "../middleware/validate";

export const courseSchemas: Record<string, RequestSchemas> = {
    // POST /courses - Enroll in new course
    create: {
        body: Joi.object({
            studentId: Joi.string().required().messages({
                "any.required": "Student ID is required",
                "string.empty": "Student ID cannot be empty",
            }),
            courseName: Joi.string().required().messages({
                "any.required": "Course name is required",
                "string.empty": "Course name cannot be empty",
            }),
            courseId: Joi.string().email().required().messages({
                "any.required": "Course ID is required",
                "string.empty": "Course ID cannot be empty",
            }),
            semester: Joi.string().min(0).required().messages({
                "any.required": "Semester is required",
                "number.empty": "Semester cannot be empty",
                "number.min": "Semester must be greater than zero",
            }),
            enrolledAt: Joi.date().iso().required().messages({
                // Date format
                "any.required": "enrolledAt is required",
                "string.empty": "enrolledAt cannot be empty",
            })
        }),
    },

    // GET /registrations/:id - Get single course enrolled in
    getById: {
        params: Joi.object({
            id: Joi.string().required().messages({
                "any.required": "Loan ID is required",
                "string.empty": "Loan ID cannot be empty",
            }),
        }),
    },

    // PUT /registrations/:id - Update single course enrolled in
    updateById: {
            params: Joi.object({
                id: Joi.string().required().messages({
                    "any.required": "Course ID is required",
                    "string.empty": "Course ID cannot be empty",
                }), 
            }),
            body: Joi.object({
                studentId: Joi.string().required().messages({
                "any.required": "Student ID is required",
                "string.empty": "Student ID cannot be empty",
            }),
            courseName: Joi.string().required().messages({
                "any.required": "Course name is required",
                "string.empty": "Course name cannot be empty",
            }),
            courseId: Joi.string().email().required().messages({
                "any.required": "Course ID is required",
                "string.empty": "Course ID cannot be empty",
            }),
            semester: Joi.string().required().messages({
                "any.required": "Semester is required",
                "number.empty": "Semester cannot be empty",
                "number.min": "Semester must be greater than zero",
            }),
            enrolledAt: Joi.date().iso().required().messages({
                "any.required": "enrolledAt is required",
                "string.empty": "enrolledAt cannot be empty",
            }),              
            }),
        },

    // POST /registrations/:id - Delete single course enrolled in
    deleteById: {
        params: Joi.object({
            id: Joi.string().min(1).required().messages({
                "any.required": "Loan ID is required",
                "string.empty": "Loan ID cannot be empty",
            }),
        }),
    },

};
