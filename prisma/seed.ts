import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function main() {
  for (let index = 1; index <= 100; index++) {
    const data = {
      name: `name ${index}`,
      email: `email ${index}`,
      cpf: `cpf ${index}`,
      phone: `phone ${index}`,
      password: `password${index}`,
      skills: [`skill ${index}`],
    };

    await prisma.user.create({ data });
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => await prisma.$disconnect());
