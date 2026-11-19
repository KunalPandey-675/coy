import { Profile, DataStore } from '@/types';

export const CURRENT_USER_ID = 'current-user';


export function generateSeedData(): DataStore {
  const profiles: Profile[] = [
    {
      id: 'profile-1',
      gender: 'female' as const,
      name: 'Priya Sharma',
      age: 21,
      photos: [
        'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400',
        'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=400'
      ],
      bio: '📚 Computer Science @ IIT Delhi | Love chai and late-night coding sessions | Looking for someone who gets my debugging jokes 😄',
      cityOrCollege: 'IIT Delhi',
      interests: ['Coding', 'Coffee', 'Anime', 'Badminton'],
      occupation: 'Student',
    },
    {
      id: 'profile-2',
      gender: 'male' as const,
      name: 'Arjun Mehta',
      age: 22,
      photos: [
        'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400',
        'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=400'
      ],
      bio: '🏏 Cricket enthusiast | Economics major @ St. Stephens College | Foodie who believes in dessert before dinner',
      cityOrCollege: "St. Stephen's College, Delhi",
      interests: ['Cricket', 'Economics', 'Food', 'Travel'],
      occupation: 'Student',
    },
    {
      id: 'profile-3',
      gender: 'female' as const,
      name: 'Ananya Iyer',
      age: 20,
      photos: [
        'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400',
        'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=400'
      ],
      bio: '🎨 Design student @ NIFT Mumbai | Sketch artist | Bollywood buff | Let\'s grab filter coffee and talk about everything!',
      cityOrCollege: 'NIFT Mumbai',
      interests: ['Art', 'Fashion', 'Bollywood', 'Coffee'],
      occupation: 'Student',
    },
    {
      id: 'profile-4',
      gender: 'male' as const,
      name: 'Rohan Das',
      age: 23,
      photos: [
        'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400',
        'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=400'
      ],
      bio: '⚡ Electrical Engineering @ IIT Bombay | Guitar player | Adventure junkie | Trekked to Everest Base Camp 🏔️',
      cityOrCollege: 'IIT Bombay',
      interests: ['Music', 'Trekking', 'Guitar', 'Engineering'],
      occupation: 'Student',
    },
    {
      id: 'profile-5',
      gender: 'female' as const,
      name: 'Isha Patel',
      age: 21,
      photos: [
        'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400',
        'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=400'
      ],
      bio: '💼 MBA @ IIM Bangalore | Startup enthusiast | Love debating and chai pe charcha | Weekend warrior at dance class 💃',
      cityOrCollege: 'IIM Bangalore',
      interests: ['Business', 'Dance', 'Startups', 'Debates'],
      occupation: 'Student',
    },
    {
      id: 'profile-6',
      gender: 'male' as const,
      name: 'Kabir Singh',
      age: 22,
      photos: [
        'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400',
        'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=400'
      ],
      bio: '🎬 Film Studies @ FTII Pune | Aspiring filmmaker | Cinephile who can talk about movies for hours | Coffee > Tea',
      cityOrCollege: 'FTII Pune',
      interests: ['Movies', 'Photography', 'Writing', 'Coffee'],
      occupation: 'Student',
    },
    {
      id: 'profile-7',
      gender: 'female' as const,
      name: 'Sneha Reddy',
      age: 20,
      photos: [
        'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400',
        'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=400'
      ],
      bio: '🧬 Biotechnology @ VIT Vellore | Science nerd | Love baking and feeding people | Looking for my lab partner in life 🔬',
      cityOrCollege: 'VIT Vellore',
      interests: ['Science', 'Baking', 'Reading', 'Music'],
      occupation: 'Student',
    },
    {
      id: 'profile-8',
      gender: 'male' as const,
      name: 'Aditya Kulkarni',
      age: 23,
      photos: [
        'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400',
        'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=400'
      ],
      bio: '🏋️ Mechanical Engineering @ BITS Pilani | Gym enthusiast | Car guy | Part-time stand-up comedy enthusiast | Let\'s workout together?',
      cityOrCollege: 'BITS Pilani',
      interests: ['Fitness', 'Cars', 'Comedy', 'Engineering'],
      occupation: 'Student',
    },
    {
      id: 'profile-9',
      gender: 'female' as const,
      name: 'Divya Nair',
      age: 21,
      photos: [
        'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400',
        'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=400'
      ],
      bio: '📖 Literature @ JNU Delhi | Bookworm | Poetry lover | Feminist | Can quote Jane Austen in any situation 📚',
      cityOrCollege: 'JNU Delhi',
      interests: ['Books', 'Poetry', 'Writing', 'Social Justice'],
      occupation: 'Student',
    },
    {
      id: 'profile-10',
      gender: 'male' as const,
      name: 'Vikram Rao',
      age: 22,
      photos: [
        'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400',
        'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=400'
      ],
      bio: '🎵 Music Production @ AR Rahman Institute | EDM producer | Night owl | Foodie who lives for biryani | Swipe right for good vibes 🎧',
      cityOrCollege: 'KM Music Conservatory, Chennai',
      interests: ['Music', 'EDM', 'Food', 'Nightlife'],
      occupation: 'Student',
    },
    {
      id: 'profile-11',
      gender: 'female' as const,
      name: 'Riya Gupta',
      age: 20,
      photos: [
        'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400',
        'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=400'
      ],
      bio: '🌿 Environmental Science @ DU | Climate activist | Plant mom | Love hiking and sustainable living | Let\'s save the planet together! 🌍',
      cityOrCollege: 'Delhi University',
      interests: ['Environment', 'Hiking', 'Plants', 'Activism'],
      occupation: 'Student',
    },
    {
      id: 'profile-12',
      gender: 'male' as const,
      name: 'Siddharth Joshi',
      age: 23,
      photos: [
        'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400',
        'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=400'
      ],
      bio: '💻 Software Engineer @ Bangalore | Love gaming and hackathons | Pizza enthusiast | Looking for my player 2 🎮',
      cityOrCollege: 'Bangalore',
      interests: ['Gaming', 'Coding', 'Pizza', 'Tech'],
      occupation: 'Software Engineer',
    },
    {
      id: 'profile-13',
      gender: 'female' as const,
      name: 'Nisha Kapoor',
      age: 21,
      photos: [
        'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400',
        'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=400'
      ],
      bio: '🩺 Medical Student @ AIIMS Delhi | Future doctor | Love volunteering and helping people | Caffeine addict ☕',
      cityOrCollege: 'AIIMS Delhi',
      interests: ['Medicine', 'Volunteering', 'Reading', 'Coffee'],
      occupation: 'Student',
    },
    {
      id: 'profile-14',
      gender: 'male' as const,
      name: 'Akash Verma',
      age: 22,
      photos: [
        'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400',
        'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=400'
      ],
      bio: '⚖️ Law @ NLSIU Bangalore | Debater | Cricket fan | Chai over coffee | Looking for intellectual conversations and spontaneous plans',
      cityOrCollege: 'NLSIU Bangalore',
      interests: ['Law', 'Debates', 'Cricket', 'Politics'],
      occupation: 'Student',
    },
    {
      id: 'profile-15',
      gender: 'female' as const,
      name: 'Meera Agarwal',
      age: 20,
      photos: [
        'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400',
        'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=400'
      ],
      bio: '🎭 Theatre Arts @ NSD Delhi | Actor | Love improvisation and coffee shop hopping | Life\'s a stage, let\'s make it dramatic! 🎬',
      cityOrCollege: 'NSD Delhi',
      interests: ['Theatre', 'Acting', 'Coffee', 'Arts'],
      occupation: 'Student',
    },
    {
      id: 'profile-16',
      gender: 'male' as const,
      name: 'Rahul Desai',
      age: 23,
      photos: [
        'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400',
        'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=400'
      ],
      bio: '🏃 Sports Management @ Pune | Marathon runner | Fitness coach | Believe in healthy mind, healthy body | Let\'s go for a run? 🏃‍♂️',
      cityOrCollege: 'Pune',
      interests: ['Running', 'Fitness', 'Sports', 'Health'],
      occupation: 'Fitness Coach',
    },
    {
      id: 'profile-17',
      gender: 'female' as const,
      name: 'Tanvi Shah',
      age: 21,
      photos: [
        'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400',
        'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=400'
      ],
      bio: '📱 Digital Marketing @ Mumbai | Social media strategist | Love memes and meaningful conversations | Swipe right for good humor and better stories',
      cityOrCollege: 'Mumbai',
      interests: ['Marketing', 'Memes', 'Travel', 'Social Media'],
      occupation: 'Digital Marketer',
    },
    {
      id: 'profile-18',
      gender: 'male' as const,
      name: 'Karthik Menon',
      age: 22,
      photos: [
        'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400',
        'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=400'
      ],
      bio: '🎸 Musician @ Chennai | Guitarist and singer | Love jamming and Carnatic fusion | Looking for someone who appreciates good music 🎶',
      cityOrCollege: 'Chennai',
      interests: ['Music', 'Guitar', 'Singing', 'Carnatic'],
      occupation: 'Musician',
    },
    {
      id: 'profile-19',
      gender: 'female' as const,
      name: 'Pooja Mishra',
      age: 20,
      photos: [
        'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400',
        'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=400'
      ],
      bio: '🎨 Architecture @ SPA Delhi | Love sketching and minimalist design | Coffee and architecture walks are my jam ☕',
      cityOrCollege: 'SPA Delhi',
      interests: ['Architecture', 'Design', 'Sketching', 'Coffee'],
      occupation: 'Student',
    },
    {
      id: 'profile-20',
      gender: 'male' as const,
      name: 'Arnav Chatterjee',
      age: 23,
      photos: [
        'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400',
        'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=400'
      ],
      bio: '📊 Data Analyst @ Kolkata | Numbers guy | Love cricket stats and stock market | Chai enthusiast | Let\'s analyze our compatibility! 📈',
      cityOrCollege: 'Kolkata',
      interests: ['Data', 'Cricket', 'Stocks', 'Chai'],
      occupation: 'Data Analyst',
    },
    {
      id: 'profile-21',
      gender: 'female' as const,
      name: 'Ayesha Khan',
      age: 21,
      photos: [
        'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400',
        'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=400'
      ],
      bio: '🌍 International Relations @ JMI Delhi | UN enthusiast | Love traveling and learning languages | Currently learning Spanish! 🇪🇸',
      cityOrCollege: 'Jamia Millia Islamia, Delhi',
      interests: ['Politics', 'Travel', 'Languages', 'Culture'],
      occupation: 'Student',
    },
    {
      id: 'profile-22',
      gender: 'male' as const,
      name: 'Yash Malhotra',
      age: 22,
      photos: [
        'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400',
        'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=400'
      ],
      bio: '🏀 Basketball player @ Chandigarh | Sports lover | Gym rat | Believe in work hard, play hard | Looking for my teammate 🏀',
      cityOrCollege: 'Chandigarh',
      interests: ['Basketball', 'Sports', 'Fitness', 'Games'],
      occupation: 'Athlete',
    },
    {
      id: 'profile-23',
      gender: 'female' as const,
      name: 'Kavya Krishnan',
      age: 20,
      photos: [
        'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400',
        'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=400'
      ],
      bio: '🍰 Culinary Arts @ Bangalore | Pastry chef in training | Foodie and experimenter | Let me bake you something special! 👩‍🍳',
      cityOrCollege: 'Bangalore',
      interests: ['Baking', 'Cooking', 'Food', 'Photography'],
      occupation: 'Student',
    },
    {
      id: 'profile-24',
      gender: 'male' as const,
      name: 'Nikhil Rane',
      age: 23,
      photos: [
        'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400',
        'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=400'
      ],
      bio: '🏍️ Mechanical Engineer @ Pune | Bike enthusiast | Love road trips and adventure sports | Let\'s ride into the sunset! 🌅',
      cityOrCollege: 'Pune',
      interests: ['Bikes', 'Travel', 'Adventure', 'Engineering'],
      occupation: 'Engineer',
    },
    {
      id: 'profile-25',
      gender: 'female' as const,
      name: 'Simran Kaur',
      age: 21,
      photos: [
        'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400',
        'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=400'
      ],
      bio: '💄 Fashion Blogger @ Delhi | Style enthusiast | Love shopping and brunch dates | Looking for someone who appreciates good fashion 👗',
      cityOrCollege: 'Delhi',
      interests: ['Fashion', 'Blogging', 'Shopping', 'Photography'],
      occupation: 'Blogger',
    },
    {
      id: 'profile-26',
      gender: 'male' as const,
      name: 'Aryan Sinha',
      age: 22,
      photos: [
        'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400',
        'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=400'
      ],
      bio: '🎮 Game Developer @ Hyderabad | Indie game creator | Anime lover | Pizza and gaming marathons are life | Let\'s co-op? 🕹️',
      cityOrCollege: 'Hyderabad',
      interests: ['Gaming', 'Anime', 'Coding', 'Pizza'],
      occupation: 'Game Developer',
    },
    {
      id: 'profile-27',
      gender: 'female' as const,
      name: 'Anjali Trivedi',
      age: 20,
      photos: [
        'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400',
        'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=400'
      ],
      bio: '🧘 Yoga instructor @ Rishikesh | Spiritual seeker | Love meditation and nature | Looking for peace and good vibes 🕉️',
      cityOrCollege: 'Rishikesh',
      interests: ['Yoga', 'Meditation', 'Nature', 'Spirituality'],
      occupation: 'Yoga Instructor',
    },
    {
      id: 'profile-28',
      gender: 'male' as const,
      name: 'Varun Nambiar',
      age: 23,
      photos: [
        'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400',
        'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=400'
      ],
      bio: '📸 Photographer @ Goa | Travel photographer | Beach lover | Capturing moments and memories | Let\'s create some memories together! 📷',
      cityOrCollege: 'Goa',
      interests: ['Photography', 'Travel', 'Beach', 'Art'],
      occupation: 'Photographer',
    },
    {
      id: 'profile-29',
      gender: 'female' as const,
      name: 'Shreya Bose',
      age: 21,
      photos: [
        'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400',
        'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=400'
      ],
      bio: '📚 Psychology @ Christ University Bangalore | Mental health advocate | Love deep conversations and chai | Looking for emotional intelligence 🧠',
      cityOrCollege: 'Christ University, Bangalore',
      interests: ['Psychology', 'Mental Health', 'Reading', 'Chai'],
      occupation: 'Student',
    },
    {
      id: 'profile-30',
      gender: 'male' as const,
      name: 'Harsh Agarwal',
      age: 22,
      photos: [
        'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400',
        'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=400'
      ],
      bio: '🚀 Aerospace Engineering @ IIT Kharagpur | Space enthusiast | Love sci-fi and stargazing | Let\'s reach for the stars together! ✨',
      cityOrCollege: 'IIT Kharagpur',
      interests: ['Space', 'Science', 'Sci-Fi', 'Stargazing'],
      occupation: 'Student',
    },
    {
      id: 'profile-31',
      gender: 'female' as const,
      name: 'Diya Chopra',
      age: 20,
      photos: [
        'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400',
        'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=400'
      ],
      bio: '🎤 Stand-up Comedian @ Mumbai | Love making people laugh | Foodie who lives for street food | Swipe right for unlimited laughter! 😂',
      cityOrCollege: 'Mumbai',
      interests: ['Comedy', 'Food', 'Entertainment', 'Writing'],
      occupation: 'Comedian',
    },
    {
      id: 'profile-32',
      gender: 'male' as const,
      name: 'Madhav Pillai',
      age: 23,
      photos: [
        'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400',
        'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=400'
      ],
      bio: '💼 Finance @ Mumbai | Stock market enthusiast | Love cricket and weekend getaways | Looking for my investment partner in life 📈',
      cityOrCollege: 'Mumbai',
      interests: ['Finance', 'Stocks', 'Cricket', 'Travel'],
      occupation: 'Finance Analyst',
    },
  ];

  
  
  const preExistingLikes = [
    { profileId: 'profile-1', likesUserId: CURRENT_USER_ID },
    { profileId: 'profile-3', likesUserId: CURRENT_USER_ID },
    { profileId: 'profile-5', likesUserId: CURRENT_USER_ID },
    { profileId: 'profile-8', likesUserId: CURRENT_USER_ID },
    { profileId: 'profile-12', likesUserId: CURRENT_USER_ID },
    { profileId: 'profile-15', likesUserId: CURRENT_USER_ID },
    { profileId: 'profile-19', likesUserId: CURRENT_USER_ID },
    { profileId: 'profile-23', likesUserId: CURRENT_USER_ID },
    { profileId: 'profile-27', likesUserId: CURRENT_USER_ID },
    { profileId: 'profile-31', likesUserId: CURRENT_USER_ID },
  ];

  return {
    profiles,
    swipes: [],
    matches: [],
    preExistingLikes,
    blocks: [],
    reports: [],
  };
}


