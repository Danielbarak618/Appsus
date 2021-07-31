import { keepService } from '../services/keep-service.js';
import textNote from '../cmps/text-note.js';
import imgNote from '../cmps/img-note.js';
import videoNote from '../cmps/video-note.js';
import listNote from '../cmps/list-note.js';
import addNote from '../cmps/add-note.js';
import noteFilter from '../cmps/note-filter.js';

import { eventBus } from '../../../../js/services/event-bus-service.js';

export default {
  template: `
    
        <section class="main-content main-app">
            

		

			<add-note @addNote="addNote" :note="noteToEdit" :key="key" @editNote="editNote"/>

			<section  class="note-container">

            <section v-if="notes" v-for="note in  getPinnedNotes" :key="note.id" class="notes-main">
			<component :is="note.type"  :note="note" @remove="removeNote"
			 @edit="onEditNote" 
			 @editColor="updateColor"
			 @setPin="setPin"
       @sendAsEmail="sendNoteAsMail"/>
				
			</section>

            <section v-if="notes" v-for="note in notesToShow" :key="note.id" class="notes-main">
			
        	<component :is="note.type"  :note="note" @remove="removeNote"
			 	@edit="onEditNote" 
		 		@editColor="updateColor"
				 @setPin="setPin"
         @sendAsEmail="sendNoteAsMail"
         />
	
				</section>

        </section>
        </section>
        
        
    `,
  data() {
    return {
      notes: [],
      noteToEdit: null,
      key: '',
      filterBy: null,
    };
  },
  methods: {
    loadNotes() {
      keepService.query().then((notes) => (this.notes = notes));
    },
    removeNote(id) {
      keepService
        .removeNote(id)
        .then(() => {
          const msg = {
            txt: 'Deleted successfuly',
            type: 'success',
            link: '/keep',
          };
          eventBus.$emit('show-msg', msg);
          this.loadNotes();
        })
        .catch((err) => {
          console.log(err);
          const msg = {
            txt: 'Error please try again!',
            type: 'error',
          };
          eventBus.$emit('show-msg', msg);
        });
    },
    addNote(newNote) {
      keepService
        .addNewNote(newNote)
        .then((note) => {
          this.notes.unshift(note);
        })
        .then(() => {
          const msg = {
            txt: 'Added successfuly',
            type: 'success',
            link: '/keep',
          };
          eventBus.$emit('show-msg', msg);
          this.loadNotes();
        })
        .catch((err) => {
          console.log(err);
          const msg = {
            txt: 'Error please try again!',
            type: 'error',
            link: '/keep',
          };
          eventBus.$emit('show-msg', msg);
        });
    },
    onEditNote(noteId) {
      keepService.getNoteById(noteId).then((note) => {
        this.noteToEdit = note;
        this.key += 'a';
      });
    },
    editNote(note) {
      keepService
        .updateNote(note)
        .then(() => {
          const msg = {
            txt: 'Edited successfuly',
            type: 'success',
            link: '/keep',
          };
          eventBus.$emit('show-msg', msg);
          this.loadNotes();
        })
        .catch((err) => {
          console.log(err);
          const msg = {
            txt: 'Error please try again!',
            type: 'error',
            link: '/keep',
          };
          eventBus.$emit('show-msg', msg);
        });
    },
    updateColor(color, noteId) {
      keepService.getNoteById(noteId).then((note) => {
        keepService.updateColor(note, color).then(() => {
          this.loadNotes();
        });
      });
    },
    setFilter(filterBy) {
      this.filterBy = filterBy;
    },
    sendNoteAsMail(noteId) {
      keepService.getNoteById(noteId).then((note) => {
        eventBus.$emit('send-note-as-mail', note);
        console.log(note);
      });
    },
    setPin(noteId) {
      keepService.getNoteById(noteId).then((note) => {
        keepService
          .updatePin(note)
          .then(() => {
            const msg = {
              txt: 'Pinned!',
              type: 'success',
              link: '/keep',
            };
            eventBus.$emit('show-msg', msg);
            this.loadNotes();
          })
          .catch((err) => {
            console.log(err);
            const msg = {
              txt: 'Error please try again!',
              type: 'error',
              link: '/keep',
            };
            eventBus.$emit('show-msg', msg);
          });
      });
    },
    saveMail(mail) {
      console.log(mail);
      keepService
        .addMail(mail)
        .then(() => {
          const msg = {
            txt: 'Sent as Email',
            type: 'success',
            link: '/keep',
          };
          this.loadNotes();
          eventBus.$emit('show-msg', msg);
        })
        .catch((err) => {
          console.log(err);
          const msg = {
            txt: 'Error please try again!',
            type: 'error',
            link: '/keep',
          };
          eventBus.$emit('show-msg', msg);
        });
    },
  },
  created() {
    this.loadNotes();
    eventBus.$on('set-filter-keep', this.setFilter);
    eventBus.$on('save-mail-as-note', this.saveMail);
  },
  components: {
    textNote,
    imgNote,
    videoNote,
    listNote,
    addNote,
    noteFilter,
  },
  computed: {
    getPinnedNotes() {
      let filteredNotes = this.notes.filter((note) => {
        return note.isPinned;
      });

      if (!this.filterBy || this.filterBy === '') {
        return filteredNotes;
      }
      filteredNotes = filteredNotes.filter((note) => {
        if (note.type === 'textNote') {
          return note.title.toLowerCase().includes(this.filterBy.toLowerCase());
        }
        if (note.type === 'listNote') {
          return note.info.label.toLowerCase().includes(this.filterBy);
        } else
          return note.info.title
            .toLowerCase()
            .includes(this.filterBy.toLowerCase());
      });

      return filteredNotes;
    },
    notesToShow() {
      let filteredNotes = this.notes.filter((note) => {
        return !note.isPinned;
      });

      if (!this.filterBy || this.filterBy === '') {
        return filteredNotes;
      }
      filteredNotes = filteredNotes.filter((note) => {
        if (note.type === 'textNote') {
          return note.info.txt
            .toLowerCase()
            .includes(this.filterBy.toLowerCase());
        }
        if (note.type === 'listNote') {
          return note.info.label
            .toLowerCase()
            .includes(this.filterBy.toLowerCase());
        } else
          return note.info.title
            .toLowerCase()
            .includes(this.filterBy.toLowerCase());
      });

      return filteredNotes;
    },
  },
};
