Vue.component('rules-tab', {
  props: {
    tournamentId: {
      type: String,
      required: true
    }
  },

  data() {
    return {
      rules: null,
      loading: false
    };
  },

  created() {
    this.fetchRules();
  },

  methods: {
    async fetchRules() {
      try {
        this.loading = true;
        const response = await window.apiService.get(`/tournaments/${this.tournamentId}/rules`);
        this.rules = response.data;
      } catch (error) {
        console.error('Error fetching rules:', error);
      } finally {
        this.loading = false;
      }
    }
  },

  template: `
    <div class="bg-gray-800 rounded-lg p-6">
      <div v-if="loading" class="text-center py-4">
        Loading rules...
      </div>
      <div v-else-if="rules">
        <div class="space-y-8">
          <div v-for="(section, index) in rules.sections" :key="index">
            <h3 class="text-xl font-semibold mb-4">{{ section.title }}</h3>
            <div class="space-y-4">
              <div v-for="(rule, ruleIndex) in section.rules" :key="ruleIndex" class="pl-4 border-l-2 border-gray-700">
                <h4 class="font-medium text-blue-400 mb-2">{{ rule.title }}</h4>
                <p class="text-gray-300">{{ rule.description }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div v-else class="text-center py-4 text-gray-400">
        No rules have been set for this tournament.
      </div>
    </div>
  `
});
