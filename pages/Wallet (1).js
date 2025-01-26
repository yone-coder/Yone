const Wallet = {
  template: `
<div class="rounded-2xl p-2 max-w-4xl mx-auto">
    <!-- Header Section with Quick Stats -->
    <div class="flex justify-between items-start mb-8">
        <div class="space-y-1">
            <h2 class="text-2xl font-bold text-white flex items-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                </svg>
                Smart Wallet
            </h2>
            <p class="text-gray-300">Welcome back, User!</p>
        </div>
        <div class="flex gap-3">
            <button class="text-gray-300 hover:text-white p-2 rounded-lg hover:bg-white/5 transition-all">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                </svg>
            </button>
            <button class="text-gray-300 hover:text-white p-2 rounded-lg hover:bg-white/5 transition-all">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
            </button>
        </div>
    </div>

    <!-- Main Balance Card -->
    <div class="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        <div class="lg:col-span-2">
            <div class="bg-gradient-to-r from-blue-500 to-indigo-600 rounded-2xl p-6 h-full relative overflow-hidden">
                <div class="absolute top-0 right-0 w-40 h-40 bg-white/10 rounded-full -translate-y-20 translate-x-20"></div>
                <div class="relative">
                    <p class="text-blue-100 text-sm mb-1">Total Balance</p>
                    <h3 class="text-4xl font-bold text-white mb-4">$1,000.00</h3>
                    <div class="flex gap-4">
                        <div>
                            <p class="text-blue-100 text-xs">Monthly Income</p>
                            <p class="text-white font-semibold">+$2,500.00</p>
                        </div>
                        <div>
                            <p class="text-blue-100 text-xs">Monthly Spending</p>
                            <p class="text-white font-semibold">-$1,500.00</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        
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
        
    </div>

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



    <!-- Cards & Analytics -->
    <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div class="bg-white/5 backdrop-blur-lg rounded-2xl p-6">
            <h4 class="font-semibold text-white mb-4">Spending Analytics</h4>
            <div class="space-y-4">
                <div class="bg-white/5 rounded-lg p-4">
                    <div class="flex justify-between mb-2">
                        <span class="text-sm text-gray-400">Shopping</span>
                        <span class="text-sm font-medium text-white">$420.80</span>
                    </div>
                    <div class="w-full bg-white/10 rounded-full h-2">
                        <div class="bg-blue-500 h-2 rounded-full" style="width: 45%"></div>
                    </div>
                </div>
                <div class="bg-white/5 rounded-lg p-4">
                    <div class="flex justify-between mb-2">
                        <span class="text-sm text-gray-400">Bills</span>
                        <span class="text-sm font-medium text-white">$320.50</span>
                    </div>
                    <div class="w-full bg-white/10 rounded-full h-2">
                        <div class="bg-blue-500 h-2 rounded-full" style="width: 30%"></div>
                    </div>
                </div>
            </div>
        </div>
        <div class="bg-white/5 backdrop-blur-lg rounded-2xl p-6">
            <h4 class="font-semibold text-white mb-4">Upcoming Bills</h4>
            <div class="space-y-4">
                <div class="bg-white/5 rounded-lg p-4 flex items-center justify-between">
                    <div class="flex items-center gap-3">
                        <div class="bg-purple-500/10 p-2 rounded-lg">
                            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-purple-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                            </svg>
                        </div>
                        <div>
                            <p class="font-medium text-white">Electricity Bill</p>
                            <p class="text-sm text-gray-400">Due in 3 days</p>
                        </div>
                    </div>
                    <p class="font-medium text-white">$85.00</p>
                </div>
            </div>
        </div>
         
        <div class="bg-white/5 backdrop-blur-lg rounded-2xl p-6">
            <h4 class="font-semibold text-white mb-4">Savings Goals</h4>
            <div class="space-y-4">
                <div class="bg-white/5 rounded-lg p-4">
                    <div class="flex items-center justify-between mb-3">
                        <div>
                            <p class="font-medium text-white">New Car</p>
                            <p class="text-sm text-gray-400">$15,000 goal</p>
                        </div>
                        <span class="text-sm font-medium text-blue-400">75%</span>
                    </div>
                    <div class="w-full bg-white/10 rounded-full h-3">
                        <div class="bg-blue-500 h-3 rounded-full" style="width: 75%"></div>
                    </div>
                    <div class="mt-2 text-sm text-gray-400">
                        $11,250 saved of $15,000
                    </div>
                </div>

                <div class="bg-white/5 rounded-lg p-4">
                    <div class="flex items-center justify-between mb-3">
                        <div>
                            <p class="font-medium text-white">Vacation</p>
                            <p class="text-sm text-gray-400">$5,000 goal</p>
                        </div>
                        <span class="text-sm font-medium text-blue-400">40%</span>
                    </div>
                    <div class="w-full bg-white/10 rounded-full h-3">
                        <div class="bg-blue-500 h-3 rounded-full" style="width: 40%"></div>
                    </div>
                    <div class="mt-2 text-sm text-gray-400">
                        $2,000 saved of $5,000
                    </div>
                </div>
            </div>
        </div>
    </div>

    <!-- Bottom Actions Section -->
    <div class="mt-8 border-t border-white/10 pt-6">
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div class="p-4 bg-white/5 rounded-xl hover:bg-white/10 transition-all cursor-pointer">
                <div class="flex items-center gap-3">
                    <div class="bg-blue-500/10 p-2 rounded-lg">
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                    </div>
                    <span class="font-medium text-white">Investments</span>
                </div>
            </div>

            <div class="p-4 bg-white/5 rounded-xl hover:bg-white/10 transition-all cursor-pointer">
                <div class="flex items-center gap-3">
                    <div class="bg-purple-500/10 p-2 rounded-lg">
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-purple-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                        </svg>
                    </div>
                    <span class="font-medium text-white">Calculator</span>
                </div>
            </div>

            <div class="p-4 bg-white/5 rounded-xl hover:bg-white/10 transition-all cursor-pointer">
                <div class="flex items-center gap-3">
                    <div class="bg-green-500/10 p-2 rounded-lg">
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
                        </svg>
                    </div>
                    <span class="font-medium text-white">Reports</span>
                </div>
            </div>

            <div class="p-4 bg-white/5 rounded-xl hover:bg-white/10 transition-all cursor-pointer">
                <div class="flex items-center gap-3">
                    <div class="bg-orange-500/10 p-2 rounded-lg">
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-orange-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
                        </svg>
                    </div>
                    <span class="font-medium text-white">Settings</span>
                </div>
            </div>
        </div>
    </div>

    <!-- Floating Action Button -->
    <button class="fixed bottom-8 right-8 bg-blue-500 hover:bg-blue-600 text-white p-4 rounded-full shadow-lg hover:shadow-xl transition-all group">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 group-hover:scale-110 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
        </svg>
    </button>
</div>

  `
};