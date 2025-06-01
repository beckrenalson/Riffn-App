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

const instrumentSchema = new mongoose.Schema({
  name: String,
  icon: String,
  type: String
})

const Instrument = mongoose.model('Instrument', instrumentSchema)

const userSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  email: String,
  password: String,
  selectedInstruments: Array,
  selectedGenres: Array,
  profile: String
})

const User = mongoose.model('User', userSchema)

// API Endpoints

app.get('/subgenres', async (req, res) => {
  try {
    const subgenres = await SubGenre.find();
    res.json(subgenres);
  } catch (error) {
    res.status(500).json({ error: 'Server error' })
  }
});

app.get('/subgenres/:genre', async (req, res) => {
  try {
    const { genre } = req.params
    const query = await SubGenre.find({ genre });
    res.json(query);
  } catch (error) {
    res.status(500).json({ error: 'Server error' })
  }
});

app.post('/subgenres', async (req, res) => {
  try {
  const subgenres = new SubGenre(req.body);
  await subgenres.save();
  res.json(subgenres);
  } catch (error) {
    res.status(500).json({ error: 'Server error' })
  }
});

app.get('/instruments', async (req, res) => {
  try{
  const instruments = await Instrument.find();
  res.json(instruments);
  } catch (error) {
    res.status(500).json({ error: 'Server error' })
  }
});

app.get('/instruments/:type', async (req, res) => {
  try {
  const { type } = req.params
  const query = await Instrument.find({ type });
  res.json(query);
  } catch (error) {
    res.status(500).json({ error: 'Server error' })
  }
});

app.post('/instruments', async (req, res) => {
  try {
  const instruments = new Instrument(req.body);
  await instruments.save();
  res.json(instruments);
  } catch (error) {
    res.status(500).json({ error: 'Server error' })
  }
});

app.get('/signup', async (req, res) => {
  try {
    const user = await User.find();
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: 'Server error' })
  }
});

app.post('/signup', async (req, res) => {
  try {
  const user = new User(req.body);
  await user.save();
  res.json(user);
  } catch (error) {
    res.status(500).json({ error: 'Server error' })
  }
});

// app.get('/students/:id', async (req, res) => {
//     const student = await Student.findById(req.params.id);
//     res.json(student);
// });

app.listen(3000, () => {
  console.log('Server running on port 3000');
});