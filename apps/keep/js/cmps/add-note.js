import { keepService } from '../services/keep-service.js';

export default {
  props: ['note'],
  template: `<section class="add-note">
        
		<div class="add-container">
		<div class="actions-container">
		<button @click="setTypeText" titile="Text Note"><i class="fas fa-font"></i></button>
		<button @click="setTypeVideo" title ="Video Note"><i class="fab fa-youtube"></i></button>
		<button @click="setTypeList" title="List Note"><i class="fas fa-list"></i></button>
		<button @click="setTypeImage" title="Image Note"><i class="fas fa-images"></i></button>
		</div>
        <input v-model="noteContent" :placeholder="placeholder" class="text-input">
		</div>
        <input v-model="noteTitle" placeholder="enter title" class="title-input">
        <button @click="addNote" class='add-note-btn' :title="toggleEditAdd"><i :class="[isEdit ? 'far fa-save' : 'far fa-plus-square']"></i></button>
        
    </section>`,
  data() {
    return {
      noteType: 'textNote',
      noteContent: null,
      noteTitle: null,
      isEdit: false,
    };
  },
  computed: {
    placeholder() {
      if (this.noteType === 'textNote') {
        return 'Enter text';
      } else if (this.noteType === 'imgNote' || this.noteType === 'videoNote') {
        return 'Enter Url';
      } else if (this.noteType === 'listNote') {
        return 'Enter with commas!';
      }
    },
    toggleEditAdd() {
      if (this.isEdit) {
        return 'Edit';
      } else {
        return 'Add';
      }
    },
  },
  methods: {
    addNote() {
      if (!this.isEdit) {
        const newNote = keepService.getEmptyNote(
          this.noteType,
          this.noteTitle,
          this.noteContent
        );
        this.$emit('addNote', newNote);
      } else {
        const obj = {
          id: this.note.id,
          type: this.note.type,
          isPinned: false,
          info: {},
          style: {
            backgroundColor: this.note.style.backgroundColor,
          },
        };
        if (this.note.type === 'listNote') {
          obj.info.label = this.noteTitle;
        } else {
          obj.info.title = this.noteTitle;
        }
        if (this.note.type === 'textNote') {
          obj.title = this.noteTitle;
          obj.info.txt = this.noteContent;
        } else if (this.note.type === 'listNote') {
          obj.info.todos = keepService.getListTextObject(
            this.noteContent.split(',')
          );
        } else {
          obj.info.url = this.noteContent;
        }
        if (this.note.type === 'videoNote') {
          obj.info.url = this.noteContent.replace('watch?v=', 'embed/');
        }

        this.isEdit = false;
        this.noteType = null;
        this.noteContent = null;
        this.noteTitle = null;
        this.$emit('editNote', obj);
      }
    },

    edit(noteId) {
      this.$emit('edit', noteId);
    },
    arrayToString(arr) {
      let str = '';
      arr.forEach((obj) => {
        str += obj.txt + ',';
      });
      return str.substring(0, str.length - 1);
    },
    setTypeText() {
      this.noteType = 'textNote';
    },
    setTypeImage() {
      this.noteType = 'imgNote';
    },
    setTypeList() {
      this.noteType = 'listNote';
    },
    setTypeVideo() {
      this.noteType = 'videoNote';
    },
  },
  created() {
    if (this.note) {
      this.isEdit = true;
      this.noteType = this.note.type;

      this.noteContent =
        this.note.type === 'textNote' ? this.note.info.txt : this.note.info.url;
      this.noteTitle =
        this.note.type === 'listNote'
          ? this.note.info.label
          : this.note.info.title;
      if (this.note.type === 'listNote')
        this.noteContent = this.arrayToString(this.note.info.todos);
      if (this.note.type === 'textNote') this.noteTitle = this.note.title;
    }
  },
  watch: {
    note(newVal) {
      this.note = newVal;
    },
  },
};
