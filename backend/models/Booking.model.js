import mongoose from "mongoose";

const BookingSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true
    },
    startDate: {
        type: Date,
        required: true
    },
    endDate: {
        type: Date,
        required: true
    },
    people: {
        type: Number,
        required: true
    },
    place: {
        type: mongoose.Types.ObjectId,
        ref: "places",
        required: true
    },
    referenceId: {
        type: String,
        required: true
    }
}, { timestamps: true });

const BookingModel = mongoose.model("booking", BookingSchema);

export default BookingModel;