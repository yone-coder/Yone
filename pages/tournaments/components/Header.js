Vue.component('tournament-header', {
  props: {
    tournamentId: {
      type: String,
      required: true
    }
  },

  data() {
    return {
      tournamentName: '',
      loading: false
    };
  },

  created() {
    this.fetchTournamentName();
  },

  methods: {
    async fetchTournamentName() {
      try {
        this.loading = true;
        const response = await window.apiService.get(`/tournaments/${this.tournamentId}`);
        this.tournamentName = response.data.name;
      } catch (error) {
        console.error('Error fetching tournament name:', error);
      } finally {
        this.loading = false;
      }
    },

    goBack() {
      window.history.back();
    }
  },

  template: `
    <div class="sticky top-0 z-50 border-b border-gray-800" style="background-color: #0D1B2A;">
      <div class="py-3 flex items-center container mx-auto px-4">
        <button @click="goBack" class="flex items-center text-gray-400 hover:text-white transition-colors mr-4">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
        </button>
        <h1 class="text-xl font-bold text-white truncate">
          {{ loading ? 'Loading...' : tournamentName }}
        </h1>
      </div>
    </div>
  `
});
