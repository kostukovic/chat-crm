# Grundgerüst für das HTML/CSS-UI-Design eines modularen CRM-Chats

## Standard-Desktop-Ansicht (App.vue mit `flex-direction: row`)

---

### **NavView** (Menüleiste)

* **Datei:** `crm-chat/src/components/NavView.vue` (erweiterbar)

* **Funktion:** Menüleiste mit festen Symbolen: **Menü**, **Startup**, **Addons**, **Performance**, **Konto**, **Einstellungen**
  * **Menü** → Umschalten zwischen kompaktem und erweitertem Modus
    * **50 px:** Nur Symbole
    * **320 px:** Symbole + Text + zusätzliche Icons im Einstellungsbereich
  * **Startup** → Zentrale Übersicht (Benachrichtigungen, Aufgaben, Chats, E-Mails, Termine)
    * Standard-Startseite der App
    * Datei: `./ListView/startup_ListView.vue`
  * **Addons** → Verwaltung von Modulen (z. B. Telegram, WhatsApp, E-Mail, Kalender)
    * Datei: `./ListView/addons_ListView.vue`
  * **Performance** → Steuerung der Addon-Ladeweise (Details siehe unten)
    * Datei: `./ListView/perform_ListView.vue`
  * **Konto** → Konto, Registrierung, Datenschutz
    * Datei: `./ListView/account_ListView.vue`
  * **Einstellungen** → CRM-Chat-Einstellungen (Sprache, Themes, VPN etc.)
    * Datei: `./ListView/setting_ListView.vue`

* **Addon-Integration:**
  Externe Dateien wie
  `crm-chat-addons/src/addons/NavView/telegram_NavView.vue`,
  `whatsapp_NavView.vue`, `emails_NavView.vue`, `eigene-Chat_NavView.vue`, `AI_NavView.vue`, `CLI_NavView.vue`
  → Fügen installierbare Symbole in der NavView hinzu.

* **Performance-Modus:**
  * **Standard:** Addons werden nicht aktiv geladen
  * **Aktiv:** Addons werden vollständig geladen (höherer RAM- und CPU-Verbrauch)
  * **Deaktiv:** Addons im Schlafmodus (nur Benachrichtigungen aktiv)
  * **Optional:** Automatikmodus mit einstellbarem Verhalten

* **Benachrichtigungen in Symbol Startup:**
  * Kleines Icon unten am Symbol, mit Zähler (1–9, ab 10 → „x“)
  * Farbcodes: **Grün** = normal, **Gelb** = wichtig, **Rot** = sehr wichtig
  * Beispiel: Telegram-Nachricht → Signal am Icon + Anzeige im Startup-Symbol

**Layout (App.vue – NavView):**
* Höhe: `100dvh`
* Breite: **50 px** (fix), Expanded: **320 px** (Mobile: automatisch, siehe Media-Responsive)
* Animation: `transition: 0.5s`
* Im Expanded-Modus können Symbole angepasst/ersetzt werden
  *(Menü, Startup, Addons, Performance, Konto, Einstellungen bleiben fix)*
* Im Expanded-Modus wird nach Auswahl eines Symbols automatisch in den kompakten Modus (50 px) zurückgeschaltet. Alternativ erfolgt die Rückschaltung automatisch, wenn der Mauszeiger den NavView-Bereich verlässt.
* Der Status des aktiven Symbols markiert im NavView, welches Symbol aktuell verwendet wird (z. B. Startup, Telegram, Einstellungen usw.).
* Positionierung:
  * **Oben:** Menü, Startup
  * **Unten:** Addons, Performance, Konto, Einstellungen
  * **Mitte:** Platz für zusätzliche Addons.
    Bei Überlauf erfolgt das Scrollen nicht über einen sichtbaren Scrollbalken, sondern über transparente Aufwärts- bzw. Abwärtspfeil-Buttons.
    Diese erscheinen nur bei Bedarf:
    * Beim Scrollen nach unten wird der **Aufwärtspfeil** oben sichtbar; am unteren Ende verschwindet der **Abwärtspfeil**.
    * Beim Scrollen nach oben wird der **Abwärtspfeil** unten sichtbar; am oberen Ende verschwindet der **Aufwärtspfeil**.
    * Kopf- und Fußbereich (Menü, Startup, Addons, Performance, Konto, Einstellungen) bleiben fixiert.
    * **Mobile/Tablet:** Scrollen sowohl per Wischen (Swipe) als auch per Pfeil-Buttons möglich
      **Desktop:** wie oben Mobile/Tablet, zusätzlich mit Scrollen per Mausrad.

---

### **ListView** (Listenbereich)

* **Datei:** `crm-chat/src/components/ListView.vue` (erweiterbar)

* **Funktion:** Anzeige von Chatlisten, Einstellungslisten, Addon-Listen und Verwaltung

* **Beispiele:**
  * `startup_ListView.vue` → Startseite (NavView-Startup)
  * `account_ListView.vue` → Konto, Registrierung, Datenschutz
  * `setting_ListView.vue` → Sprache, Themes usw.
  * `addons_ListView.vue` → Addons verwalten

* **Addon-Integration:**
  `crm-chat-addons/src/addons/ListView/telegram_ListView.vue`,
  `whatsapp_ListView.vue`,`emails_ListView.vue`, `eigene-Chat_ListView.vue`, `AI_ListView.vue`, `CLI_ListView.vue` usw.

* **Benachrichtigungen:**
  * Neue Addon-Nachrichten erscheinen in `startup_ListView.vue`
  * Direkte Antwort möglich (ggf. eingeschränkt)
  * Klick auf Details → Wechsel zur Symbol von installierbaren Addons-Liste

**Layout (App.vue – ListView):**
* `margin-left: 50px` (NavView-Breite reserviert)
* Höhe: `100dvh`
* Breite: **270 px** (320 px – 50 px NavView)
* NavView-Expand beeinflusst ListView-Breite nicht. Beispiel: Befindet sich die NavView im Expanded-Modus, wird die ListView nicht verschoben, sondern von der NavView überlagert, während ihre Breite unverändert bei 270 px bleibt.

---

### **MainView** (Hauptbereich)

* **Datei:** `crm-chat/src/components/MainView.vue` (erweiterbar)

* **Funktion:** Hauptinhalt – Chat, E-Mail, Konversation, Eingabefeld unten

* **Beispiele:**
  * `void_MainView.vue` → Leeransicht mit Hinweis, wenn keine Liste ausgewählt ist (nur ab 1367px Viewport)
  * `startup_MainView.vue`, `account_MainView.vue`, `setting_MainView.vue` usw.
  * Addons: `telegram_MainView.vue`, `whatsapp_MainView.vue` usw.

**Layout (App.vue – MainView):**
* Standardbreite: **640 px** (min. 320 px)
* Höhe: `100dvh`
* Wenn ListView geschlossen ist → MainView nutzt zusätzlichen Platz (270 px + 640 px bzw. 320 px) mit sanften Transition. Hinweis: MainView wird auch nicht verschoben, wenn sich NavView im Expanded-Modus befindet. 
* Vollbild-MainView blendet NavView, ListView und/oder PanelView aus (sanfte Transition)

---

### **PanelView** (Zusatzinformationen)

* **Datei:** `crm-chat/src/components/PanelView.vue` (erweiterbar)

* **Funktion:** Zusatzfenster – Profil, Mini-Browser, Videokonferenz, Rechnungen, PDFs, 3D-Darstellungen

* **Beispiele:**
  * `void_PanelView.vue` → Leeransicht mit Hinweis, wenn kein Link angeklickt wurde (nur ab 1367 px Viewport)
  * `Mini-Browser_PanelView.vue`, `gesicherte-Browser_PanelView.vue`, `WebCam_PanelView.vue`, `3D-Darstellung_PanelView.vue`
  * Addons: `telegram_PanelView.vue`, `whatsapp_PanelView.vue` usw.

**Layout (App.vue – PanelView):**
* Standardbreite: **640 px** (anpassbar, z. B. Profil oder Leeransicht min. 320 px)
* Viewport > 1367 px: Automatische Breite, min. 320 px; bei Überbreite Scrollbar im PanelView, während die Breite des MainView unverändert bleibt.
* Viewport > 1367 px: Resizing zwischen MainView und PanelView möglich
* Viewport > 1367 px: Wenn PanelView geschlossen wird, wird es durch void_PanelView.vue ersetzt – bis der Viewport aktualisiert wird, damit MainView unverändert bleibt. 
* Vollbild-PanelView blendet NavView, ListView und MainView aus (sanfte Transition)

---

## Media-Responsive-Regeln

0. **0–319 px**
   App nicht nutzbar (Hinweis anzeigen: Display zu klein)

1. **320–767 px** (Mobile Hochformat / kleines Tablet / kleiner Desktop)
   * Varianten:
     `(NavView 50px + ListView auto)` **oder** `(MainView auto)` **oder** `(PanelView auto oder mit Scrollbar bei Überbreite)`
   * Wechsel mit `transition: 0.5s` (Richtung abhängig vom Zielbereich)
   * Vollbild-Buttons für MainView oder PanelView sind inaktiv oder ausgeblendet

2. **768–1366 px** (Mobile Querformat / Tablet Hoch- und Querformat / kleiner Desktop)
   * Varianten:
     `(NavView 50px + ListView 270px)` + `(MainView auto)` **oder** `(PanelView auto oder mit Scrollbar bei Überbreite)`
   * Im Vollbildmodus der MainView werden alle anderen Bereiche ausgeblendet (sanfte Transition)
   * Im Vollbildmodus der PanelView werden alle anderen Bereiche ausgeblendet (sanfte Transition)

3. **ab 1367 px** (Standard-Desktop)
   * `(NavView 50px + ListView 270px)` + `(MainView 320–640px)` + `(PanelView min. 320px, auto oder mit Scrollbar bei Überbreite)`
   * Im Vollbildmodus der MainView werden alle anderen Bereiche ausgeblendet (sanfte Transition)
   * Im Vollbildmodus der PanelView werden alle anderen Bereiche ausgeblendet (sanfte Transition)


---

## Ordnerstruktur 

```
crm-chat/
  package.json
  index.html
  vite.config.ts
  tsconfig.json
  .env.example
  public/
    # optional: statische Icons, leeres "catalog.json" als Fallback
    catalog.json                # (leer oder Beispiel), wird später serverseitig überschrieben
  src/
    App.vue
    main.ts
    assets/
      styles/globals.css
      icons/
    router/
      index.ts
    stores/
      ui.ts                     # Nav/List/Main/Panel-States, Expanded, Breakpoints, Vollbild
      session.ts                # Login/Account, Roles (admin/distributor/user)
      notifications.ts          # Badges/Counts je Addon
      addons.ts                 # installierte Addons, Status, Versionen
    services/
      api/
        http.ts                 # fetch/axios wrapper (mit Auth, Retry)
      addons/
        types.ts                # Addon-Interface (Manifest, Module)
        registry.ts             # Katalog-Logik (Remote/Link-Code)
        loader.ts               # dynamisches Laden (ESM-Module/URLs)
        installer.ts            # Download/Install/Update/Remove
        storage.ts              # Persistenz (IndexedDB/LocalStorage/Tauri FS)
        permissions.ts          # Freigaben/Capabilities je Addon
        verify.ts               # Signaturen/Checksums (Sicherheit)
    composables/
      useViewport.ts
      usePanels.ts
      useHotkeys.ts
    components/
      NavView.vue
      ListView.vue
      MainView.vue
      PanelView.vue
      common/
        Badge.vue
        IconButton.vue
        Splitter.vue
      NavView/
        addons_NavView.vue      # „Addons installieren“-UI
      ListView/
        account_ListView.vue
        addons_ListView.vue     # Katalog/Installationsliste
        perform_ListView.vue
        setting_ListView.vue
        startup_ListView.vue
      MainView/
        account_MainView.vue
        addons_MainView.vue     # Details/Info zu ausgewähltem Addon
        perform_MainView.vue
        setting_MainView.vue
        startup_MainView.vue
        void_MainView.vue
      PanelView/
        MiniBrowser_PanelView.vue
        SecureBrowser_PanelView.vue
        WebCam_PanelView.vue
        ThreeDViewer_PanelView.vue
        void_PanelView.vue
    types/
      ui.ts
      models.ts
```