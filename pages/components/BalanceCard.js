// components/BalanceCard.js
const BalanceCard = {
  data() {
    return {
      totalBalance: '$0.00',
      monthlyIncome: '+$0.00',
      monthlySpending: '-$0.00'
    }
  },
  mounted() {
    this.fetchBalanceData();
  },
  methods: {
    async fetchBalanceData() {
      try {
        const response = await fetch('balance-api.php');
        const result = await response.json();
        
        if (result.status === 'success') {
          const { data } = result;
          this.totalBalance = data.totalBalance;
          this.monthlyIncome = data.monthlyIncome;
          this.monthlySpending = data.monthlySpending;
        } else {
          console.error('API Error:', result.message);
        }
      } catch (error) {
        console.error('Error fetching balance data:', error);
      }
    }
  },
  template: `
    <div class="lg:col-span-2">
        <div class="bg-gradient-to-r from-blue-500 to-indigo-600 rounded-2xl p-6 h-full relative overflow-hidden">
            <div class="absolute top-0 right-0 w-40 h-40 bg-white/10 rounded-full -translate-y-20 translate-x-20"></div>
            <div class="relative">
                <p class="text-blue-100 text-sm mb-1">Total Balance</p>
                <h3 class="text-4xl font-bold text-white mb-4">{{ totalBalance }}</h3>
                <div class="flex gap-4">
                    <div>
                        <p class="text-blue-100 text-xs">Monthly Income</p>
                        <p class="text-white font-semibold">{{ monthlyIncome }}</p>
                    </div>
                    <div>
                        <p class="text-blue-100 text-xs">Monthly Spending</p>
                        <p class="text-white font-semibold">{{ monthlySpending }}</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
  `
};

// Register the component globally
Vue.component('balance-card', BalanceCard);