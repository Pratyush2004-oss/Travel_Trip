import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './lib/dbConn.js';
import path, { join } from 'path';

// importing routes
import placesRoute from './routes/Places.route.js';
import bookingRoute from './routes/booking.routes.js';

dotenv.config();
const __dirname = path.resolve();

const PORT = process.env.PORT || 5000;
const app = express();
app.use(express.json());
app.use(cors());

app.use('/api/v1/places', placesRoute);
app.use("/api/v1/bookings", bookingRoute);

app.use((err, req, res, next) => {
    res.status(500).json({ message: process.env.NODE_ENV === "production" ? "Internal Server Error" : "Internal Server Error" + err.message });
})

if (process.env.NODE_ENV === "production") {
    app.use(express.static(path, join(__dirname, "./frontend/dist")));
    app.get("*", (req, res) => res.sendFile(path.resolve(__dirname, "./frontend/dist/index.html")));
}
app.listen(PORT, () => {
    connectDB();
    console.log(`Server running on port ${PORT}`);
});