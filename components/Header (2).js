

Vue.component('app-header', {
  template: `
    <header class="fixed w-full top-0 z-50">
      <div class="bg-[#0D1B2A]/80 backdrop-blur-lg shadow-lg border-b border-gray-700">
        <!-- Guest Header - Only show if definitely logged out -->
        <div v-show="isDefinitelyLoggedOut" class="container mx-auto px-4 py-3">
          <div class="flex justify-between items-center">
            <div class="flex items-center space-x-4">
              <h1 class="text-2xl font-bold text-white">My Website</h1>
            </div>
            <div class="flex items-center space-x-3">
              <button 
                @click="showSignIn"
                class="nav-button px-4 py-2 text-gray-300 hover:text-white transition-colors duration-200"
              >
                Sign In
              </button>
              <button 
                @click="showSignUp"
                class="nav-button bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors duration-200"
              >
                Sign Up
              </button>
            </div>
          </div>
        </div>

        <!-- Authenticated User Header - Only show if definitely logged in -->
        <div v-else class="container mx-auto px-4 py-3">
          <div class="flex items-center justify-between">
            <!-- Left: Logo and Profile Menu -->
            <div class="flex items-center space-x-3" v-click-outside="closeUserMenu">
              <!-- Profile Menu -->
              <div class="relative">
                <button 
                  @click="isUserMenuOpen = !isUserMenuOpen"
                  class="flex items-center space-x-2 group"
                >
                  <img 
                    v-if="currentUser && currentUser.photo_url"
                    :src="currentUser.photo_url"
                    :alt="currentUser.name || 'User'"
                    class="w-10 h-10 rounded-full object-cover border-2 border-gray-700"
                    @error="handleImageError"
                  />
                  <svg 
                    v-else
                    xmlns="http://www.w3.org/2000/svg" 
                    class="w-10 h-10 rounded-full border-2 border-gray-700" 
                    viewBox="0 0 24 24" 
                    fill="none" 
                    stroke="currentColor" 
                    stroke-width="2" 
                    stroke-linecap="round" 
                    stroke-linejoin="round"
                  >
                    <circle cx="12" cy="12" r="10" fill="#B0BEC5"/>
                    <path d="M12 12c2.5 0 4.5 1.5 4.5 3.5v1.5H7.5v-1.5C7.5 13.5 9.5 12 12 12z" fill="#FFFFFF"/>
                  </svg>
                  <i class="fas fa-chevron-down text-gray-400 group-hover:text-white transition-colors duration-200"></i>
                </button>

                <!-- Profile Dropdown Menu -->
                <div 
                  v-show="isUserMenuOpen"
                  class="absolute left-0 mt-2 w-48 rounded-lg bg-[#1B2B3A] border border-gray-700 shadow-lg py-1 z-50"
                >
                  <div class="px-4 py-2 border-b border-gray-700">
                    <div class="flex items-center space-x-2">
                      <img 
                        v-if="currentUser && currentUser.photo_url"
                        :src="currentUser.photo_url"
                        :alt="currentUser.name || 'User'"
                        class="w-8 h-8 rounded-full object-cover"
                        @error="handleImageError"
                      />
                      <svg 
                        v-else
                        xmlns="http://www.w3.org/2000/svg" 
                        class="w-8 h-8 rounded-full" 
                        viewBox="0 0 24 24" 
                        fill="none" 
                        stroke="currentColor" 
                        stroke-width="2" 
                        stroke-linecap="round" 
                        stroke-linejoin="round"
                      >
                        <circle cx="12" cy="12" r="10" fill="#B0BEC5"/>
                        <path d="M12 12c2.5 0 4.5 1.5 4.5 3.5v1.5H7.5v-1.5C7.5 13.5 9.5 12 12 12z" fill="#FFFFFF"/>
                      </svg>
                      <div>
                        <p class="text-sm font-medium text-white">{{ currentUser.name || 'User' }}</p>
                        <p class="text-xs text-gray-400 truncate">{{ currentUser.email }}</p>
                      </div>
                    </div>
                  </div>
                  <router-link 
                    to="/profile" 
                    class="block px-4 py-2 text-sm text-gray-300 hover:bg-gray-700 transition-colors duration-200"
                    @click.native="handleProfileClick"
                  >
                    Profile
                  </router-link>
                  <router-link 
                    to="/settings" 
                    class="block px-4 py-2 text-sm text-gray-300 hover:bg-gray-700 transition-colors duration-200"
                  >
                    Settings
                  </router-link>
                  <button 
                    @click="handleSignOut"
                    class="block w-full text-left px-4 py-2 text-sm text-red-400 hover:bg-gray-700 transition-colors duration-200"
                  >
                    Sign Out
                  </button>
                </div>
              </div>
            </div>

            <!-- Middle: Search Bar -->
            <div class="flex-1 max-w-2xl mx-4">
              <div class="relative">
                <input 
                  type="text"
                  v-model="searchQuery"
                  @focus="isSearchFocused = true"
                  @blur="handleSearchBlur"
                  placeholder="Search..."
                  class="w-full bg-gray-800 border border-gray-700 rounded-lg pl-10 pr-4 py-2 text-gray-300 
                         placeholder-gray-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500
                         transition-all duration-200"
                >
                <i class="fas fa-search absolute left-3 top-1/2 -translate-y-1/2 text-gray-500"></i>
                <div 
                  v-if="isSearchFocused && searchQuery"
                  class="absolute w-full mt-2 bg-[#1B2B3A] border border-gray-700 rounded-lg shadow-lg z-50"
                >
                  <div class="p-2">
                    <p class="text-sm text-gray-400">Searching for: {{ searchQuery }}</p>
                  </div>
                </div>
              </div>
            </div>

            <!-- Right: Icons -->
            <div class="flex items-center space-x-4">
              <!-- Scan Icon -->
              <button class="relative p-2 text-gray-400 hover:text-white focus:outline-none focus:text-white
                           transition-colors duration-200 group">
                <i class="fas fa-qrcode text-xl"></i>
                <span class="absolute -bottom-12 left-1/2 transform -translate-x-1/2 px-2 py-1 bg-gray-800 
                           text-xs text-white rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                  Scan
                </span>
              </button>

              <!-- Notifications Icon -->
              <div class="relative" v-click-outside="closeNotifications">
                <button 
                  @click="isNotificationsOpen = !isNotificationsOpen"
                  class="relative p-2 text-gray-400 hover:text-white focus:outline-none focus:text-white
                         transition-colors duration-200 group"
                >
                  <i class="fas fa-bell text-xl"></i>
                  <span v-if="notificationCount" 
                        class="absolute top-0 right-0 transform translate-x-1/2 -translate-y-1/2 
                               bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                    {{ notificationCount }}
                  </span>
                  <span class="absolute -bottom-12 left-1/2 transform -translate-x-1/2 px-2 py-1 bg-gray-800 
                             text-xs text-white rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                    Notifications
                  </span>
                </button>

                <!-- Notifications Dropdown -->
                <div 
                  v-show="isNotificationsOpen"
                  class="absolute right-0 mt-2 w-80 rounded-lg bg-[#1B2B3A] border border-gray-700 shadow-lg py-1 z-50"
                >
                  <div class="px-4 py-2 border-b border-gray-700">
                    <p class="text-sm font-medium text-white">Notifications</p>
                  </div>
                  <div class="max-h-96 overflow-y-auto">
                    <div v-if="notifications.length === 0" class="px-4 py-3 text-sm text-gray-400">
                      No new notifications
                    </div>
                    <div 
                      v-for="notification in notifications" 
                      :key="notification.id"
                      class="px-4 py-3 hover:bg-gray-700 transition-colors duration-200"
                    >
                      <p class="text-sm text-white">{{ notification.message }}</p>
                      <p class="text-xs text-gray-400 mt-1">{{ notification.time }}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Auth Modals -->
      <sign-in-modal 
        :show="showSignInModal"
        @close="showSignInModal = false"
        @show-signup="showSignUp"
      ></sign-in-modal>

      <sign-up-modal
        :show="showSignUpModal"
        @close="showSignUpModal = false"
        @show-signin="showSignIn"
      ></sign-up-modal>
    </header>
  `,
  data() {
    return {
      showSignInModal: false,
      showSignUpModal: false,
      isUserMenuOpen: false,
      isNotificationsOpen: false,
      searchQuery: '',
      isSearchFocused: false,
      notificationCount: 3,
      notifications: [
        { id: 1, message: 'Welcome to the platform!', time: '2 minutes ago' },
        { id: 2, message: 'Your profile was updated successfully', time: '1 hour ago' },
        { id: 3, message: 'New feature available: Dark mode', time: '2 hours ago' }
      ],
      searchTimeout: null,
      hasCheckedSession: false // Track if we've completed the initial session check
    };
  },
  computed: {
    currentUser() {
      return this.$root.currentUser;
    },
    isDefinitelyLoggedIn() {
      // Only show logged-in state if we've checked the session and have a user
      return !this.$root.isLoading && this.currentUser;
    },
    isDefinitelyLoggedOut() {
      // Only show logged-out state if we've checked the session and have no user
      return !this.$root.isLoading && !this.currentUser;
    }
  },
  methods: {
    showSignIn() {
      this.showSignUpModal = false;
      this.showSignInModal = true;
    },
    showSignUp() {
      this.showSignInModal = false;
      this.showSignUpModal = true;
    },
    handleProfileClick() {
      this.isUserMenuOpen = false;
    },
    handleImageError(e) {
      e.target.style.display = 'none';
      const svg = e.target.nextElementSibling;
      if (svg && svg.tagName === 'svg') {
        svg.style.display = 'block';
      }
    },
    async handleSignOut() {
      try {
        await this.$root.signOut();
        this.isUserMenuOpen = false;
        this.$router.push('/');
      } catch (error) {
        console.error('Sign out error:', error);
      }
    },
    closeUserMenu() {
      this.isUserMenuOpen = false;
    },
    closeNotifications() {
      this.isNotificationsOpen = false;
    },
    handleSearchBlur() {
      // Delay hiding the search results to allow for clicking
      setTimeout(() => {
        this.isSearchFocused = false;
      }, 200);
    }
  },
  watch: {
    searchQuery(newQuery) {
      if (this.searchTimeout) {
        clearTimeout(this.searchTimeout);
      }
      this.searchTimeout = setTimeout(() => {
        console.log('Searching for:', newQuery);
      }, 300);
    }
  },
  beforeDestroy() {
    if (this.searchTimeout) {
      clearTimeout(this.searchTimeout);
    }
  }
});