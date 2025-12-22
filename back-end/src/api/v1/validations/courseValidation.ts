import Joi from "joi";
import { RequestSchemas } from "../middleware/validate";

export const loanSchemas: Record<string, RequestSchemas> = {
    // POST /loans - Create new loan
    create: {
        body: Joi.object({
            fullName: Joi.string().required().messages({
                "any.required": "Name is required",
                "string.empty": "Name cannot be empty",
            }),
            address: Joi.string().required().messages({
                "any.required": "Address is required",
                "string.empty": "Address cannot be empty",
            }),
            email: Joi.string().required().messages({
                "any.required": "Email is required",
                "string.empty": "Email cannot be empty",
            }),
            phone: Joi.number().min(0).required().messages({
                "any.required": "Phone is required",
                "number.empty": "Phone is cannot be empty",
                "number.min": "Phone must be greater than zero",
            }),
            sinNumber: Joi.number().min(0).required().messages({
                "any.required": "SIN number is required",
                "number.empty": "SIN number cannot be empty",
                "number.min": "SIN number must be greater than zero",
            }),
            employmentStatus: Joi.string().required().messages({
                "any.required": "Department is required",
                "string.empty": "Department cannot be empty",
            }),
            yearlyIncome: Joi.number().min(0).required().messages({
                "any.required": "Yearly income is required",
                "number.empty": "Yearly income is cannot be empty",
                "number.min": "Yearly income must be greater than zero",
            }),
            maritalStatus: Joi.string().required().messages({
                "any.required": "Marital status is required",
                "string.empty": "Marital status cannot be empty",
            }),
            allAssetsWorth: Joi.number().min(0).required().messages({
                "number.min": "Assets worth must be greater than zero",
            }),
        }),
    },

    // GET /loans/:id - Get single loan
    getById: {
        params: Joi.object({
            id: Joi.string().required().messages({
                "any.required": "Loan ID is required",
                "string.empty": "Loan ID cannot be empty",
            }),
        }),
    },

    // PUT /loans/:id - Update single loan
    updateById: {
            params: Joi.object({
                id: Joi.string().required().messages({
                    "any.required": "Employee ID is required",
                    "string.empty": "Employee ID cannot be empty",
                }), 
            }),
            body: Joi.object({
                fullName: Joi.string().required().messages({
                "any.required": "Name is required",
                "string.empty": "Name cannot be empty",
            }),
            address: Joi.string().required().messages({
                "any.required": "Address is required",
                "string.empty": "Address cannot be empty",
            }),
            email: Joi.string().required().messages({
                "any.required": "Email is required",
                "string.empty": "Email cannot be empty",
            }),
            phone: Joi.number().min(0).required().messages({
                "any.required": "Phone is required",
                "number.empty": "Phone cannot be empty",
                "number.min": "Phone must be greater than zero",
            }),
            sinNumber: Joi.number().min(0).required().messages({
                "any.required": "SIN number is required",
                "number.empty": "SIN number cannot be empty",
                "number.min": "SIN number must be greater than zero",
            }),
            employmentStatus: Joi.string().required().messages({
                "any.required": "Department is required",
                "string.empty": "Department cannot be empty",
            }),
            yearlyIncome: Joi.number().min(0).required().messages({
                "any.required": "Yearly income is required",
                "number.empty": "Yearly income cannot be empty",
                "number.min": "Yearly income must be greater than zero",
            }),
            maritalStatus: Joi.string().required().messages({
                "any.required": "Marital status is required",
                "string.empty": "Marital status cannot be empty",
            }),
            allAssetsWorth: Joi.number().min(0).required().messages({
                "number.min": "Assets worth must be greater than zero",
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
