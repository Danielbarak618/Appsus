import longText from '../../../../js/cmps/long-text.js';
export default {
  props: ['note'],
  components: {
    longText,
  },
  template: `
    <div class="note video-note" :style="{backgroundColor:getColor}">
      <div>
        <h2><long-text :text='note.info.title' :maxLength='14'/></h2>
        <iframe
            :src="note.info.url"
            width="100%"
            height="100"
            frameborder="0" >
           </iframe>
</div>
		   <div class="note-actions-container">
           <div class="container">

			   <input type="color" v-model="color" @change="updateColor(note.id)" class="color-input" title="Change color">
			   <i class="fas fa-palette"></i>
		   </div>
		   <button @click="pinNote(note.id)"><i class="fas fa-thumbtack" :class="getPinColor" title="Pin"></i></button>
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
    remove(noteId) {
      this.$emit('remove', noteId);
    },
    updateColor(noteId) {
      this.$emit('editColor', this.color, noteId);
    },
    edit(noteId) {
      this.$emit('edit', noteId);
    },
    pinNote(noteId) {
      this.$emit('setPin', noteId);
    },
  },
  computed: {
    getColor() {
      return this.note.style.backgroundColor;
    },
    getPinColor() {
      if (this.note.isPinned) {
        return { pinned: true };
      } else {
        return { pinned: false };
      }
    },
    title() {
      return this.note.isPinned ? 'Unpin' : 'pin';
    },
  },
};
