# Einsatztagebuch / Gesprächsprotokoll

Korrektur von Einträgen / Ergänzung => neuer, verlinkter Eintrag

- Eingerückt
- Ergänzungen einfach darunter / Korrektur wandert prägnant an die Stelle des Originaleintrags

## Datentypen

### Eintrag

| Feld                       | Beschreibung                                                                                     | unveränderlich | Beschränkung Angabe                        |
|----------------------------|--------------------------------------------------------------------------------------------------|----------------|--------------------------------------------|
| Meldung                    | Inhaltliche Angabe der Meldung                                                                   | Ja             | Keine                                      |
| Datum und Zeit der Meldung | Für welches Datum/Zeit gilt die Nachricht                                                        | Ja             | - Aktuelles Datum/Zeit<br/>- Vergangenheit |
| Meldender                  | Von wem stammte die Meldung (EL, LtS...)                                                         | Ja             | Keine                                      |
| Meldungstyp                | Zu welchem Zweck wurde die Meldung gemacht?                                                      | Ja             | Siehe Meldungstyp                          |
| Empfänger                  | An wen soll die Meldung weitergeleitet werden (Nur erforderlich bei Meldungstyp "Weiterleitung") | Ja             | Keine                                      |

### Meldungstyp

Mögliche Werte für "Meldungstyp" sind:

| Meldungstyp   | Beschreibung                                                 |
|---------------|--------------------------------------------------------------|
| Dokumentation | Meldung wurde zur Dokumentation im ETB gemacht               |
| Aufgabe       | Aufgabe zur Eledigung für den ELW (Recherche,...)            |
| Weiterleitung | Meldung soll an Person/Stelle weitergegeben werden (EL, LtS) |

Die Erledigung der Typen "Aufgabe" und "Weiterleitung" ist zu dokumentieren.

### Ver#nderliche Metadaten / Flags

Metadaten zu Einträgen (Wichtig, Nachforderung...) - kann nachträglich hinzugefügt werden / nicht revisionssicher

- Flag für Priorität

## Technische Anmerkungen

- Icons müssen offline verfügbar sein
- ...Dto-Endung weglassen
