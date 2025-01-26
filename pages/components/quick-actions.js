// components/BalanceCard.js
const QuickActions = {
  template: `
        <div class=" rounded-2xl">
    <h4 class="font-semibold text-white mb-4">Quick Actions</h4>
    <div class="flex space-x-6 overflow-x-auto pb-4">
        <div class="flex flex-col items-center">
            <button class="flex items-center justify-center p-3 rounded-full w-14 h-14 bg-white/5 hover:bg-white/10 transition-all border border-white/10">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
            </button>
            <span class="text-sm text-gray-300 mt-2">Deposit</span>
        </div>
        
        <div class="flex flex-col items-center">
            <button class="flex items-center justify-center p-3 rounded-full w-14 h-14 bg-white/5 hover:bg-white/10 transition-all border border-white/10">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                </svg>
            </button>
            <span class="text-sm text-gray-300 mt-2">Withdraw</span>
        </div>
        
        <div class="flex flex-col items-center">
            <button class="flex items-center justify-center p-3 rounded-full w-14 h-14 bg-white/5 hover:bg-white/10 transition-all border border-white/10">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
                </svg>
            </button>
            <span class="text-sm text-gray-300 mt-2">Transfer</span>
        </div>
        
        <div class="flex flex-col items-center">
            <button class="flex items-center justify-center p-3 rounded-full w-14 h-14 bg-white/5 hover:bg-white/10 transition-all border border-white/10">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 8v8m-4-5v5M8 8v8m8 0h1a3 3 0 003-3V5a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3h1" />
                </svg>
            </button>
            <span class="text-sm text-gray-300 mt-2">Swap</span>
        </div>
        
        <div class="flex flex-col items-center">
            <button class="flex items-center justify-center p-3 rounded-full w-14 h-14 bg-white/5 hover:bg-white/10 transition-all border border-white/10">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
            </button>
            <span class="text-sm text-gray-300 mt-2">History</span>
        </div>

        <div class="flex flex-col items-center">
            <button class="flex items-center justify-center p-3 rounded-full w-14 h-14 bg-white/5 hover:bg-white/10 transition-all border border-white/10">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2" />
                </svg>
            </button>
            <span class="text-sm text-gray-300 mt-2">Bills</span>
        </div>
    </div>
</div>
  `
};

// Register the component globally
Vue.component('quick-actions', QuickActions);