import express, { Router } from "express";
import { getUserDetails } from "../controllers/userController";
import authenticate from "../middleware/authenticate";
import isAuthorized, { AuthorizationOptions } from "../middleware/authorize";

const router: Router = express.Router();

router.get(
    "/:id",
    authenticate,
    isAuthorized({ hasRole: ["student"], allowSameUser: true } as AuthorizationOptions),
    getUserDetails
);

export default router;
