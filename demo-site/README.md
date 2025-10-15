# Grand Theft Cardio - Demo Site

Sito di presentazione per il progetto Grand Theft Cardio - Assignment 3, Game+.

## 📁 Struttura File

```
demo-site/
├── index.html          # Pagina principale
├── styles.css          # Stili
├── script.js           # JavaScript interattivo
├── videos/             # Cartella per i video demo
│   ├── main-demo.mp4
│   ├── pre-run-setup.mp4
│   ├── running-demo.mp4
│   └── post-run-stats.mp4
├── thumbnails/         # Immagini di anteprima per i video
│   ├── main-demo.jpg
│   ├── pre-run.jpg
│   ├── running.jpg
│   └── post-run.jpg
└── screenshots/        # Screenshot dell'app
    ├── map-view.jpg
    ├── run-stats.jpg
    ├── leaderboard.jpg
    └── achievements.jpg
```

## 🎥 Come Integrare i Vostri Video

### Opzione 1: Video Locali (Consigliato per Demo)

1. **Crea le cartelle necessarie:**
   ```bash
   mkdir videos thumbnails screenshots
   ```

2. **Aggiungi i tuoi video:**
   - Registra i video dell'app in uso (anche con lo schermo del telefono)
   - Salva i video in formato .mp4 nella cartella `videos/`
   - Nomina i file come indicato sopra

3. **Crea thumbnail (opzionale ma consigliato):**
   - Fai uno screenshot del primo frame di ogni video
   - Salva come .jpg nella cartella `thumbnails/`
   - I thumbnail si vedono prima che il video inizi

### Opzione 2: Video da YouTube

1. **Carica i video su YouTube** (anche come unlisted se non vuoi che siano pubblici)

2. **Nel file `index.html`, commenta il tag `<video>` e usa invece:**
   ```html
   <iframe src="https://www.youtube.com/embed/VIDEO_ID" 
           frameborder="0" 
           allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
           allowfullscreen>
   </iframe>
   ```

3. **Sostituisci `VIDEO_ID`** con l'ID del tuo video YouTube
   - Esempio: se l'URL è `https://youtube.com/watch?v=abc123`
   - L'ID è `abc123`

### Opzione 3: Video da Vimeo

```html
<iframe src="https://player.vimeo.com/video/VIDEO_ID" 
        frameborder="0" 
        allow="autoplay; fullscreen; picture-in-picture" 
        allowfullscreen>
</iframe>
```

## 📱 Tipi di Video Consigliati

### 1. Main Demo (2-5 minuti)
- Panoramica completa dell'app
- Mostra tutte le funzionalità principali
- Include pre-run, running, e post-run

### 2. Pre-Run Setup (30-60 secondi)
- Come si seleziona la modalità di gioco
- Come si pianifica la route
- Interfaccia pre-corsa

### 3. During the Run (1-2 minuti)
- Schermo del telefono/smartwatch mentre corri
- Cattura territorio in tempo reale
- Notifiche e feedback

### 4. Post-Run Stats (30-60 secondi)
- Schermata riassuntiva
- Statistiche e territori conquistati
- Condivisione social

## 📸 Screenshot dell'App

Aggiungi screenshot nella cartella `screenshots/`:

1. **map-view.jpg** - Vista della mappa con territori colorati
2. **run-stats.jpg** - Schermata delle statistiche durante la corsa
3. **leaderboard.jpg** - Classifica locale/globale
4. **achievements.jpg** - Badge e achievement sbloccati

## 🎬 Suggerimenti per Registrare i Video

### Registrazione Schermo Mobile:
- **iOS**: Aggiungi "Registrazione Schermo" al Control Center
- **Android**: Usa il registratore integrato o app come AZ Screen Recorder

### Durante la Corsa:
- Usa una fascia da braccio per tenere stabile il telefono
- Registra in orientamento verticale (9:16) per video più naturali
- Alterna tra vista telefono e vista "soggettiva" mentre corri

### Editing (opzionale):
- **iMovie** (iOS/Mac) - facile e gratis
- **CapCut** - gratis, multi-piattaforma
- **DaVinci Resolve** - professionale, gratis

### Compressione Video:
Se i video sono troppo grandi:
```bash
# Con ffmpeg (installa con: brew install ffmpeg)
ffmpeg -i input.mp4 -vcodec h264 -acodec mp2 output.mp4
```

O usa servizi online come:
- https://www.freeconvert.com/video-compressor
- https://www.media.io/video-compressor.html

## 🌐 Come Visualizzare il Sito

### Opzione 1: Aprire il file direttamente
Fai doppio click su `index.html` (alcuni browser potrebbero bloccare i video locali)

### Opzione 2: Server locale (consigliato)

**Python:**
```bash
cd demo-site
python3 -m http.server 8000
```
Poi apri: http://localhost:8000

**Node.js:**
```bash
npx http-server demo-site
```

**VS Code Live Server:**
- Installa l'estensione "Live Server"
- Click destro su `index.html` > "Open with Live Server"

## 🎨 Personalizzazione

### Cambiare i Colori:
Modifica le variabili CSS in `styles.css`:
```css
:root {
    --primary-color: #6366f1;  /* Colore principale */
    --secondary-color: #10b981; /* Territorio conquistato */
    --danger-color: #ef4444;    /* Territorio nemico */
}
```

### Aggiungere Contenuti:
Il sito è strutturato in sezioni HTML facilmente modificabili:
- `#hero` - Intro e CTA
- `#demo` - Video dimostrativi
- `#features` - Caratteristiche
- `#how-it-works` - Come funziona
- `#theory` - Basi teoriche

## 📊 Analytics (Opzionale)

Il file `script.js` già traccia:
- Quando i video vengono riprodotti
- Quando i video vengono completati
- Scroll e interazioni

Per vedere i log: apri Developer Console (F12) > Console

## 🚀 Deploy (Opzionale)

Se vuoi pubblicare il sito online:

### GitHub Pages (gratis):
1. Crea un repository su GitHub
2. Fai push della cartella `demo-site`
3. Settings > Pages > Deploy from branch

### Netlify (gratis):
1. Registrati su netlify.com
2. Drag & drop la cartella `demo-site`
3. Ottieni un URL pubblico

### Vercel (gratis):
1. Registrati su vercel.com
2. Importa da GitHub o upload diretto
3. Deploy automatico

## ✅ Checklist Pre-Presentazione

- [ ] Tutti i video sono nella cartella `videos/`
- [ ] I thumbnail sono nella cartella `thumbnails/`
- [ ] Gli screenshot sono nella cartella `screenshots/`
- [ ] I video si riproducono correttamente
- [ ] Il sito è responsive (prova su mobile)
- [ ] Tutti i link funzionano
- [ ] Non ci sono errori nella console
- [ ] Il sito si carica velocemente

## 📝 Note

- I video .mp4 funzionano meglio (compatibilità universale)
- Risoluzione consigliata: 1920x1080 (Full HD)
- Frame rate: 30fps o 60fps
- Bitrate: 5-10 Mbps per buona qualità
- Formato verticale (9:16) per video mobile
- Audio: non essenziale, ma migliora l'esperienza

## 🆘 Problemi Comuni

**I video non si riproducono:**
- Controlla che i file siano in formato .mp4
- Verifica i percorsi dei file in `index.html`
- Usa un server locale invece di aprire direttamente il file

**Il sito è troppo lento:**
- Comprimi i video (target: <50MB per video)
- Ottimizza le immagini (usa JPG invece di PNG)
- Considera YouTube per video lunghi

**I video si vedono male su mobile:**
- Registra in verticale (9:16)
- Usa risoluzione almeno 720p
- Testa su device reali

## 🎓 Contesto Accademico

Questo sito è parte dell'Assignment 3 per il corso Game+ (NTNU, Fall 2025).
Il progetto applica teorie di gamification (Dual-Flow Model, SDT, GameFlow, Malone's Framework) 
per creare un exergame che motiva l'attività fisica attraverso la conquista territoriale.

---

**Buona fortuna con la presentazione! 🏃💨**
