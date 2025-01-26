const Home = {
  template: `
  <div style="padding-top: 60px" class="max-w-7xl mx-auto px-0">
  <!-- Welcome Section with User Info -->
  <div class="flex justify-between items-center mb-6">
    <h2 class="text-xl font-bold">Welcome back, yone-coder! 🎮</h2>
    <div class="text-sm text-gray-600">
      UTC: 2025-01-13 04:44:53
    </div>
  </div>

  <!-- Featured Morpion Game Section -->
  <div class="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-2xl p-6 mb-8 text-white">
    <div class="flex flex-col md:flex-row items-center justify-between gap-6">
      <div class="space-y-4 flex-1">
        <div class="flex items-center gap-2">
          <span class="animate-pulse inline-block w-3 h-3 bg-green-400 rounded-full"></span>
          <span class="bg-green-400/20 text-green-400 px-3 py-1 rounded-full text-sm">Live Now</span>
        </div>
        <h3 class="text-3xl font-bold">Morpion Masters Tournament</h3>
        <p class="text-lg text-gray-200">Join 1,238 players competing right now!</p>
        <div class="flex gap-4">
          <button class="cta-button bg-white text-purple-600 px-8 py-3 rounded-full font-bold hover:shadow-lg transform hover:scale-105 transition-all">
            Play Now
          </button>
          <button class="border border-white/30 px-6 py-3 rounded-full hover:bg-white/10 transition-all">
            Learn More
          </button>
        </div>
      </div>
      <div class="w-full md:w-1/3 aspect-square bg-white/10 rounded-2xl overflow-hidden relative">
        <!-- Game Preview Animation Here -->
        <div class="absolute inset-0 grid grid-cols-3 grid-rows-3 gap-2 p-4">
          <div class="bg-white/20 rounded-lg"></div>
          <div class="bg-white/20 rounded-lg"></div>
          <div class="bg-white/20 rounded-lg"></div>
          <div class="bg-white/20 rounded-lg"></div>
          <div class="bg-white/20 rounded-lg"></div>
          <div class="bg-white/20 rounded-lg"></div>
          <div class="bg-white/20 rounded-lg"></div>
          <div class="bg-white/20 rounded-lg"></div>
          <div class="bg-white/20 rounded-lg"></div>
        </div>
      </div>
    </div>
  </div>

  <!-- Main Slider Section -->
  <div class="slides overflow-hidden relative w-full h-64 rounded-2xl">
    <div class="slide w-full h-full absolute">
      <img alt="Active Tournaments" 
           class="w-full h-full object-cover" 
           height="400" 
           src="https://placehold.co/600x400?text=Active+Tournaments" 
           width="600"/>
      <div class="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 p-4">
        <h3 class="text-white font-bold">Live Tournaments</h3>
      </div>
    </div>
    <div class="slide w-full h-full absolute">
      <img alt="Upcoming Events" 
           class="w-full h-full object-cover" 
           height="400" 
           src="https://placehold.co/600x400?text=Upcoming+Events" 
           width="600"/>
      <div class="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 p-4">
        <h3 class="text-white font-bold">Upcoming Events</h3>
      </div>
    </div>
    <div class="slide w-full h-full absolute">
      <img alt="Tournament Winners" 
           class="w-full h-full object-cover" 
           height="400" 
           src="https://placehold.co/600x400?text=Winners+Circle" 
           width="600"/>
      <div class="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 p-4">
        <h3 class="text-white font-bold">Winners Circle</h3>
      </div>
    </div>
  </div>

  <!-- Quick Stats Section -->
  <div class="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
    <div class="bg-gray-800 rounded-xl p-4 text-center">
      <div class="text-2xl font-bold text-white">1,238</div>
      <div class="text-gray-400 text-sm">Active Players</div>
    </div>
    <div class="bg-gray-800 rounded-xl p-4 text-center">
      <div class="text-2xl font-bold text-white">$5,000</div>
      <div class="text-gray-400 text-sm">Prize Pool</div>
    </div>
    <div class="bg-gray-800 rounded-xl p-4 text-center">
      <div class="text-2xl font-bold text-white">24</div>
      <div class="text-gray-400 text-sm">Hours Left</div>
    </div>
    <div class="bg-gray-800 rounded-xl p-4 text-center">
      <div class="text-2xl font-bold text-white">32</div>
      <div class="text-gray-400 text-sm">Your Rank</div>
    </div>
  </div>

  <p class="mt-6 text-gray-600">
    Explore more tournaments and compete with players worldwide. Check our live page for real-time matches!
  </p>
</div>


  `
};