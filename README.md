# Portfolio Next.js - FullStack Developer

Portfolio moderne développé avec Next.js 15, TypeScript, Tailwind CSS et Prisma.

## 🚀 Fonctionnalités

- ✅ **Frontend moderne** : Next.js 15 + TypeScript + Tailwind CSS
- ✅ **API intégrée** : Routes API Next.js
- ✅ **Base de données** : Prisma + PostgreSQL (Supabase - GRATUIT)
- ✅ **Authentification** : JWT
- ✅ **Internationalisation** : i18next (FR/EN)
- ✅ **Déploiement** : Vercel (serverless)
- ✅ **Gestion des projets** : CRUD complet
- ✅ **Formulaire de contact** : Avec upload de fichiers
- ✅ **Statut de disponibilité** : Gestion temps réel

## 📋 Prérequis

- Node.js 18+
- npm ou yarn
- Compte Supabase (base de données PostgreSQL - 100% GRATUIT)
- Compte Vercel (déploiement)

## 🛠️ Installation locale

1. **Cloner et installer les dépendances**
```bash
cd portfolio-nextjs
npm install
```

2. **Configurer les variables d'environnement**
```bash
cp .env.example .env.local
```

Éditez `.env.local` avec vos valeurs :
```env
# Base de données PlanetScale
DATABASE_URL="mysql://username:password@aws.connect.psdb.cloud/portfolio?sslaccept=strict"

# JWT Secret
JWT_SECRET="votre-secret-jwt-super-securise"

# Configuration Email
MAILER_FROM="votre-email@gmail.com"
MAILER_TO="contact@votre-site.com"
MAILER_PASSWORD="votre-mot-de-passe-app-gmail"

# Next.js
NEXTAUTH_SECRET="votre-secret-nextauth"
NEXTAUTH_URL="http://localhost:3000"
```

3. **Configurer la base de données**
```bash
# Générer le client Prisma
npx prisma generate

# Appliquer les migrations
npx prisma db push

# Créer un admin (optionnel)
npx prisma studio
```

4. **Lancer le serveur de développement**
```bash
npm run dev
```

Le site sera disponible sur http://localhost:3000

## 🌐 Déploiement sur Vercel

### Option 1 : Déploiement automatique avec Git

1. **Pousser votre code sur GitHub**
```bash
git add .
git commit -m "Initial Next.js portfolio"
git push origin main
```

2. **Connecter à Vercel**
- Aller sur [vercel.com](https://vercel.com)
- Importer votre projet GitHub
- Vercel détectera automatiquement Next.js

3. **Configurer les variables d'environnement**
Dans le dashboard Vercel :
```
DATABASE_URL = mysql://username:password@aws.connect.psdb.cloud/portfolio?sslaccept=strict
JWT_SECRET = votre-secret-jwt-super-securise
MAILER_FROM = votre-email@gmail.com
MAILER_TO = contact@votre-site.com
MAILER_PASSWORD = votre-mot-de-passe-app-gmail
NEXTAUTH_SECRET = votre-secret-nextauth
NEXTAUTH_URL = https://votre-site.vercel.app
```

### Option 2 : Déploiement avec CLI Vercel

```bash
# Installer Vercel CLI
npm install -g vercel

# Se connecter
vercel login

# Déployer
vercel --prod

# Configurer les variables d'environnement
vercel env add DATABASE_URL
vercel env add JWT_SECRET
vercel env add MAILER_FROM
vercel env add MAILER_TO
vercel env add MAILER_PASSWORD
```

## 🗄️ Configuration de la base de données

### PlanetScale (Recommandé)

1. **Créer un compte** sur [planetscale.com](https://planetscale.com)
2. **Créer une base de données** "portfolio"
3. **Récupérer l'URL de connexion** dans l'onglet "Connect"
4. **Configurer les branches** (main pour production, dev pour développement)

### Alternative : Supabase

```prisma
// Dans prisma/schema.prisma
datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}
```

## 📁 Structure du projet

```
portfolio-nextjs/
├── src/
│   ├── app/                    # App Router Next.js
│   │   ├── api/               # Routes API
│   │   │   ├── projects/      # API projets
│   │   │   ├── auth/          # API authentification
│   │   │   ├── contact/       # API contact
│   │   │   └── availability/  # API disponibilité
│   │   ├── layout.tsx         # Layout principal
│   │   └── page.tsx           # Page d'accueil
│   ├── components/            # Composants réutilisables
│   ├── contexts/              # Contextes React
│   ├── lib/                   # Utilitaires et configuration
│   ├── pages/                 # Pages de l'application
│   └── config/                # Configuration
├── prisma/
│   └── schema.prisma          # Schéma de base de données
├── public/                    # Assets statiques
└── vercel.json               # Configuration Vercel
```

## 🔧 Scripts disponibles

```bash
npm run dev          # Serveur de développement
npm run build        # Build de production
npm run start        # Serveur de production
npm run lint         # Linter ESLint
npx prisma studio    # Interface graphique base de données
npx prisma generate  # Générer le client Prisma
npx prisma db push   # Appliquer les migrations
```

## 🎨 Personnalisation

### Modifier les couleurs
Éditez `tailwind.config.js` pour personnaliser le thème.

### Ajouter des pages
1. Créer un fichier dans `src/app/[nom-page]/page.tsx`
2. Ajouter la route dans `src/components/Sidebar.tsx`

### Modifier les traductions
Éditez les fichiers dans `src/lib/locales/`

## 🚨 Dépannage

### Erreur de base de données
```bash
# Régénérer le client Prisma
npx prisma generate

# Réinitialiser la base de données
npx prisma db push --force-reset
```

### Erreur de build Vercel
- Vérifier les variables d'environnement
- S'assurer que `npm run build` fonctionne localement
- Consulter les logs de build dans Vercel

### Problème d'authentification
- Vérifier que `JWT_SECRET` est défini
- S'assurer qu'un admin existe en base de données

## 📞 Support

Pour toute question ou problème :
- Créer une issue sur GitHub
- Consulter la documentation [Next.js](https://nextjs.org/docs)
- Consulter la documentation [Vercel](https://vercel.com/docs)

## 📄 Licence

MIT License - Libre d'utilisation pour vos projets.