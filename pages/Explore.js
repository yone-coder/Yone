const Explore = {
  data() {
    return {
      searchQuery: '',
      categories: ['Category 1', 'Category 2', 'Category 3'],
      horizontalGames: [
        {
          id: 1,
          title: 'Chess',
          image: 'https://storage.googleapis.com/a1aa/image/hIRZiMNaUk7vAZ3MDSffVozApPzhKNksCymmMTv1qaCPG3CUA.jpg',
          liveGames: 24,
          totalPlayers: 1500,
          rating: 4.7
        },
        {
          id: 2,
          title: 'Checkers',
          image: 'https://storage.googleapis.com/a1aa/image/fgfMHuCvEIpLa0lYep3Yfvfl9BDTen0k1Glene79zUXmBG3CUA.jpg',
          liveGames: 12,
          totalPlayers: 800,
          rating: 4.2
        },
        {
          id: 3,
          title: 'Connect Four',
          image: 'https://storage.googleapis.com/a1aa/image/Q0Je0nIPFIy8baklKDTiOYlsBYgiEt9fhjwrE1mL9nAGG3CUA.jpg',
          liveGames: 36,
          totalPlayers: 2200,
          rating: 4.5
        },
        {
          id: 4,
          title: 'Tic-Tac-Toe',
          path: '/morpion',
          image: 'https://storage.googleapis.com/a1aa/image/Gl9frOQlNVWqSSgahJ5y9eo49dfzMsmnpCQBR7o057rJMuFoA.jpg',
          liveGames: 18,
          totalPlayers: 1100,
          rating: 4.0
        },
        {
          id: 5,
          title: 'Battleship',
          image: 'https://storage.googleapis.com/a1aa/image/q3AmIvmEWWL4PBFRhivoRQVKf62u1RADuMm0s2dwAwhIjbBKA.jpg',
          liveGames: 8,
          totalPlayers: 600,
          rating: 4.3
        }
      ],
      sliderGames: [
        {
          id: 6,
          title: 'Rock Paper Scissors',
          image: 'https://storage.googleapis.com/a1aa/image/zzR2M72EKgLmNZGxJ3AlbPernzfeGRkweoQON6kfb3zFx4WgC.jpg',
          liveGames: 42,
          totalPlayers: 3000,
          rating: 4.6
        },
        {
          id: 7,
          title: 'Card Duels',
          image: 'https://storage.googleapis.com/a1aa/image/ccwsms0zOmotLVlv5mu8netaVVP0cmgRO0IY1x7YTHUFjbBKA.jpg',
          liveGames: 15,
          totalPlayers: 950,
          rating: 4.4
        },
        // ... other games
      ]
    };
  },
  methods: {
    scrollSection(sectionId, direction) {
      const container = document.getElementById(sectionId);
      const scrollAmount = direction === 'left' ? -200 : 200;
      container.scrollBy({
        left: scrollAmount,
        behavior: 'smooth'
      });
    },
    navigateToGame(game) {
      if (game.path) {
        this.$router.push(game.path);
      }
    },
    renderStars(rating) {
      const fullStars = Math.floor(rating);
      const halfStar = rating % 1 >= 0.5 ? 1 : 0;
      const emptyStars = 5 - fullStars - halfStar;
      
      return '★'.repeat(fullStars) + 
             (halfStar ? '½' : '') + 
             '☆'.repeat(emptyStars);
    }
  },
  template: `
        <div class="container mx-auto pb-4">
      <h2 class="text-xl font-bold mb-4">Explore Games</h2>
      
      <!-- Search Bar -->
      <input 
        v-model="searchQuery"
        class="w-full p-2 mb-4 rounded bg-gray-700 text-white" 
        placeholder="Search games..." 
        type="search"
      />
      
      <!-- First Section: Horizontal Scroll -->
      <div class="mb-8">
        <h3 class="text-lg font-bold mb-2">Popular Games</h3>
        <div class="relative">
          <div 
            id="horizontal-scroll"
            class="flex overflow-x-scroll space-x-4 pb-4 scroll-smooth"
          >
            <div 
              v-for="game in horizontalGames" 
              :key="game.id"
              @click="navigateToGame(game)"
              class="game-card relative bg-gray-800 rounded-lg overflow-hidden shadow-lg transform transition hover:scale-105 duration-300 min-w-[180px] w-[180px] cursor-pointer"
            >
              <div class="relative">
                <img 
                  :src="game.image" 
                  :alt="game.title"
                  class="w-full h-32 object-cover" 
                />
                <div class="absolute top-2 right-2 bg-green-500 text-white px-2 py-1 rounded-full text-xs">
                  Live: {{ game.liveGames }}
                </div>
              </div>
              
              <div class="p-3">
                <h3 class="font-bold text-md mb-1">{{ game.title }}</h3>
                
                <div class="flex items-center justify-between text-sm text-gray-300">
                  <div class="flex items-center">
                    <i class="fas fa-users mr-1"></i>
                    {{ game.totalPlayers }}
                  </div>
                  <div class="text-yellow-400">
                    {{ renderStars(game.rating) }}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Second Section: Games Slider -->
      <div>
        <h3 class="text-lg font-bold mb-2">Trending Games</h3>
        <div class="relative">
          <div 
            id="slider-scroll"
            class="flex overflow-x-scroll space-x-4 pb-4 scroll-smooth"
          >
            <div 
              v-for="game in sliderGames" 
              :key="game.id"
              class="game-card relative bg-gray-800 rounded-lg overflow-hidden shadow-lg transform transition hover:scale-105 duration-300 min-w-[180px] w-[180px]"
            >
              <div class="relative">
                <img 
                  :src="game.image" 
                  :alt="game.title"
                  class="w-full h-32 object-cover" 
                />
                <div class="absolute top-2 right-2 bg-green-500 text-white px-2 py-1 rounded-full text-xs">
                  Live: {{ game.liveGames }}
                </div>
              </div>
              
              <div class="p-3">
                <h3 class="font-bold text-md mb-1">{{ game.title }}</h3>
                
                <div class="flex items-center justify-between text-sm text-gray-300">
                  <div class="flex items-center"><i class="fas fa-users mr-1"></i>
                    {{ game.totalPlayers }}
                  </div>
                  <div class="text-yellow-400">
                    {{ renderStars(game.rating) }}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `
};