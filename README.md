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

### Akkordeon
Im Header der Website befindet sich ein Akkordeon, das grundlegendes Wissen über die Fellfarbgenetik bei Hunden enthält. Durch Klicken auf die Überschrift
"Grundwissen: Fellfarbgenetik bei Hunden" wird dieser Bereich erweitert und zusätzliche Informationen werden angezeigt. 
Das will ich in der nächsten Version noch erweitern und responsiv machen.

## Herausforderungen 
Obwohl das Projekt recht einfach ist, bin ich trotzdem öfter auf Herausforderungen gestoßen, vor allem in Bezug auf das CSS-Styling. Aber auch beim Schreiben
des JavaScript-Codes hab ich einiges Neues gelernt. 
Ich musste sicherstellen, dass die Bilder-Slideshow und der dazugehörige Infotext immer zum ausgewählten Bild
in der Galerie passten. Um dieses Problem zu lösen, hab ich das Objekt "imgTextMap" erstellt. Jedes Bild in der Galerie erhielt eine eindeutige ID, der ein Objekt 
namens "dogObj" zugeordnet wurde. Dieses Objekt enthält die weiteren Bilder für die Slideshow und den Text für jedes Bild in der Slideshow. 

Beim Öffnen des modalen Fensters wurde die Variable currentSlideIndex auf 1 gesetzt und bei jedem Klick auf die Pfeil-Buttons entsprechend aktualisiert. Mit den
Bild- und Text-Keys und der currentSlideVariable konnte ich den Inhalt der Slideshow dynamisch aktualisieren.

Eine weitere Herausforderung bestand darin, sicherzustellen, dass beim Klick auf den rechten Pfeil-Button (nextBtn) das nächste Bild der Slideshow angezeigt wurde,
aber nur solange das letzte Bild noch nicht erreicht war. Außerdem sollten die Pfeil-Buttons deaktiviert werden, wenn es nicht mehr möglich war, weiter vorwärts oder
rückwärts zu gehen. 
Dafür mussten die Funktionen wissen, wann das letzte Bild erreicht war, wobei jede Slideshow eine unterschiedliche Anzahl von Bildern enthält. 
Ich hab also nach einer Möglichkeit gesucht, die Anzahl der Bilder in der geöffneten Slideshow zu zählen.
Das ist die Funktion (bzw. das relevante if-Statement innerhalb der Funktion), die ich letztendlich benutzt hab:
```
if (currentSlideIndex < Object.keys(dogObj).filter(function(key) { 
    return key.startsWith('img');
  }).length)
```

Es werden alle keys gefiltert, die mit 'img' anfangen ('img1', 'img2', und so weiter) und die Anzahl dann mit dem currentSlideIndex verglichen.

## Bekannte Probleme
Ich hab für die Bilder-Slideshow zuerst die .removeChild() Methode benutzt um das alte Bild zu entfernen bevor das neue Bild geladen wird. Das hat manchmal nicht funktioniert, bzw. erst nach 
Aktualisieren der Seite. 
```
 const oldImg = modalImgContainer.querySelector('.modal-img');
  if (oldImg) {
    modalImgContainer.removeChild(oldImg); 
  }
```
Ich weiß nicht wo der Fehler lag oder wie ich das lösen kann, aber jetzt entferne ich das alte Bild erstmal mit modalImgContainer.innerHTML = '' bis ich eine bessere Lösung finde.


  
