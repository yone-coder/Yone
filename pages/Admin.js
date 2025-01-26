// pages/Admin.js
const Admin = {
  template: `
    <div class="container mx-auto p-4">
      <h2 class="text-2xl font-bold mb-4">Admin Panel</h2>
      <div class="bg-gray-800 p-4 rounded-lg">
        <h3 class="text-xl font-semibold mb-2">Manage Users</h3>
        <button @click="fetchUsers" class="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mb-4">
          Load Users
        </button>
        <div v-if="loading" class="text-gray-400">Loading users...</div>
        <div v-if="error" class="text-red-500">{{ error }}</div>
        <ul class="space-y-2">
          <li v-for="user in users" :key="user.uid" class="flex justify-between items-center bg-gray-700 p-2 rounded">
            <span>{{ user.displayName || user.email }}</span>
            <button @click="deleteUser (user.uid)" class="bg-red-600 hover:bg-red-700 text-white font-bold py-1 px-2 rounded">
              Delete
            </button>
          </li>
        </ul>
      </div>
    </div>
  `,
  data() {
    return {
      users: [],
      loading: false,
      error: null,
    };
  },
  methods: {
    async fetchUsers() {
      this.loading = true;
      this.error = null;

      try {
        const users = await this.getUsers();
        this.users = users;
      } catch (err) {
        this.error = 'Failed to load users';
        console.error(err);
      } finally {
        this.loading = false;
      }
    },
    async getUsers() {
      const userRecords = await firebase.auth().listUsers();
      return userRecords.users;
    },
    async deleteUser (uid) {
      if (confirm('Are you sure you want to delete this user?')) {
        try {
          await firebase.auth().deleteUser (uid);
          this.users = this.users.filter(user => user.uid !== uid);
        } catch (error) {
          console.error('Error deleting user:', error);
          alert('Failed to delete user');
        }
      }
    },
  },
};