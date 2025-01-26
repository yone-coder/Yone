Vue.component('join-button', {
  props: {
    tournamentId: {
      type: String,
      required: true
    }
  },

  data() {
    return {
      isJoined: false,
      loading: false
    };
  },

  created() {
    this.checkJoinStatus();
  },

  methods: {
    async checkJoinStatus() {
      try {
        this.loading = true;
        const response = await window.apiService.get(`/tournaments/${this.tournamentId}/join-status`);
        this.isJoined = response.data.isJoined;
      } catch (error) {
        console.error('Error checking join status:', error);
      } finally {
        this.loading = false;
      }
    },

    async handleJoinClick() {
      try {
        this.loading = true;
        if (this.isJoined) {
          await window.apiService.post(`/tournaments/${this.tournamentId}/leave`);
          this.isJoined = false;
        } else {
          await window.apiService.post(`/tournaments/${this.tournamentId}/join`);
          this.isJoined = true;
        }
      } catch (error) {
        console.error('Error toggling tournament participation:', error);
      } finally {
        this.loading = false;
      }
    }
  },

  template: `
    <button 
      @click="handleJoinClick"
      :disabled="loading"
      :class="[
        'w-full md:w-auto px-6 py-3 rounded-lg font-semibold transition-colors',
        isJoined 
          ? 'bg-red-600 hover:bg-red-700 text-white' 
          : 'bg-blue-600 hover:bg-blue-700 text-white'
      ]"
    >
      {{ loading ? 'Processing...' : (isJoined ? 'Leave Tournament' : 'Join Tournament') }}
    </button>
  `
});
