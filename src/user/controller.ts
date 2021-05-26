import { Router } from "express";

import { userService } from "./service";

const router = Router();

// signup
router.post("/", (req, res) => {
  const user = userService.signup({ ...req.body });
  res.status(201).json({ user });
});

// list users
router.get("/", (req, res) => {
  const users = userService.list();
  res.status(200).json({ users });
});

export { router as userRouter };
