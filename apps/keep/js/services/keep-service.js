export const keepService = {
  toggleDone,
  query,
  getNoteById,
  removeNote,
  getEmptyNote,
  addNewNote,
  updateNote,
  getListTextObject,
  updateColor,
  updatePin,
  addMail,
};

import { storageService } from '../../../../js/services/async-storage-service.js';
import { utilService } from '../../../../js/services/util-service.js';

const NOTES_KEY = 'notes';

var gNotes = [
  {
    id: utilService.makeId(),
    type: 'textNote',
    isPinned: true,
    title: 'Hey!',
    info: {
      txt: 'Fullstack Me Baby!',
    },
    style: {
      backgroundColor: '#CDF0EA',
    },
  },
  {
    id: utilService.makeId(),
    type: 'textNote',
    isPinned: true,
    title: 'Hey!',
    info: {
      txt: 'Fullstack Me Baby!',
    },
    style: {
      backgroundColor: '#CDF0EA',
    },
  },
  {
    id: utilService.makeId(),
    type: 'textNote',
    isPinned: true,
    title: 'Hey!',
    info: {
      txt: 'Fullstack Me Baby!',
    },
    style: {
      backgroundColor: '#CDF0EA',
    },
  },
  {
    id: utilService.makeId(),
    type: 'imgNote',
    isPinned: true,
    info: {
      url: 'https://mcdn.wallpapersafari.com/medium/87/17/2LhMvT.jpg',
      title: 'Me playing Mi',
    },
    style: {
      backgroundColor: '#CDF0EA',
    },
  },
  {
    id: utilService.makeId(),
    type: 'videoNote',
    isPinned: true,
    info: {
      url: 'https://www.youtube.com/embed/xojET5h50Ec',
      title: 'Diamond hearts',
    },
    style: {
      backgroundColor: '#CDF0EA',
    },
  },
  {
    id: utilService.makeId(),
    type: 'listNote',
    isPinned: false,
    info: {
      label: 'How was it:',
      todos: [
        { txt: 'Do that', doneAt: null },
        { txt: 'Do this', doneAt: 187111111 },
      ],
    },
    style: {
      backgroundColor: '#CDF0EA',
    },
  },
];

function query() {
  return storageService.query(NOTES_KEY).then((notes) => {
    if (!notes || !notes.length) {
      utilService.saveToStorage(NOTES_KEY, gNotes);
      return Promise.resolve(gNotes);
    } else return notes;
  });
}

function getNoteById(noteId) {
  return storageService.get(NOTES_KEY, noteId);
}

function updateColor(note, color) {
  note.style.backgroundColor = `${color}`;
  return storageService.put(NOTES_KEY, note);
}

function toggleDone(note, idx) {
  return note.info.todos[idx].doneAt === null
    ? (note.info.todos[idx].doneAt = Date.now())
    : (note.info.todos[idx].doneAt = null);
}

function removeNote(noteId) {
  return storageService.remove(NOTES_KEY, noteId);
}

function updatePin(note) {
  note.isPinned = !note.isPinned;
  return storageService.put(NOTES_KEY, note);
}

function getEmptyNote(noteType, noteTitle, noteContent) {
  const todoList = noteContent.split(',');
  const listTxt = getListTextObject(todoList);

  if (noteType === 'videoNote') {
    noteContent = noteContent.replace('watch?v=', 'embed/');
  }

  let newNote = {
    id: utilService.makeId(),
    type: noteType,
    isPinned: false,
  };
  switch (noteType) {
    case 'textNote':
      newNote.title = noteTitle;
      newNote.info = {
        txt: noteContent,
      };
      newNote.style = {
        backgroundColor: 'lightblue',
      };
      return newNote;
    case 'videoNote':
      newNote.info = {
        url: `${noteContent}`,
        title: noteTitle,
      };
      newNote.style = {
        backgroundColor: 'lightblue',
      };
      return newNote;
    case 'imgNote':
      newNote.info = {
        url: `${noteContent}`,
        title: noteTitle,
      };
      newNote.style = {
        backgroundColor: 'lightblue',
      };
      return newNote;
    case 'listNote':
      newNote.info = {
        label: noteTitle,
        todos: listTxt,
      };
      newNote.style = {
        backgroundColor: 'lightblue',
      };
      return newNote;
  }
}

function addNewNote(note) {
  return storageService.post(NOTES_KEY, note);
}

function getListTextObject(list) {
  return list.map((str) => {
    return {
      txt: str,
      doneAt: null,
    };
  });
}

function updateNote(note) {
  return storageService.put(NOTES_KEY, note);
}

function addMail(mail) {
  console.log(mail);
  const noteEmail = {
    id: mail.id,
    type: 'textNote',
    isPinned: false,
    title: mail.subject,
    info: {
      txt: mail.body,
    },
    style: {
      backgroundColor: mail.color || 'lightblue',
    },
  };
  return storageService.post(NOTES_KEY, noteEmail);
}

// id: utilService.makeId(),
// type: 'textNote',
// isPinned: true,
// title: 'Hey!',
// info: {
//   txt: 'Fullstack Me Baby!',
// },
// style: {
//   backgroundColor: '#CDF0EA',
// },
