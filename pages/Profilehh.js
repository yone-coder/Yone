const Profile = {
  template: `
    <div class="min-h-screen pt-20 pb-8 px-4">
      <div v-if="user" class="max-w-4xl mx-auto">
        <!-- Profile Header -->
        <div class="relative mb-8">
          <!-- Cover Image -->
          <div class="h-48 md:h-64 rounded-xl overflow-hidden relative bg-gradient-to-r from-blue-600 to-purple-600">
            <img 
              :src="coverPhotoURL || '/default-cover.jpg'" 
              class="w-full h-full object-cover"
              @error="handleCoverImageError"
            >
            <div class="absolute inset-0 bg-black bg-opacity-30"></div>
            <button 
              @click="$refs.coverInput.click()"
              class="absolute bottom-4 right-4 bg-black bg-opacity-50 hover:bg-opacity-70 text-white px-4 py-2 rounded-lg 
                     transition duration-200 flex items-center space-x-2"
            >
              <i class="fas fa-camera"></i>
              <span>Change Cover</span>
            </button>
            <input 
              ref="coverInput"
              type="file" 
              @change="handleCoverUpload" 
              accept="image/*" 
              class="hidden"
            >
          </div>

          <!-- Profile Image -->
          <div class="absolute -bottom-16 left-8">
            <div class="relative group">
              <div class="w-32 h-32 rounded-full overflow-hidden border-4 border-[#1B2B3A] bg-[#1B2B3A]">
                <img 
                  :src="profileImageUrl" 
                  :alt="user.displayName || 'User'"
                  class="w-full h-full object-cover"
                  @error="handleProfileImageError"
                >
              </div>
              <button 
                @click="$refs.profileInput.click()"
                class="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 rounded-full 
                       opacity-0 group-hover:opacity-100 transition-opacity duration-200"
              >
                <i class="fas fa-camera text-white"></i>
              </button>
              <input 
                ref="profileInput"
                type="file" 
                @change="handleProfileUpload" 
                accept="image/*" 
                class="hidden"
              >
            </div>
          </div>
        </div>

        <!-- Profile Content -->
        <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
          <!-- Left Column: Profile Info -->
          <div class="md:col-span-2">
            <div class="bg-[#1B2B3A] rounded-xl shadow-xl p-6">
              <!-- Status Message -->
              <transition name="fade">
                <div 
                  v-if="message.text" 
                  :class="['mb-4 p-4 rounded-lg', 
                    message.type === 'error' ? 'bg-red-500/10 text-red-500' : 'bg-green-500/10 text-green-500']"
                >
                  <div class="flex items-center space-x-2">
                    <i :class="['fas', message.type === 'error' ? 'fa-exclamation-circle' : 'fa-check-circle']"></i>
                    <span>{{ message.text }}</span>
                  </div>
                </div>
              </transition>

              <!-- Profile Form -->
              <form @submit.prevent="updateProfile" class="space-y-6">
                <!-- Display Name -->
                <div>
                  <label class="block text-gray-300 text-sm font-medium mb-2">Display Name</label>
                  <input 
                    type="text" 
                    v-model="formData.displayName"
                    class="w-full px-4 py-3 bg-gray-800/50 border border-gray-700 rounded-lg text-white 
                           focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500
                           transition-all duration-200"
                    placeholder="Enter your name"
                  >
                </div>

                <!-- Bio -->
                <div>
                  <label class="block text-gray-300 text-sm font-medium mb-2">Bio</label>
                  <textarea 
                    v-model="formData.bio"
                    rows="3"
                    class="w-full px-4 py-3 bg-gray-800/50 border border-gray-700 rounded-lg text-white 
                           focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500
                           transition-all duration-200 resize-none"
                    placeholder="Tell us about yourself"
                  ></textarea>
                </div>

                <!-- Email -->
                <div>
                  <label class="block text-gray-300 text-sm font-medium mb-2">Email</label>
                  <input 
                    type="email" 
                    v-model="formData.email"
                    disabled
                    class="w-full px-4 py-3 bg-gray-800/50 border border-gray-700 rounded-lg text-gray-400"
                  >
                </div>

                <!-- Social Links -->
                <div>
                  <label class="block text-gray-300 text-sm font-medium mb-2">Social Links</label>
                  <div class="space-y-3">
                    <div class="flex items-center space-x-3">
                      <i class="fab fa-twitter text-gray-400 w-6"></i>
                      <input 
                        type="text" 
                        v-model="formData.social.twitter"
                        class="flex-1 px-4 py-2 bg-gray-800/50 border border-gray-700 rounded-lg text-white 
                               focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500
                               transition-all duration-200"
                        placeholder="Twitter username"
                      >
                    </div>
                    <div class="flex items-center space-x-3">
                      <i class="fab fa-instagram text-gray-400 w-6"></i>
                      <input 
                        type="text" 
                        v-model="formData.social.instagram"
                        class="flex-1 px-4 py-2 bg-gray-800/50 border border-gray-700 rounded-lg text-white 
                               focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500
                               transition-all duration-200"
                        placeholder="Instagram username"
                      >
                    </div>
                  </div>
                </div>

                <!-- Submit Button -->
                <div class="flex justify-end">
                  <button 
                    type="submit"
                    :disabled="loading"
                    class="bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-6 rounded-lg
                           transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed
                           flex items-center space-x-2"
                  >
                    <i v-if="loading" class="fas fa-spinner fa-spin"></i>
                    <span>{{ loading ? 'Updating...' : 'Update Profile' }}</span>
                  </button>
                </div>
              </form>
            </div>
          </div>

          <!-- Right Column: Stats & Additional Info -->
          <div class="space-y-6">
            <!-- Stats Card -->
            <div class="bg-[#1B2B3A] rounded-xl shadow-xl p-6">
              <h3 class="text-lg font-semibold text-white mb-4">Stats</h3>
              <div class="space-y-4">
                <div class="flex items-center justify-between">
                  <span class="text-gray-400">Followers</span>
                  <span class="text-white font-medium">{{ stats.followers }}</span>
                </div>
                <div class="flex items-center justify-between">
                  <span class="text-gray-400">Following</span>
                  <span class="text-white font-medium">{{ stats.following }}</span>
                </div>
                <div class="flex items-center justify-between">
                  <span class="text-gray-400">Posts</span>
                  <span class="text-white font-medium">{{ stats.posts }}</span>
                </div>
              </div>
            </div>

            <!-- Account Info -->
            <div class="bg-[#1B2B3A] rounded-xl shadow-xl p-6">
              <h3 class="text-lg font-semibold text-white mb-4">Account Info</h3>
              <div class="space-y-4">
                <div>
                  <span class="text-gray-400 block text-sm">Member since</span>
                  <span class="text-white">{{ formatDate(user.metadata.creationTime) }}</span>
                </div>
                <div>
                  <span class="text-gray-400 block text-sm">Last sign in</span>
                  <span class="text-white">{{ formatDate(user.metadata.lastSignInTime) }}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
  
  data() {
    return {
      user: null,
      loading: false,
      coverPhotoURL: null,
      profileImageUrl: '',
      formData: {
        displayName: '',
        email: '',
        bio: '',
        social: {
          twitter: '',
          instagram: ''
        }
      },
      message: {
        text: '',
        type: 'success'
      },
      stats: {
        followers: 0,
        following: 0,
        posts: 0
      }
    };
  },
  created() {
    this.initializeUser();
    this.loadUserData();
  },
  methods: {
    async initializeUser() {
      const user = firebase.auth().currentUser;
      if (user) {
        this.user = user;
        this.profileImageUrl = user.photoURL || '/default-avatar.png';
        this.formData.displayName = user.displayName || '';
        this.formData.email = user.email || '';
      } else {
        this.$router.push('/');
      }
    },

    async loadUserData() {
      if (!this.user) return;

      try {
        const userDoc = await firestore.collection('users').doc(this.user.uid).get();
        if (userDoc.exists) {
          const userData = userDoc.data();
          this.formData.bio = userData.bio || '';
          this.formData.social = userData.social || { twitter: '', instagram: '' };
          this.coverPhotoURL = userData.coverPhotoURL;
          this.stats = userData.stats || { followers: 0, following: 0, posts: 0 };
        }
      } catch (error) {
        console.error('Error loading user data:', error);
        this.message = { text: 'Failed to load user data', type: 'error' };
      }
    },

    formatDate(dateString) {
      return new Date(dateString).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      });
    },

    handleProfileImageError(e) {
      e.target.src = '/default-avatar.png';
      this.profileImageUrl = '/default-avatar.png';
    },

    handleCoverImageError(e) {
      e.target.src = '/default-cover.jpg';
    },

    async handleProfileUpload(event) {
  const file = event.target.files[0];
  if (!file) return;

  try {
    // Validate file type and size
    if (!file.type.match(/image\/(jpeg|png|gif)/i)) {
      throw new Error('Please select a valid image file (JPEG, PNG, or GIF)');
    }
    if (file.size > 5 * 1024 * 1024) {
      throw new Error('Image must be smaller than 5MB');
    }

    this.loading = true;
    this.message = { text: 'Uploading image...', type: 'success' };

    // Create a storage reference
    const storageRef = storage.ref();
    const timestamp = Date.now();
    const random = Math.random().toString(36).substring(7);
    const fileRef = storageRef.child(`profile-images/${this.user.uid}/${timestamp}_${random}`);

    // Create file metadata including the content type
    const metadata = {
      contentType: file.type,
      customMetadata: {
        'uploaded-by': this.user.uid,
        'original-name': file.name
      }
    };

    try {
      // Try uploading with putString
      const reader = new FileReader();
      reader.onload = async (e) => {
        try {
          const dataUrl = e.target.result;
          const uploadTask = await fileRef.putString(dataUrl, 'data_url', metadata);
          const downloadURL = await uploadTask.ref.getDownloadURL();

          // Update user profile
          await this.user.updateProfile({
            photoURL: downloadURL
          });

          // Update Firestore document
          await firestore.collection('users').doc(this.user.uid).set({
            photoURL: downloadURL,
            updatedAt: firebase.firestore.FieldValue.serverTimestamp()
          }, { merge: true });

          this.profileImageUrl = downloadURL;
          this.message = { text: 'Profile picture updated successfully', type: 'success' };
        } catch (uploadError) {
          console.error('Upload error:', uploadError);
          throw uploadError;
        }
      };

      reader.onerror = (error) => {
        throw error;
      };

      // Read the file as a data URL
      reader.readAsDataURL(file);

    } catch (error) {
      throw error;
    }

  } catch (error) {
    console.error('Error:', error);
    this.message = { 
      text: error.message || 'Failed to upload image. Please try again.',
      type: 'error'
    };
    this.profileImageUrl = this.DEFAULT_AVATAR;
  } finally {
    this.loading = false;
    event.target.value = '';
  }
},

async handleCoverUpload(event) {
  const file = event.target.files[0];
  if (!file) return;

  try {
    if (!file.type.match(/image\/(jpeg|png|gif)/i)) {
      throw new Error('Please select a valid image file (JPEG, PNG, or GIF)');
    }
    if (file.size > 5 * 1024 * 1024) {
      throw new Error('Image must be smaller than 5MB');
    }

    this.loading = true;
    this.message = { text: 'Uploading cover image...', type: 'success' };

    const storageRef = storage.ref();
    const timestamp = Date.now();
    const random = Math.random().toString(36).substring(7);
    const fileRef = storageRef.child(`cover-images/${this.user.uid}/${timestamp}_${random}`);

    const metadata = {
      contentType: file.type,
      customMetadata: {
        'uploaded-by': this.user.uid,
        'original-name': file.name
      }
    };

    try {
      // Try uploading with putString
      const reader = new FileReader();
      reader.onload = async (e) => {
        try {
          const dataUrl = e.target.result;
          const uploadTask = await fileRef.putString(dataUrl, 'data_url', metadata);
          const downloadURL = await uploadTask.ref.getDownloadURL();

          // Update Firestore document
          await firestore.collection('users').doc(this.user.uid).update({
            coverPhotoURL: downloadURL,
            updatedAt: firebase.firestore.FieldValue.serverTimestamp()
          });

          this.coverPhotoURL = downloadURL;
          this.message = { text: 'Cover photo updated successfully', type: 'success' };
        } catch (uploadError) {
          console.error('Upload error:', uploadError);
          throw uploadError;
        }
      };

      reader.onerror = (error) => {
        throw error;
      };

      // Read the file as a data URL
      reader.readAsDataURL(file);

    } catch (error) {
      throw error;
    }

  } catch (error) {
    console.error('Error:', error);
    this.message = { 
      text: error.message || 'Failed to upload cover image. Please try again.',
      type: 'error'
    };
    this.coverPhotoURL = this.DEFAULT_COVER;
  } finally {
    this.loading = false;
    event.target.value = '';
  }
}