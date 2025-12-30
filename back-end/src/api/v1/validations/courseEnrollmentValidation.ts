import Joi from "joi";
import { RequestSchemas } from "../middleware/validate";

export const courseSchemas: Record<string, RequestSchemas> = {
    // POST /courses - Create new course
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

    // GET /courses/:id - Get single course
    getById: {
        params: Joi.object({
            id: Joi.string().required().messages({
                "any.required": "Loan ID is required",
                "string.empty": "Loan ID cannot be empty",
            }),
        }),
    },

    // PUT /courses/:id - Update single course
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
            semester: Joi.string().min(0).required().messages({
                "any.required": "Instructor is required",
                "number.empty": "Instructor cannot be empty",
                "number.min": "Instructor must be greater than zero",
            }),
            enrolledAt: Joi.date().iso().required().messages({
                "any.required": "enrolledAt is required",
                "string.empty": "enrolledAt cannot be empty",
            }),
            deliveryFormat: Joi.string().min(0).required().messages({
                "any.required": "Delivery format is required",
                "number.empty": "Delivery format cannot be empty",
            }),
            cost: Joi.number().required().messages({
                "any.required": "Cost is required",
                "number.base": "Cost must be a number",
            }),
                
            }),
        },

    // POST /loans/:id - Delete single loan
    deleteById: {
        params: Joi.object({
            id: Joi.string().min(1).required().messages({
                "any.required": "Loan ID is required",
                "string.empty": "Loan ID cannot be empty",
            }),
        }),
    },

};
