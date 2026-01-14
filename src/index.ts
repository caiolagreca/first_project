import dotenv from 'dotenv';
// @ts-ignore
import dbConnect from './config/dbConnect';
import express from 'express';

const app = express()

app.use(express.json());

dotenv.config();
dbConnect();

// Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
	console.log(`Server is running at ${PORT}`);
});