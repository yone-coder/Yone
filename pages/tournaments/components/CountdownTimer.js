Vue.component('countdown-timer', {
  props: {
    tournamentId: {
      type: String,
      required: true
    }
  },

  data() {
    return {
      registrationEndTime: null,
      timeRemaining: '',
      intervalId: null,
      loading: false
    };
  },

  created() {
    this.fetchRegistrationEndTime();
  },

  mounted() {
    this.startCountdown();
  },

  beforeDestroy() {
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }
  },

  methods: {
    async fetchRegistrationEndTime() {
      try {
        this.loading = true;
        const response = await window.apiService.get(`/tournaments/${this.tournamentId}`);
        this.registrationEndTime = new Date(response.data.registration_end);
      } catch (error) {
        console.error('Error fetching registration end time:', error);
      } finally {
        this.loading = false;
      }
    },

    startCountdown() {
      this.intervalId = setInterval(() => {
        if (!this.registrationEndTime) return;

        const now = new Date();
        const diff = this.registrationEndTime - now;

        if (diff <= 0) {
          this.timeRemaining = 'Registration Closed';
          clearInterval(this.intervalId);
          return;
        }

        const days = Math.floor(diff / (1000 * 60 * 60 * 24));
        const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((diff % (1000 * 60)) / 1000);

        this.timeRemaining = `${days}d ${hours}h ${minutes}m ${seconds}s`;
      }, 1000);
    }
  },

  template: `
    <div class="bg-gray-800 rounded-lg p-4 mb-8">
      <h2 class="text-lg font-semibold mb-2">Registration Ends In:</h2>
      <div class="text-2xl font-bold text-blue-400">
        {{ loading ? 'Loading...' : timeRemaining }}
      </div>
    </div>
  `
});
