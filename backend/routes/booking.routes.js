import express from "express";
import { bookTrip, getBookingsByCredentials } from "../controller/booking.controller.js";

const router = express.Router();
router.post("/", bookTrip);
router.post("/getById", getBookingsByCredentials);

export default router;