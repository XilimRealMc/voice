# 🎙️ Discord VC Bot

Bot Discord sederhana dengan slash command untuk join/leave voice channel. Deploy-ready untuk Railway.

## Commands

| Command | Deskripsi |
|---------|-----------|
| `/join [channel]` | Bot masuk ke VC lo (atau VC yang dipilih) |
| `/leave` | Bot keluar dari VC |
| `/ping` | Cek status & latency bot |

---

## Setup

### 1. Clone repo & install dependencies

```bash
git clone https://github.com/USERNAME/REPO-NAME.git
cd discord-vc-bot
npm install
```

### 2. Buat file `.env`

Copy dari `.env.example`:

```bash
cp .env.example .env
```

Isi dengan token & client ID dari [Discord Developer Portal](https://discord.com/developers/applications):

```env
DISCORD_TOKEN=your_bot_token_here
CLIENT_ID=your_client_id_here
```

### 3. Invite bot ke server

Di Developer Portal → OAuth2 → URL Generator:
- Scopes: `bot`, `applications.commands`
- Bot Permissions: `Connect`, `Speak`, `View Channels`

### 4. Deploy slash commands

```bash
npm run deploy
```

> Jalankan sekali aja. Global commands butuh ~1 jam buat muncul di semua server.

### 5. Jalankan bot

```bash
npm start
```

---

## Deploy ke Railway

1. Push repo ke GitHub
2. Buka [railway.app](https://railway.app) → New Project → Deploy from GitHub Repo
3. Pilih repo ini
4. Tambahkan environment variables di Railway:
   - `DISCORD_TOKEN`
   - `CLIENT_ID`
5. Railway otomatis detect `Procfile` dan jalankan sebagai **worker** (bukan web server — ini penting biar gak error)

> ⚠️ Pastikan service type-nya **Worker**, bukan Web Service. Railway harusnya auto-detect lewat Procfile.

---

## Struktur Project

```
discord-vc-bot/
├── src/
│   ├── index.js              # Entry point bot
│   ├── deploy-commands.js    # Script deploy slash commands
│   └── commands/
│       ├── join.js           # /join command
│       ├── leave.js          # /leave command
│       └── ping.js           # /ping command
├── .env.example
├── .gitignore
├── Procfile                  # Untuk Railway
└── package.json
```
