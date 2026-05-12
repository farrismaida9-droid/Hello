# Farris Games - Deployment Guide

## Quick Start

Farris Games is ready to deploy! No build process needed.

## GitHub Pages (Recommended)

### Step 1: Enable GitHub Pages
1. Go to your repository settings
2. Scroll to "GitHub Pages" section
3. Select "main" branch as source
4. Click Save
5. Your site will be live at `https://yourusername.github.io/hello/`

### Step 2: Wait for deployment
- GitHub Pages will deploy automatically
- First deployment takes ~1 minute
- You'll see a green checkmark when complete

## Other Deployment Methods

### Netlify
```bash
# Install Netlify CLI
npm install -g netlify-cli

# Deploy
netlify deploy --prod
```

Or use web interface:
1. Go to netlify.com
2. Click "New site from Git"
3. Connect GitHub account
4. Select repository
5. Deploy

### Vercel
```bash
# Install Vercel CLI
npm install -g vercel

# Deploy
vercel --prod
```

### Firebase Hosting
```bash
# Install Firebase CLI
npm install -g firebase-tools

# Initialize
firebase init hosting

# Deploy
firebase deploy
```

### Traditional Hosting

1. **Upload files via FTP**
   - Connect to your hosting via FTP client
   - Upload all files to public_html folder
   - Keep folder structure intact

2. **Upload via hosting control panel**
   - Use File Manager in cPanel/Plesk
   - Upload all files
   - Keep folder structure

3. **Use hosting's Git integration**
   - Many hosts support GitHub integration
   - Connect and deploy automatically

## File Structure for Deployment

```
Public folder:
├── index.html
├── style.css
├── script.js
├── games/
│   ├── games-data.js
│   ├── tictactoe/
│   │   └── tictactoe.js
│   ├── snake/
│   │   └── snake.js
│   └── memory/
│       └── memory.js
└── README.md
```

## Custom Domain Setup

### GitHub Pages Custom Domain
1. Buy domain from registrar (GoDaddy, Namecheap, etc.)
2. Add CNAME file to repository root:
   ```
   yourdomain.com
   ```
3. Go to repository settings
4. Set custom domain
5. Update DNS records at registrar:
   ```
   CNAME yourusername.github.io
   ```

### Other Hosts
Follow your hosting provider's custom domain instructions.

## SSL/HTTPS

- **GitHub Pages** - Automatic HTTPS
- **Netlify** - Automatic HTTPS
- **Vercel** - Automatic HTTPS
- **Firebase** - Automatic HTTPS
- **Traditional Hosting** - Usually requires Let's Encrypt (free) or purchased certificate

## Testing Before Deployment

### Local Testing
```bash
# Python 3
python -m http.server 8000

# Python 2
python -m SimpleHTTPServer 8000

# Node.js
npx http-server
```

### Check List
- [ ] All games load without errors
- [ ] Dark mode toggle works
- [ ] Sound toggle works
- [ ] Leaderboard saves scores
- [ ] Mobile responsive design
- [ ] Navigation menu works
- [ ] No broken links
- [ ] All CSS loads correctly

## Performance Optimization

### Already Optimized
✅ No external dependencies
✅ No build process needed
✅ Single HTML file
✅ Optimized CSS (17KB)
✅ Efficient JavaScript
✅ No image files needed
✅ Emoji for icons (no image requests)

### Optional Further Optimization
1. Minify CSS/JS (if desired)
2. Add GZIP compression (usually server default)
3. Set cache headers

## Troubleshooting Deployment

### Files Not Found (404)
- Ensure folder structure is correct
- Check file names (case-sensitive on Linux servers)
- Verify all files are uploaded

### Styles Not Loading
- Check style.css is in root directory
- Verify CSS file name matches index.html link
- Clear browser cache

### Games Not Working
- Check all game files are uploaded
- Verify games folder structure
- Check browser console for errors

### Mobile Responsive Issues
- Clear device cache
- Check viewport meta tag in HTML
- Test on multiple devices

## Monitoring

### Check Site Status
- Visit your live URL
- Test on mobile (use Chrome DevTools)
- Check browser console for errors
- Test all games

### Analytics (Optional)
Add to index.html (before closing </head>):
```html
<!-- Google Analytics Example -->
<script async src="https://www.googletagmanager.com/gtag/js?id=GA_ID"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'GA_ID');
</script>
```

## Continuous Deployment

### GitHub Pages (Automatic)
- Every push to main branch triggers deployment
- Takes 1-2 minutes
- No additional setup needed

### Netlify (Automatic)
- Connect GitHub account
- Every push to main deploys automatically
- Can add build hooks for custom builds

### Vercel (Automatic)
- Connect GitHub account  
- Every push deploys automatically
- Environment variables can be configured

## Rollback Procedures

### GitHub Pages
```bash
git revert <commit-hash>
git push origin main
```

### Netlify/Vercel
- Use web dashboard to see deployment history
- Click on previous deployment to restore

## Next Steps

1. ✅ Deploy to GitHub Pages (1 minute)
2. ✅ Test live site
3. ✅ Share with friends and family
4. ✅ Consider adding more games
5. ✅ Set up custom domain (optional)

## Support

For deployment issues:
1. Check this guide
2. Check platform-specific documentation
3. Create GitHub issue
4. Contact support

---

**Your site is ready to deploy! 🚀**
