Vue.component('sign-in-modal', {
  template: `
    <div v-if="show" class="fixed inset-0 z-50 overflow-y-auto">
      <div class="flex items-center justify-center min-h-screen px-4 pt-4 pb-20">
        <!-- Background overlay -->
        <div class="fixed inset-0 bg-black/50 backdrop-blur-sm" @click="closeModal"></div>

        <!-- Modal panel -->
        <div class="relative bg-[#1B2B3A] rounded-lg w-full max-w-md p-6 shadow-xl">
          <!-- Close button -->
          <div class="absolute top-4 right-4">
            <button 
              @click="closeModal" 
              class="text-gray-400 hover:text-white transition-colors"
              :disabled="loading"
            >
              <i class="fas fa-times"></i>
            </button>
          </div>

          <h2 class="text-2xl font-bold text-white mb-6">Sign In</h2>

          <!-- Success message -->
          <div 
            v-if="successMessage" 
            class="mb-6 p-3 bg-green-500/20 border border-green-500 rounded-lg text-green-500 text-sm"
          >
            <div class="flex items-center">
              <i class="fas fa-check-circle mr-2"></i>
              {{ successMessage }}
            </div>
          </div>

          <!-- Error message -->
          <div 
            v-if="error" 
            class="mb-6 p-3 bg-red-500/20 border border-red-500 rounded-lg text-red-500 text-sm"
          >
            <div class="flex items-center">
              <i class="fas fa-exclamation-circle mr-2"></i>
              {{ error }}
            </div>
          </div>

          <form @submit.prevent="handleSignIn">
            <div class="space-y-4">
              <!-- Email field -->
              <div>
                <label class="block text-gray-300 text-sm font-medium mb-2">
                  Email
                </label>
                <input 
                  type="email" 
                  v-model.trim="email"
                  :disabled="loading"
                  class="w-full px-3 py-2 bg-gray-800 border border-gray-600 rounded-lg text-white 
                         focus:outline-none focus:border-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
                  required
                >
              </div>

              <!-- Password field -->
              <div>
                <label class="block text-gray-300 text-sm font-medium mb-2">
                  Password
                </label>
                <div class="relative">
                  <input 
                    :type="showPassword ? 'text' : 'password'"
                    v-model="password"
                    :disabled="loading"
                    class="w-full px-3 py-2 bg-gray-800 border border-gray-600 rounded-lg text-white 
                           focus:outline-none focus:border-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
                    required
                  >
                  <button 
                    type="button"
                    @click="showPassword = !showPassword"
                    :disabled="loading"
                    class="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white"
                  >
                    <i :class="showPassword ? 'fas fa-eye-slash' : 'fas fa-eye'"></i>
                  </button>
                </div>
              </div>

              <!-- Remember me and Forgot password -->
              <div class="flex items-center justify-between">
                <label class="flex items-center">
                  <input 
                    type="checkbox" 
                    v-model="rememberMe"
                    :disabled="loading"
                    class="form-checkbox h-4 w-4 text-blue-600 transition duration-150 ease-in-out"
                  >
                  <span class="ml-2 text-sm text-gray-300">Remember me</span>
                </label>
                <button 
                  type="button"
                  @click="handleForgotPassword"
                  :disabled="loading"
                  class="text-sm text-blue-500 hover:text-blue-400 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Forgot password?
                </button>
              </div>

              <!-- Sign in button -->
              <div class="pt-4">
                <button 
                  type="submit"
                  :disabled="loading || !isValidForm"
                  class="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg
                         transition duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
                >
                  <i v-if="loading" class="fas fa-spinner fa-spin mr-2"></i>
                  {{ loading ? 'Signing in...' : 'Sign In' }}
                </button>
              </div>

              <!-- Divider -->
              <div class="relative py-4">
                <div class="absolute inset-0 flex items-center">
                  <div class="w-full border-t border-gray-600"></div>
                </div>
                <div class="relative flex justify-center text-sm">
                  <span class="px-2 bg-[#1B2B3A] text-gray-400">Or continue with</span>
                </div>
              </div>

              <!-- Google sign in -->
              <button 
                type="button"
                @click="signInWithGoogle"
                :disabled="loading"
                class="w-full bg-white text-gray-900 font-medium py-2 px-4 rounded-lg hover:bg-gray-100 
                       transition duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
              >
                <img 
                  src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg" 
                  class="w-5 h-5 mr-2"
                  alt="Google logo"
                >
                {{ googleLoading ? 'Connecting...' : 'Google' }}
              </button>

              <!-- Sign up link -->
              <div class="text-center mt-4">
                <span class="text-gray-400">Don't have an account?</span>
                <button 
                  type="button"
                  @click="switchToSignUp"
                  :disabled="loading"
                  class="ml-1 text-blue-500 hover:text-blue-400 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Sign up
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  `,
  props: {
    show: {
      type: Boolean,
      required: true
    }
  },
  data() {
    return {
      email: '',
      password: '',
      rememberMe: false,
      showPassword: false,
      loading: false,
      googleLoading: false,
      error: null,
      successMessage: null,
      closeTimeout: null
    };
  },
  computed: {
    isValidForm() {
      return this.email.length > 0 && this.password.length > 0;
    }
  },
  methods: {
    async handleSignIn() {
      if (!this.isValidForm) return;
      
      this.loading = true;
      this.error = null;
      this.successMessage = null;

      try {
        console.log('Starting sign in process...');

        if (!firebase.apps.length) {
          throw new Error('Firebase not initialized');
        }

        const persistence = this.rememberMe 
          ? firebase.auth.Auth.Persistence.LOCAL
          : firebase.auth.Auth.Persistence.SESSION;
        
        console.log('Setting persistence...');
        await firebase.auth().setPersistence(persistence);
        
        console.log('Attempting sign in...');
        const userCredential = await firebase.auth().signInWithEmailAndPassword(this.email, this.password);
        console.log('Sign in successful:', userCredential);

        // Show success message
        this.successMessage = 'Successfully signed in! Redirecting...';
        
        // Set timeout to close modal
        this.closeTimeout = setTimeout(() => {
          this.closeModal();
          this.$router.push('/');
        }, 1500); // Close after 1.5 seconds
        
      } catch (error) {
        console.error('Sign in error:', error);
        
        switch (error.code) {
          case 'auth/user-not-found':
            this.error = 'No account found with this email address';
            break;
          case 'auth/wrong-password':
            this.error = 'Incorrect password';
            break;
          case 'auth/too-many-requests':
            this.error = 'Too many failed attempts. Please try again later';
            break;
          case 'auth/user-disabled':
            this.error = 'This account has been disabled';
            break;
          default:
            this.error = `Failed to sign in: ${error.message}`;
        }
      } finally {
        this.loading = false;
      }
    },

    async signInWithGoogle() {
      if (this.loading || this.googleLoading) return;
      
      this.googleLoading = true;
      this.error = null;
      this.successMessage = null;

      try {
        console.log('Starting Google sign in...');
        const provider = new firebase.auth.GoogleAuthProvider();
        const result = await firebase.auth().signInWithPopup(provider);
        console.log('Google sign in successful:', result);
        
        // Show success message
        this.successMessage = 'Successfully signed in with Google! Redirecting...';
        
        // Set timeout to close modal
        this.closeTimeout = setTimeout(() => {
          this.closeModal();
          this.$router.push('/');
        }, 1500); // Close after 1.5 seconds
        
      } catch (error) {
        console.error('Google sign in error:', error);
        
        if (error.code !== 'auth/popup-closed-by-user') {
          this.error = `Failed to sign in with Google: ${error.message}`;
        }
      } finally {
        this.googleLoading = false;
      }
    },

    async handleForgotPassword() {
      if (!this.email) {
        this.error = 'Please enter your email address';
        return;
      }

      this.loading = true;
      this.error = null;

      try {
        await firebase.auth().sendPasswordResetEmail(this.email);
        this.successMessage = 'Password reset email sent. Please check your inbox';
        
        // Close modal after showing success message
        this.closeTimeout = setTimeout(() => {
          this.closeModal();
        }, 3000); // Give more time to read the message
        
      } catch (error) {
        console.error('Password reset error:', error);
        if (error.code === 'auth/user-not-found') {
          this.error = 'No account found with this email address';
        } else {
          this.error = `Failed to send reset email: ${error.message}`;
        }
      } finally {
        this.loading = false;
      }
    },

    switchToSignUp() {
      this.clearTimeouts();
      this.$emit('close');
      this.$emit('show-signup');
    },

    closeModal() {
      if (this.loading || this.googleLoading) return;
      
      this.clearTimeouts();
      
      // Reset all form fields and states
      this.email = '';
      this.password = '';
      this.error = null;
      this.successMessage = null;
      this.$emit('close');
    },

    clearTimeouts() {
      if (this.closeTimeout) {
        clearTimeout(this.closeTimeout);
        this.closeTimeout = null;
      }
    }
  },
  beforeDestroy() {
    this.clearTimeouts();
  },
  watch: {
    show(newVal) {
      if (!newVal) {
        this.clearTimeouts();
      }
    }
  }
}); 