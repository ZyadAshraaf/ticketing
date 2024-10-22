import express, { Request, Response } from "express";
import { body, validationResult } from "express-validator";
import { RequestValidationError } from "../errors/request-validation-error";
import { User } from "../models/user";
import { BadRequestError } from "../errors/bad-request-error";
import { validateErrors } from "../middlewares/validation-request";
import { Password } from "../services/password";
import jwt from 'jsonwebtoken'

const router = express.Router();

router.post(
  "/api/users/signin",
  [
    body("email").isEmail().withMessage("Email has to be valid"),
    body("password").trim().notEmpty().withMessage("You must supply password"),
  ],
  validateErrors,
  async (req: Request, res: Response) : Promise<any> => {
    const { email, password } = req.body;
    const existingUser = await User.findOne({ email });
    if (!existingUser) {
      throw new BadRequestError("Invalid Credentials");
    }

    const passwordMatch = await Password.compare(
      existingUser.password,
      password
    );

    if(!passwordMatch){
      throw new BadRequestError("Invalid Credentials");
    }

    const userJwt = jwt.sign({
      email, id : existingUser.id
    }, process.env.JWT_KEY!);

    req.session = {
      jwt : userJwt
    }

    return res.status(201).send(existingUser);
  }
);

export { router as signinRouter };
