const router = require('express').Router();
const { filterByQuery, findById, createNewNote, deleteNote } = require('../../lib/notes');
const { notes } = require('../../data/db');

router.get('/notes', (req, res) => {
    let results = notes;
    if (req.query) {
        results = filterByQuery(req.query, results);
    }
    res.json(results);
});

router.get('/notes/:id', (req, res) => {
    const result = findById(req.params.id, notes);
    if (result) {
        res.json(result);
    } else {
        res.sendStatus(404);
    }
});

router.post('/notes', (req, res) => {
    // set id based on what the next index of the array will be
    req.body.id = notes.length.toString();

    const note = createNewNote(req.body, notes);
    res.json(note);
    });

router.delete('/notes/:id', (req, res) => {
    const result = findById(req.params.id, notes);
    if (result) {
        deleteNote(result, notes);
        res.send('Note deleted');
    } else {
        res.sendStatus(404);
    }
})

module.exports = router;