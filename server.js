const express = require('express');
const app = express();
const port = 3100;

//midldeware data

// Dummy data sutradara
let directors = [
    { id: 1, name: 'Alfin', birthYear: 560 },
    { id: 2, name: 'Nazatil', birthYear: 400 },
    { id: 3, name: 'Kirom', birthYear: 2025 },
];
// console.log(movies);
app.use(express.json());

app.get('/', (req, res) => {
    res.send('Selamat Datang diserver Node.js');
});


// GET /directors - Mengembalikan semua sutradara
app.get('/directors', (req, res) => {
    res.json(directors);
});


app.listen(port, () => {
    console.log(`Server running on localhost${port}`);
});


// GET /directors/:id - Mengembalikan satu sutradara berdasarkan ID
app.get('/directors/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const director = directors.find(d => d.id === id);
    if (director) {
        res.json(director);
    } else {
        res.status(404).json({ error: 'Sutradara tidak ditemukan' });
    }
});


// POST /directors - Menambahkan sutradara baru
app.post('/directors', (req, res) => {
    const { name, birthYear } = req.body || {};
    if (!name || !birthYear) {
        return res.status(400).json({ error: 'Name dan birthYear wajib diisi' });
    }
    const newDirector = {
        id: directors.length + 1,
        name,
        birthYear
    };
    directors.push(newDirector);
    res.status(201).json(newDirector);
});

// PUT /directors/:id - Memperbarui data sutradara
app.put('/directors/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const directorIndex = directors.findIndex(d => d.id === id);
    if (directorIndex === -1) {
        return res.status(404).json({ error: 'Sutradara tidak ditemukan' });
    }
    const { name, birthYear } = req.body || {};
    if (!name || !birthYear) {
        return res.status(400).json({ error: 'Name dan birthYear wajib diisi' });
    }
    const updatedDirector = { id, name, birthYear };
    directors[directorIndex] = updatedDirector;
    res.json(updatedDirector);
});

// DELETE /directors/:id - Menghapus sutradara berdasarkan ID
app.delete('/directors/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const directorIndex = directors.findIndex(d => d.id === id);
    if (directorIndex === -1) {
        return res.status(404).json({ error: 'Sutradara tidak ditemukan' });
    }
    directors.splice(directorIndex, 1);
    res.status(204).send();
});