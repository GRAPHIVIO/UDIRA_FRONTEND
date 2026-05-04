# UDIRA SMS - Deployment Guide

## Local Deployment (Development)

### Prerequisites
- Node.js 16+ installed
- npm or yarn

### Steps

1. **Clone/Navigate to frontend directory**
   ```bash
   cd UDIRA_FRONTEND
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```

4. **Access application**
   - Open browser: http://localhost:3000
   - Dashboard loads with mock data

## Production Deployment

### Build Application

```bash
npm run build
```

This generates an optimized production build in the `dist/` folder.

### Deploy to Web Server

#### Option 1: Deploy to Static Hosting (Netlify, Vercel, GitHub Pages)

**Netlify:**
```bash
npm install -g netlify-cli
netlify login
netlify deploy --prod --dir=dist
```

**Vercel:**
```bash
npm install -g vercel
vercel
```

#### Option 2: Traditional Server (Apache, Nginx)

1. Upload `dist/` folder contents to your web server
2. Configure server to serve `index.html` for all routes (SPA routing)

**Nginx Configuration:**
```nginx
server {
    listen 80;
    server_name your-domain.com;

    root /var/www/udira/dist;
    index index.html;

    location / {
        try_files $uri /index.html;
    }
}
```

**Apache (.htaccess in dist/):**
```apache
<IfModule mod_rewrite.c>
    RewriteEngine On
    RewriteBase /
    RewriteRule ^index\.html$ - [L]
    RewriteCond %{REQUEST_FILENAME} !-f
    RewriteCond %{REQUEST_FILENAME} !-d
    RewriteRule . /index.html [L]
</IfModule>
```

#### Option 3: Docker Deployment

**Create Dockerfile:**
```dockerfile
FROM node:18-alpine as build
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

FROM nginx:alpine
COPY --from=build /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
```

**Build and run:**
```bash
docker build -t udira-sms .
docker run -p 80:80 udira-sms
```

### Backend Integration

1. **Update API endpoint** in `vite.config.js`:
```javascript
server: {
  proxy: {
    '/api': {
      target: 'https://your-backend-domain.com',
      changeOrigin: true,
    }
  }
}
```

2. **Or update in** `src/services/api.js`:
```javascript
const API = axios.create({
  baseURL: 'https://your-backend-domain.com/api',
})
```

3. **Replace mock data** with API calls in page components

### Environment Variables

Create `.env` file:
```
VITE_API_URL=https://api.your-domain.com
VITE_APP_NAME=UDIRA School Management System
VITE_DEBUG=false
```

Access in code:
```javascript
const apiUrl = import.meta.env.VITE_API_URL
```

## Performance Optimization

### 1. Code Splitting
Vite automatically splits code. Add route-based splitting:

```javascript
// In App.jsx
const Dashboard = lazy(() => import('./pages/Dashboard'))
const Students = lazy(() => import('./pages/Students'))
```

### 2. Image Optimization
- Use WebP format for images
- Compress images using tools like ImageOptim
- Implement lazy loading for images

### 3. Bundle Analysis
```bash
npm install -D rollup-plugin-visualizer
```

Add to `vite.config.js`:
```javascript
import { visualizer } from 'rollup-plugin-visualizer'

export default {
  plugins: [
    visualizer({ open: true })
  ]
}
```

### 4. Minification
Enabled by default in production build

## Security Checklist

- [ ] Update API baseURL for production
- [ ] Enable HTTPS/SSL certificate
- [ ] Configure CORS properly
- [ ] Implement rate limiting
- [ ] Sanitize user inputs
- [ ] Use environment variables for sensitive data
- [ ] Implement authentication
- [ ] Add CSP headers
- [ ] Regular security audits

## Monitoring & Logging

### Setup Error Tracking (Sentry)

```bash
npm install @sentry/react
```

In `main.jsx`:
```javascript
import * as Sentry from "@sentry/react"

Sentry.init({
  dsn: "your-sentry-dsn",
  environment: process.env.NODE_ENV,
})
```

### Analytics (Google Analytics)

Add to `index.html`:
```html
<script async src="https://www.googletagmanager.com/gtag/js?id=GA_ID"></script>
```

## Continuous Deployment (CI/CD)

### GitHub Actions Example

Create `.github/workflows/deploy.yml`:
```yaml
name: Deploy

on:
  push:
    branches: [ main ]

jobs:
  build-and-deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - uses: actions/setup-node@v2
        with:
          node-version: 18
      - run: npm install
      - run: npm run build
      - name: Deploy to Production
        run: |
          # Your deployment commands here
```

## Troubleshooting

### Issue: Static files not loading in production
- Ensure `dist/` folder contents are correctly deployed
- Check server configuration for SPA routing
- Verify CORS headers

### Issue: API requests failing
- Verify backend is running
- Check CORS configuration
- Update API URL for production

### Issue: High bundle size
- Analyze with: `npm run analyze`
- Implement code splitting
- Remove unused dependencies
- Use lazy loading

## Rollback Procedure

Keep previous builds:
```bash
# Before deploying new build
cp -r dist/ dist_backup_$(date +%s)

# If needed, restore
cp -r dist_backup_<timestamp>/* dist/
```

## Maintenance

### Regular Updates
```bash
npm update
npm audit fix
```

### Backup Strategy
- Daily backups of application files
- Database backups (if applicable)
- Configuration backups

## Performance Metrics

Monitor key metrics:
- First Contentful Paint (FCP)
- Largest Contentful Paint (LCP)
- Cumulative Layout Shift (CLS)
- Time to Interactive (TTI)

Use tools:
- Lighthouse (built into Chrome DevTools)
- WebPageTest
- Google PageSpeed Insights

## Support & Maintenance

For issues during deployment:
1. Check error logs
2. Verify environment configuration
3. Test API connectivity
4. Review security settings

---

**Successfully Deployed?** 🎉

Your UDIRA School Management System is now live!
