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
          description: 'Strategy game, perfect for competitive matches and tournaments.'
        },
        {
          id: 2,
          title: 'Checkers',
          image: 'https://storage.googleapis.com/a1aa/image/fgfMHuCvEIpLa0lYep3Yfvfl9BDTen0k1Glene79zUXmBG3CUA.jpg',
          description: 'Classic board game for quick 1v1 sessions.'
        },
        {
          id: 3,
          title: 'Connect Four',
          image: 'https://storage.googleapis.com/a1aa/image/Q0Je0nIPFIy8baklKDTiOYlsBYgiEt9fhjwrE1mL9nAGG3CUA.jpg',
          description: 'Simple, fast-paced game.'
        },
        {
          id: 4,
          title: 'Tic-Tac-Toe',
          image: 'https://storage.googleapis.com/a1aa/image/Gl9frOQlNVWqSSgahJ5y9eo49dfzMsmnpCQBR7o057rJMuFoA.jpg',
          description: 'Great for a quick match but add a twist for complexity.'
        },
        {
          id: 5,
          title: 'Battleship',
          image: 'https://storage.googleapis.com/a1aa/image/q3AmIvmEWWL4PBFRhivoRQVKf62u1RADuMm0s2dwAwhIjbBKA.jpg',
          description: 'Guessing and strategy game.'
        }
      ],
      sliderGames: [
        {
          id: 6,
          title: 'Rock Paper Scissors',
          image: 'https://storage.googleapis.com/a1aa/image/zzR2M72EKgLmNZGxJ3AlbPernzfeGRkweoQON6kfb3zFx4WgC.jpg',
          description: 'Fast and fun, especially with variations like power-ups or different rules.'
        },
        {
          id: 7,
          title: 'Card Duels',
          image: 'https://storage.googleapis.com/a1aa/image/ccwsms0zOmotLVlv5mu8netaVVP0cmgRO0IY1x7YTHUFjbBKA.jpg',
          description: 'Easy to set up for tournaments.'
        },
        {
          id: 8,
          title: 'Trivia Quiz Battles',
          image: 'https://storage.googleapis.com/a1aa/image/f99HvV88O3R2JaNhYyNiL97IxO4KqRSi4uCFewtHPVcNG3CUA.jpg',
          description: 'Players answer questions in various categories.'
        },
        {
          id: 9,
          title: 'Word Scramble',
          image: 'https://storage.googleapis.com/a1aa/image/no1vxds9DSbvE9Wu8I9HrnPwfvQMMZLJVeofNMjgrNXFMuFoA.jpg',
          description: 'Players compete to unscramble words the fastest.'
        },
        {
          id: 10,
          title: 'Memory Match Game',
          image: 'https://storage.googleapis.com/a1aa/image/k8y7yB0yVGYyLBWFBpGRIX5d6Bh116nYr4vkm2hilt3ixtAF.jpg',
          description: 'Find matching cards faster than your opponent.'
        }
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
    searchGames() {
      // Implement search functionality
      console.log('Searching for:', this.searchQuery);
    },
    selectCategory(category) {
      // Implement category filtering
      console.log('Selected category:', category);
    }
  },
  template: `
    
  <!-- Search Bar -->
  <input 
    v-model="searchQuery"
    @input="searchGames"
    class="w-full p-2 mb-4 rounded bg-gray-700 text-white" 
    placeholder="Search..." 
    type="search"
  />
  
  <!-- Categories -->
  <div class="flex flex-wrap gap-2 mb-4">
    <button 
      v-for="category in categories" 
      :key="category"
      @click="selectCategory(category)"
      class="category-pill bg-blue-500 hover:bg-blue-600 text-white py-1 px-3 rounded transition duration-200"
    >
      {{ category }}
    </button>
  </div>

  <!-- First Section: Horizontal Scroll -->
  <div class="mb-8">
    <h3 class="text-lg font-bold mb-2">Horizontal Scroll Games</h3>
    <div class="relative">
      <div 
        id="horizontal-scroll"
        class="flex overflow-x-scroll space-x-4 pb-4 scroll-smooth"
      >
        <div 
          v-for="game in horizontalGames" 
          :key="game.id"
          class="game-item bg-gray-800 p-4 rounded min-w-[200px] hover:bg-gray-700 transition duration-200"
        >
          <img 
            :src="game.image" 
            :alt="game.title"
            class="w-full h-32 object-cover mb-2 rounded" 
            :height="150" 
            :width="150"
          />
          <h3 class="text-lg font-bold">{{ game.title }}</h3>
          <p>{{ game.description }}</p>
        </div>
      </div>
      <button 
        @click="scrollSection('horizontal-scroll', 'left')"
        class="absolute top-1/2 left-0 transform -translate-y-1/2 bg-gray-700 p-2 rounded-full hover:bg-gray-600 transition duration-200"
      >
        <i class="fas fa-chevron-left"></i>
      </button>
      <button 
        @click="scrollSection('horizontal-scroll', 'right')"
        class="absolute top-1/2 right-0 transform -translate-y-1/2 bg-gray-700 p-2 rounded-full hover:bg-gray-600 transition duration-200"
      >
        <i class="fas fa-chevron-right"></i>
      </button>
    </div>
  </div>

  <!-- Second Section: Games Slider -->
  <div>
    <h3 class="text-lg font-bold mb-2">Games Slider</h3>
    <div class="relative">
      <div 
        id="slider-scroll"
        class="flex overflow-x-scroll space-x-4 pb-4 scroll-smooth"
      >
        <div 
          v-for="game in sliderGames" 
          :key="game.id"
          class="game-item bg-gray-800 p-4 rounded min-w-[200px] hover:bg-gray-700 transition duration-200"
        >
          <img 
            :src="game.image" 
            :alt="game.title"
            class="w-full h-32 object-cover mb-2 rounded" 
            :height="150" 
            :width="150"
          />
          <h3 class="text-lg font-bold">{{ game.title }}</h3>
          <p>{{ game.description }}</p>
        </div>
      </div>
      <button 
        @click="scrollSection('slider-scroll', 'left')"
        class="absolute top-1/2 left-0 transform -translate-y-1/2 bg-gray-700 p-2 rounded-full hover:bg-gray-600 transition duration-200"
      >
        <i class="fas fa-chevron-left"></i>
      </button>
      <button 
        @click="scrollSection('slider-scroll', 'right')"
        class="absolute top-1/2 right-0 transform -translate-y-1/2 bg-gray-700 p-2 rounded-full hover:bg-gray-600 transition duration-200"
      >
        <i class="fas fa-chevron-right"></i>
      </button>
    </div>
  </div>
</div> 
  `
};