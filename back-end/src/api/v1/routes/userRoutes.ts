import express, { Router } from "express";
import authenticate from "../middleware/authenticate";
import isAuthorized from "../middleware/authorize";
import { AuthorizationOptions } from "../models/authorizationOptions";

const router: Router = express.Router();

router.get(
    "/:id",
    authenticate,
    isAuthorized({ hasRole: ["student"], allowSameUser: true } as AuthorizationOptions),
);

export default router;
