Julia Michaelis 70410013 

1 Pfad für das JS3-Doc und Bildschirmauflösung

Die Javasriptdokumentation im entsprechenden Format liegt unter :
{IhrServer URL}/doc

Die optimal Bildschirmauflösung ist 1366x768
Die minimale Bildschirmauflösung ist 1024x768

2 Struktur und Aufbau


2.1 Ordnerstruktur

./index html Startseite der Webanwendung (Menü und Intro)
./bilder Ordner für die Hintergrundbilder
./css Ordner für CSS 3 Dateien
./fonts Ordner für Schriftarten
./html Ordner für alle HTML Seiten außer index.html.
./json-data Ordner für Level Dateien
./music Ordner für Hintergrundmusik und Spielesounds
./scripts Ordner für Javascript Dateien
./doc Dokumentationsordner

2.1 Dateien aus dem Ordner onload

Hierzu zählen alle Dateien wie zum Beispiel highscore.js oder index.js. Alle Dateien in diesem Ordner haben eines gemeinsam, und zwar die  Initialisierungsfunktion init() in dennoch individueller Implementierung für die entsprechende HTML-Seite. Die init()-Methode wird aufgerufen, wenn der body tag mit dem Attribut onload im HTML-Dokument traversiert wird. Hierbei werden nicht nur visuelle Elemente gesetzt, sondern auch die Musik initialisiert.

Jede Seite besitzt ein AudioElement. Um den gewünschten Sicherheitsüberlegungen gerecht zu werden, habe ich das Ganze so gestaltet, dass die Musik nicht automatisch beim Laden einer HTML-Seite abgespielt wird. In der Datei backgroundmusic habe ich die verschiedenen Musikzustände dazu implementiert.

2.2.  Struktur der JS-Datei Canvas

Ich habe hierfür das ObserverPattern als Entwurfsvorlage herangezogen. Vergleichen Sie hierzu bitte auch  Datei ObserverPattern.js im Pong Ordner.
Für die Attributsverwaltung habe ich ein Subject gebildet von dem ich dann die Bestandteile des Canvas wie z.B. Ball,Schläger oder Netz ableiten konnte, um diese konkret in ihren Attributen und den zu verändernden Methoden zu verwalten.

Um die Elemente letztendlich zu zeichnen, habe ich diese zunächst zu den Beobachtern hinzugefügt, um dann entsprechende Änderungen durch die jeweils ausimplementierte Methode draw() vorzunehmen. Dieses geschieht durch den indirekten Aufruf in update() durch das Subject. Update wird innerhalb der Benachrichtungsmethode für die Observer aufgerufen. Somit ist die Austauschbarkeit der View unabhängig vom Subject(Model) gestaltet worden und setzt damit eine getrennte Verwaltung von Model und Viewum. Die View kennt das Subject, aber umgekehrt kennt das Subject die View nicht. Immer wenn update aufgerufen wird, kann das gesamte Canvas zur Laufzeit neu gezeichnet werden. 

2.3 Zur JS-Datei htmlloader

Diese Hilfsklasse sollte ihre Zuständigkeit in dem Laden von HTML-Seiten, wenn man auf einen Menüpunkt aus der Kopfzeile drückt, erhalten. Je nachdem auf welcher HTML Seite der HTMLLoader genutzt wird, ist ein Prefix anzugeben, damit der Pfad beim Aufruf korrekt gesetzt wird.( Vgl. Ordnerstruktur).



2.4. Überprüfung einer Kollision  mit Hilfe von collision.js

In collision.js habe ich eine Sammlung von Hilfsmethoden zum Aufruf in game.js implementiert.
Hierbei habe ich ein Model übergeben, um die entsprechenden Koordinaten der jeweiligen Kollisionsberechnung zur Verfügung zu haben. Es wird jeweils ein Boolscher Wert zurückgeben, ob der Zusammenstoß stattfand oder nicht. 

2.5.Spiellogik in game.js

Die Klasse game.js verwaltet die Spiellogik, hierzu nutzt sie Objekte der Klassen Collision und aus dem Canvas.



3 Menü und Ajax

Das Menü ist das einzige Element, das auf allen HTML Seiten gleich und einheitlich erscheint. Um dieses umzusetzen habe ich mich für den Einsatz von Ajax entschieden, da ich somit über die Funktion loadmenue diesen Teil der Seiten nachladen kann. Somit konnet ich auf  Redundanzen verzichten.

4 Levelformat in JSON 

Zur Definition der Level habe ich JSON als Format gewählt, um diese während der Spielzeit in ein Array zu laden. Dabei handelt sich um ein Array, bei dem jeder Eintrag genau einem Level entspricht. Ein Eintrag ist wie folgt aufgebaut:
    -> intervalMilliseconds entspricht der Zeit in der das Canvas neu gezeichnet wird und die Kollision 			überprüft wird.
    -> hit entspricht der Anzahl, wie häufig der Computer den Ball trifft. Alle weiteren Treffer sind Zufall.
    -> level ist der Name des Levels
    -> dPoints ist die Punktanzahl, die man erhält, wenn man ein Spiel im jeweiligen Level gewinnt.


5 relative Pfadangabe der URL´s 

Alle URL‘s habe ich  relativ bestimmt, damit eine Unabhängikeit von der Webserversoftware gegeben ist.

