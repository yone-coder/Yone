Vue.component('app-header', {
  template: `
    <header class="bg-[#0D1B2A] p-4 shadow-lg">
      <div class="flex justify-between items-center" v-if="!user">
        <h1 class="text-2xl font-bold">My Website</h1>
        <div>
          <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" @click="showSignInForm = !showSignInForm">Sign In</button>
          <button class="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded" @click="showSignUpForm = !showSignUpForm">Sign Up</button>
        </div>
      </div>
      <div class="flex justify-between items-center" v-else>
        <h1 class="text-2xl font-bold">My Website</h1>
        <div>
          <span class="mr-4">{{ user.email }}</span>
          <button class="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded" @click="signOut">Sign Out</button>
        </div>
      </div>
    </header>
  `,
  data() {
    return {
      user: null,
      showSignInForm: false,
      showSignUpForm: false
    };
  },
  methods: {
    signOut() {
      auth.signOut().then(() => {
        this.user = null;
      });
    }
  },
  created() {
    auth.onAuthStateChanged(user => {
      this.user = user;
    });
  }
});