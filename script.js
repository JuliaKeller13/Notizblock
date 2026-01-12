let notes = [];
let trashNotes = [];
// let savedNotes = [];
let noteInputRef = document.getElementById('note-input');

function init() {
    geFromLocalStorage();
    renderNotes();
}

//rend notes
function renderNotes() {
    let contentRef = document.getElementById('notes-content');
    contentRef.innerHTML = '';
    for (let indexNote = 0; indexNote < notes.length; indexNote++) {
        contentRef.innerHTML += getNoteTemplate(indexNote);
    }
}

function getNoteTemplate(indexNote) {
    return `
        <div class="note">
            <span>${notes[indexNote]}</span>
            <button onclick="transferNote(${indexNote})">Delete</button>
        </div>
    `;
}

//rend trash notes
function renderTrashNotes() {
    let trashContentRef = document.getElementById('trash-content');
    trashContentRef.innerHTML = '';
    for (let indexTrashNote = 0; indexTrashNote < trashNotes.length; indexTrashNote++) {
        trashContentRef.innerHTML += getTrashNoteTemplate(indexTrashNote);
    }
}

function getTrashNoteTemplate(indexTrashNote) {
    return `
        <div class="note">
            <span>${trashNotes[indexTrashNote]}</span>
            <button onclick="restoreNote(${indexTrashNote})">Restore</button>
        </div>
    `;
}

//note add
function addNote() {
    let noteInput = noteInputRef.value;
    notes.push(noteInput); //add to array
    renderNotes() // show safed notes
    noteInputRef.value = '';//clean input field
}

document.getElementById('note-input').addEventListener('keydown', function (event) {
    if (event.key === 'Enter') {
        event.preventDefault();
        addNote();
    }
});

//notes save in local storage
function saveNote() {
    if (noteInputRef.value != "") {
        notes.push(noteInputRef.value);
    }

    saveToLocalStorage();

    renderNotes();
}

function transferNote(indexNote) {
    let trashNote = notes.splice(indexNote, 1); //transfer from array to trash array
    trashNotes.push(trashNote);
    renderNotes() // show safed notes
    renderTrashNotes() // show trash notes
}

// function toggleDarkMode() {
//     document.body.classList.toggle('dark-mode');
// }

