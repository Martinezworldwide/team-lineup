# GitHub Actions Workflow Setup

To enable automatic deployment to GitHub Pages, create this workflow file:

**Path**: `.github/workflows/deploy-frontend.yml`

**Content**:
```yaml
name: Deploy Frontend to GitHub Pages

on:
  push:
    branches:
      - main
    paths:
      - 'frontend/**'

jobs:
  deploy:
    runs-on: ubuntu-latest
    permissions:
      contents: write
    
    steps:
      - name: Checkout
        uses: actions/checkout@v3

      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '18'
          cache: 'npm'
          cache-dependency-path: frontend/package-lock.json

      - name: Install dependencies
        working-directory: ./frontend
        run: npm ci

      - name: Build
        working-directory: ./frontend
        env:
          VITE_API_URL: ${{ secrets.VITE_API_URL }}
        run: npm run build

      - name: Deploy to GitHub Pages
        uses: peaceiris/actions-gh-pages@v3
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
          publish_dir: ./frontend/dist
```

## Setup Instructions

1. Go to your repository: https://github.com/Martinezworldwide/team-lineup
2. Click "Add file" → "Create new file"
3. Create the path: `.github/workflows/deploy-frontend.yml`
4. Paste the content above
5. Commit the file

## Environment Variable Setup

1. Go to repository Settings → Secrets and variables → Actions
2. Add secret: `VITE_API_URL` with your Render backend URL (e.g., `https://your-backend.onrender.com`)

## Enable GitHub Pages

1. Go to repository Settings → Pages
2. Source: Select **GitHub Actions**
3. Save

The workflow will automatically deploy on every push to main branch.
