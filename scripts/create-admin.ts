import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  console.log('🔧 Création de l\'administrateur...');

  // Vérifier si un admin existe déjà
  const existingAdmin = await prisma.admin.findFirst();
  
  if (existingAdmin) {
    console.log('⚠️  Un administrateur existe déjà !');
    console.log('Username:', existingAdmin.username);
    return;
  }

  // Créer le mot de passe haché
  const password = process.env.ADMIN_PASSWORD || 'admin123';
  const hashedPassword = await bcrypt.hash(password, 10);

  // Créer l'admin
  const admin = await prisma.admin.create({
    data: {
      username: 'admin',
      password: hashedPassword,
    },
  });

  console.log('✅ Administrateur créé avec succès !');
  console.log('Username:', admin.username);
  console.log('Password:', password);
  console.log('⚠️  Changez ce mot de passe en production !');
}

main()
  .catch((error) => {
    console.error('❌ Erreur:', error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
