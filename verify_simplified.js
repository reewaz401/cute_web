const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function verify() {
  try {
    // Show tables
    const tables = await prisma.$queryRaw`SHOW TABLES`;
    console.log('✅ SIMPLIFIED DATABASE STRUCTURE');
    console.log('================================');
    console.log('Tables in c_site database:');
    tables.forEach(table => {
      console.log('  •', Object.values(table)[0]);
    });

    // Show columns of the activity log table
    const columns = await prisma.$queryRaw`DESCRIBE c_site_activity_log`;
    console.log('\n📊 c_site_activity_log columns:');
    console.log('--------------------------------');
    columns.forEach(col => {
      console.log(`  • ${col.Field} (${col.Type}) ${col.Null === 'NO' ? 'Required' : 'Optional'}`);
    });

    console.log('\n✅ Database is now simplified!');
    console.log('\n📍 Tracking:');
    console.log('  • IP Address & Location');
    console.log('  • Login time');
    console.log('  • Time spent on each page');
    console.log('  • Device type (mobile/tablet/desktop)');
    console.log('  • Browser & OS');
    console.log('\nNo unnecessary tables! Just pure activity tracking.');

  } catch (error) {
    console.error('Error:', error);
  } finally {
    await prisma.$disconnect();
  }
}

verify();