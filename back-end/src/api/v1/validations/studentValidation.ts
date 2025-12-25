import Joi from "joi";
import { RequestSchemas } from "../middleware/validate";

export const studentSchemas: Record<string, RequestSchemas> = {
    // POST /courses - Create new course
    create: {
        body: Joi.object({
            studentId: Joi.string().required().messages({
                "any.required": "Student ID is required",
                "string.empty": "Student ID cannot be empty",
            }),
            fullName: Joi.string().required().messages({
                "any.required": "Full name is required",
                "string.empty": "Full name cannot be empty",
            }),
            email: Joi.string().email().required().messages({
                "any.required": "Email is required",
                "string.empty": "Email cannot be empty",
                "string.email": "Email must be a valid email address",
            }),
            program: Joi.string().required().messages({
                "any.required": "Program is required",
                "string.empty": "Program cannot be empty",
            }),
            programYear: Joi.number().min(0).required().messages({
                "any.required": "Program year is required",
                "number.base": "Program year must be a number",
                "number.min": "Program year must be greater than or equal to 0",
            }),
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
                courseName: Joi.string().required().messages({
                "any.required": "Course name is required",
                "string.empty": "Course name cannot be empty",
            }),
            courseId: Joi.string().required().messages({
                "any.required": "Course ID is required",
                "string.empty": "Course ID cannot be empty",
            }),
            credits: Joi.string().email().required().messages({
                "any.required": "Email is required",
                "string.empty": "Email cannot be empty",
            }),
            instructor: Joi.string().min(0).required().messages({
                "any.required": "Instructor is required",
                "number.empty": "Instructor cannot be empty",
                "number.min": "Instructor must be greater than zero",
            }),
            roomNumber: Joi.string().required().messages({
                "any.required": "Employment status is required",
                "string.empty": "Employment status cannot be empty",
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
                "any.required": "Course ID is required",
                "string.empty": "Course ID cannot be empty",
            }),
        }),
    },

};
