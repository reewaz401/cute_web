const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function addLine(line) {
  try {
    const newLine = await prisma.cSiteLineOfDay.create({
      data: {
        line,
        isActive: true
      }
    });

    console.log('✅ Line added successfully!');
    console.log('Line:', newLine.line);
    console.log('Created:', newLine.createdDate);

    return newLine;
  } catch (error) {
    console.error('Error adding line:', error);
  } finally {
    await prisma.$disconnect();
  }
}

// Get line from command line arguments
const args = process.argv.slice(2);

if (args.length === 0) {
  console.log('Usage: node add-line.js "Your line here"');
  console.log('\nExamples:');
  console.log('  node add-line.js "Life is what happens when you\'re busy making other plans"');
  console.log('  node add-line.js "If you were a vegetable, you\'d be a cute-cumber"');

  console.log('\n📝 Adding some default lines...\n');

  // Add some default lines
  const defaultLines = [
    "If you were a vegetable, you'd be a cute-cumber",
    "Life is like a box of chocolates, you never know what you're gonna get",
    "Be yourself; everyone else is already taken",
    "Two things are infinite: the universe and human stupidity",
    "You miss 100% of the shots you don't take"
  ];

  (async () => {
    for (const line of defaultLines) {
      await addLine(line);
      console.log('---');
    }
  })();
} else {
  const line = args[0];
  addLine(line);
}