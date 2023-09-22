import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();
import * as bcrypt from 'bcrypt';

const roundsOfHashing = 8;

async function main() {
  await prisma.user.deleteMany();
  for (let index = 1; index <= 100; index++) {
    const password = await bcrypt.hash(`password${index}`, roundsOfHashing);

    const data = {
      name: `user#${index}`,
      email: `email${index}@mail.com`,
      cpf: `000.000.000-${index}`,
      phone: `000000000${index}`,
      password,
      skills: [`skill#${index}`],
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
