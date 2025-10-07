# 🚀 Quick Start - Déploiement Express

## ⚡ En 5 étapes (15 minutes)

### 1️⃣ **Créer Supabase** (3 min)
- Va sur https://supabase.com/
- Créer un compte (gratuit, pas de CB)
- "New Project" → Name: `portfolio-nextjs`, Region: `Europe (Frankfurt)`
- Note le mot de passe !

### 2️⃣ **Récupérer l'URL** (1 min)
- Settings → Database → Connection string (URI)
- Copie l'URL : `postgresql://postgres:PASSWORD@db.xxxxx.supabase.co:5432/postgres`
- Remplace `PASSWORD` par ton mot de passe

### 3️⃣ **Configuration locale** (5 min)
```bash
# Va dans le dossier Next.js
cd frontend/portfolio-nextjs

# Crée le fichier .env
echo "DATABASE_URL=postgresql://postgres:TON_PASSWORD@db.xxxxx.supabase.co:5432/postgres" > .env

# Installe les dépendances
npm install

# Crée les tables
npm run prisma:generate
npm run prisma:push

# Crée un admin
npm run create-admin

# Lance le serveur
npm run dev
```

### 4️⃣ **Pousser sur GitHub** (3 min)
```bash
# Depuis frontend/portfolio-nextjs
git init
git add .
git commit -m "Portfolio Next.js"
git remote add origin https://github.com/TON_USERNAME/portfolio-nextjs.git
git push -u origin main
```

### 5️⃣ **Déployer sur Vercel** (3 min)
1. Va sur https://vercel.com/
2. "Import Project" → Choisis ton repo GitHub
3. **AVANT de déployer** → "Environment Variables" :
   ```
   DATABASE_URL = ton-url-supabase
   JWT_SECRET = [générer avec: node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"]
   SMTP_HOST = smtp.gmail.com
   SMTP_PORT = 587
   SMTP_USER = ton-email@gmail.com
   SMTP_PASS = ton-mot-de-passe-app
   EMAIL_TO = ton-email@gmail.com
   ```
4. Clique sur "Deploy"

## ✅ C'est fini !

Ton portfolio est en ligne sur `https://ton-app.vercel.app` ! 🎉

### Pages accessibles :
- `/` - Accueil
- `/about` - À propos
- `/projects` - Projets
- `/contact` - Contact
- `/admin/login` - Connexion admin (sécurisée 🔒)
- `/admin` - Administration (nécessite authentification)

### Coût total : **0€/mois** 💸

---

## 🆘 Problème ?

Lis le guide complet : `DEPLOIEMENT_SUPABASE.md`
