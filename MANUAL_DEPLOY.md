# Manual Deployment to GitHub Pages (No GitHub Actions Required)

You can deploy the frontend to GitHub Pages **without using GitHub Actions**. Here are two free methods:

## Method 1: Manual Build & Deploy (Recommended - Completely Free)

### Step 1: Navigate to Your Project

**Option A: If you cloned the repository**
```bash
cd team-lineup
cd frontend
```

**Option B: If you're in the original project folder**
```bash
cd "/Users/martinezworldwide/Desktop/Zero Architecture Team Lineup Board/frontend"
```

**Option C: If you're starting fresh**
```bash
# Clone the repository first
git clone https://github.com/Martinezworldwide/team-lineup.git
cd team-lineup
cd frontend
```

### Step 2: Build the Frontend

```bash
npm install
npm run build
```

This creates a `dist/` folder with the built files.

### Step 2: Deploy to GitHub Pages

**Option A: Using `gh-pages` package (Easiest)**

1. Make sure you're in the frontend directory:
   ```bash
   # If you cloned the repo
   cd team-lineup/frontend
   
   # Or if in original project
   cd "/Users/martinezworldwide/Desktop/Zero Architecture Team Lineup Board/frontend"
   ```

2. Install gh-pages:
   ```bash
   npm install --save-dev gh-pages
   ```

3. The deploy script is already in `package.json`, so just run:
   ```bash
   npm run deploy
   ```

   This will:
   - Build the frontend (`npm run build`)
   - Deploy to GitHub Pages (`gh-pages -d dist`)

**Option B: Manual Git Push**

1. Create a `gh-pages` branch:
   ```bash
   git checkout --orphan gh-pages
   git rm -rf .
   cp -r frontend/dist/* .
   git add .
   git commit -m "Deploy to GitHub Pages"
   git push origin gh-pages
   ```

2. In GitHub Settings → Pages, select `gh-pages` branch as source.

### Step 3: Configure GitHub Pages

1. Go to repository Settings → Pages
2. Source: Select **Branch: gh-pages** (or **Branch: main** if using Option B)
3. Root: `/` (root directory)
4. Save

## Method 2: Use GitHub Pages with Static Files (No Build Needed)

If you want to avoid building entirely, you can:

1. Build locally: `cd frontend && npm run build`
2. Copy `dist/` contents to repository root
3. Push to `main` branch
4. GitHub Pages will serve from root

## Method 3: Use Netlify Drop (Alternative Free Hosting)

1. Go to https://app.netlify.com/drop
2. Drag and drop your `frontend/dist` folder
3. Get instant free hosting with HTTPS

## Which Method to Use?

- **Method 1 (gh-pages)**: Best for regular updates, automated
- **Method 2 (Static files)**: Simplest, manual updates
- **Method 3 (Netlify)**: Alternative if you want different hosting

## Important Notes

- GitHub Actions is **NOT required** for the app to function
- The app works perfectly fine with manual deployment
- All methods above are **completely free**
- You only need to deploy when you make frontend changes

## Update Process

When you make changes:

1. **Navigate to frontend directory:**
   ```bash
   # If you cloned the repo
   cd team-lineup/frontend
   
   # Or if in original project
   cd "/Users/martinezworldwide/Desktop/Zero Architecture Team Lineup Board/frontend"
   ```

2. **Build and deploy:**
   ```bash
   npm run deploy
   ```

3. Done! Your changes are live on GitHub Pages.

No GitHub Actions needed!

## Full Example Workflow

```bash
# 1. Clone the repository (first time only)
git clone https://github.com/Martinezworldwide/team-lineup.git
cd team-lineup

# 2. Go into frontend folder
cd frontend

# 3. Install dependencies (first time only)
npm install

# 4. Install gh-pages (first time only)
npm install --save-dev gh-pages

# 5. Make your code changes...

# 6. Deploy (every time you make changes)
npm run deploy
```
