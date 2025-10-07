# Portfolio Next.js - FullStack Developer

Portfolio moderne développé avec Next.js 15, TypeScript, Tailwind CSS et Prisma.

## 🚀 Fonctionnalités

- ✅ **Frontend moderne** : Next.js 15 + TypeScript + Tailwind CSS
- ✅ **API intégrée** : Routes API Next.js
- ✅ **Base de données** : Prisma + PostgreSQL (Supabase)
- ✅ **Authentification** : JWT
- ✅ **Internationalisation** : i18next (FR/EN)
- ✅ **Déploiement** : Vercel (serverless)
- ✅ **Gestion des projets** : CRUD complet
- ✅ **Formulaire de contact** : Avec upload de fichiers + Email SMTP
- ✅ **Statut de disponibilité** : Gestion temps réel

## 📋 Prérequis

- Node.js 18+
- npm ou yarn
- Compte Supabase (base de données PostgreSQL gratuit)
- Compte Vercel (déploiement gratuit)

## 🛠️ Installation locale

### ⚡ Démarrage Rapide (15 minutes)

**📖 Lisez d'abord : [`DEMARRAGE_RAPIDE.md`](./DEMARRAGE_RAPIDE.md)** pour un guide complet étape par étape.

### Installation en 4 étapes

1. **Installer les dépendances**
```bash
cd portfolio-nextjs
npm install
```

2. **Configurer les variables d'environnement**
```bash
# Copier le modèle
cp env.example .env

# Éditer .env avec vos vraies valeurs
# Voir VARIABLES_ENVIRONNEMENT.md pour obtenir chaque variable
```

3. **Initialiser la base de données**
```bash
npm run prisma:generate
npm run prisma:push
npm run create-admin
```

4. **Lancer le serveur**
```bash
npm run dev
```

Le site sera disponible sur http://localhost:3000

### 📚 Documentation Complète

| Document | Description |
|----------|-------------|
| **[DEMARRAGE_RAPIDE.md](./DEMARRAGE_RAPIDE.md)** | Guide de déploiement en 15 minutes |
| **[GUIDE_DEPLOIEMENT.md](./GUIDE_DEPLOIEMENT.md)** | Guide détaillé complet avec captures |
| **[VARIABLES_ENVIRONNEMENT.md](./VARIABLES_ENVIRONNEMENT.md)** | Liste de toutes les variables et comment les obtenir |
| **[VARIABLES_RESUME.txt](./VARIABLES_RESUME.txt)** | Résumé visuel des variables (checklist) |
| **[SECURITE.md](./SECURITE.md)** | Bonnes pratiques de sécurité |

## 🌐 Déploiement sur Vercel + Supabase

### 🚀 Guides Complets Disponibles

**📘 Guide Détaillé** : [`GUIDE_DEPLOIEMENT.md`](./GUIDE_DEPLOIEMENT.md)  
**⚡ Guide Rapide** : [`DEMARRAGE_RAPIDE.md`](./DEMARRAGE_RAPIDE.md)  
**🔧 Variables** : [`VARIABLES_ENVIRONNEMENT.md`](./VARIABLES_ENVIRONNEMENT.md)

### Déploiement en 6 étapes

1. **Créer une base de données Supabase** (gratuit)
   - Allez sur [supabase.com](https://supabase.com)
   - Créez un projet → Europe (Frankfurt)
   - Récupérez DATABASE_URL et DIRECT_URL

2. **Configurer localement**
   ```bash
   cp env.example .env
   # Éditez .env avec vos valeurs
   npm install
   npm run prisma:generate
   npm run prisma:push
   npm run create-admin
   ```

3. **Pousser sur GitHub**
   ```bash
   git add .
   git commit -m "Portfolio ready"
   git push origin main
   ```

4. **Importer sur Vercel**
   - [vercel.com](https://vercel.com) → Import Project

5. **Ajouter les variables d'environnement**
   - DATABASE_URL (avec pgbouncer)
   - DIRECT_URL
   - JWT_SECRET
   - SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS
   - EMAIL_TO

6. **Déployer** 🎉

### 💰 Coût : 0€/mois

- **Vercel Free** : Parfait pour un portfolio
- **Supabase Free** : 500 MB gratuit

## 🗄️ Base de Données Supabase

Le projet est configuré pour **PostgreSQL** via Supabase :

```prisma
datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
  directUrl = env("DIRECT_URL")
}
```

**Avantages Supabase** :
- ✅ Gratuit jusqu'à 500 MB
- ✅ Backups automatiques
- ✅ Interface graphique intégrée
- ✅ API REST auto-générée
- ✅ Compatible Vercel Serverless

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
npm run dev               # Serveur de développement
npm run build             # Build de production
npm run start             # Serveur de production
npm run lint              # Linter ESLint

npm run prisma:generate   # Générer le client Prisma
npm run prisma:push       # Appliquer les migrations
npm run prisma:studio     # Interface graphique base de données
npm run create-admin      # Créer un compte administrateur

npm run setup             # Installation complète (generate + push + create-admin)
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

### "Database connection failed"
```bash
# Vérifiez vos URLs Supabase
# DATABASE_URL doit avoir port 6543 + ?pgbouncer=true
# DIRECT_URL doit avoir port 5432 sans pgbouncer
```

### "Prisma Client not generated"
```bash
npm run prisma:generate
npm run build
```

### "SMTP Authentication failed"
→ Pour Gmail, utilisez un **mot de passe d'application**, pas votre mot de passe normal  
→ Voir [`VARIABLES_ENVIRONNEMENT.md`](./VARIABLES_ENVIRONNEMENT.md) section SMTP_PASS

### "Build failed on Vercel"
- Vérifiez que toutes les variables sont dans Vercel (Settings → Environment Variables)
- Vérifiez que DATABASE_URL est configuré
- Consultez les logs de build dans Vercel

### Autres problèmes
Consultez [`GUIDE_DEPLOIEMENT.md`](./GUIDE_DEPLOIEMENT.md) section "Dépannage"

## 📞 Support

**📚 Documentation Complète** :
- [GUIDE_DEPLOIEMENT.md](./GUIDE_DEPLOIEMENT.md) - Guide détaillé
- [VARIABLES_ENVIRONNEMENT.md](./VARIABLES_ENVIRONNEMENT.md) - Variables d'environnement
- [SECURITE.md](./SECURITE.md) - Bonnes pratiques

**Ressources externes** :
- [Documentation Next.js](https://nextjs.org/docs)
- [Documentation Vercel](https://vercel.com/docs)
- [Documentation Supabase](https://supabase.com/docs)
- [Documentation Prisma](https://www.prisma.io/docs)

## 📄 Licence

MIT License - Libre d'utilisation pour vos projets.