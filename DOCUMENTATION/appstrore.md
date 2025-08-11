Hier sind die **Grenzen**, die du mit `.mjs`-Addons + nativer Bridge **nicht** überschreiten solltest (sonst drohen App-Store/Play-Store-Ablehnungen):

### No-Gos (führen schnell zu Rejection)

* **Nachladen von nativem Code**: DEX/JAR/.so/.framework oder eigene Runtime aus dem Web nachladen/ausführen.
* **Bridge zur Laufzeit erweitern**: Neue native Funktionen (z. B. Kamera, Mikro, Bluetooth, NFC, Filesystem, Background-Location) **nach dem Review** freischalten. Die Bridge-Methoden müssen fix im Binary sein.
* **Code außerhalb WebKit/WebView ausführen (iOS)**: Heruntergeladene Skripte dürfen **nur** in WebKit/JSCore laufen – nicht als „Plugin-Engine“, die die Appfunktion grundlegend ändert.
* **Store-Billing umgehen**: Digitale Inhalte/Features, die **in der App** genutzt werden (z. B. KI-Tokens, Pro-Addons), **ohne** In-App-Käufe (iOS: StoreKit, Android: Play Billing) verkaufen.
* **Selbst-Update / Fremd-Install**: App oder andere Apps aus der App selbst updaten/installieren (außer Enterprise/MDM).
* **Privacy/Permissions missachten**:

  * Keine klaren Zwecke/Strings (iOS `NSCameraUsageDescription` etc.)
  * Kamera/Mikro **ohne** User-Gesten starten oder **verdeckt** im Hintergrund aufnehmen
  * Tracking/Fingerprinting ohne Einwilligung (iOS: ATT), falsche Datenschutzangaben
* **Sicherheitsrisiko**: Addons ungeprüft von beliebigen Domains laden, keine Checksums/Signaturen, keine CSP; eval/unsandboxed JS.

### Erlaubt (sicherer Rahmen)

* **`.mjs` nur in WebView/WebKit** ausführen (reiner Web-Code).
* **Feste, kleine Native-Bridge** (vorab im Binary): z. B. `camera.startPreview()`, die es **schon zur Review** gibt.
* **OS-Permission-Flows respektieren**: immer mit Nutzer-Gesten und System-Dialogen.
* **Bezahlte Features auf iOS/Android**: über **Store-Billing** abwickeln; Web/Desktop frei wählbar.
* **Sicherheit**: HTTPS, Domain-Whitelist, CSP, Signatur/Hash-Prüfung der Addons, Logs/Telemetry für Missbrauch.

### Faustregel

* **Web-APIs zuerst** (getUserMedia/WebRTC).
* Wenn native nötig: **Bridge minimal halten**, **keine** dynamischen neuen Fähigkeiten, **keine** externen nativen Binaries.
* Bezahl-Addons/Tokens in der mobilen App **immer** über das jeweilige Store-Billing.

Wenn du willst, erstelle ich dir eine **kleine Bridge-Spec** (Methodenliste + Policies) mit Beispiel-Stubs für iOS/Android/Tauri – dann habt ihr einen geprüften Rahmen, der review-freundlich ist.



Kurz gesagt: **Nein, die bezahlten Addons müssen nicht über den App-/Play-Store „heruntergeladen“ werden** – aber **der Kauf** muss (meist) über die **Store-Zahlungssysteme** laufen, wenn die Leistung **in der App** genutzt wird.

* **iOS (App Store):**

  * Addons als **`.mjs` in einer WKWebView** laden = ok.
  * **Bezahlung** für in-App genutzte Features/Token → **StoreKit (In-App Purchase)**.
  * Keine neuen **nativen** Fähigkeiten per Addon nachrüsten.

* **Android (Google Play):**

  * Addons als **`.mjs` in WebView** laden = ok.
  * **Bezahlung** für digitale Güter in der Play-Version → **Google Play Billing**.

* **Web/Desktop:**

  * Frei wählbarer Zahlungsanbieter (z. B. Stripe).

💡 **Best Practice:**
Addons immer als Web-Module laden; Käufe (Tokens/Pro-Features) auf iOS/Android über das jeweilige Store-Billing abwickeln und serverseitig als **Entitlements** verbuchen. So bist du konform – ohne Addons über den Store „als App“ verteilen zu müssen.


Kurz & praxisnah:

# Apple StoreKit (iOS)

* **Standard-IAP:** **30 %**. ([Apple Developer][1])
* **Small Business Program (< \$1 M/Jahr):** **15 %**. ([Apple Developer][2])
* **Abos:** Nach **12 Monaten** beim selben Abonnenten **15 %** (vorher 30 %). ([Apple Developer][3])
* **Sonderfälle 2025:**

  * **USA:** Externe Zahlungslinks sind erlaubt; **keine Apple-Provision** auf Käufe **außerhalb** der App, solange das Gerichtsurteil gilt (Apple legt Berufung ein). ([The Verge][4], [Reuters][5])
  * **EU (DMA):** Apple hat Regeln/Gebühren angepasst; Berichten zufolge **20 %** (Standard) bzw. **13 %** (Small Business) im Store, **5–15 %** bei externen Zahlungen—Details noch in Prüfung durch die EU. Plane hier mit regionalen Abweichungen. ([Reuters][6])

# Google Play Billing (Android)

* **Erstes \$1 M/Jahr pro Entwickler:** **15 %**, darüber **30 %**. ([Google Support][7])
* **Abos:** **15 % ab Tag 1**. ([Android Developers Blog][8])
* **Medien-Programm (E-Books/Musik etc.):** teils **bis 10 %**. ([Android Developers Blog][9])
* **User-Choice/Alternatives Billing (EEA/Indien/Korea):** Service-Fee **4 % niedriger**, wenn Nutzer extern zahlen. ([Google Support][10])
* **Technischer Stichtag:** Neue Releases müssen **Billing Library v7+** bis **31. Aug 2025** nutzen. ([Android Developers][11])

> Fazit: Für **mobile In-App-Verkäufe** (z. B. KI-Tokens/Pro-Addons) kalkuliere iOS **30 %/15 %** (bzw. die **regionalen Ausnahmen**) und Android **15 %/30 %** (Abos 15 %). Bei **externen Zahlungen** gelten je Region eigene Regeln—USA (iOS) derzeit **0 % auf Web-Käufe**, EEA (Android) **–4 %-Punkte** via User-Choice-Billing.

[1]: https://developer.apple.com/programs/whats-included/?utm_source=chatgpt.com "Membership Details - Apple Developer Program"
[2]: https://developer.apple.com/app-store/small-business-program/?utm_source=chatgpt.com "App Store Small Business Program"
[3]: https://developer.apple.com/app-store/subscriptions/?utm_source=chatgpt.com "Auto-renewable Subscriptions - App Store"
[4]: https://www.theverge.com/news/660025/apple-changes-app-store-rules-to-allow-external-purchases?utm_source=chatgpt.com "Apple changes App Store rules to allow external purchases"
[5]: https://www.reuters.com/sustainability/boards-policy-regulation/us-judge-rules-apple-violated-order-reform-app-store-2025-04-30/?utm_source=chatgpt.com "US judge rules Apple violated order to reform App Store"
[6]: https://www.reuters.com/legal/litigation/apple-changes-app-store-rules-eu-comply-with-antitrust-order-2025-06-26/?utm_source=chatgpt.com "Apple changes App Store rules in EU to comply with antitrust order"
[7]: https://support.google.com/googleplay/android-developer/answer/10632485?hl=en-GB&utm_source=chatgpt.com "Changes to Google Play's service fee in 2021"
[8]: https://android-developers.googleblog.com/2021/10/evolving-business-model.html?utm_source=chatgpt.com "Evolving our business model to address developer needs"
[9]: https://android-developers.googleblog.com/2021/10/whats-new-in-google-play.html?utm_source=chatgpt.com "Google Play updates from #AndroidDevSummit"
[10]: https://support.google.com/googleplay/android-developer/answer/13821247?hl=en&utm_source=chatgpt.com "Understanding user choice billing on Google Play"
[11]: https://developer.android.com/google/play/billing/release-notes?utm_source=chatgpt.com "Google Play Billing Library release notes"



Kurz: **Nein, der Nutzer muss Addons nicht doppelt kaufen** – wenn du es richtig aufziehst.

So klappt’s sauber und store-konform:

1. **Ein Konto = ein Wallet (Entitlements)**

* Lege serverseitig für jeden Nutzer fest, welche Addons/Tokens ihm gehören (`user_id`, `addon_id`, `status`, `quelle`, `laufzeit`).
* Egal wo gekauft (Web/Desktop/Android/iOS) – nach Login lädt die App die **Entitlements** und schaltet die Addons frei.

2. **Käufe je Plattform korrekt abwickeln**

* **iOS-App:** Käufe, die **in der iOS-App** gestartet werden, müssen über **StoreKit (In-App Purchase)** laufen.
  – Nach Kauf: **Receipt** serverseitig prüfen → Entitlement setzen.
  – UI: „**Kaufen** (IAP)“, „**Wiederherstellen**“ (StoreKit-Restore), **Anmelden** (für bereits extern gekaufte Addons).
* **Web/Desktop/Android (Sideload):** Du kannst z. B. **Stripe/PayPal** nutzen.
  – Nach Zahlung: per **Webhook** Entitlement setzen.
* Ergebnis: Wer auf der **Website** gekauft hat, **loggt sich in iOS ein** und hat die Addons **ohne erneut zu zahlen**.

3. **Wichtig für iOS-Review**

* In der iOS-App **nicht** zu externen Zahlseiten „steuern“, außer wo Apple es explizit erlaubt.
* „**Schon gekauft? Anmelden**“ ist ok; dann die extern erworbenen Addons über das Konto freischalten.
* Biete zusätzlich „**Wiederherstellen**“ für IAP-Käufe an.

4. **Technik-Skizze (sehr kurz)**

* Tabelle `entitlements`: `user_id | product_id | source(web/ios/android) | status | expires_at`.
* **iOS IAP Flow:** StoreKit → Receipt → Server-Verify → `entitlements.upsert(...)`.
* **Web/Stripe Flow:** Payment → Webhook → `entitlements.upsert(...)`.
* App-Start/Login: `GET /me/entitlements` → `.mjs`-Addons entsprechend freischalten.

So kann ein Nutzer **auf der Website kaufen** und das Addon **auf iOS** nutzen – **ohne** Zweitkauf.
