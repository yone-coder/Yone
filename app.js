
Vue.directive('click-outside', {
    bind: function (el, binding, vnode) {
        el.clickOutsideEvent = function (event) {
            if (!(el == event.target || el.contains(event.target))) {
                vnode.context[binding.expression](event);
            }
        };
        document.addEventListener('click', el.clickOutsideEvent);
    },
    unbind: function (el) {
        document.removeEventListener('click', el.clickOutsideEvent);
    },
});

// Your existing routes remain unchanged
const routes = [
    { path: '/', component: Home, meta: { showNavBar: true } },
    { path: '/explore', component: Explore, meta: { showNavBar: true } },
    { path: '/live', component: Live, meta: { showNavBar: false } },
    { path: '/wallet', component: Wallet, meta: { showNavBar: true } },
    { path: '/profile', component: Profile, meta: { showNavBar: false } },
    { path: '/morpion', component: Morpion, meta: { showNavBar: false } },
    { path: '/national-champ', component: NationalChamp, meta: { showNavBar: false } }
];

const router = new VueRouter({
    routes
});

new Vue({
    el: '#app',
    router,
    data: {
        currentUser: null,
        isLoading: true,
        showSignUpModal: false,  // Make sure this line exists
        showNavBar: true,
        showSignInModal: false   // Add this for the sign-in modal toggle
    },
    computed: {
        showHeader() {
            return this.$route.path === '/' || (!this.isLoading && !this.currentUser);
        }
    },
    watch: {
        '$route'(to, from) {
            this.showNavBar = to.meta.showNavBar === true;
        }
    },
    created() {
        this.showNavBar = this.$route.meta.showNavBar === true;
        this.isLoading = true;
        
        this.checkSession().finally(() => {
            this.isLoading = false;
        });
    },
    methods: {
        // Add the new handleSignUpSuccess method
        handleSignUpSuccess(user) {
            this.currentUser = user;
            this.showSignUpModal = false;
            // Optional: Add success toast/notification
            if (this.$router) {
                this.$router.push('/');
            }
        },
        // Your existing methods remain unchanged
        async checkSession() {
            try {
                const response = await fetch('Auth.php', {
                    credentials: 'include'
                });
                const data = await response.json();
                
                if (data.authenticated && data.user) {
                    this.currentUser = data.user;
                } else {
                    this.currentUser = null;
                }
            } catch (error) {
                console.error('Session check failed:', error);
                this.currentUser = null;
            }
        },
        async signOut() {
            try {
                this.isLoading = true;
                await fetch('/config/logout.php', {
                    credentials: 'include'
                });
                this.currentUser = null;
                this.$router.push('/');
            } catch (error) {
                console.error('Sign out error:', error);
            } finally {
                this.isLoading = false;
            }
        }
    }
});