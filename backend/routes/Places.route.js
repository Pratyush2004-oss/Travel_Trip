import express from "express";
import { addPlace, GetAllPlaces, getPlaceDetail } from "../controller/Places.controllers.js";

const router = express.Router();
router.post("/", addPlace);
router.get("/:id", getPlaceDetail);
router.get("/", GetAllPlaces);

export default router;