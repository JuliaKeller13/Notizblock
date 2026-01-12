let notes = [];
let trashNotes = [];
// let savedNotes = [];
let archiveNotes = [];
let noteInputRef = document.getElementById('noteInput');
let noteInput = noteInputRef.value;



function init() {
    geFromLocalStorage();
    renderNotes();
}

//rend notes
function renderNotes() {
    let contentRef = document.getElementById('notesContent');
    contentRef.innerHTML = '';
    for (let indexNote = 0; indexNote < notes.length; indexNote++) {
        contentRef.innerHTML += getNoteTemplate(indexNote);
    }
}

function getNoteTemplate(indexNote) {
    return `
        <div class="note">
            <span>${notes[indexNote]}</span>
            <button onclick="transferNote(${indexNote})">Löschen</button>
        </div>
    `;
}

//rend trash notes
function renderTrashNotes() {
    let trashContentRef = document.getElementById('trashContent');
    trashContentRef.innerHTML = '';
    for (let indexTrashNote = 0; indexTrashNote < trashNotes.length; indexTrashNote++) {
        trashContentRef.innerHTML += getTrashNoteTemplate(indexTrashNote);
    }
}

function getTrashNoteTemplate(indexTrashNote) {
    return `
        <div class="note">
            <span>${trashNotes[indexTrashNote]}</span>
            <button onclick="archiveNote(${indexTrashNote})">Archivieren</button>
        </div>
    `;
}

//rend archved notes
function renderArchiveNotes() {
    let archiveContentRef = document.getElementById('archiveContent');
    archiveContentRef.innerHTML = '';
    for (let indexArchiveNote = 0; indexArchiveNote < archiveNotes.length; indexArchiveNote++) {
        archiveContentRef.innerHTML += getArchiveNoteTemplate(indexArchiveNote);
    }
}

function getArchiveNoteTemplate(indexArchiveNote) {
    return `
        <div class="note">
            <span>${archiveNotes[indexArchiveNote]}</span>
            <button onclick="transferNoteToArchive(${indexArchiveNote})">Restore</button>
        </div>
    `;
}

//add note
function addNote() {
    notes.push(noteInput); //add to array
    renderNotes() // show safed notes
    noteInput = '';
}

document.getElementById('noteInput').addEventListener('keydown', function (event) {
    if (event.key === 'Enter') {
        event.preventDefault();
        addNote();
    }
});

//transfer note to trash
function transferNote(indexNote) {
    let trashNote = notes.splice(indexNote, 1); //transfer from array to trash array
    trashNotes.push(trashNote);
    renderNotes()
    renderTrashNotes()
}

function transferNoteToArchive(trashNote) {
    let archiveNote = trashNotes.splice(indexTrashNote, 1); //transfer from trash array to archive array
    archiveNotes.push(archiveNote);
    renderNotes()
    renderTrashNotes() 
    renderArchiveNotes() 
}



//dialog archive
function openArchivedNotesContainer() {
  dialogRef.showModal();
}

function closeArchivedNotesContainer() {
  dialogRef.close();
}

// function toggleDarkMode() {
//     document.body.classList.toggle('dark-mode');
// }

//-------------------------------
//save notes in local storage
function saveNote() {
    if (noteInput != "") {
        notes.push(noteInput);
    }

    saveToLocalStorage();

    renderNotes();
}
//-------------------------------
