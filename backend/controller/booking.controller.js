import BookingModel from "../models/Booking.model.js";

// booking Trip
export const bookTrip = async (req, res, next) => {
    try {
        const { name, email, phone, startDate, endDate, people, place } = req.body;
        if (!place || !name || !email || !phone || !startDate || !endDate || !people) return res.status(400).json({ message: "All fields are required" });

        const referenceId = Math.floor(Math.random() * 10000000);
        const booking = new BookingModel({
            name,
            email,
            phone,
            startDate,
            endDate,
            people,
            place,
            referenceId
        });

        await booking.save();

        res.status(201).json({ message: "Trip booked successfully", referenceId });

    } catch (error) {
        console.log("Error in Booking trip : " + error);
        next(error);
    }
}

// Get booking details by credentials
export const getBookingsByCredentials = async (req, res, next) => {
    try {
        const { referenceId, email } = req.body;

        const booking = await BookingModel.findOne({ referenceId, email }).populate("place");

        if (!booking) return res.status(404).json({ message: "Booking not found" });

        res.status(200).json(booking);
    } catch (error) {
        console.log("Error in getting bookings by credentials : " + error);
        next(error);
    }
}

