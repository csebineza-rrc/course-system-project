import { Request, Response, NextFunction } from "express";
import { auth } from "../../../config/fireBaseConfig";
import { successResponse } from "../models/Response";
import { HTTP_STATUS } from "../constants/httpConstants";

/**
 * Handles setting Firebase custom claims for a user.
 * Commonly used to assign roles, but can include any key-value pairs.
 * @param req - The request object containing `uid` and `roles` (custom claims payload)
 * @param res - The response object
 * @param next - The next middleware function
 */
export const setCustomClaims = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> => {
    try {
        const { uid, roles } = req.body;

        await auth.setCustomUserClaims(uid, roles);

        res.status(HTTP_STATUS.OK).json(
            successResponse({}, `Custom claims (roles) set for user: ${uid}`)
        );
    } catch (error: unknown) {
        next(error);
    }
};
