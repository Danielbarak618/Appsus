import { eventBus } from '../services/event-bus-service.js';

export default {
  template: `
        <div v-if="msg" class="user-msg" :class="msg.type">
			<i :class="icon"></i>
            <div class="user-msg-content">
                <p>{{msg.txt}}</p>
            </div>
            <div class="user-msg-actions">
                <router-link :to="msg.link">View it</router-link>
                <button>x</button>
            </div>
        </div>
    `,
  data() {
    return {
      msg: null,
    };
  },
  created() {
    eventBus.$on('show-msg', this.showMsg);
  },
  destroyed() {
    eventBus.$off('show-msg', this.showMsg);
  },
  methods: {
    showMsg(msg) {
      this.msg = msg;
      setTimeout(() => {
        this.msg = null;
      }, 3000);
    },
  },
  computed: {
    icon() {
      return this.msg.type === 'success'
        ? { 'fas fa-check': true, success: true }
        : { 'fas fa-times': true };
    },
  },
};
