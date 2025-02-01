# 📊 MyDataExplored

**MyDataExplored** è un'applicazione full-stack per esplorare e analizzare database SQL e NoSQL, con una dashboard interattiva, supporto a GraphQL e Dark Mode.

## 🚀 Funzionalità principali

✅ **Gestione multi-database**: Supporta PostgreSQL, MySQL e MongoDB  
✅ **Interfaccia moderna con Material-UI**  
✅ **Dashboard interattiva con Highcharts**  
✅ **Esecuzione di query con risultati in tempo reale**  
✅ **Supporto GraphQL per interrogazioni avanzate**  
✅ **Dark Mode con toggle dinamico**  
✅ **Prevenzione SQL Injection con log degli attacchi**  
✅ **Webhook per notifiche di aggiornamenti ai dati**  

---

## 📂 Struttura del progetto
```
MyDataExplored/
│── backend/                    # Server Node.js con Express (Gestione API e database)
│   ├── routes/                 # Definizione delle API REST e GraphQL
│   │   ├── configRoutes.js      # API per la configurazione del database
│   │   ├── queryRoutes.js       # API per l'esecuzione di query SQL
│   │   ├── mongoRoutes.js       # API per la gestione di MongoDB
│   │   ├── graphqlRoutes.js     # API GraphQL per interrogazioni avanzate
│   │   ├── webhookRoutes.js     # API per la gestione dei webhook
│   ├── utils/                   # Moduli di supporto al backend
│   │   ├── dbConnector.js       # Connessione a PostgreSQL/MySQL
│   │   ├── mongodbConnector.js  # Connessione a MongoDB
│   │   ├── logger.js            # Sistema di logging per query e attacchi SQL Injection
│   │   ├── emailAlert.js        # Invio di alert via email per SQL Injection
│   ├── server.js                # Entry point del backend (avvia il server Express)
│── frontend/                    # Applicazione React (UI e gestione dati)
│   ├── src/
│   │   ├── pages/               # Pagine principali dell'applicazione
│   │   │   ├── Dashboard.js      # Dashboard interattiva con Highcharts
│   │   │   ├── DatabaseConfig.js # Configurazione del database
│   │   │   ├── QueryTester.js    # Test di query SQL con risultati in tempo reale
│   │   ├── redux/               # Gestione dello stato con Redux
│   │   │   ├── store.js          # Store centrale Redux
│   │   │   ├── dataSlice.js      # Slice Redux per la gestione dei dati
│   │   ├── theme/               # Gestione del tema (Dark Mode)
│   │   │   ├── ThemeProvider.js  # Tema dinamico con toggle tra chiaro/scuro
│   │   ├── App.js               # Entry point del frontend (gestisce la navigazione)
│── logs/                        # File di log delle query eseguite e degli attacchi SQL Injection
│── .env                         # Configurazioni ambientali (credenziali database, email, ecc.)
│── README.md                    # Documentazione del progetto

```

---

## 🛠️ Installazione

### 1️⃣ Clona il repository

```sh
git clone https://github.com/tuo-utente/MyDataExplored.git
cd MyDataExplored

2️⃣ Configura il backend

📌 Modifica il file .env nella cartella backend/ con le tue credenziali:

DB_TYPE=postgresql  # oppure mysql o mongodb
DB_HOST=localhost
DB_USER=tuo-utente
DB_PASSWORD=tuo-password
DB_NAME=mydataexplored
MONGO_URI=mongodb://localhost:27017
ALERT_EMAIL_USER=tuo-email@gmail.com
ALERT_EMAIL_PASS=tuo-password
ALERT_EMAIL_ADMIN=admin@gmail.com

📌 Installa le dipendenze e avvia il server:

cd backend
npm install
node server.js

✅ Il backend sarà attivo su http://localhost:5000
3️⃣ Configura il frontend

📌 Installa le dipendenze e avvia il frontend:

cd frontend
npm install
npm start

✅ L'app sarà disponibile su http://localhost:3000
📡 API disponibili
📌 API REST

📍 Endpoint principali del backend
Metodo	Endpoint	Descrizione
GET	/api/query	Ottieni dati dal database
POST	/api/query	Esegui una query SQL
GET	/api/mongo/:collection	Ottieni documenti da MongoDB
POST	/api/mongo/:collection/aggregate	Esegui un'aggregazione su MongoDB
POST	/api/webhook	Registra un webhook
POST	/api/webhook/notify	Invia una notifica webhook
📌 API GraphQL

📍 Interroga i dati in modo avanzato su http://localhost:5000/api/graphql

📍 Esempio di query:

{
  getAllData {
    id
    category
    value
    timestamp
  }
}

📍 Esempio di query MongoDB:

{
  getMongoData(collection: "users") {
    _id
    category
    value
  }
}

🎨 Interfaccia utente
🔧 Configurazione Database

📍 Percorso: http://localhost:3000/config
✏️ Inserisci le credenziali del database e salvale.

🖥 Tester di Query SQL

📍 Percorso: http://localhost:3000/query
✏️ Scrivi una query e ottieni il risultato immediato.

📊 Dashboard Interattiva

📍 Percorso: http://localhost:3000/dashboard
📈 Visualizza i dati con grafici dinamici.

🛡 Sicurezza

✅ Prevenzione SQL Injection

    Il backend monitora query sospette e le registra nei log.
    Se rilevato un attacco, viene inviato un alert via email.

✅ Gestione webhook

    Gli aggiornamenti ai dati possono essere notificati in tempo reale.

🔧 Debugging e Logs

📌 I log delle query e degli attacchi SQL Injection sono salvati in:

logs/query.log

📌 Per monitorare gli errori del backend:

tail -f logs/query.log

🛠️ Tecnologie utilizzate
Tecnologie	Descrizione
Backend	Node.js, Express, PostgreSQL, MySQL, MongoDB
Frontend	React, Redux, Material-UI, Highcharts
Sicurezza	Helmet.js, SQL Injection detection, Webhook security
API	REST API, GraphQL
🏆 Conclusione

🔹 MyDataExplored è uno strumento potente per esplorare database SQL e NoSQL.
🔹 Interfaccia moderna e intuitiva per un'esperienza utente ottimale.
🔹 Supporto GraphQL, dashboard interattiva e prevenzione SQL Injection.

📌 Vuoi contribuire? Sentiti libero di aprire una issue o fare un pull request! 🚀