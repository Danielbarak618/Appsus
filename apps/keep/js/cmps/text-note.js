import longText from '../../../../js/cmps/long-text.js';

export default {
  components: {
    longText,
  },
  props: ['note'],
  template: `
        <div class="note text-note" :style="{backgroundColor:getColor}">
          <div> 
            <h3><long-text :text='note.title' :maxLength='14'/></h3>
            <p><long-text :text='note.info.txt' :maxLength='14'/></p>
          </div>
        <div class="note-actions-container">
            <div class="container">
              <input type="color" v-model="color" @change="updateColor(note.id)" class="color-input" title="Change color">
			        <i class="fas fa-palette"></i>
		        </div>
		        <button @click="pinNote(note.id)">
              <i class="fas fa-thumbtack" :class="getPinColor" :title="getPinTitle"></i>
            </button>
		        <button @click="edit(note.id)" title="Edit">
              <i class="fas fa-edit"></i>
            </button>
            <button @click="remove(note.id)" title="Remove">
              <i class="fas fa-trash"></i>
            </button>
            <button @click="sendAsEmail(note.id)" title="Send as mail">
            <i class="far fa-envelope"></i>
            </button>
            
		    </div>
      </div>
    `,
  data() {
    return {
      color: this.note.style.backgroundColor,
    };
  },
  methods: {
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
    sendAsEmail(noteId) {
      this.$emit('sendAsEmail', noteId);
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
