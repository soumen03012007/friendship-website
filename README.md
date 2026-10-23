# A Little Teddy for You 🧸💗
### Cute Teddy Bear Apology & Friendship Website

A handcrafted, interactive, responsive React website created to apologize sincerely, make your favorite person smile, and celebrate friendship through cute teddy bears, playful pranks, a playable mini-game, and emotional animations.

---

## ✨ Features & Flow

1. **Screen 1: Welcome Page**
   - *"Hey... I Know You're Angry ♡"*
   - Animated teddy bear holding a glowing red heart.
   - Floating hearts, gentle sparkles, and soft animated pastel background.
   - "Start Our Little Adventure →" button.

2. **Screen 2: Choose Your Mood**
   - Four interactive emotion cards: 😡 Still Angry, 😢 Feeling Sad, 🙈 Just Ignoring Me, 😒 Just a Little Annoyed.
   - Expressive teddy animations and specific custom responses for each mood.

3. **Screen 3: The Sincere Apology**
   - Large *"Sorry"* heart held by teddy.
   - Genuine, warm apology message.
   - 5-card interactive message carousel with Previous / Next navigation and indicators.

4. **Screen 4: Fun Surprise**
   - Mischievous peeking teddy behind a gift card.
   - "Show Me the Surprise!" button with pastel confetti burst and smile guarantee card.

5. **Screen 5: Teddy Prank**
   - *"Surprise! You Got Pranked! 😂"*
   - Cute dancing teddy in a banana costume: *"I'm a banana now! 🍌"*
   - Includes 3 different harmless, family-friendly pranks with interactive switch buttons.

6. **Screen 6: Sweet Reminder**
   - 5 animated heart bullets celebrating how special, beautiful, and important she is.
   - Teddy sitting and gazing at a scenic pastel sunset landscape.

7. **Screen 7: Catch the Hearts Mini-Game 💖**
   - Real, playable 30-second mini-game with live score and countdown timer.
   - Tap falling and floating hearts (+3 bonus points for catching rare teddy icons!).
   - Final score celebration screen with custom badge and replay controls.

8. **Screen 8: You're Special**
   - *"You're My Favorite Person 💗"*
   - Teddy hugging a giant heart surrounded by ambient floating mini-hearts.

9. **Screen 9: Beautiful Ending**
   - Dreamy night sky with twinkling stars, glowing moon, and romantic sunset horizon.
   - Two adorable teddy bears sitting side by side.
   - Interactive **"End ♡"** button triggers a warm embrace, floating hearts, and soft pink glow.
   - "Back to Beginning 🧸" button to replay the adventure anytime.

10. **Quick Extras Section 🎁**
    - Accessible at any time via the top header pill button.
    - **Funny Jokes:** 12 family-friendly bear jokes with reveal punchline buttons.
    - **Teddy Messages:** 10 comforting, adorable teddy messages.
    - **Friendship Quotes:** 11 heartfelt quotes.
    - **Random Pranks:** 6 harmless silly surprises.

---

## 🛠️ Technology Stack

- **React 18** with **Vite**
- **JavaScript (ES Modules)**
- **Framer Motion** for smooth transitions and interactive gestures
- **Canvas-Confetti** for celebration bursts
- **Lucide React** for cute, accessible icons
- **Pure Web Audio API Synthesizer** (chimes, pops, lullaby arpeggios, zero external audio dependencies, muted by default)
- **CSS3 & SVG Illustrations** for handcrafted, scalable vector teddy bears and responsive cards

---

## 🚀 Getting Started

### 1. Prerequisites
- **Node.js** (v18 or higher)
- **npm** (comes with Node.js)

### 2. Install Dependencies
```bash
npm install
```

### 3. Run Locally in Development Mode
```bash
npm run dev
```
Open your browser and navigate to:
```
http://localhost:5173
```

### 4. Build for Production
```bash
npm run build
```
The optimized production files will be built inside the `dist/` directory.

### 5. Preview Production Build
```bash
npm run preview
```

---

## 🌐 Free Online Deployment

### Option A: Deploy to Vercel (Recommended - 1 Click)
1. Push this repository to **GitHub**.
2. Go to [vercel.com](https://vercel.com) and log in with GitHub.
3. Click **"Add New Project"** and import `Friendship-Website`.
4. Leave default settings (Vite is automatically detected).
5. Click **"Deploy"**. Your website is live with a free SSL `.vercel.app` URL!

### Option B: Deploy to Netlify
1. Go to [netlify.com](https://netlify.com) and log in.
2. Drag and drop the `dist/` folder directly onto Netlify Drop, **or** connect your GitHub repo.
3. Build command: `npm run build`
4. Publish directory: `dist`
5. Click **"Deploy"**.

### Option C: GitHub Pages
1. In `vite.config.js`, set `base: '/<repository-name>/'`.
2. Run `npm run build`.
3. Deploy the `dist` folder to the `gh-pages` branch using `npx gh-pages -d dist`.

---

## 🎨 How to Customize

- **Change Apology Messages & Quotes:** Edit [src/data/messages.js](file:///d:/project0/Friendship-Website/src/data/messages.js).
- **Add or Modify Jokes:** Edit [src/data/jokes.js](file:///d:/project0/Friendship-Website/src/data/jokes.js).
- **Edit Pranks:** Edit [src/data/pranks.js](file:///d:/project0/Friendship-Website/src/data/pranks.js).
- **Change Colors:** Modify CSS variables in [src/styles/global.css](file:///d:/project0/Friendship-Website/src/styles/global.css) (`--soft-pink`, `--rose-pink`, `--cream`, etc.).
- **Customize Teddy Expressions:** Check out [src/components/Teddy.jsx](file:///d:/project0/Friendship-Website/src/components/Teddy.jsx).
