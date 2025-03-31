import authRoutes from "./auth.routes";
import usersRoutes from "./users.routes";
import rentalRoutes from "./rental.routes";

const express = require("express");

const router = express.Router();

router.use("/auth", authRoutes);
router.use("/users", usersRoutes);
router.use("/rentals", rentalRoutes);

module.exports = router;
