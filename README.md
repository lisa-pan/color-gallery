# Fellfarben-Galerie
## [DEMO-LINK](https://lisa-pan.github.io/color-gallery/)
Dies ist eine einfache Galerie, die ich erstellt habe, um die verschiedenen Fellfarben und -zeichnungen von Hunden zu zeigen und
deren genetische Grundlagen zu erklären. Sie wurde zunächst als statische Website mit HTML und CSS erstellt, und dann mit
JavaScript um interaktive Funktionen erweitert.

## Funktionen

### Bildergalerie
Die Website verfügt über eine Galerie von Hundebildern, die verschiedene Fellfarben und -zeichnungen repräsentieren.
Bei Klick auf ein Bild in der Galerie öffnet sich ein modales Fenster mit zusätzlichen Informationen zu dieser Fellfarbe.

### Modale Fenster
In den modalen Fenstern werden detaillierte Informationen zu den ausgewählten Fellfarben und -zeichnungen angezeigt, wie die genetische Grundlage,
Interaktion mit anderen Genen, alternative Farbbezeichnungen, die Rassen, in denen sie häufig vorkommt, und andere interessante Fakten. Ein Klick auf 
das X im Fenster rechts oben schließt das modale Fenster.

### Bilder-Slideshow
Innerhalb des modalen Fensters besteht die Möglichkeit, eine Bilder-Slideshow zu starten. Durch Klicken auf die Pfeil-Buttons links und rechts können weitere
Beispiele der (genetisch) gleichen Fellfarbe angezeigt werden. So kann man verschiedene Variationen oder Interaktionen mit anderen Zeichnungen sehen.


## Bekannte Probleme
1. Ich arbeite im Moment noch am responsiven Design. Da gibt es noch einige Probleme, die ich jetzt nach und nach beheben will (auf kleinen Screens: image credits falsch positioniert, Bild im modalen Fenster
zu groß wenn man den Screen rotiert, etc.)

2. Ich hab für die Bilder-Slideshow zuerst die .removeChild() Methode benutzt um das alte Bild zu entfernen bevor das neue Bild geladen wird. Das hat manchmal nicht funktioniert, bzw. erst nach 
Aktualisieren der Seite. 
```
 const oldImg = modalImgContainer.querySelector('.modal-img');
  if (oldImg) {
    modalImgContainer.removeChild(oldImg); 
  }
```
Ich weiß nicht wo der Fehler lag oder wie ich das lösen kann, aber jetzt entferne ich das alte Bild erstmal mit modalImgContainer.innerHTML = '' bis ich eine bessere Lösung finde.


  
