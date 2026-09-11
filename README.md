# Extractor de Dades Web Automatitzat (Full-Stack Scraper)

Projecte full-stack modular desenvolupat exclusivament amb tecnologies natives (**Vanilla HTML, CSS, JavaScript** i **Node.js**). L'objectiu és automatitzar l'extracció de dades de llocs web amb autenticació i renderització dinàmica al frontend, substituint els processos manuals fets actualment amb *Instant Data Scraper*.

## 📐 Especificacions d'Arquitectura i Disseny

- **Stack Tècnic Frontend:** Desenvolupament basat en especificacions natives (HTML5, CSS3, JavaScript Vanilla - DOM API / Fetch API). Sense empaquetadors ni frameworks per garantir un rendiment natiu òptim (Lighthouse 100%).
- **Sistema d'Autenticació (Auth):** Control d'accessos mitjançant l'ús de JWT (JSON Web Tokens) gestionat de forma nativa per a un únic usuari administrador.
- **Desacoblament d'Execució:** El mòdul d'extracció (Puppeteer) opera en segon pla de forma asíncrona des del backend, desvinculat de l'experiència d'usuari i la interfície de client.
---

## 🗺️ Full de Ruta de Desenvolupament (Fases Estrictes)

### 🚪 Fase 1: Àrea Privada SPA + Autenticació
- Creació d'una interfície Single Page Application (SPA) estructurada en un fitxer d'accés privat (`acces.html`), totalment independent de la Landing Page pública o sistema existent.
- Lògica de control d'estat a través de JavaScript natiu i classes CSS (`.hidden`) per commutar de manera instantània entre la vista d'accés (Login) i l'Àrea Privada (Dashboard) dins del mateix entorn privat.
- Gestió de la sessió d'usuari mitjançant control de tokens i cookies segures.
- Separació de continguts literals mitjançant la càrrega asíncrona de text des d'un fitxer JSON extern.

### 🎛️ Fase 2: Dashboard, Mapejador i Explorador de Dades
- **Formulari de Targets:** Interfície per registrar i emmagatzemar les URLs objectiu parametritzades.
- **Mapejador de Camps:** Disseny de formularis per a la captura dinàmica de selectors CSS (selector de llista/fila i selectors de columnes de contingut).
- **Taula Camaleònica i Històric:** Generació de la graella de dades 100% dinàmica mitjançant la DOM API, renderitzant les columnes de forma automàtica segons l'estructura de l'objecte JSON de la base de dades. Inclou un selector per carregar dades de diferents registres emmagatzemats.
- **Cercador Intel·ligent:** Camp de filtrat de dades a través de paraules o identificadors clau. Mostra un resum del camp coincident amb l'opció de desplegar tota la informació continguda en el registre seleccionat.

### ⚙️ Fase 3: Backend API & Motor Scraper
- Creació d'endpoints i rutes en Node.js per gestionar l'autenticació, la configuració dels objectius de cerca i el lliurament de dades JSON.
- **Mòdul Scraper (Puppeteer):** Script aïllat encarregat de realitzar l'autenticació a la web externa, simular la navegació, interceptar o llegir les dades del seu frontend i tancar el procés de forma neta.
- **Automatització:** Integració de planificadors de tasques (Cronjobs) connectats al motor d'extracció per a execucions periòdiques en segon pla.

### 🗄️ Fase 4: Base de Dades (DB)
- Disseny del model relacional o no relacional optimitzat per emmagatzemar de forma simple:
  - `credentials`: Control d'accés de l'administrador.
  - `targets`: URLs d'origen associades al seu corresponent mapa de selectors CSS.
  - `scraped_data`: Històric d'extraccions desades directament en format dinàmic (JSON/JSONB).

---

**********************************************************************************************************
					QUE HA DE FER I QUE NECESSITEM PER FER-HO
┌──────────────────────────────┐       ┌──────────────────────────────┐       ┌──────────────────────────────┐
│      1. ENTRAR I REBRE       │       │        2. CONFIGURAR         │       │        3. CONSULTAR          │
│  El sistema accedeix sol.    │ ───>  │  Jo defineixo què extreure.  │ ───>  │ Cerca intel·ligent i vista.   │
└──────────────────────────────┘       └──────────────────────────────┘       └──────────────────────────────┘
               ▲                                       ▲                                      ▲
               │ (S'executa via)                       │ (Usa la config de)                   │ (Llegeix de)
 ┌────────────────────────────┐          ┌────────────────────────────┐         ┌────────────────────────────┐
 │  Fase 3: Backend & Cron    │          │  Fase 2: Dashboard/Selector│         │  Fase 4: Base de Dades     │
 └────────────────────────────┘          └────────────────────────────┘         └────────────────────────────┘
               ▲                                                                              ▲
               │ (Protegeix l'accés i serveix les dades a)                                     │
 ┌────────────────────────────────────────────────────────────────────────────────────────────┘
 │  Fase 1: Frontend SPA + Auth                                                               
 └────────────────────────────────────────────────────────────────────────────────────────────┘
 IMPORTANT: EL CRONJOB O LA EXECUCIÓ PROGRAMADA ES VEURÀ O VALIDARÀ AL SEU MOMENT.

 ## 🗂️ Estructura Inicial del Repositori

```text
meu-scraper-modular/
├── public/               # FRONTEND (Estàtic i Natiu)
│   ├── acces.html        # Finestra única de l'aplicació (SPA: Login + Dashboard)
│   ├── 404.html          # Pàgina d'error personalitzada ("Hi estem treballant...")
│   ├── style.css         # Disseny i estils globals de l'aplicació
│   ├── textos.json       # Centralització de literals de la interfície
│   └── app.js            # Lògica de client, manipulació DOM i Fetch API
├── src/                  # BACKEND (Node.js)
│   ├── config/           # Connexions de DB i gestió de variables d'entorn (.env)
│   ├── middleware/       # Validació de tokens i control de permisos d'accés
│   ├── controllers/      # Controladors de rutes (Auth, Targets, Data Explorer)
│   ├── scraper/          # Scripts d'automatització i gestió de Puppeteer
│   └── server.js         # Punt d'entrada de l'aplicació Express / HTTP
├── Dockerfile            # Contenidor per homogeneïtzar l'entorn (Node + Chromium)
├── package.json          # Manifest de dependències del servidor
└── README.md             # Documentació del projecte
```
## 🚨 Consideracions Crítiques de Desenvolupament
1. **Persistència de Sessió Externa:** Mecanismes per emmagatzemar les cookies/sessions de la web destí, evitant logins redundants que provoquin bloquejos de seguretat.
2. **Cua de Tasques Seqüencial (Single-Task Queue):** Operació estrictament seqüencial de Puppeteer per protegir els recursos de la màquina i evitar ser confós amb un comportament nociu (DDoS).
3. **Ofuscació del Bot:** Configuració de retards i mòduls *stealth* per esquivar les proteccions anti-bots.



