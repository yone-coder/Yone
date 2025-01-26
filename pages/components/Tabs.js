// components/BalanceCard.js
const Tabs = {
  
  template: `
    <div class="max-w-2xl w-full"> <!-- Container to control max width -->
    <!-- Tab Navigation -->
    <div class="flex space-x-1 p-1 bg-white/5 backdrop-blur-lg rounded-lg mb-4">
        <button class="flex-1 text-white px-4 py-2 text-sm font-medium rounded-md bg-blue-500/20 focus:outline-none" onclick="switchTab('tokens')">
            Tokens
        </button>
        <button class="flex-1 text-gray-400 px-4 py-2 text-sm font-medium rounded-md hover:bg-white/5 focus:outline-none" onclick="switchTab('transactions')">
            Transactions
        </button>
        <button class="flex-1 text-gray-400 px-4 py-2 text-sm font-medium rounded-md hover:bg-white/5 focus:outline-none" onclick="switchTab('wins')">
            Wins
        </button>
    </div>

    <!-- Search Bar -->
    <div class="relative mb-4">
        <input type="text" placeholder="Search tokens..." class="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 pl-10 text-white placeholder-gray-400 focus:outline-none focus:border-blue-500/50">
        <svg class="absolute left-3 top-2.5 h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
    </div>

    <!-- Tokens Tab -->
    <div id="tokens" class="space-y-3">
        <!-- MIMS Token -->
        <div class="bg-white/5 backdrop-blur-lg rounded-xl p-4 border border-white/10 hover:border-blue-500/50 transition-all">
            <div class="flex items-center justify-between">
                <div class="flex items-center gap-3">
                    <div class="w-10 h-10 rounded-full flex items-center justify-center bg-blue-500/10">
                        <span class="text-xl">🔷</span>
                    </div>
                    <div>
                        <div class="flex items-center gap-2">
                            <p class="font-medium text-white">MIMS</p>
                            <span class="px-2 py-0.5 text-xs bg-green-500/20 text-green-500 rounded-full">+12.34%</span>
                        </div>
                        <p class="text-sm text-gray-400">≈ $1,234,567.89</p>
                    </div>
                </div>
                <p class="font-medium text-white">245,678.90</p>
            </div>
        </div>

        <!-- USDT Token -->
        <div class="bg-white/5 backdrop-blur-lg rounded-xl p-4 border border-white/10 hover:border-blue-500/50 transition-all">
            <div class="flex items-center justify-between">
                <div class="flex items-center gap-3">
                    <div class="w-10 h-10 rounded-full flex items-center justify-center bg-green-500/10">
                        <span class="text-xl">💠</span>
                    </div>
                    <div>
                        <div class="flex items-center gap-2">
                            <p class="font-medium text-white">USDT</p>
                            <span class="px-2 py-0.5 text-xs bg-red-500/20 text-red-500 rounded-full">-2.14%</span>
                        </div>
                        <p class="text-sm text-gray-400">≈ $50,000.00</p>
                    </div>
                </div>
                <p class="font-medium text-white">50,000.00</p>
            </div>
        </div>

        <!-- Other tokens following same pattern -->
        <!-- USD -->
        <div class="bg-white/5 backdrop-blur-lg rounded-xl p-4 border border-white/10 hover:border-blue-500/50 transition-all">
            <div class="flex items-center justify-between">
                <div class="flex items-center gap-3">
                    <div class="w-10 h-10 rounded-full flex items-center justify-center bg-green-500/10">
                        <span class="text-xl">$</span>
                    </div>
                    <div>
                        <div class="flex items-center gap-2">
                            <p class="font-medium text-white">USD</p>
                            <span class="px-2 py-0.5 text-xs bg-green-500/20 text-green-500 rounded-full">+0.01%</span>
                        </div>
                        <p class="text-sm text-gray-400">US Dollar</p>
                    </div>
                </div>
                <p class="font-medium text-white">25,432.50</p>
            </div>
        </div>

        <!-- HTG -->
        <div class="bg-white/5 backdrop-blur-lg rounded-xl p-4 border border-white/10 hover:border-blue-500/50 transition-all">
            <div class="flex items-center justify-between">
                <div class="flex items-center gap-3">
                    <div class="w-10 h-10 rounded-full flex items-center justify-center bg-red-500/10">
                        <span class="text-xl">🇭🇹</span>
                    </div>
                    <div>
                        <div class="flex items-center gap-2">
                            <p class="font-medium text-white">HTG</p>
                            <span class="px-2 py-0.5 text-xs bg-red-500/20 text-red-500 rounded-full">-1.24%</span>
                        </div>
                        <p class="text-sm text-gray-400">Haitian Gourde</p>
                    </div>
                </div>
                <p class="font-medium text-white">1,234,567.89</p>
            </div>
        </div>

        <!-- MXN -->
        <div class="bg-white/5 backdrop-blur-lg rounded-xl p-4 border border-white/10 hover:border-blue-500/50 transition-all">
            <div class="flex items-center justify-between">
                <div class="flex items-center gap-3">
                    <div class="w-10 h-10 rounded-full flex items-center justify-center bg-yellow-500/10">
                        <span class="text-xl">🇲🇽</span>
                    </div>
                    <div>
                        <div class="flex items-center gap-2">
                            <p class="font-medium text-white">MXN</p>
                            <span class="px-2 py-0.5 text-xs bg-green-500/20 text-green-500 rounded-full">+0.87%</span>
                        </div>
                        <p class="text-sm text-gray-400">Mexican Peso</p>
                    </div>
                </div>
                <p class="font-medium text-white">987,654.32</p>
            </div>
        </div>

        <!-- EUR -->
        <div class="bg-white/5 backdrop-blur-lg rounded-xl p-4 border border-white/10 hover:border-blue-500/50 transition-all">
            <div class="flex items-center justify-between">
                <div class="flex items-center gap-3">
                    <div class="w-10 h-10 rounded-full flex items-center justify-center bg-blue-500/10">
                        <span class="text-xl">€</span>
                    </div>
                    <div>
                        <div class="flex items-center gap-2">
                            <p class="font-medium text-white">EUR</p>
                            <span class="px-2 py-0.5 text-xs bg-green-500/20 text-green-500 rounded-full">+1.45%</span>
                        </div>
                        <p class="text-sm text-gray-400">Euro</p>
                    </div>
                </div>
                <p class="font-medium text-white">75,321.00</p>
            </div>
        </div>
    </div>

    <!-- Transactions Tab -->
    <div id="transactions" class="hidden space-y-3">
        <div class="bg-white/5 backdrop-blur-lg rounded-xl p-4 border border-white/10 hover:border-blue-500/50 transition-all">
            <div class="flex items-center justify-between">
                <div class="flex items-center gap-3">
                    <div class="bg-green-500/10 p-3 rounded-lg">
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 11l5-5m0 0l5 5m-5-5v12" />
                        </svg>
                    </div>
                    <div>
                        <p class="font-medium text-white">Received Payment</p>
                        <p class="text-sm text-gray-400">From John Doe</p>
                    </div>
                </div>
                <div class="text-right">
                    <p class="font-medium text-green-500">+$250.00</p>
                    <p class="text-sm text-gray-400">Today, 2:30 PM</p>
                </div>
            </div>
        </div>
    </div>

    <!-- Wins Tab -->
    <div id="wins" class="hidden space-y-3">
        <div class="bg-white/5 backdrop-blur-lg rounded-xl p-4 border border-white/10 hover:border-blue-500/50 transition-all">
            <div class="flex items-center justify-between">
                <div class="flex items-center gap-3">
                    <div class="bg-yellow-500/10 p-3 rounded-lg">
                        <span class="text-2xl">🏆</span>
                    </div>
                    <div>
                        <p class="font-medium text-white">Achievement Unlocked</p>
                        <p class="text-sm text-gray-400">First 1000 MIMS</p>
                    </div>
                </div>
                <p class="text-sm text-gray-400">2 days ago</p>
            </div>
        </div>
    </div>
</div>
  `
};

// Register the component globally
Vue.component('tabs', Tabs);