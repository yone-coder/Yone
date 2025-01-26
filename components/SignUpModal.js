Vue.component('sign-up-modal', {
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

          <h2 class="text-2xl font-bold text-white mb-6">Create Account</h2>

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

          <form @submit.prevent="handleSignUp">
            <div class="space-y-4">
              <!-- Name field -->
              <div>
                <label class="block text-gray-300 text-sm font-medium mb-2">
                  Full Name
                </label>
                <input 
                  type="text" 
                  v-model.trim="name"
                  :disabled="loading"
                  class="w-full px-3 py-2 bg-gray-800 border border-gray-600 rounded-lg text-white 
                         focus:outline-none focus:border-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
                  required
                >
              </div>

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
                <!-- Password strength indicator -->
                <div class="mt-2">
                  <div class="flex space-x-1">
                    <div 
                      v-for="(level, index) in 4" 
                      :key="index"
                      class="h-1 w-1/4 rounded-full transition-colors duration-200"
                      :class="[
                        index < passwordStrength ? 
                          passwordStrength === 1 ? 'bg-red-500' :
                          passwordStrength === 2 ? 'bg-yellow-500' :
                          passwordStrength === 3 ? 'bg-green-500' :
                          'bg-blue-500' : 'bg-gray-600'
                      ]"
                    ></div>
                  </div>
                  <p class="text-xs mt-1" :class="[
                    passwordStrength === 0 ? 'text-gray-400' :
                    passwordStrength === 1 ? 'text-red-500' :
                    passwordStrength === 2 ? 'text-yellow-500' :
                    passwordStrength === 3 ? 'text-green-500' :
                    'text-blue-500'
                  ]">
                    {{ passwordStrengthText }}
                  </p>
                </div>
              </div>

              <!-- Confirm Password field -->
              <div>
                <label class="block text-gray-300 text-sm font-medium mb-2">
                  Confirm Password
                </label>
                <div class="relative">
                  <input 
                    :type="showConfirmPassword ? 'text' : 'password'"
                    v-model="confirmPassword"
                    :disabled="loading"
                    class="w-full px-3 py-2 bg-gray-800 border border-gray-600 rounded-lg text-white 
                           focus:outline-none focus:border-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
                    required
                  >
                  <button 
                    type="button"
                    @click="showConfirmPassword = !showConfirmPassword"
                    :disabled="loading"
                    class="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white"
                  >
                    <i :class="showConfirmPassword ? 'fas fa-eye-slash' : 'fas fa-eye'"></i>
                  </button>
                </div>
                <!-- Password match indicator -->
                <p v-if="confirmPassword" class="text-xs mt-1" :class="passwordsMatch ? 'text-green-500' : 'text-red-500'">
                  <i :class="passwordsMatch ? 'fas fa-check' : 'fas fa-times'" class="mr-1"></i>
                  {{ passwordsMatch ? 'Passwords match' : 'Passwords do not match' }}
                </p>
              </div>

              <!-- Terms acceptance -->
              <div class="flex items-start">
                <div class="flex items-center h-5">
                  <input
                    type="checkbox"
                    v-model="acceptTerms"
                    :disabled="loading"
                    class="form-checkbox h-4 w-4 text-blue-600 transition duration-150 ease-in-out"
                    required
                  >
                </div>
                <div class="ml-2 text-sm">
                  <label class="text-gray-300">
                    I accept the 
                    <a href="#" class="text-blue-500 hover:text-blue-400">Terms of Service</a>
                    and
                    <a href="#" class="text-blue-500 hover:text-blue-400">Privacy Policy</a>
                  </label>
                </div>
              </div>

              <!-- Sign up button -->
              <div class="pt-4">
                <button 
                  type="submit"
                  :disabled="loading || !isValidForm"
                  class="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg
                         transition duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
                >
                  <i v-if="loading" class="fas fa-spinner fa-spin mr-2"></i>
                  {{ loading ? 'Creating Account...' : 'Create Account' }}
                </button>
              </div>

              <!-- Sign in link -->
              <div class="text-center mt-4">
                <span class="text-gray-400">Already have an account?</span>
                <button 
                  type="button"
                  @click="switchToSignIn"
                  :disabled="loading"
                  class="ml-1 text-blue-500 hover:text-blue-400 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Sign in
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
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
      acceptTerms: false,
      showPassword: false,
      showConfirmPassword: false,
      loading: false,
      error: null,
      successMessage: null,
      closeTimeout: null,
      redirectTimeout: null
    };
  },

  computed: {
    isValidForm() {
      return (
        this.name.length > 0 &&
        this.validateEmail(this.email) &&
        this.password.length >= 8 &&
        this.passwordsMatch &&
        this.acceptTerms
      );
    },

    passwordsMatch() {
      return this.password === this.confirmPassword && this.confirmPassword.length > 0;
    },

    passwordStrength() {
      const password = this.password;
      if (!password) return 0;
      
      let strength = 0;
      
      // Length check
      if (password.length >= 8) strength++;
      
      // Contains number
      if (/\d/.test(password)) strength++;
      
      // Contains lowercase and uppercase
      if (/[a-z]/.test(password) && /[A-Z]/.test(password)) strength++;
      
      // Contains special character
      if (/[!@#$%^&*(),.?":{}|<>]/.test(password)) strength++;
      
      return strength;
    },

    passwordStrengthText() {
      switch (this.passwordStrength) {
        case 0: return 'Enter password';
        case 1: return 'Weak';
        case 2: return 'Fair';
        case 3: return 'Good';
        case 4: return 'Strong';
        default: return '';
      }
    }
  },

  methods: {
    // In SignUpModal.js
async handleSignUp() {
  if (!this.isValidForm) return;

  this.loading = true;
  this.error = null;
  this.successMessage = null;

  try {
    // Step 1: Register the user
    const signUpResponse = await fetch('/components/SignUpModal.php', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: this.name,
        email: this.email,
        password: this.password,
      }),
    });

    const signUpResult = await signUpResponse.json();

    if (!signUpResponse.ok) {
      throw new Error(signUpResult.message || 'Failed to create account');
    }

    // Show initial success message
    this.successMessage = "Account created successfully!";
    await new Promise(resolve => setTimeout(resolve, 1000));

    // Step 2: Automatic sign in
    this.successMessage = "Signing you in...";
    const signInResponse = await fetch('/components/SignInModal.php', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        action: 'login',
        email: this.email,
        password: this.password,
      }),
    });

    const signInResult = await signInResponse.json();

    if (!signInResponse.ok) {
      throw new Error('Account created but failed to sign in automatically. Please sign in manually.');
    }

    // Step 3: Update application state
    const userData = signInResult.data.user;
    
    // Important: Update both localStorage and root instance
    localStorage.setItem('user', JSON.stringify(userData));
    this.$root.currentUser = userData;  // This is the key change
    
    // Force a re-render of the header
    this.$nextTick(() => {
      this.$root.$emit('user-authenticated', userData);
    });

    // Step 4: Show final success message and redirect
    this.successMessage = "Successfully signed in! Redirecting...";
    
    // Set a timeout for redirection
    this.redirectTimeout = setTimeout(() => {
      this.closeModal();
      if (this.$router) {
        this.$router.push('/');
      }
    }, 1500);

  } catch (error) {
    this.error = error.message;
    console.error('Sign up error:', error);
  } finally {
    this.loading = false;
  }
},

    validateEmail(email) {
      const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return re.test(email);
    },

    switchToSignIn() {
      this.clearTimeouts();
      this.$emit('close');
      this.$emit('show-signin');
    },

    closeModal() {
      if (this.loading) return;
      this.clearTimeouts();
      this.resetForm();
      this.$emit('close');
    },

    resetForm() {
      this.name = '';
      this.email = '';
      this.password = '';
      this.confirmPassword = '';
      this.acceptTerms = false;
      this.error = null;
      this.successMessage = null;
      this.showPassword = false;
      this.showConfirmPassword = false;
    },

    clearTimeouts() {
      if (this.closeTimeout) {
        clearTimeout(this.closeTimeout);
        this.closeTimeout = null;
      }
      if (this.redirectTimeout) {
        clearTimeout(this.redirectTimeout);
        this.redirectTimeout = null;
      }
    },

    handleImageError(e) {
      e.target.style.display = 'none';
      const svg = e.target.nextElementSibling;
      if (svg && svg.tagName === 'svg') {
        svg.style.display = 'block';
      }
    }
  },

  watch: {
    show(newVal) {
      if (!newVal) {
        this.clearTimeouts();
      } else {
        this.resetForm();
      }
    }
  },

  beforeDestroy() {
    this.clearTimeouts();
  }
});