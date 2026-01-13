let notes = [];
let trashNotes = [];
let archiveNotes = [];
let noteInputRef = document.getElementById('noteInput');
const dialogRef = document.getElementById("dialogMode");



function init() {
    getFromLocalStorage();
    renderNotes();
    renderTrashNotes();
    renderArchiveNotes();
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
            <div class="note-actions">
                <button onclick="transferNote(${indexNote})">Löschen</button>
            </div>
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
            <div class="note-actions">
                <button onclick="transferNoteToArchive(${indexTrashNote})">Archivieren</button>
                <button onclick="restoreFromTrash(${indexTrashNote})">Wiederherstellen</button>
            </div>
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
            <div class="note-actions">
                <button onclick="deleteArchivedNote(${indexArchiveNote})">Endgültig löschen</button>
                <button onclick="restoreFromArchive(${indexArchiveNote})">Wiederherstellen</button>
            </div>
        </div>
    `;
}

//add note
function addNote() {
    let noteInput = noteInputRef.value;
    let errorRef = document.getElementById('errorMessage');
    if (noteInput === '') {
        errorRef.classList.remove('hidden');
        noteInputRef.classList.add('input-error');
        return;
    }
    errorRef.classList.add('hidden');
    noteInputRef.classList.remove('input-error');
    notes.push(noteInput);
    saveToLocalStorage();
    renderNotes();
    noteInputRef.value = '';
}

document.getElementById('noteInput').addEventListener('keydown', function (event) {
    if (event.key === 'Enter') {
        event.preventDefault();
        addNote();
    }
});

//lokal storage
function saveToLocalStorage() {
    localStorage.setItem('notes', JSON.stringify(notes));
    localStorage.setItem('trashNotes', JSON.stringify(trashNotes));
    localStorage.setItem('archiveNotes', JSON.stringify(archiveNotes));
}

function getFromLocalStorage() {
    try {
        notes = JSON.parse(localStorage.getItem('notes')) || [];
        trashNotes = JSON.parse(localStorage.getItem('trashNotes')) || [];
        archiveNotes = JSON.parse(localStorage.getItem('archiveNotes')) || [];
    } catch (error) {
        console.warn('LocalStorage leer oder beschädigt – wurde zurückgesetzt', error);

        notes = [];
        trashNotes = [];
        archiveNotes = [];

        saveToLocalStorage();
    }
}


//transfer note to trash
function transferNote(indexNote) {
    let trashNote = notes.splice(indexNote, 1)[0]; //transfer from array to trash array
    trashNotes.push(trashNote);
    saveToLocalStorage();
    renderNotes();
    renderTrashNotes();
}

//transfer note to archive
function transferNoteToArchive(indexTrashNote) {
    let archiveNote = trashNotes.splice(indexTrashNote, 1)[0]; //transfer from trash array to archive array
    archiveNotes.push(archiveNote);
    saveToLocalStorage();
    renderTrashNotes();
    renderArchiveNotes();
}

//restore note
function restoreFromTrash(indexTrashNote) {
    let restoreNote = trashNotes.splice(indexTrashNote, 1)[0];
    notes.push(restoreNote);
    saveToLocalStorage();
    renderNotes();
    renderTrashNotes();
}

function restoreFromArchive(indexArchiveNote) {
    let restoreNote = archiveNotes.splice(indexArchiveNote, 1)[0];
    notes.push(restoreNote);

    saveToLocalStorage();
    renderNotes();
    renderArchiveNotes();
}

//delete note
function deleteArchivedNote(indexArchiveNote) {
    if (!confirm('Diese Notiz wirklich endgültig löschen?')) {
        return;
    }
    archiveNotes.splice(indexArchiveNote, 1);
    saveToLocalStorage();
    renderArchiveNotes();
}

function deleteAllArchivedNotes() {
    if (!confirm('Willst du wirklich alle archivierten Notizen endgültig löschen?')) {
        return;
    }
    archiveNotes = [];
    saveToLocalStorage();
    renderArchiveNotes();
}


//dialog archive
function openArchivedNotesContainer() {
    dialogRef.showModal();
}

function closeArchivedNotesContainer() {
    dialogRef.close();
}
