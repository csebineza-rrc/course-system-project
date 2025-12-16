import { Request, Response, NextFunction } from "express";
import { AuthorizationOptions } from "../models/authorizationOptions";
import { MiddlewareFunction } from "../types/express";
import { AuthorizationError } from "../errors/errors";

/**
 * Middleware to check if a user is authorized based on their role or UID.
 *
 * @param {AuthorizationOptions} authorizationOptions - The authorization options.
 * @returns {MiddlewareFunction} The middleware function.
 */
const isAuthorized = (authorizationOptions: AuthorizationOptions): MiddlewareFunction => {
    return (req: Request, res: Response, next: NextFunction) => {
        try {
            const { role, uid } = res.locals;
            const { id } = req.params;

            // Allow if the same user is accessing their own data
            if (authorizationOptions.allowSameUser && id && uid === id) {
                return next();
            }

            // If no role exists on the user, throw an error
            if (!role) {
                throw new AuthorizationError(
                    "Forbidden: No role found",
                    "ROLE_NOT_FOUND"
                );
            }

            // Check if the user's role matches one of the allowed roles
            if (authorizationOptions.hasRole.includes(role)) {
                return next();
            }

            // If the role is not authorized, throw an error
            throw new AuthorizationError(
                "Forbidden: Insufficient role",
                "INSUFFICIENT_ROLE"
            );
        } catch (error) {
            next(error);
        }
    };
};

export default isAuthorized;
