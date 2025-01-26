Vue.component('participants-tab', {
  props: {
    tournamentId: {
      type: String,
      required: true
    }
  },

  data() {
    return {
      participants: [],
      loading: false
    };
  },

  created() {
    this.fetchParticipants();
  },

  methods: {
    async fetchParticipants() {
      try {
        this.loading = true;
        const response = await window.apiService.get(`/tournaments/${this.tournamentId}/participants`);
        this.participants = response.data;
      } catch (error) {
        console.error('Error fetching participants:', error);
      } finally {
        this.loading = false;
      }
    }
  },

  template: `
    <div class="bg-gray-800 rounded-lg">
      <div v-if="loading" class="text-center py-4">
        Loading participants...
      </div>
      <div v-else>
        <div class="overflow-x-auto">
          <table class="w-full">
            <thead>
              <tr class="text-left border-b border-gray-700">
                <th class="px-6 py-3 text-gray-400">Player/Team</th>
                <th class="px-6 py-3 text-gray-400">Rank</th>
                <th class="px-6 py-3 text-gray-400">Status</th>
                <th class="px-6 py-3 text-gray-400">Joined Date</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="participant in participants" :key="participant.id" class="border-b border-gray-700">
                <td class="px-6 py-4">
                  <div class="flex items-center">
                    <img 
                      v-if="participant.avatar" 
                      :src="participant.avatar" 
                      class="w-8 h-8 rounded-full mr-3"
                      :alt="participant.name"
                    >
                    <span>{{ participant.name }}</span>
                  </div>
                </td>
                <td class="px-6 py-4">{{ participant.rank || 'N/A' }}</td>
                <td class="px-6 py-4">
                  <span 
                    :class="[
                      'px-2 py-1 rounded-full text-sm',
                      participant.status === 'confirmed' ? 'bg-green-900 text-green-300' :
                      participant.status === 'pending' ? 'bg-yellow-900 text-yellow-300' :
                      'bg-red-900 text-red-300'
                    ]"
                  >
                    {{ participant.status }}
                  </span>
                </td>
                <td class="px-6 py-4 text-gray-400">
                  {{ new Date(participant.joinedAt).toLocaleDateString() }}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div v-if="participants.length === 0" class="text-center py-8 text-gray-400">
          No participants have joined yet.
        </div>
      </div>
    </div>
  `
});
