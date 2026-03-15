import { Prisma, PrismaClient, WebsiteStatus } from '@prisma/client';

const prisma = new PrismaClient();

async function seed() {
  console.log('Starting idempotent seed...');

  // -------------------------------------------------------------------------
  // Users
  // -------------------------------------------------------------------------
  const user1 = await prisma.user.upsert({
    where: { email: 'alice@example.com' },
    update: {},
    create: { email: 'alice@example.com' },
  });

  const user2 = await prisma.user.upsert({
    where: { email: 'bob@example.com' },
    update: {},
    create: { email: 'bob@example.com' },
  });

  console.log('Users ready:', user1.email, user2.email);

  // -------------------------------------------------------------------------
  // Validators
  // -------------------------------------------------------------------------
  let validator = await prisma.validator.findFirst({
    where: { publickey: 'seed-public-key-us-east' },
  });

  if (!validator) {
    validator = await prisma.validator.create({
      data: {
        publickey: 'seed-public-key-us-east',
        location: 'US East',
        ip: '1.2.3.4',
      },
    });
  }

  console.log('Validator ready:', validator.id);

  // -------------------------------------------------------------------------
  // Websites (upsert via userId+url unique constraint)
  // -------------------------------------------------------------------------
  const site1 = await prisma.website.upsert({
    where: { userId_url: { userId: user1.id, url: 'https://example.com' } },
    update: {},
    create: { userId: user1.id, url: 'https://example.com', name: 'Example' },
  });

  const site2 = await prisma.website.upsert({
    where: { userId_url: { userId: user1.id, url: 'https://google.com' } },
    update: {},
    create: { userId: user1.id, url: 'https://google.com', name: 'Google' },
  });

  const site3 = await prisma.website.upsert({
    where: { userId_url: { userId: user2.id, url: 'https://github.com' } },
    update: {},
    create: { userId: user2.id, url: 'https://github.com', name: 'GitHub' },
  });

  console.log('Websites ready:', site1.url, site2.url, site3.url);

  // -------------------------------------------------------------------------
  // Website Ticks — realistic 24-hour history (every 60 min, some DOWN)
  // -------------------------------------------------------------------------
  const now = Date.now();
  const ONE_HOUR = 60 * 60 * 1000;
  const tickData: Prisma.WebsiteTickCreateManyInput[] = [];

  for (let i = 24; i >= 0; i--) {
    const ts = new Date(now - i * ONE_HOUR);
    const isDown = i === 5 || i === 12; // Simulate 2 outages

    tickData.push(
      { websiteId: site1.id, validatorId: validator.id, createdAt: ts, status: isDown ? WebsiteStatus.DOWN : WebsiteStatus.UP, latency: isDown ? null : Math.round(80 + Math.random() * 120) },
      { websiteId: site2.id, validatorId: validator.id, createdAt: ts, status: WebsiteStatus.UP, latency: Math.round(20 + Math.random() * 30) },
      { websiteId: site3.id, validatorId: validator.id, createdAt: ts, status: WebsiteStatus.UP, latency: Math.round(50 + Math.random() * 80) },
    );
  }

  await prisma.websiteTick.createMany({ data: tickData, skipDuplicates: true });
  console.log(`Created ${tickData.length} tick entries`);

  console.log('Seed completed successfully ✓');
}

seed()
  .catch((e) => {
    console.error('Seed failed:', e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());