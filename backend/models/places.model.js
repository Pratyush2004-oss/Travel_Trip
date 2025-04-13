import mongoose from "mongoose";

const PlacesSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    city: {
        type: String,
        required: true,
    },
    state: {
        type: String,
        required: true,
    },
    country: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    image: [{
        type: String,
        required: true
    }]
}, { timestamps: true });

const PlacesModel = mongoose.model("places", PlacesSchema);

export default PlacesModel;


