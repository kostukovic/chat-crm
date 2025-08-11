# Werkzeuge für die Entwicklung
- Frontend: Vite für Startup Phase
- Desktop-App: Zukünftige native App auf Basis von Rust und Tauri, unter Verwendung von Frontend HTML/CSS
- Mobile-App: Zukünftige native App wird entweder mit Kotlin (Android) und Swift (iOS) oder alternativ mit Tauri (Cross-Plattform) entwickelt
- Backend: Rust mit Tokio (für maximale Performance und hoch Skalierbarkeit)
- Datenbank: Primär MongoDB (später zusätzlich PostgreSQL und Redis)
- Passwort-Hashing mit Bcrypt
- Ende-zu-Ende-Verschlüsselung (E2E) mit RSA und AES

## Architektur

```
+--------------------------------------------------------------------------------------------------------------------+
|                                                      🌍 Client                                                     |
|  +----------------------------+------------------------------+---------------------------+----------------------+  |
|  | Website/PWA (HTML+CSS+JS)  | Linux/Win/MacOS (Rust+Tauri) | Android (Kotlin or Tauri) | iOS (Swift or Tauri) |  |
|  +----------------------------+------------------------------+---------------------------+----------------------+  |
+-----------------------------------------------------------┬--------------------------------------------------------+
                                                            |
                                                            ▼
                          +------------------------------------------------------------------+
                          |                    🚀 Rust Backend (Tokio)                       |
                          |                                                                   |
                          |  +-------------+--------------+-------------+------------------+  |
                          |  | Auth (JWT)  | WebSocket    | REST API    | Media Proxy      |  |
                          |  +------+------+--------------+-------------+------------------+  |
                          |         |            |               |              |             |
                          |         ▼            ▼               ▼              ▼             |
                          |  +---------+  +-------------+  +-------------+  +-------------+   |
                          |  | Redis   |  | PostgreSQL  |  | MongoDB     |  | FFmpeg      |   |
                          |  | (PubSub)|  | (User+Chat) |  | (Uploads)   |  | (Video)     |   |
                          |  +---------+  +-------------+  +-------------+  +-------------+   |
                          |                                                                   |
                          |     ✅ Rust-Crates: tokio, axum (or Actix Web), sqlx, redis      |
                          +------------------------------------------------------------------+
```

### Info:
- 1. Probe: Teilautomatisierte Überführung von HTML/CSS/JS in Kotlin UI (Jetpack Compose) und SwiftUI mithilfe von Tools wie Web2Compose, html2swiftui sowie KI-gestützter Unterstützung, um die Entwicklungszeit zu minimieren.
- 2. Probe: Tauri → iOS/Android (derzeit in Beta, voraussichtlich stabil ab 2026)


## Zwei-Faktor-Authentifizierung 
(2FA)-Lösungen mit Authenticator-Apps, die nicht von Google abhängen. Einige Alternativen bieten ähnliche Funktionen, jedoch ohne die Notwendigkeit, Google-Dienste zu nutzen:

wir müssen experimentieren:

Authy
- Beschreibung: Authy ist eine beliebte Authenticator-App, die wie Google Authenticator funktioniert, aber zusätzliche Funktionen wie Cloud-Backup und Geräte-Synchronisierung bietet. Du kannst Authy auf mehreren Geräten installieren und deine Codes sichern.

- Verfügbarkeit: Verfügbar für Android, iOS und Desktop (Windows, macOS, Linux).

FreeOTP
- Beschreibung: FreeOTP ist eine Open-Source-Authenticator-App, die auf den Standard-TOTP (Time-based One-Time Password)-Protokollen basiert. Sie benötigt keinen Cloud-Dienst und ist Google-frei.

- Verfügbarkeit: Verfügbar für Android und iOS.


andOTP
- Beschreibung: andOTP ist eine Open-Source-App für Android, die ebenfalls TOTP und HOTP unterstützt. Sie bietet Backup- und Verschlüsselungsfunktionen, ohne von Google abhängig zu sein.

- Verfügbarkeit: Nur für Android.

1Password
- Beschreibung: 1Password ist in erster Linie ein Passwortmanager, bietet aber auch Zwei-Faktor-Authentifizierung und unterstützt das Erstellen von TOTP-Codes, ohne Google oder andere große Anbieter zu verwenden.

- Verfügbarkeit: Verfügbar für Android, iOS, Windows, macOS und Linux.


Bitwarden
- Beschreibung: Bitwarden ist ein Open-Source-Passwortmanager, der ebenfalls TOTP-basierte 2FA-Codes generieren kann. Die App ist sicher und unterstützt eine Offline-Nutzung.

- Verfügbarkeit: Verfügbar für Android, iOS, Windows, macOS und Linux.

