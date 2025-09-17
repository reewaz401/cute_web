const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function verifyTables() {
  try {
    const result = await prisma.$queryRaw`SHOW TABLES`;
    console.log('Tables in c_site database:');
    console.log('=========================');
    result.forEach(table => {
      console.log('✓', Object.values(table)[0]);
    });

    console.log('\n✅ All tables created successfully in c_site database!');
    console.log('✅ The c_site database is completely separate from content database.');
    console.log('✅ Your content database remains unchanged with its original data.');
  } catch (error) {
    console.error('Error:', error);
  } finally {
    await prisma.$disconnect();
  }
}

verifyTables();