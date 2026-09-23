# Galabau-Website

![HTML5](https://img.shields.io/badge/HTML5-E34F26?logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-Vanilla-F7DF1E?logo=javascript&logoColor=black)

Website für einen Garten- und Landschaftsbaubetrieb: Vorstellung der Leistungen, des Unternehmens und Kontaktmöglichkeiten.

## Struktur

```
index.html              Startseite
impressum.html           Impressum
datenschutz.html          Datenschutzerklärung
robots.txt                Crawler-Steuerung (öffentlich indexierbar)
.htaccess                 Verzeichnis-Listing deaktiviert
assets/
  css/style.css           Styles
  js/main.js               Interaktivität
  img/                      Bilder & Favicon
.github/workflows/
  tests.yml                 HTML-Validierung, Link-Check, Secret-Scan
  deploy.yml                 SFTP-Deploy auf den Strato-Server
```

## Lokale Entwicklung

Die Seite ist statisch und benötigt keinen Build-Schritt. Für die lokale Vorschau reicht ein beliebiger Webserver, z. B. [XAMPP](https://www.apachefriends.org/):

1. Repo in `htdocs/galabau` klonen
2. Apache starten
3. `http://localhost/galabau/` aufrufen

## Deployment

Bei jedem Push auf `main` laufen automatisiert per GitHub Actions:

1. **Tests** ([`tests.yml`](.github/workflows/tests.yml)) – HTML-Validierung, Link-Check und Secret-Scan (gitleaks); laufen zusätzlich bei jedem Pull Request auf `main`
2. **Deploy** ([`deploy.yml`](.github/workflows/deploy.yml)) – lädt die Live-Dateien erst bei erfolgreichen Tests per SFTP auf den Strato-Server hoch

Änderungen an `main` laufen über Pull Requests, die erst nach erfolgreichen Tests gemerged werden können. Zugangsdaten (`STRATO_SFTP_HOST`, `STRATO_SFTP_USERNAME`, `STRATO_SFTP_PASSWORD`) und das Zielverzeichnis (`STRATO_REMOTE_DIR`) liegen als Secrets/Variablen im GitHub-Environment `production`.

## Offene Punkte

- [x] Inhalte (Texte, Kontaktdaten) einpflegen – Bilder sind noch Platzhalter
- [ ] `robots.txt` Sitemap-URL auf die echte Domain anpassen
- [x] Impressum & Datenschutzerklärung mit echten Betreiberdaten füllen
- [x] GitHub-Environment `production` mit Strato-Secrets/-Variable anlegen
- [ ] Falls die Seite real bei Strato gehostet wird: Auftragsverarbeitungsvertrag (AVV) mit Strato prüfen/abschließen (siehe Datenschutzerklärung, Abschnitt 5)
