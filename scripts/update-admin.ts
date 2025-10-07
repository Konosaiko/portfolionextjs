import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';
import readline from 'readline';

const prisma = new PrismaClient();

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

function question(query: string): Promise<string> {
  return new Promise((resolve) => {
    rl.question(query, resolve);
  });
}

async function main() {
  console.log('🔐 Configuration de votre compte administrateur\n');

  // Demander le username
  const username = await question('Nom d\'utilisateur (appuyez sur Entrée pour "admin"): ');
  const finalUsername = username.trim() || 'admin';

  // Demander le mot de passe
  const password = await question('Mot de passe (minimum 8 caractères): ');
  
  if (password.length < 8) {
    console.log('❌ Le mot de passe doit contenir au moins 8 caractères !');
    rl.close();
    process.exit(1);
  }

  // Confirmer le mot de passe
  const confirmPassword = await question('Confirmez le mot de passe: ');
  
  if (password !== confirmPassword) {
    console.log('❌ Les mots de passe ne correspondent pas !');
    rl.close();
    process.exit(1);
  }

  console.log('\n🔧 Création/Mise à jour de l\'administrateur...');

  // Hasher le mot de passe
  const hashedPassword = await bcrypt.hash(password, 10);

  // Vérifier si un admin existe déjà
  const existingAdmin = await prisma.admin.findUnique({
    where: { username: finalUsername },
  });

  if (existingAdmin) {
    // Mettre à jour
    await prisma.admin.update({
      where: { username: finalUsername },
      data: { password: hashedPassword },
    });
    console.log('✅ Mot de passe mis à jour avec succès !');
  } else {
    // Créer
    await prisma.admin.create({
      data: {
        username: finalUsername,
        password: hashedPassword,
      },
    });
    console.log('✅ Administrateur créé avec succès !');
  }

  console.log('\n📝 Vos identifiants de connexion:');
  console.log('Username:', finalUsername);
  console.log('Password: ******** (celui que vous avez saisi)');
  console.log('\n🔗 Connectez-vous sur: http://localhost:3000/admin/login');

  rl.close();
}

main()
  .catch((error) => {
    console.error('❌ Erreur:', error);
    rl.close();
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

