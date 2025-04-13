import PlacesModel from "../models/places.model.js";

export const addPlace = async (req, res, next) => {
    try {
        const { name, city, state, country, description, image } = req.body;
        if (!name || !city || !state || !country || !description || !image) return res.status(400).json({ message: "All fields are required" });

        const place = await PlacesModel.find({ name, city, state, country });
        if (place.length > 0) return res.status(400).json({ message: "Place already exists" });

        const newPlace = new PlacesModel({ name, city, state, country, description, image });
        await newPlace.save();

        res.status(201).json({ message: "Place added successfully" });

    } catch (error) {
        console.log("Error in addPlace Controller : " + error);
        next(error);
    }
}

export const GetAllPlaces = async (req, res, next) => {
    try {
        const page = req.query.page || 1;
        const limit = req.query.limit || 8;
        const skip = (page - 1) * limit;

        const totalPlaces = await PlacesModel.find().countDocuments();
        const places = await PlacesModel.find().sort({ createdAt: -1 })
            .skip(skip)
            .limit(limit);

        res.status(200).json({
            places,
            currentPage: page,
            totalPlaces,
            totalPages: Math.ceil(totalPlaces / limit)
        });
    } catch (error) {
        console.log("Error in GetAllPlaces Controller : " + error);
        next(error);
    }
}

export const getPlaceDetail = async (req, res, next) => {
    try {
        const id = req.params.id;
        const place = await PlacesModel.findById(id);

        if (!place) return res.status(404).json({ message: "Place not found" });

        res.status(200).json(place);
    } catch (error) {
        console.log("Error in getPlaceDetail Controller : " + error);
        next(error);
    }
}
