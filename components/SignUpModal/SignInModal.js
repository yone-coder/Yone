// components/SignInModal.js

Vue.component('sign-in-modal', {
  template: `
    <transition name="modal">
      <div v-if="show" class="fixed inset-0 z-50 overflow-y-auto">
        <div class="flex items-center justify-center min-h-screen px-4 pt-4 pb-20">
          <!-- Background overlay with blur -->
          <transition name="fade">
            <div 
              class="fixed inset-0 bg-black/50 backdrop-blur-sm transition-all duration-300" 
              @click="closeModal"
            ></div>
          </transition>

          <!-- Modal panel -->
          <transition name="slide-fade">
            <div class="relative bg-[#1B2B3A] rounded-lg w-full max-w-md p-6 shadow-xl">
              <!-- Close button -->
              <div class="absolute top-4 right-4">
                <button 
                  @click="closeModal" 
                  class="text-gray-400 hover:text-white transition-all duration-200 hover:rotate-90 transform"
                  :disabled="loading"
                >
                  <i class="fas fa-times"></i>
                </button>
              </div>

              <!-- Sign In Form -->
              <div v-if="!forgotPasswordMode">
                <h2 class="text-2xl font-bold text-white mb-6">Sign In</h2>

                <!-- Messages -->
                <transition name="slide-right">
                  <div 
                    v-if="successMessage" 
                    class="mb-6 p-3 bg-green-500/20 border border-green-500 rounded-lg text-green-500 text-sm"
                  >
                    <div class="flex items-center">
                      <i class="fas fa-check-circle mr-2"></i>
                      {{ successMessage }}
                    </div>
                  </div>
                </transition>

                <transition name="shake">
                  <div 
                    v-if="error" 
                    class="mb-6 p-3 bg-red-500/20 border border-red-500 rounded-lg text-red-500 text-sm"
                  >
                    <div class="flex items-center">
                      <i class="fas fa-exclamation-circle mr-2"></i>
                      {{ error }}
                    </div>
                  </div>
                </transition>

                <form @submit.prevent="handleSignIn" class="space-y-4">
                  <!-- Email field -->
                  <div>
                    <label class="block text-gray-300 text-sm font-medium mb-2">Email</label>
                    <input 
                      type="email" 
                      v-model.trim="email"
                      :disabled="loading"
                      class="w-full px-3 py-2 bg-gray-800 border border-gray-600 rounded-lg text-white 
                             focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent
                             disabled:opacity-50 disabled:cursor-not-allowed"
                      required
                    >
                  </div>

                  <!-- Password field -->
                  <div>
                    <label class="block text-gray-300 text-sm font-medium mb-2">Password</label>
                    <div class="relative">
                      <input 
                        :type="showPassword ? 'text' : 'password'"
                        v-model="password"
                        :disabled="loading"
                        class="w-full px-3 py-2 bg-gray-800 border border-gray-600 rounded-lg text-white 
                               focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent
                               disabled:opacity-50 disabled:cursor-not-allowed"
                        required
                      >
                      <button 
                        type="button"
                        @click="showPassword = !showPassword"
                        :disabled="loading"
                        class="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white"
                      >
                        <i :class="[showPassword ? 'fas fa-eye-slash' : 'fas fa-eye']"></i>
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
                      @click="toggleForgotPassword"
                      :disabled="loading"
                      class="text-sm text-blue-500 hover:text-blue-400"
                    >
                      Forgot password?
                    </button>
                  </div>

                  <!-- Sign in button -->
                  <button 
                    type="submit"
                    :disabled="loading || !isValidForm"
                    class="w-full bg-blue-600 text-white font-medium py-2 px-4 rounded-lg
                           transition-all duration-200 hover:bg-blue-700 
                           disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <div class="flex items-center justify-center">
                      <i v-if="loading" class="fas fa-spinner fa-spin mr-2"></i>
                      {{ loading ? 'Signing in...' : 'Sign In' }}
                    </div>
                  </button>

                  <!-- Sign up link -->
                  <div class="text-center mt-4">
                    <span class="text-gray-400">Don't have an account?</span>
                    <button 
                      type="button"
                      @click="switchToSignUp"
                      :disabled="loading"
                      class="ml-1 text-blue-500 hover:text-blue-400"
                    >
                      Sign up
                    </button>
                  </div>
                </form>
              </div>

              <!-- Forgot Password Form -->
              <div v-else>
                <h2 class="text-2xl font-bold text-white mb-6">Reset Password</h2>

                <!-- Messages -->
                <transition name="slide-right">
                  <div 
                    v-if="successMessage" 
                    class="mb-6 p-3 bg-green-500/20 border border-green-500 rounded-lg text-green-500 text-sm"
                  >
                    <div class="flex items-center">
                      <i class="fas fa-check-circle mr-2"></i>
                      {{ successMessage }}
                    </div>
                  </div>
                </transition>

                <transition name="shake">
                  <div 
                    v-if="error" 
                    class="mb-6 p-3 bg-red-500/20 border border-red-500 rounded-lg text-red-500 text-sm"
                  >
                    <div class="flex items-center">
                      <i class="fas fa-exclamation-circle mr-2"></i>
                      {{ error }}
                    </div>
                  </div>
                </transition>

                <form @submit.prevent="handleForgotPassword" class="space-y-4">
                  <div>
                    <label class="block text-gray-300 text-sm font-medium mb-2">Email</label>
                    <input 
                      type="email" 
                      v-model.trim="email"
                      :disabled="loading"
                      class="w-full px-3 py-2 bg-gray-800 border border-gray-600 rounded-lg text-white 
                             focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent
                             disabled:opacity-50 disabled:cursor-not-allowed"
                      required
                    >
                  </div>

                  <button 
                    type="submit"
                    :disabled="loading || !email"
                    class="w-full bg-blue-600 text-white font-medium py-2 px-4 rounded-lg
                           transition-all duration-200 hover:bg-blue-700 
                           disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <div class="flex items-center justify-center">
                      <i v-if="loading" class="fas fa-spinner fa-spin mr-2"></i>
                      {{ loading ? 'Sending...' : 'Send Reset Link' }}
                    </div>
                  </button>

                  <!-- Back to sign in -->
                  <div class="text-center mt-4">
                    <button 
                      type="button"
                      @click="toggleForgotPassword"
                      :disabled="loading"
                      class="text-blue-500 hover:text-blue-400"
                    >
                      Back to Sign In
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </transition>
        </div>
      </div>
    </transition>
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
      error: null,
      successMessage: null,
      forgotPasswordMode: false,
      closeTimeout: null
    };
  },
  computed: {
    isValidForm() {
      return this.email.length > 0 && (!this.forgotPasswordMode ? this.password.length > 0 : true);
    }
  },
  methods: {
    async handleSignIn() {
  if (!this.isValidForm) return;

  this.loading = true;
  this.error = null;
  this.successMessage = null;

  try {
    const response = await fetch('/components/SignInModal/SignInModal.php', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        action: 'login',
        email: this.email,
        password: this.password
      })
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();

    if (data.success) {
      this.successMessage = 'Successfully signed in! Redirecting...';

      if (this.rememberMe && data.data.user) {
        localStorage.setItem('user', JSON.stringify(data.data.user));
      }

      this.$root.currentUser = data.data.user;

      this.closeTimeout = setTimeout(() => {
        this.closeModal();
        this.$router.push('/');
      }, 1500);
    } else {
      throw new Error(data.message || 'Failed to sign in');
    }
  } catch (error) {
    console.error('Sign in error:', error);
    this.error = error.message || 'Failed to sign in. Please try again.';
  } finally {
    this.loading = false;
  }
},
    async handleForgotPassword() {
      if (!this.email) {
        this.error = 'Please enter your email address';
        return;
      }

      this.loading = true;
      this.error = null;
      this.successMessage = null;

      try {
        const formData = new FormData();
        formData.append('action', 'forgot_password');
        formData.append('email', this.email);

        const response = await fetch('/components/SignInModal/SignInModal.php', {
          method: 'POST',
          body: formData
        });

        const data = await response.json();
        
        if (data.success) {
          this.successMessage = data.message;
          
          this.closeTimeout = setTimeout(() => {
            this.toggleForgotPassword();
          }, 3000);
        } else {
          throw new Error(data.message || 'Failed to send reset email');
        }
      } catch (error) {
        console.error('Password reset error:', error);
        this.error = error.message || 'Failed to send reset email. Please try again.';
      } finally {
        this.loading = false;
      }
    },

    toggleForgotPassword() {
      this.forgotPasswordMode = !this.forgotPasswordMode;
      this.error = null;
      this.successMessage = null;
    },

    switchToSignUp() {
      this.clearTimeouts();
      this.$emit('close');
      this.$emit('show-signup');
    },

    closeModal() {
      if (this.loading) return;
      
      this.clearTimeouts();
      this.email = '';
      this.password = '';
      this.error = null;
      this.successMessage = null;
      this.forgotPasswordMode = false;
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