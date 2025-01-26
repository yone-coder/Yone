Vue.component('tabs-navigation', {
  props: {
    activeTab: {
      type: String,
      required: true
    }
  },

  data() {
    return {
      tabs: [
        { id: 'overview', label: 'Overview' },
        { id: 'groups', label: 'Groups' },
        { id: 'participants', label: 'Participants' },
        { id: 'rules', label: 'Rules' }
      ]
    };
  },

  methods: {
    handleTabClick(tabId) {
      this.$emit('tab-changed', tabId);
    }
  },

  template: `
    <div class="border-b border-gray-800">
      <nav class="flex space-x-8">
        <button
          v-for="tab in tabs"
          :key="tab.id"
          @click="handleTabClick(tab.id)"
          :class="[
            'py-4 px-1 border-b-2 font-medium text-sm transition-colors',
            activeTab === tab.id
              ? 'border-blue-500 text-blue-500'
              : 'border-transparent text-gray-400 hover:text-gray-300 hover:border-gray-300'
          ]"
        >
          {{ tab.label }}
        </button>
      </nav>
    </div>
  `
});
