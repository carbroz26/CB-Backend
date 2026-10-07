import { PrismaClient } from '@prisma/client';

async function main() {
  const prisma = new PrismaClient();
  const config = await prisma.systemConfig.findUnique({ where: { key: 'partner.bootstrap' } });
  
  if (config) {
    const value = JSON.parse(config.value);
    
    // Replace DESKTOP with WEB
    if (value.update && value.update.DESKTOP) {
      value.update.WEB = value.update.DESKTOP;
      delete value.update.DESKTOP;
      
      await prisma.systemConfig.update({
        where: { key: 'partner.bootstrap' },
        data: { value: JSON.stringify(value) },
      });
      console.log('Updated partner.bootstrap in database successfully.');
    } else {
      console.log('No DESKTOP key found in partner.bootstrap update section.');
    }
  } else {
    console.log('partner.bootstrap not found in database.');
  }
  
  await prisma.$disconnect();
}

main().catch(console.error);
