Vue.component('overview-tab', {
  props: {
    tournamentId: {
      type: String,
      required: true
    }
  },

  data() {
    return {
      overview: null,
      loading: false
    };
  },

  created() {
    this.fetchOverview();
  },

  methods: {
    async fetchOverview() {
      try {
        this.loading = true;
        const response = await window.apiService.get(`/tournaments/${this.tournamentId}/overview`);
        this.overview = response.data;
      } catch (error) {
        console.error('Error fetching overview:', error);
      } finally {
        this.loading = false;
      }
    }
  },

  template: `
    <div class="space-y-6">
      <div v-if="loading" class="text-center py-4">
        Loading overview...
      </div>
      <div v-else-if="overview">
        <div class="bg-gray-800 rounded-lg p-6 mb-6">
          <h3 class="text-xl font-semibold mb-4">Description</h3>
          <p class="text-gray-300 whitespace-pre-line">{{ overview.description }}</p>
        </div>

        <div class="bg-gray-800 rounded-lg p-6 mb-6">
          <h3 class="text-xl font-semibold mb-4">Format Details</h3>
          <div class="space-y-4">
            <div v-for="(detail, index) in overview.formatDetails" :key="index">
              <h4 class="font-medium text-blue-400">{{ detail.phase }}</h4>
              <p class="text-gray-300">{{ detail.description }}</p>
            </div>
          </div>
        </div>

        <div class="bg-gray-800 rounded-lg p-6">
          <h3 class="text-xl font-semibold mb-4">Prize Distribution</h3>
          <div class="space-y-2">
            <div v-for="(prize, index) in overview.prizes" :key="index" class="flex justify-between">
              <span class="text-gray-300">{{ prize.position }}</span>
              <span class="font-medium">{{ prize.amount }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  `
});
