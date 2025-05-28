import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors'
import dotenv from 'dotenv';

dotenv.config(); // Load environment variables

const app = express();
app.use(express.json());
app.use(cors());

// Connect to MongoDB Atlas
const uri = process.env.MONGODB_URI;
mongoose.connect(uri);

const subGenreSchema = new mongoose.Schema({
  name: String,
  genre: String
});

const SubGenre = mongoose.model('SubGenre', subGenreSchema);

// API Endpoints

app.get('/subgenres', async (req, res) => {
  const subgenres = await SubGenre.find();
  res.json(subgenres);
});

app.get('/subgenres/:genre', async (req, res) => {
  const { genre } = req.params
  console.log(genre)
  const query = await SubGenre.find({ genre });
  res.json(query);
});

app.post('/subgenres', async (req, res) => {
  const subgenres = new SubGenre(req.body);
  await subgenres.save();
  res.json(subgenres);
});

// app.get('/students/:id', async (req, res) => {
//     const student = await Student.findById(req.params.id);
//     res.json(student);
// });

app.listen(3000, () => {
  console.log('Server running on port 3000');
});