const fs = require('fs');
const path = require('path');

function findById(id, notesArray) {
    const result = notesArray.filter(note => note.id === id)[0];
    return result;
}

function createNewNote(body, notesArray) {

    const note = body;
    notesArray.push(note);
    fs.writeFileSync(
        path.join(__dirname, '../data/db.json'),
        JSON.stringify({ notes: notesArray }, null, 2)
    );

    // return finished code to post route for response
    return note;
}

function deleteNote(del, notesArray) {
    let y = del.id;
    let index = notesArray.map(x => {
        return x.id;
    }).indexOf(y);

    notesArray.splice(index, 1);

    fs.writeFileSync(
        path.join(__dirname, '../data/db.json'),
        JSON.stringify({ notes: notesArray }, null, 2)
    );
}

function validateNote(note) {
    if (!note.title || typeof note.title !== 'string') {
        return false;
    }
    if (!note.content || typeof note.content !== 'string') {
        return false;
    }
    return true;
}

function filterByQuery(query, notesArray) {

    let filteredResults = notesArray;

    if (query.id) {
        filteredResults = filteredResults.filter(note => note.id === note.id);
    }
    return filteredResults;
}

module.exports = {
    findById,
    createNewNote,
    validateNote,
    filterByQuery,
    deleteNote
};