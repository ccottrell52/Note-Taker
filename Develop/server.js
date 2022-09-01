const express = require('express');
const path = require('path');
const util = require('util');

const app = express();
const PORT = 3001;

app.use(express.static('public'));

app.get('/', (req, res) =>
  res.sendFile(path.join(__dirname, 'public/index.html'))
);

app.get('/notes', (req, res) =>
  res.sendFile(path.join(__dirname, 'public/notes.html'))
);

const readDatabase = util.promisify(fs.readFile);

const appendToNote = (body, database) => {
    fs.readFile(database, 'utf8', (err, data) => {
        if (err) {
            console.log(err);
        } else {
            const noteData = JSON.parse(data);
            noteData.push(body);
            writeToDatabase(database, noteData)
        }
    });
};
const writeToDatabase = (file, body) => {
    fs.writeFile(file, JSON.stringify(body, null, 2), (err) =>
        err ? console.error(err) : console.log('\nAdded to Notes'))
}

app.get('/api/notes', (req, res) => {
  const filePath = ('./db/db.json')
  readDatabase(filePath).then((data) => res.json(JSON.parse(data)));
})

  app.post('/api/notes', (req, res) => {
    const { title, text } = req.body;
    if (req.body) {
        let newNote = {
            title,
            text,
            id: id()
        };
        appendToNote(newNote, './db/db.json')
        res.json(newNote)
    }
});




app.listen(PORT, () =>
  console.log(`Example app listening at http://localhost:${PORT}`)
);

