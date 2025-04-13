import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './lib/dbConn.js';

// importing routes
import placesRoute from './routes/Places.route.js';

dotenv.config();

const PORT = process.env.PORT || 5000;
const app = express();
app.use(express.json());
app.use(cors());

app.use('/api/v1/places', placesRoute);

app.use((err, req, res, next) => {
    res.status(500).json({ message: process.env.NODE_ENV === "production" ? "Internal Server Error" : "Internal Server Error" + err.message });
})

app.listen(PORT, () => {
    connectDB();
    console.log(`Server running on port ${PORT}`);
});