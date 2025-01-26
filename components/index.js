// components/index.js - Base components registration

// Import all base components
import BalanceCard from './BalanceCard.js';
import NavBar from './NavBar.js';
import AppHeader from './Header.js';
import SignInModal from './SignInModal/SignInModal.js';
import SignUpModal from './SignUpModal.js';
import QuickActions from './quick-actions.js';
import JoinTournamentButton from './JoinTournamentButton.js';

// Register all base components globally
const components = {
    // Layout components
    'app-header': AppHeader,
    'nav-bar': NavBar,
    
    // Feature components
    'balance-card': BalanceCard,
    'quick-actions': QuickActions,
    
    // Modal components
    'sign-in-modal': SignInModal,
    'sign-up-modal': SignUpModal,
    
    // Tournament components
    'join-tournament-button': JoinTournamentButton
};

// Register components with Vue
Object.entries(components).forEach(([name, component]) => {
    Vue.component(name, component);
});

export default components;