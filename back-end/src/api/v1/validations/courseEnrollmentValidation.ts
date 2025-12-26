import Joi from "joi";
import { RequestSchemas } from "../middleware/validate";

export const courseSchemas: Record<string, RequestSchemas> = {
    // POST /courses - Create new course
    create: {
        body: Joi.object({
            studentId: Joi.string().required().messages({
                "any.required": "Course ID is required",
                "string.empty": "Course ID cannot be empty",
            }),
            courseName: Joi.string().required().messages({
                "any.required": "Course name is required",
                "string.empty": "Course name cannot be empty",
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
                    "any.required": "Employee ID is required",
                    "string.empty": "Employee ID cannot be empty",
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
                "any.required": "Loan ID is required",
                "string.empty": "Loan ID cannot be empty",
            }),
        }),
    },

};
