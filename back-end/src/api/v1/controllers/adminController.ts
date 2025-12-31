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

        // Basic validation of uid
        if (typeof uid !== "string" || uid.trim().length === 0) {
            res.status(400).json({
                message: "Invalid uid provided.",
            });
            return;
        }

        // Validate roles/custom claims object according to Firebase Admin SDK requirements
        if (roles === null || typeof roles !== "object" || Array.isArray(roles)) {
            res.status(400).json({
                message: "Invalid roles provided. Roles must be a non-null object.",
            });
            return;
        }

        // Disallow reserved claim names
        const reservedClaimNames = new Set([
            "sub",
            "iat",
            "exp",
            "aud",
            "iss",
            "auth_time",
            "firebase",
        ]);

        const invalidClaimKey = Object.keys(roles).find((key) =>
            reservedClaimNames.has(key)
        );

        if (invalidClaimKey) {
            res.status(400).json({
                message: `Invalid claim name "${invalidClaimKey}". This is a reserved claim name and cannot be used in custom claims.`,
            });
            return;
        }

        // Ensure the total size of the custom claims payload does not exceed 1000 bytes
        const serializedClaims = JSON.stringify(roles);
        if (serializedClaims.length > 1000) {
            res.status(400).json({
                message: "Custom claims payload is too large. Maximum size is 1000 bytes.",
            });
            return;
        }
        await auth.setCustomUserClaims(uid, roles);

        res.status(HTTP_STATUS.OK).json(
            successResponse({}, `Custom claims (roles) set for user: ${uid}`)
        );
    } catch (error: unknown) {
        next(error);
    }
};
