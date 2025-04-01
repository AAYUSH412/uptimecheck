import { PrismaClient, WebsiteStatus } from '@prisma/client';

// Create a Prisma client instance
const prisma = new PrismaClient();

async function seed() {
  try {
    console.log('Starting seed...');
    
    // Create user
    const user = await prisma.user.create({
      data: {
        id: "1",
        email: "test@gmail.com"
      }
    });
    console.log('Created user:', user);

    // Create a validator (required for WebsiteTick relation)
    const validator = await prisma.validator.create({
      data: {
        id: "1",
        publickey: "test-public-key",
        location: "US East",
        ip: "127.0.0.1"
      }
    });
    console.log('Created validator:', validator);

    // Create website
    const website = await prisma.website.create({
      data: {
        id: "1",
        userId: "1",
        url: "https://example.com"
      }
    });
    console.log('Created website:', website);

    // Create ticks with different timestamps and statuses
    const tick1 = await prisma.websiteTick.create({
      data: {
        id: "1",
        websiteId: "1",
        validatorId: "1",
        status: WebsiteStatus.UP,
        createdAt: new Date(),
        latency: 100
      }
    });
    console.log('Created tick 1:', tick1);

    const tick2 = await prisma.websiteTick.create({
      data: {
        id: "2",
        websiteId: "1",
        validatorId: "1",
        status: WebsiteStatus.UP,
        createdAt: new Date(Date.now() - 1000 * 60 * 10), // 10 minutes ago
        latency: 120
      }
    });
    console.log('Created tick 2:', tick2);

    const tick3 = await prisma.websiteTick.create({
      data: {
        id: "3",
        websiteId: "1",
        validatorId: "1",
        status: WebsiteStatus.DOWN,
        createdAt: new Date(Date.now() - 1000 * 60 * 20), // 20 minutes ago
        latency: 0
      }
    });
    console.log('Created tick 3:', tick3);

    console.log('Seeding completed successfully');
  } catch (error) {
    console.error('Error during seeding:', error);
  } finally {
    await prisma.$disconnect();
  }
}

// Execute the seed function
seed()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  });