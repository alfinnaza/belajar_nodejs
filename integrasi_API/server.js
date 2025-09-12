// Import library
const express = require("express");
const cors = require("cors");

const app = express();
const port = 3300;

app.use(cors());
app.use(express.json()); // supaya bisa baca JSON dari request body

// ====== DATA DUMMY REVIEWS ======
let reviews = [
    {
        id: 1,
        filmId: "90b72513-afd4-4570-84de-a56c312fdf81",
        user: "Alfin",
        rating: 89,
        comment: "Film drama terbaik sepanjang masa!"
    },
    {
        id: 2,
        filmId: "12cfb892-aac0-4c5b-94af-521852e46d6a",
        user: "Bintang",
        rating: 97,
        comment: "Film action terbaik sepanjang masa!"
    },
    {
        id: 3,
        filmId: "58611129-2dbc-4a81-a72f-77ddfc1b1b49",
        user: "Faisal",
        rating: 93,
        comment: "Film horor terbaik sepanjang masa!"
    }
];

// ====== ENDPOINT GET ======
app.get("/status", (req, res) => {
    res.json({ status: "OK", message: "Server berjalan dengan baik" });
});

app.get("/reviews", (req, res) => {
    res.json(reviews);
});

app.get("/reviews/:id", (req, res) => {
    const review = reviews.find(r => r.id == req.params.id);
    if (review) {
        res.json(review);
    } else {
        res.status(404).json({ error: "Review tidak ditemukan" });
    }
});

// ====== ENDPOINT POST ======
app.post("/reviews", (req, res) => {
    const { filmId, user, rating, comment } = req.body || {};
    if (!filmId || !user || !rating || !comment) {
        return res.status(400).json({ error: "Semua field wajib diisi!" });
    }

    const newReview = {
        id: reviews.length + 1,
        filmId,
        user,
        rating,
        comment
    };

    reviews.push(newReview);
    res.status(201).json(newReview);
});

// ====== ENDPOINT PUT ======
app.put("/reviews/:id", (req, res) => {
    const { id } = req.params;
    const { filmId, user, rating, comment } = req.body;

    const review = reviews.find(r => r.id == id);
    if (!review) {
        return res.status(404).json({ error: "Review tidak ditemukan" });
    }

    if (filmId) review.filmId = filmId;
    if (user) review.user = user;
    if (rating) review.rating = rating;
    if (comment) review.comment = comment;

    res.json(review);
});

// ====== ENDPOINT DELETE ======
app.delete("/reviews/:id", (req, res) => {
    const { id } = req.params;
    const index = reviews.findIndex(r => r.id == id);

    if (index === -1) {
        return res.status(404).json({ error: "Review tidak ditemukan" });
    }

    const deletedReview = reviews.splice(index, 1);
    res.json({ message: "Review berhasil dihapus", deleted: deletedReview });
});

// ====== JALANKAN SERVER ======
app.listen(port, () => {
    console.log(`Server berjalan di http://localhost:${port}`);
});