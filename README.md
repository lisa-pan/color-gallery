# Fellfarben-Galerie
## [DEMO-LINK](https://lisa-pan.github.io/color-gallery/)
Eine Galerie  mit (vereinfachten) Erklärungen zu den genetischen Grundlagen der häufigsten Fellfarben und -zeichnungen von Hunden.

## Funktionen

### Bildergalerie
Bei Klick auf ein Bild in der Galerie öffnet sich ein modales Fenster mit zusätzlichen Informationen zu dieser Fellfarbe.

### Modale Fenster
In den modalen Fenstern werden nähere Informationen zu der gezeigten Fellfarbe angezeigt: die genetische Grundlage,
Interaktion mit anderen Genen, alternative Farbbezeichnungen, die Rassen, in denen sie häufig vorkommt, und andere interessante Fakten. Ein Klick auf 
das X im Fenster rechts oben schließt das modale Fenster.

### Bilder-Slideshow
Innerhalb des modalen Fensters kann man durch Klicken auf die Pfeil-Buttons links und rechts weitere
Beispiele der (genetisch) gleichen Fellfarbe sehen. 

### Akkordeon
Im Header ist ein Akkordeon mit zwei Text-Blöcken, die sich bei Klick auf die entsprechende Sektion öffnen.


## Bekannte Probleme
1. Ich arbeite im Moment noch am responsiven Design. Da gibt es noch einige Probleme, die ich jetzt nach und nach beheben will (auf kleinen Screens: image credits falsch positioniert, Bild im modalen Fenster
zu groß wenn man den Screen rotiert, Akkordeon im Header nicht vollständig sichtbar)

2. Ich hab für die Bilder-Slideshow zuerst die .removeChild() Methode benutzt um das alte Bild zu entfernen bevor das neue Bild geladen wird. Das hat manchmal nicht funktioniert, bzw. erst nach 
Aktualisieren der Seite. 
```
 const oldImg = modalImgContainer.querySelector('.modal-img');
  if (oldImg) {
    modalImgContainer.removeChild(oldImg); 
  }
```
Ich weiß nicht wo der Fehler lag oder wie ich das lösen kann, aber jetzt entferne ich das alte Bild erstmal mit innerHTML = '' bis ich eine bessere Lösung finde.


  
