# Farris Games - Installation Guide

## System Requirements

- **Browser**: Chrome, Firefox, Safari, Edge (latest versions)
- **RAM**: 512MB minimum
- **Storage**: 2MB for all files
- **Internet**: Not required (works offline)
- **Operating System**: Windows, macOS, Linux

## Installation Methods

## Method 1: Direct Download

1. **Download the repository**
   - Visit GitHub repository
   - Click "Code" → "Download ZIP"
   - Extract to desired location

2. **Open index.html**
   - Right-click index.html
   - Select "Open with" → Your browser
   - Enjoy!

## Method 2: Git Clone

### Prerequisites
- Git installed on your computer
- Terminal/Command Prompt access

### Steps
```bash
# Navigate to desired folder
cd Documents

# Clone the repository
git clone https://github.com/farrismaida9-droid/hello.git

# Navigate to project
cd hello

# Open in browser (macOS/Linux)
open index.html

# Open in browser (Windows)
start index.html
```

## Method 3: Local Server (Recommended)

### Python 3 (Built-in)
```bash
# Navigate to project folder
cd path/to/hello

# Start server
python -m http.server 8000

# Open browser to http://localhost:8000
```

### Python 2 (Legacy)
```bash
# Navigate to project folder  
cd path/to/hello

# Start server
python -m SimpleHTTPServer 8000

# Open browser to http://localhost:8000
```

### Node.js
```bash
# Install http-server globally (first time only)
npm install -g http-server

# Navigate to project folder
cd path/to/hello

# Start server
http-server

# Open browser to http://localhost:8080
```

### PHP (Built-in)
```bash
# Navigate to project folder
cd path/to/hello

# Start server
php -S localhost:8000

# Open browser to http://localhost:8000
```

### Ruby
```bash
# Navigate to project folder
cd path/to/hello

# Start server
ruby -run -ehttpd . -p8000

# Open browser to http://localhost:8000
```

## Method 4: IDE Setup

### Visual Studio Code
1. Install "Live Server" extension
2. Open project folder
3. Right-click index.html
4. Select "Open with Live Server"

### WebStorm/PhpStorm
1. Open project
2. Right-click index.html  
3. Select "Run"
4. Browser opens automatically

### Sublime Text
1. Install SublimeServer plugin
2. Open project
3. Tools → SublimeServer → Start Server

## File Structure Check

After installation, verify this structure:

```
hello/
├── index.html          (Main file)
├── style.css           (Styling)
├── script.js           (Game logic)
├── README.md           (Documentation)
├── INSTALLATION.md     (This file)
├── DEPLOYMENT.md       (Deployment guide)
└── games/              (Game files)
    ├── games-data.js   (500+ games)
    ├── tictactoe/
    │   └── tictactoe.js
    ├── snake/
    │   └── snake.js
    └── memory/
        └── memory.js
```

**All files must be present for proper functionality.**

## Verification

### Test Checklist
- [ ] index.html opens in browser
- [ ] Page loads without errors
- [ ] Navigation menu visible
- [ ] All buttons clickable
- [ ] Dark mode toggle works
- [ ] Sound toggle works
- [ ] Games load in modal
- [ ] No console errors (F12)

## Troubleshooting

### Blank Page
- Clear browser cache (Ctrl+Shift+Delete)
- Try different browser
- Check browser console (F12)
- Verify all files are in place

### Styling Not Showing
- Check style.css exists in root
- Clear browser cache
- Hard refresh (Ctrl+F5)
- Check file permissions

### Games Not Loading
- Check games folder exists
- Verify game files are present
- Check browser console for errors
- Try local server instead of file://

### Server Won't Start
- Port 8000 might be in use
- Try different port: `python -m http.server 8080`
- Check if required tool is installed
- Run with administrator/sudo if needed

### Mobile Not Working
- Use local server (not file://)
- Connect to same WiFi
- Visit http://YOUR_IP:8000
- Test on multiple devices

## First Launch

1. **Open index.html** in your browser
2. **Explore the interface**
   - Browse 500+ games
   - Check out featured games
   - Try playable games

3. **Test Features**
   - Toggle dark mode
   - Toggle sound
   - Search for games
   - Filter by category

4. **Play Games**
   - Click on Tic Tac Toe
   - Click on Snake
   - Click on Memory Match

5. **Check Leaderboard**
   - Scroll to leaderboard
   - Your scores appear here

## Getting Help

### Before Asking
1. Check this guide
2. Review README.md
3. Check browser console (F12 → Console)
4. Try different browser
5. Clear cache and retry

### Where to Get Help
- GitHub Issues: Report problems
- Browser Console: Debug errors
- README.md: Feature questions
- Deployment Guide: Hosting questions

## Next Steps

1. ✅ Install and verify
2. ✅ Explore the interface
3. ✅ Play the games
4. ✅ Check leaderboard
5. ✅ Deploy online (see DEPLOYMENT.md)

## Updating

### Via Git
```bash
cd path/to/hello
git pull origin main
```

### Manual Update
1. Download latest version
2. Backup your leaderboard data:
   - Open DevTools (F12)
   - Application → Local Storage
   - Copy data
3. Replace files
4. Restore local storage if needed

## Frequently Asked Questions

**Q: Do I need an internet connection?**
A: No! The game works completely offline after loading.

**Q: Can I play on my phone?**
A: Yes! Use a local server and visit from your phone's browser.

**Q: How do I add my own games?**
A: Edit games-data.js to add game entries, then create game logic in script.js.

**Q: Will my scores be saved?**
A: Yes! Scores save locally on your device using localStorage.

**Q: Can I modify the design?**
A: Absolutely! Edit style.css to customize colors and styling.

## Performance Tips

- Use a modern browser (Chrome, Firefox, Edge)
- Close unnecessary tabs
- Disable browser extensions if games stutter
- Use wired connection for local server
- Update your browser regularly

## Backup Your Data

To backup leaderboard scores:

1. Open DevTools (F12)
2. Go to Application tab
3. Click Local Storage
4. Take a screenshot of scores
5. Can also export as text

---

**Installation Complete! Enjoy Farris Games! 🎮**
