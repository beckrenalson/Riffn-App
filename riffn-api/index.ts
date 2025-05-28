import express from 'express';
import mongoose from 'mongoose';

const app = express();
app.use(express.json());

// Connect to MongoDB Atlas
const uri = "mongodb+srv://becktake2:Q7auVeOhNNXx5Oub@riffn-app.uhmahmr.mongodb.net/myFirstDatabase?retryWrites=true&w=majority&appName=Riffn-App";
mongoose.connect(uri);

const subGenreSchema = new mongoose.Schema({
    _id: String,
    name: String,
    genre: String
});

const SubGenre = mongoose.model('SubGenre', subGenreSchema);

// API Endpoints

app.get('/subgenres', async (req, res) => {
    const subgenres = await SubGenre.find();
    res.json(subgenres);
});

// app.post('/students', async (req, res) => {
//     const student = new Student(req.body);
//     await student.save();
//     res.json(student);
// });

// app.get('/students/:id', async (req, res) => {
//     const student = await Student.findById(req.params.id);
//     res.json(student);
// });

app.listen(3000, () => {
    console.log('Server running on port 3000');
});