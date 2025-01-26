
const Morpion = {
  methods: {
    backIcon() {
      return `
        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
        </svg>
      `;
    },
navigateToTournament(tournamentId) {
        // Using Vue Router to navigate
        this.$router.push({
            path: `/national-champ`
        }).catch(err => {
            if (err.name !== 'NavigationDuplicated') {
                console.error('Navigation error:', err);
            }
        });
    },
    calendarIcon() {
      return `
        <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 inline mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
      `;
    },
    
    liveIcon() {
      return `
        <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 inline mr-1 text-red-500 animate-pulse" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"/>
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
        </svg>
      `;
    },
    
    peopleIcon() {
      return `
        <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 inline mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
      `;
    },
    
    tournamentIcon() {
      return `
        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
      `;
    },

    getDateIcon(tournament) {
      return tournament.isLive ? this.liveIcon() : this.calendarIcon();
    },

    getDateText(tournament) {
      return tournament.isLive ? 'Live Now' : `Start: ${tournament.startDate}`;
    }
  },
  
  template: `
  <body class="text-gray-100 bg-gray-900 min-h-screen">
    <div class="container mx-auto px-4 py-8">
      <div class="flex items-center gap-4 mb-6">
        <a href="#" class="flex items-center bg-gray-800 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded-full transition duration-300 ease-in-out transform hover:scale-105">
          <span v-html="backIcon()"></span>
        </a>
        <h2 class="text-lg font-bold whitespace-nowrap overflow-hidden text-ellipsis">Haitian Morpion Tournaments</h2>
      </div>
      
      <!-- National Tournaments -->
      <div class="mb-8">
    <h3 class="text-xl font-semibold mb-4">National Tournaments</h3>
    <div class="flex overflow-x-auto space-x-4 pb-4">
        <div v-for="tournament in nationalTournaments" 
             :key="tournament.id" 
             @click="navigateToTournament(tournament.id)"
             class="flex-shrink-0 w-64 bg-gray-800 p-4 rounded-lg relative hover:shadow-lg transition-all duration-300 cursor-pointer">
            <div class="absolute top-2 right-2" v-html="tournamentIcon()"></div>
            <h4 class="text-lg font-bold mb-2">{{ tournament.name }}</h4>
            <p class="text-sm text-gray-300">{{ tournament.description }}</p>
            <div class="mt-4 flex justify-between text-sm text-gray-400">
                <span v-html="getDateIcon(tournament) + getDateText(tournament)"></span>
                <span v-html="peopleIcon() + tournament.fans + ' Fans'"></span>
            </div>
        </div>
    </div>
</div>


      <!-- State-Level Tournaments -->
      <div class="mb-8">
        <h3 class="text-xl font-semibold mb-4">State Leagues</h3>
        <div class="flex overflow-x-auto space-x-4 pb-4">
          <div v-for="tournament in stateTournaments" :key="tournament.name" 
               class="flex-shrink-0 w-64 bg-gray-700 p-4 rounded-lg relative hover:shadow-lg transition-all duration-300">
            <div class="absolute top-2 right-2" v-html="tournamentIcon()"></div>
            <h4 class="text-lg font-bold mb-2">{{ tournament.name }}</h4>
            <p class="text-sm text-gray-300">{{ tournament.description }}</p>
            <div class="mt-4 flex justify-between text-sm text-gray-400">
              <span v-html="getDateIcon(tournament) + getDateText(tournament)"></span>
              <span v-html="peopleIcon() + tournament.fans + ' Fans'"></span>
            </div>
          </div>
        </div>
      </div>

      <!-- Youth Tournaments -->
      <div class="mt-8">
        <h3 class="text-xl font-semibold mb-4">Youth Tournaments</h3>
        <div class="flex overflow-x-auto space-x-4 pb-4">
          <div v-for="tournament in youthTournaments" :key="tournament.name" 
               class="flex-shrink -0 w-64 bg-gray-600 p-4 rounded-lg relative hover:shadow-lg transition-all duration-300">
            <div class="absolute top-2 right-2" v-html="tournamentIcon()"></div>
            <h4 class="text-lg font-bold mb-2">{{ tournament.name }}</h4>
            <p class="text-sm text-gray-300">{{ tournament.description }}</p>
            <div class="mt-4 flex justify-between text-sm text-gray-400">
              <span v-html="getDateIcon(tournament) + getDateText(tournament)"></span>
              <span v-html="peopleIcon() + tournament.fans + ' Fans'"></span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </body>
  `,
  
  data() {
    return {
      nationalTournaments: [
        {
          name: 'National Championship',
          description: 'Top-tier national football competition',
          startDate: 'Jan 2024',
          fans: 5000,
          isLive: true
        },
        {
          name: 'Haitian Cup',
          description: 'Knockout tournament for all clubs',
          startDate: 'Feb 2024',
          fans: 3500,
          isLive: false
        },
        {
          name: 'Super Cup',
          description: 'Championship and Cup winners clash',
          startDate: 'Mar 2024',
          fans: 4000,
          isLive: true
        },
        {
          name: "Women's Championship",
          description: 'Top women\'s football competition',
          startDate: 'Apr 2024',
          fans: 2500,
          isLive: false
        }
      ],
      stateTournaments: [
        {
          name: 'Artibonite League',
          description: 'State-level football competition',
          startDate: 'May 2024',
          fans: 1200,
          isLive: false
        },
        {
          name: 'Ouest League',
          description: 'Port-au-Prince region tournament',
          startDate: 'Jun 2024',
          fans: 2800,
          isLive: true
        },
      ],
      youthTournaments: [
        {
          name: 'U-17 Championship',
          description: 'National youth tournament',
          startDate: 'Sep 2024',
          fans: 1000,
          isLive: false
        },
        {
          name: 'U-20 League',
          description: 'Young talent showcase',
          startDate: 'Oct 2024',
          fans: 1500,
          isLive: true
        }
      ]
    }
  }
};