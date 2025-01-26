Vue.component('nav-bar', {
  data() {
    return {
      activeRoute: '/'
    };
  },
  watch: {
    '$route.path'(newPath) {
      this.activeRoute = newPath;
    }
  },
  mounted() {
    this.activeRoute = this.$route.path;
  },
  template: `
    <nav class="fixed bottom-0 left-0 right-0 bg-[#0D1B2A] border-t border-gray-800">
      <div class="flex justify-around items-center h-16"> <!-- Simple fixed height container -->
        <router-link 
          to="/" 
          class="flex flex-col items-center justify-center w-16 py-2"
          :class="{'text-blue-500': activeRoute === '/', 'text-gray-400': activeRoute !== '/'}"
        >
          <i class="material-icons text-2xl">home</i>
          <span class="text-xs mt-0.5">Home</span>
        </router-link>

        <router-link 
          to="/explore" 
          class="flex flex-col items-center justify-center w-16 py-2"
          :class="{'text-blue-500': activeRoute === '/explore', 'text-gray-400': activeRoute !== '/explore'}"
        >
          <i class="material-icons text-2xl">search</i>
          <span class="text-xs mt-0.5">Explore</span>
        </router-link>

        <router-link 
          to="/live" 
          class="flex flex-col items-center justify-center w-16 py-2"
          :class="{'text-blue-500': activeRoute === '/live', 'text-gray-400': activeRoute !== '/live'}"
        >
          <i class="material-icons text-2xl">live_tv</i>
          <span class="text-xs mt-0.5">Live</span>
        </router-link>

        <router-link 
          to="/wallet" 
          class="flex flex-col items-center justify-center w-16 py-2"
          :class="{'text-blue-500': activeRoute === '/wallet', 'text-gray-400': activeRoute !== '/wallet'}"
        >
          <i class="material-icons text-2xl">account_balance_wallet</i>
          <span class="text-xs mt-0.5">Wallet</span>
        </router-link>
      </div>
    </nav>
  `
});