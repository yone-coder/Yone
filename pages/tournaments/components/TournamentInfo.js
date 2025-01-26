Vue.component('tournament-info', {
  props: {
    tournamentId: {
      type: String,
      required: true
    }
  },

  data() {
    return {
      tournament: null,
      loading: false
    };
  },

  created() {
    this.fetchTournamentInfo();
  },

  methods: {
    async fetchTournamentInfo() {
      try {
        this.loading = true;
        const response = await window.apiService.get(`/tournaments/${this.tournamentId}`);
        this.tournament = response.data;
      } catch (error) {
        console.error('Error fetching tournament info:', error);
      } finally {
        this.loading = false;
      }
    }
  },

  template: `
    <div class="bg-gray-800 rounded-lg p-6 mb-8">
      <div v-if="loading" class="text-center py-4">
        Loading tournament information...
      </div>
      <div v-else-if="tournament">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h3 class="text-lg font-semibold mb-2">Tournament Details</h3>
            <div class="space-y-2">
              <p><span class="text-gray-400">Game:</span> {{ tournament.game }}</p>
              <p><span class="text-gray-400">Format:</span> {{ tournament.format }}</p>
              <p><span class="text-gray-400">Prize Pool:</span> {{ tournament.prizePool }}</p>
            </div>
          </div>
          <div>
            <h3 class="text-lg font-semibold mb-2">Schedule</h3>
            <div class="space-y-2">
              <p><span class="text-gray-400">Start Date:</span> {{ new Date(tournament.startDate).toLocaleDateString() }}</p>
              <p><span class="text-gray-400">End Date:</span> {{ new Date(tournament.endDate).toLocaleDateString() }}</p>
              <p><span class="text-gray-400">Time Zone:</span> {{ tournament.timeZone }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  `
});
