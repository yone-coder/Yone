
// Profile component definition
const ProfileComponent = {
  template: `
    <div class="container mx-auto py-2 max-w-4xl">
      <div class="bg-[#1B2B3A] rounded-lg shadow-xl p-6">
        <!-- Profile Header -->
        <div class="flex items-start justify-between mb-6">
          <h1 class="text-2xl font-bold text-white">My Profile</h1>
          <button 
            v-if="!isEditing && !loading"
            @click="startEditing"
            class="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition duration-200"
          >
            <i class="fas fa-edit mr-2"></i>Edit Profile
          </button>
        </div>

        <!-- Loading State -->
        <div v-if="loading" class="flex justify-center items-center h-64">
          <i class="fas fa-spinner fa-spin text-4xl text-blue-500"></i>
        </div>

        <!-- Profile Content -->
        <div v-else>
          <!-- Profile Image Section -->
          <div class="flex items-center mb-8">
            <div class="relative">
              <img 
                :src="profileData.photo_url || defaultAvatar"
                :alt="profileData.name || 'User'"
                class="w-24 h-24 rounded-full object-cover border-4 border-gray-700"
              >
              <div 
                v-if="isEditing"
                class="absolute bottom-0 right-0"
              >
                <label 
                  class="bg-blue-600 hover:bg-blue-700 text-white p-2 rounded-full cursor-pointer transition duration-200"
                >
                  <i class="fas fa-camera"></i>
                  <input 
                    type="file" 
                    accept="image/jpeg,image/png,image/gif"
                    @change="handlePhotoUpload"
                    class="hidden" 
                    ref="fileInput"
                  />
                </label>
              </div>
            </div>
            
            <div class="ml-6">
              <div v-if="!isEditing">
                <h2 class="text-xl font-bold text-white">
                  {{ profileData.name || 'Anonymous User' }}
                </h2>
                <p class="text-gray-400">{{ profileData.email }}</p>
              </div>
              <div v-else class="space-y-2">
                <input 
                  v-model="editedProfile.name"
                  type="text"
                  class="bg-gray-800 text-white px-3 py-2 rounded-lg border border-gray-700 focus:border-blue-500 focus:outline-none w-full"
                  placeholder="Display Name"
                >
              </div>
            </div>
          </div>

          <!-- Profile Details -->
          <div class="space-y-6">
            <!-- Bio Section -->
            <div>
              <h3 class="text-lg font-semibold text-white mb-2">Bio</h3>
              <div v-if="!isEditing" class="text-gray-300">
                {{ profileData.bio || 'No bio added yet.' }}
              </div>
              <textarea
                v-else
                v-model="editedProfile.bio"
                rows="4"
                class="w-full bg-gray-800 text-white px-3 py-2 rounded-lg border border-gray-700 focus:border-blue-500 focus:outline-none"
                placeholder="Tell us about yourself..."
              ></textarea>
            </div>

            <!-- Contact Information -->
            <div>
              <h3 class="text-lg font-semibold text-white mb-2">Contact Information</h3>
              <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label class="block text-gray-400 text-sm mb-1">Location</label>
                  <div v-if="!isEditing" class="text-gray-300">
                    {{ profileData.location || 'Not specified' }}
                  </div>
                  <input
                    v-else
                    v-model="editedProfile.location"
                    type="text"
                    class="w-full bg-gray-800 text-white px-3 py-2 rounded-lg border border-gray-700 focus:border-blue-500 focus:outline-none"
                    placeholder="Your location"
                  >
                </div>
                <div>
                  <label class="block text-gray-400 text-sm mb-1">Website</label>
                  <div v-if="!isEditing" class="text-gray-300">
                    <a 
                      v-if="profileData.website"
                      :href="profileData.website"
                      target="_blank"
                      class="text-blue-500 hover:text-blue-400"
                    >{{ profileData.website }}</a>
                    <span v-else>Not specified</span>
                  </div>
                  <input
                    v-else
                    v-model="editedProfile.website"
                    type="url"
                    class="w-full bg-gray-800 text-white px-3 py-2 rounded-lg border border-gray-700 focus:border-blue-500 focus:outline-none"
                    placeholder="Your website URL"
                  >
                </div>
              </div>
            </div>

            <!-- Skills Section -->
            <div>
              <h3 class="text-lg font-semibold text-white mb-2">Skills & Interests</h3>
              <div class="flex flex-wrap gap-2">
                <template v-if="!isEditing">
                  <span 
                    v-for="skill in profileData.skills" 
                    :key="skill"
                    class="bg-gray-700 text-white px-3 py-1 rounded-full text-sm"
                  >
                    {{ skill }}
                  </span>
                  <span v-if="!profileData.skills || profileData.skills.length === 0" class="text-gray-400">
                    No skills added yet
                  </span>
                </template>
                <div v-else class="w-full">
                  <div class="flex flex-wrap gap-2 mb-2">
                    <span 
                      v-for="(skill, index) in editedProfile.skills" 
                      :key="index"
                      class="bg-gray-700 text-white px-3 py-1 rounded-full text-sm flex items-center"
                    >
                      {{ skill }}
                      <button 
                        @click="removeSkill(index)"
                        class="ml-2 text-gray-400 hover:text-red-400"
                      >
                        <i class="fas fa-times"></i>
                      </button>
                    </span>
                  </div>
                  <div class="flex gap-2">
                    <input
                      v-model="newSkill"
                      @keyup.enter="addSkill"
                      type="text"
                      class="flex-1 bg-gray-800 text-white px-3 py-2 rounded-lg border border-gray-700 focus:border-blue-500 focus:outline-none"
                      placeholder="Add a skill (press Enter)"
                    >
                    <button
                      @click="addSkill"
                      class="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition duration-200"
                    >
                      Add
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <!-- Privacy Settings -->
            <div v-if="isEditing">
              <h3 class="text-lg font-semibold text-white mb-2">Privacy Settings</h3>
              <div class="space-y-4">
                <div>
                  <label class="flex items-center space-x-2 text-gray-300 cursor-pointer">
                    <input 
                      type="checkbox"
                      v-model="editedProfile.privacy.showEmail"
                      class="form-checkbox text-blue-600 rounded"
                    >
                    <span>Show email on public profile</span>
                  </label>
                </div>
                <div>
                  <label class="flex items-center space-x-2 text-gray-300 cursor-pointer">
                    <input 
                      type="checkbox"
                      v-model="editedProfile.privacy.showLocation"
                      class="form-checkbox text-blue-600 rounded"
                    >
                    <span>Show location on public profile</span>
                  </label>
                </div>
              </div>
            </div>

            <!-- Action Buttons -->
            <div v-if="isEditing" class="flex space-x-4 pt-6">
              <button 
                @click="saveProfile"
                :disabled="isSaving || !isProfileValid"
                class="flex-1 bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg transition duration-200 
                       disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
              >
                <i v-if="isSaving" class="fas fa-spinner fa-spin mr-2"></i>
                {{ isSaving ? 'Saving...' : 'Save Changes' }}
              </button>
              <button 
                @click="cancelEditing"
                :disabled="isSaving"
                class="flex-1 bg-gray-700 hover:bg-gray-600 text-white px-6 py-2 rounded-lg transition duration-200 
                       disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>

        <!-- Toast Messages -->
        <div class="fixed bottom-4 right-4 z-50">
          <transition name="slide-fade">
            <div 
              v-if="showSuccessToast"
              class="bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg flex items-center"
            >
              <i class="fas fa-check-circle mr-2"></i>
              {{ toastMessage }}
            </div>
          </transition>
          <transition name="slide-fade">
            <div 
              v-if="showErrorToast"
              class="bg-red-500 text-white px-6 py-3 rounded-lg shadow-lg flex items-center mt-2"
            >
              <i class="fas fa-exclamation-circle mr-2"></i>
              {{ toastMessage }}
            </div>
          </transition>
        </div>
      </div>
    </div>
  `,
  data() {
    return {
      loading: true,
      isEditing: false,
      isSaving: false,
      showSuccessToast: false,
      showErrorToast: false,
      toastMessage: '',
      toastTimeout: null,
      defaultAvatar: '/images/default-avatar.png',
      newSkill: '',
      profileData: {
        name: '',
        email: '',
        photo_url: '',
        bio: '',
        location: '',
        website: '',
        skills: [],
        privacy: {
          showEmail: false,
          showLocation: false
        }
      },
      editedProfile: {
        name: '',
        bio: '',
        location: '',
        website: '',
        skills: [],
        privacy: {
          showEmail: false,
          showLocation: false
        }
      }
    };
  },
  computed: {
    isProfileValid() {
      return this.editedProfile.name.trim().length > 0;
    }
  },
  watch: {
  // Add watchers for debugging
  loading(newVal) {
    console.log('Loading state changed:', newVal);
  },
  profileData: {
    handler(newVal) {
      console.log('Profile data changed:', newVal);
    },
    deep: true
  }
},
  methods: {
    async loadProfile() {
    try {
      console.log('Starting profile load...');
      this.loading = true;
      
      // Get current user from session
      const response = await window.apiService.getProfile();
      console.log('Profile API response:', response);
      
      if (!response.success) {
        throw new Error(response.message || 'Failed to load profile');
      }

      this.profileData = {
        ...this.profileData,
        ...response.profile,
        skills: Array.isArray(response.profile.skills) ? response.profile.skills : [],
        privacy: {
          ...this.profileData.privacy,
          ...(response.profile.privacy_settings || {})
        }
      };
      console.log('Profile data set:', this.profileData);
    } catch (error) {
      console.error('Error loading profile:', error);
      this.showToast(error.message, 'error');
    } finally {
      this.loading = false;
    }
  },
    startEditing() {
      this.editedProfile = JSON.parse(JSON.stringify(this.profileData));
      this.isEditing = true;
    },
    async saveProfile() {
    try {
      if (!this.isProfileValid) {
        this.showToast('Please fill in all required fields', 'error');
        return;
      }

      this.isSaving = true;
      
      const response = await window.apiService.updateProfile({
        name: this.editedProfile.name,
        bio: this.editedProfile.bio,
        location: this.editedProfile.location,
        website: this.editedProfile.website,
        skills: this.editedProfile.skills,
        privacy_settings: this.editedProfile.privacy
      });

      if (!response.success) {
        throw new Error(response.message || 'Failed to save profile changes');
      }

      // Update local profile state
      this.profileData = JSON.parse(JSON.stringify(this.editedProfile));
      
      // Update root user state to keep header in sync
      this.$root.currentUser = {
        ...this.$root.currentUser,
        name: this.editedProfile.name,
        photo_url: this.editedProfile.photo_url
      };
      
      // Update localStorage to persist changes
      const userStr = localStorage.getItem('user');
      if (userStr) {
        const user = JSON.parse(userStr);
        user.name = this.editedProfile.name;
        user.photo_url = this.editedProfile.photo_url;
        localStorage.setItem('user', JSON.stringify(user));
      }

      this.isEditing = false;
      this.showToast('Profile updated successfully!', 'success');
    } catch (error) {
      console.error('Error saving profile:', error);
      this.showToast(error.message, 'error');
    } finally {
      this.isSaving = false;
    }
  },
    async handlePhotoUpload(event) {
    const file = event.target.files[0];
    if (!file) return;

    const validTypes = ['image/jpeg', 'image/png', 'image/gif'];
    const maxSize = 5 * 1024 * 1024; // 5MB

    if (!validTypes.includes(file.type)) {
      this.showToast('Please upload a valid image file (JPEG, PNG, or GIF)', 'error');
      return;
    }

    if (file.size > maxSize) {
      this.showToast('Image size should be less than 5MB', 'error');
      return;
    }

    try {
      this.isSaving = true;
      const photoUrl = await window.apiService.uploadProfilePhoto(file);
      
      // Update local profile state
      this.editedProfile.photo_url = photoUrl;
      this.profileData.photo_url = photoUrl;
      
      // Update root user state to keep header in sync
      this.$root.currentUser = {
        ...this.$root.currentUser,
        photo_url: photoUrl
      };
      
      // Update localStorage to persist changes
      const userStr = localStorage.getItem('user');
      if (userStr) {
        const user = JSON.parse(userStr);
        user.photo_url = photoUrl;
        localStorage.setItem('user', JSON.stringify(user));
      }

      this.showToast('Profile picture updated successfully', 'success');
    } catch (error) {
      console.error('Error uploading image:', error);
      this.showToast(error.message, 'error');
    } finally {
      this.isSaving = false;
    }
  },
    cancelEditing() {
      this.editedProfile = JSON.parse(JSON.stringify(this.profileData));
      this.isEditing = false;
      this.newSkill = '';
    },
     
    addSkill() {
      const skill = this.newSkill.trim();
      if (skill && !this.editedProfile.skills.includes(skill)) {
        if (!Array.isArray(this.editedProfile.skills)) {
          this.editedProfile.skills = [];
        }
        this.editedProfile.skills.push(skill);
        this.newSkill = '';
      }
    },
    removeSkill(index) {
      this.editedProfile.skills.splice(index, 1);
    },
    showToast(message, type = 'success') {
      // Clear any existing timeouts
      if (this.toastTimeout) {
        clearTimeout(this.toastTimeout);
      }

      // Set message and show appropriate toast
      this.toastMessage = message;
      if (type === 'success') {
        this.showSuccessToast = true;
        this.showErrorToast = false;
      } else {
        this.showErrorToast = true;
        this.showSuccessToast = false;
      }

      // Hide toast after 3 seconds
      this.toastTimeout = setTimeout(() => {
        this.showSuccessToast = false;
        this.showErrorToast = false;
      }, 3000);
    },
    validateUrl(url) {
      if (!url) return true;
      try {
        new URL(url);
        return true;
      } catch {
        return false;
      }
    },
    async checkAuthStatus() {
    try {
      console.log('Checking auth status...');
      const response = await fetch('/api/check-session.php', {
        credentials: 'include'
      });
      console.log('Auth status response:', response);
      
      const data = await response.json();
      console.log('Auth status data:', data);
      
      if (!data.authenticated) {
        window.location.href = '/login';
        throw new Error('Please log in to view your profile');
      }
      
      return data.user;
    } catch (error) {
      console.error('Auth check error:', error);
      throw error;
    }
  }
},
  created() {
    // Check authentication and load profile
    this.checkAuthStatus()
      .then(() => this.loadProfile())
      .catch(error => {
        this.showToast(error.message, 'error');
      });
  },
  beforeDestroy() {
    if (this.toastTimeout) {
      clearTimeout(this.toastTimeout);
    }
  }
};

// Update API service with new methods
window.apiService = {
  ...window.apiService,
  async getProfile() {
    try {
      const response = await fetch('/api/check-session.php', {
        credentials: 'include'
      });
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const sessionData = await response.json();
      
      if (!sessionData.authenticated || !sessionData.user) {
        throw new Error('Please log in to view your profile');
      }

      const profileResponse = await fetch('/api/users.php', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({
          action: 'get_profile',
          user_id: sessionData.user.id
        })
      });

      if (!profileResponse.ok) {
        throw new Error(`HTTP error! status: ${profileResponse.status}`);
      }

      const profileData = await profileResponse.json();
      
      if (!profileData.success) {
        throw new Error(profileData.message || 'Failed to get profile');
      }

      return profileData;
    } catch (error) {
      console.error('Get profile error:', error);
      throw error;
    }
  },

  async updateProfile(profileData) {
    try {
      const sessionResponse = await fetch('/api/check-session.php', {
        credentials: 'include'
      });
      
      const sessionData = await sessionResponse.json();
      
      if (!sessionData.authenticated || !sessionData.user) {
        throw new Error('Please log in to update your profile');
      }

      const response = await fetch('/api/users.php', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({
          action: 'update_profile',
          user_id: sessionData.user.id,
          ...profileData
        })
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      
      if (!data.success) {
        throw new Error(data.message || 'Failed to update profile');
      }

      return data;
    } catch (error) {
      console.error('Update profile error:', error);
      throw error;
    }
  },

  async uploadProfilePhoto(photoFile) {
    try {
      const sessionResponse = await fetch('/api/check-session.php', {
        credentials: 'include'
      });
      
      const sessionData = await sessionResponse.json();
      
      if (!sessionData.authenticated || !sessionData.user) {
        throw new Error('Please log in to upload a photo');
      }

      const formData = new FormData();
      formData.append('action', 'upload_photo');
      formData.append('user_id', sessionData.user.id);
      formData.append('photo', photoFile);

      const response = await fetch('/api/users.php', {
        method: 'POST',
        credentials: 'include',
        body: formData
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      
      if (!data.success) {
        throw new Error(data.message || 'Failed to upload photo');
      }

      return data.photo_url;
    } catch (error) {
      console.error('Upload photo error:', error);
      throw error;
    }
  }
};

// Register the component globally
Vue.component('profile', ProfileComponent);

// Make it available as a route component
window.Profile = ProfileComponent;

// Add navigation guards to debug routing
const originalBeforeEach = window.VueRouter.prototype.beforeEach;
window.VueRouter.prototype.beforeEach = function(fn) {
  originalBeforeEach.call(this, (to, from, next) => {
    console.log('Route navigation:', { to, from });
    fn(to, from, next);
  });
};

// CSS for transitions
const style = document.createElement('style');
style.textContent = `
.slide-fade-enter-active {
  transition: all .3s ease;
}
.slide-fade-leave-active {
  transition: all .3s cubic-bezier(1.0, 0.5, 0.8, 1.0);
}
.slide-fade-enter, .slide-fade-leave-to {
  transform: translateX(10px);
  opacity: 0;
}
`;
document.head.appendChild(style);
