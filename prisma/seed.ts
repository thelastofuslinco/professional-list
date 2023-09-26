import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();
import * as bcrypt from 'bcrypt';

const roundsOfHashing = 8;

async function main() {
  await prisma.user.deleteMany();
  for (let index = 10; index <= 99; index++) {
    const password = await bcrypt.hash(`password${index}`, roundsOfHashing);

    const data = {
      name: `user#${index}`,
      email: `email${index}@mail.com`,
      cpf: `000.000.000-${index}`,
      phone: `(00) 00000-00${index}`,
      password,
      authenticated: false,
      skills: [`skill#${index}`],
    };

    await prisma.user.create({ data });
  }

  const password = await bcrypt.hash(`admin123`, roundsOfHashing);

  const data = {
    name: `Admin`,
    email: `admin@mail.com`,
    cpf: `000.000.000-00`,
    phone: `(00) 00000-0000`,
    password,
    authenticated: false,
    skills: [`javascript`, 'react'],
  };

  await prisma.user.create({ data });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => await prisma.$disconnect());
