const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function addWebsite(name, url, description = null) {
  try {
    const newWebsite = await prisma.cSiteTimepassWebsites.create({
      data: {
        name,
        url,
        description,
        isActive: true
      }
    });

    console.log('✅ Website added successfully!');
    console.log('Name:', newWebsite.name);
    console.log('URL:', newWebsite.url);
    if (newWebsite.description) console.log('Description:', newWebsite.description);
    console.log('Created:', newWebsite.createdDate);

    return newWebsite;
  } catch (error) {
    console.error('Error adding website:', error);
  } finally {
    await prisma.$disconnect();
  }
}

// Get website from command line arguments
const args = process.argv.slice(2);

if (args.length === 0) {
  console.log('Usage: node add-website.js "Name" "URL" "Optional Description"');
  console.log('\nExamples:');
  console.log('  node add-website.js "Little Alchemy" "https://littlealchemy.com" "Combine elements to discover new items"');
  console.log('  node add-website.js "GeoGuessr" "https://www.geoguessr.com"');

  console.log('\n🌐 Adding some default websites...\n');

  // Add some default websites
  const defaultWebsites = [
    { name: 'Sporcle', url: 'https://www.sporcle.com', description: 'Trivia quizzes on thousands of topics' },
    { name: 'JetPunk', url: 'https://www.jetpunk.com', description: 'User-created quizzes and trivia' },
    { name: 'Little Alchemy', url: 'https://littlealchemy.com', description: 'Combine elements to discover new items' },
    { name: 'GeoGuessr', url: 'https://www.geoguessr.com', description: 'Guess where in the world you are' },
    { name: 'The Useless Web', url: 'https://theuselessweb.com', description: 'Take you to random fun websites' },
    { name: 'Quick, Draw!', url: 'https://quickdraw.withgoogle.com', description: 'Can a neural network learn to recognize doodling?' },
    { name: 'Radio Garden', url: 'http://radio.garden', description: 'Listen to radio stations from around the world' },
    { name: 'Window Swap', url: 'https://www.window-swap.com', description: 'See the view from someone else\'s window' }
  ];

  (async () => {
    for (const site of defaultWebsites) {
      await addWebsite(site.name, site.url, site.description);
      console.log('---');
    }
  })();
} else if (args.length < 2) {
  console.log('Error: Both name and URL are required!');
  console.log('Usage: node add-website.js "Name" "URL" "Optional Description"');
} else {
  const name = args[0];
  const url = args[1];
  const description = args[2] || null;
  addWebsite(name, url, description);
}