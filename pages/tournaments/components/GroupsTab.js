Vue.component('groups-tab', {
  props: {
    tournamentId: {
      type: String,
      required: true
    }
  },

  data() {
    return {
      groups: [],
      loading: false
    };
  },

  created() {
    this.fetchGroups();
  },

  methods: {
    async fetchGroups() {
      try {
        this.loading = true;
        const response = await window.apiService.get(`/tournaments/${this.tournamentId}/groups`);
        this.groups = response.data;
      } catch (error) {
        console.error('Error fetching groups:', error);
      } finally {
        this.loading = false;
      }
    }
  },

  template: `
    <div>
      <div v-if="loading" class="text-center py-4">
        Loading groups...
      </div>
      <div v-else-if="groups.length" class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div v-for="group in groups" :key="group.id" class="bg-gray-800 rounded-lg p-6">
          <h3 class="text-xl font-semibold mb-4">{{ group.name }}</h3>
          <div class="space-y-4">
            <div v-for="team in group.teams" :key="team.id" class="flex items-center justify-between">
              <div class="flex items-center">
                <img v-if="team.logo" :src="team.logo" class="w-8 h-8 rounded-full mr-3" :alt="team.name">
                <span>{{ team.name }}</span>
              </div>
              <div class="text-gray-400">
                <span>{{ team.wins }}W - {{ team.losses }}L</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div v-else class="text-center py-4 text-gray-400">
        No groups have been formed yet.
      </div>
    </div>
  `
});
