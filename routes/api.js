const router = require('express').Router()
const fs = require('fs')
const uuid = require('uuid');

// Jerrod Linderman helped me with this code.
router.get('/notes', (req, res) => {
    fs.readFile('./db/db.json', 'utf8', (err, data) => {
        if (err) throw err;
        res.json(JSON.parse(data));
    });
});
// Jerrod Linderman helped me with this code.
router.post('/notes', (req, res) => {
    fs.readFile('./db/db.json', 'utf8', (err, data) => {
        if (err) throw err;
        const newNotes = {
            id: uuid.v4(),
            title: req.body.title,
            text: req.body.text,
        }
        const db = JSON.parse(data)
        db.push(newNotes)
        fs.writeFile('./db/db.json', JSON.stringify(db, null, 2), (err) => {
            if (err) throw err;
            res.json(db)
        });
    });
});
// Jerrod Linderman helped me with this code.
router.delete('/notes/:id', function (req, res) {
    let id = req.params.id;
    fs.readFile('./db/db.json', 'utf8', (err, data) => {
        if (err) throw err;
        let db = JSON.parse(data);
        let newdb = db.filter(note => note.id !== id);
        fs.writeFile('./db/db.json', JSON.stringify(newdb, null, 2), (err) => {
            if (err) throw err;
            res.json(newdb);
        })
    })
});


module.exports = router;