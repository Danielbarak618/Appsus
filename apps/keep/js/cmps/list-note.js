import { keepService } from '../services/keep-service.js';
import longText from '../../../../js/cmps/long-text.js';
export default {
  components: {
    longText,
  },
  props: ['note'],
  template: `
	
        <div class="note list-note" :style="{backgroundColor:getColor}">
  <div>
  </h2><long-text :text='note.info.label' :maxLength='14'/></h2>
            <ul class="todo-list">
                <li v-for="(todo,idx) in note.info.todos" :key="todo.id" :class="isDone(idx)" @click="toggleDone(todo, idx)">
                    <long-text :text='todo.txt' :maxLength='14'/>
</li>
            </ul>
            </div>
			<div class="note-actions-container">
           <div class="container">

			   <input type="color" v-model="color" @change="updateColor(note.id)" class="color-input" title="Change color">
			   <i class="fas fa-palette"></i>
		   </div>
		   <button @click="pinNote(note.id)" :title="getPinTitle"><i class="fas fa-thumbtack" :class="getPinColor"></i></button>
		   <button @click="edit(note.id)" title="Edit"><i class="fas fa-edit"></i></button>
           <button @click="remove(note.id)" title="Remove"><i class="fas fa-trash"></i></button>
		   </div>
</div>
        
    `,
  data() {
    return {
      color: this.note.style.backgroundColor,
    };
  },
  methods: {
    isDone(idx) {
      return { done: this.note.info.todos[idx].doneAt };
    },
    toggleDone(todo, idx) {
      return keepService.toggleDone(this.note, idx);
    },
    remove(noteId) {
      this.$emit('remove', noteId);
    },
    edit(noteId) {
      this.$emit('edit', noteId);
    },
    updateColor(noteId) {
      this.$emit('editColor', this.color, noteId);
    },
    pinNote(noteId) {
      this.$emit('setPin', noteId);
    },
  },
  computed: {
    getColor() {
      return this.note.style.backgroundColor;
    },
    title() {
      return this.note.isPinned ? 'Unpin' : 'pin';
    },
    getPinColor() {
      if (this.note.isPinned) {
        return { pinned: true };
      } else {
        return { pinned: false };
      }
    },
    getPinTitle() {
      if (this.note.isPinned) {
        return 'Unpin';
      } else {
        return 'Pin';
      }
    },
  },
};
