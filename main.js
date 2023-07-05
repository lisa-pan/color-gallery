// Variablen

const accordion = document.getElementsByClassName('accordion');
const modalContainer = document.getElementById('modal-container');
const modalContent = document.getElementById('modal-content');
const modalText = document.getElementById('modal-text');
const closeBtn = document.getElementById('close-btn');
const dogImg = document.querySelectorAll('.dog-img');
const nextBtn = document.getElementById('next-btn');
const prevBtn = document.getElementById('prev-btn');

let currentSlideIndex;
let dogId;

// Header Akkordeon

for (let i = 0; i < accordion.length; i++) {
  accordion[i].addEventListener('click', function () {
    this.classList.toggle('active');
  })
}

// Modal öffnen (bei klick auf Bild)

for (i = 0; i < dogImg.length; i++) {
  dogImg[i].addEventListener('click', showModal)
};

function showModal(e){
  const imageSrc = e.target.src;
  dogId = e.target.id;
  currentSlideIndex = 1;
  const imgElem = document.createElement('img');

  imgElem.src = imageSrc;
  imgElem.classList.add('modal-img');
  modalContent.appendChild(imgElem);
  modalContainer.classList.add('show-modal');

  const textObj = imgTextMap[dogId];
  modalText.innerHTML = textObj.slide1;

  prevBtn.disabled = true;
  nextBtn.disabled = false;
}

// Modal schließen

closeBtn.addEventListener('click', function(){
  modalContainer.classList.remove('show-modal');
})

prevBtn.addEventListener('click', showPrevSlide);
nextBtn.addEventListener('click', showNextSlide);


// Slideshow

function showPrevSlide () {
  if (currentSlideIndex === 1){
    return;
  } else {
    currentSlideIndex--;
    updateModalContent();
  }
}

function showNextSlide () {
  let dogObj = imgTextMap[dogId];
  if (currentSlideIndex < Object.keys(dogObj).filter(function(key) { // siehe unten
    return key.startsWith('img');
  }).length) {
    currentSlideIndex++;
    updateModalContent();
  } else {
    return;
  }
}
  /* Die Funktion schaut erstmal welche Bilder und Slides zu der geklickten dogId gehören und speichert das in dogObj. Dann wird gezählt, wie viele Bilder in diesem dogObj sind. Object.keys(dogObj).filter (...) filtert alle keys die mit 'img' anfangen und zählt diese (.length)
  */

function updateModalContent(){
  
  const imgKey = `img${currentSlideIndex}`
  const textKey = `slide${currentSlideIndex}`;
  const dogObj = imgTextMap[dogId];

 // altes Bild entfernen 
  const oldImg = modalContent.querySelector('.modal-img');
  if (oldImg) {
    modalContent.removeChild(oldImg);
  }
  
  // neues Bild
  const imgElem = document.createElement('img');
  imgElem.src = dogObj[imgKey];
  imgElem.classList.add('modal-img');
  modalContent.appendChild(imgElem);
  modalText.innerHTML = dogObj[textKey];

  disableButtons();
}

// Vor- und Zurück-Buttons der Slideshow deaktivieren wenn erstes/letztes Bild erreicht ist

function disableButtons (){
  const dogObj = imgTextMap[dogId];
 
  if (currentSlideIndex === 1) {
    prevBtn.disabled = true;
  } else {
    prevBtn.disabled = false;
  }

  if (currentSlideIndex === Object.keys(dogObj).filter(function(key) {
    return key.startsWith('img');
  }).length) {
    nextBtn.disabled = true;
  } else {
    nextBtn.disabled = false;
  };
}


// Text für Modals

const redText = {
  img1: "dogbreed-pics/recessive-red.jpg",
  slide1: '<p> Hunde, die reinerbig für rezessives Rot sind haben einen (harmlosen) Gendefekt, durch den sie gar kein Eumelanin im Fell bilden. Das heißt: wenn ein Hund den Genotp e/e hat, werden alle anderen Fellzeichnungen mit Ausnahme von Weißscheckung unterdrückt. Je nach Intensität ihres Phäomelanin-Pigments sind sie vollständig weiß bis rot (mit oder ohne Weißscheckung). Golden Retriever sind immer reinerbig für rezessives Rot.</p>',
  img2: "dogbreed-pics/viszla.jpg",
  slide2: '<p> Rezessives Rot kann leicht mit der Farbe Zobel/Sable verwechselt werden. Aber auch ein komplett roter Zobel-Hund kann noch Eumelanin bilden, bei einem Hund mit rezessivem Rot wird man dagegen kein einziges schwarzes Tasthaar finden. Tatsächlich können die Tasthaare oft ein Unterscheidungsmerkmal zwischen Zobel und rezessivem Rot sein, wenn der Hund nicht gerade eine weiße Blesse hat. </p><p> Die Hunde im Bild sind Viszlas: genau wie Golden Retriever sind sie immer rezessiv rot (e/e), doch anders als der Retriever haben sie außerdem braunes Pigment (b/b). Diese Kombination kann auch beim Labrador vorkommen, da die Rasse beide Gene trägt, allerdings ist blond mit braunem Pigment in der Rasse unerwünscht und kommt somit eher in Jagdlinien vor.</p>',
  img3: "dogbreed-pics/rosanase.jpg",
  slide3: '<p> Das Gen wirkt sich nicht direkt auf die Pigmentbildung in der Haut, also Nase und Augenlider aus. Hier sieht man immer noch welches Eumelanin-Pigment der Hund trägt. Allerdings ist bei Hunden mit rezessivem Rot ein im Alter zunehmender Pigmentverlust an der Nase sehr häufig. Auch das kann übrigens ein Unterscheidungsmerkmal zu Zobel sein, ist allerdings nicht immer verlässlich.</p> <p> Das Bild zeigt einen schwarzen und zwei gelbe Labradore, alle mit schwarzem Hautpigment. Bei den gelben Labradoren wird die ursprünglich schwarze Nase langsam rosa. Dieser Pigmentverlust scheint bei braun pigmentierten Hunden übrigens deutlich stärker zu sein: man beachte die vollständig rosa Nasen der Viszlas auf der letzten Seite.</p>'
};

const intensityText = {
  img1: "dogbreed-pics/intensity.jpg",
  slide1: '<p> Der Farbton des rotblonden Phäomelanin-Pigments kann stark variieren. So sieht man zum Beispiel beim blonden Labrador und Golden Retriever Farbtöne von fast weiß bis “fox red”, vor allem in Jagdlinien.</p>',
  img2: "dogbreed-pics/samoyed.jpg",
  slide2: '<p> Tatsächlich sind die meisten weißen Hunderassen gar nicht “echt” weiß, das heißt ihnen fehlt kein Pigment, sondern sie haben einfach sehr stark verdünntes Phäomelanin. Malteser, Westies, Bichons, weiße Pudel, und viele andere Rassen sind also einfach nur wasserstoffblond. Tatsächlich findet man in diesen Rassen oft Hunde mit hellem Cremeton, wie bei den Samojeden im Bild. </p>',
  img3: "dogbreed-pics/setter.jpg",
  slide3: '<p> Den wohl intensivsten Rotton findet man beim Irish Setter. Mehrere Gene sind für die unterschiedlichen Farbintensitäten des Phäomelanin-Pigments verantwortlich. Zunächst wurde nur der Intensity-Lokus (I) identifiziert und benannt, aber in einer großen von embark finanzierten Studie von 2021 wurden insgesamt fünf Genvarianten gefunden, deren Kombination etwa 70% der Unterschiede in der Phäomelanin-Intensität von Hunden erklären können.</p>',
  img4: "dogbreed-pics/intensity2.jpg",
  slide4: '<p> Nicht nur einfarbig blonde oder rote Hunde zeigen unterschiedliche Phäomelanin-Intensität: die verantwortlichen Gene wirken sich auf alle rot pigmentierten Bereiche im Fell aus. Der Welpe links zeigt deutlich blasseres Phäomelanin in seinen rötlichen Anteilen als der Corgi rechts.</p>' 
};

const blackText = {
  img1: "dogbreed-pics/black.jpg",
  slide1: '<p> Das dominante K-Allel (manchmal KB geschrieben) verhindert die Ausprägung der A-Serie (siehe Zobel, Agouti, Lohfarben), und führt so zu einem in der Regel einfarbigen Hund (mit oder ohne Weißscheckung).</p> <p> Die Bezeichnung "dominantes Schwarz" kann irreführend sein, denn die endgültige Fellfarbe wird durch viele andere Gene beeinflusst. So kann der Farbton des schwarzen Pigments zu Braun, Blau, oder Silber verändert werden, und auch andere (nicht rote) Zeichnungen wie Merle oder Weißscheckung sind möglich.</p>',
  img2: "dogbreed-pics/labrador.jpg",
  slide2: '<p> Tatsächlich kann ein Hund auch gar kein Eumelanin zeigen, selbst wenn er ein K-Allel trägt: das ist der Fall, wenn er zusätzlich rezessives Rot hat (K/-, e/e), das die Bildung von Eumelanin komplett verhindert.</p> <p> Ein gutes Beispiel ist der Labrador: alle Labradore (mit seltenen Ausnahmen) sind reinerbig für das dominante Schwarz Allel K/K. Ein brauner Labrador hat zusätzlich b/b und ein blonder e/e. Das einzige was bei einem "dominant schwarzen" Hund nicht möglich ist, ist eine Kombination von Eumelanin- und Phäomelanin-Haaren im Fell, also kein Zobel, Tanmarken, Agouti, oder Stromung. Eine Maske kann der Hund theoretisch haben, allerdings wird eine schwarze Maske auf einem schwarzen Hund nicht sichtbar sein.</p>',
  img3: "dogbreed-pics/recessive-black.jpg",
  slide3: '<p> Es gibt übrigens auch rezessives Schwarz, das auf dem A-Lokus liegt (a/a). Es wird hier nicht näher behandelt weil es nur bei wenigen Rassen vorkommt, hauptsächlich bei nordeuropäischen Hütehunden (z.B. Deutscher Schäferhund, Sheltie, Samojede). Der Schäferhund im Bild hat rezessives Schwarz, denn das dominante K-Allel kommt bei der Rasse nicht vor. Äußerlich unterscheiden sie sich nicht von Hunden mit dominantem Schwarz.</p>' 
};

const brownText = {
  img1: "dogbreed-pics/brown.jpg",
  slide1: '<p> Das Gen für braune Fellfarbe (b/b) modifiziert sämtliches Schwarz zu Braun. Es wirkt sowohl auf Fell als auch auf das Pigment in der Haut (Nase, Augenlider) und hellt auch die Augenfarbe von dunkelbraun zu bernsteinfarben auf. Rote und braune Fellfarbe wird oft verwechselt, und rote Hunde werden in der Alltagssprache als braun beschrieben oder umgekehrt. Es handelt sich aber um zwei verschiedene Pigmente: Rot ist Phäomelanin und Braun ist Eumelanin, das durch das TYRP1-Gen verändert wurde. Dabei handelt es sich auch nicht um verdünntes Pigment, sondern die Form der Pigmentmoleküle ist verändert.</p>',
  img2: "dogbreed-pics/merle-brown.jpg",
  slide2: '<p> Die Farbe, die oft als "red merle" bezeichnet wird, ist eigentlich braun, denn Merle wirkt nur auf Eumelanin. Der Merle-Dackel auf dem Bild zeigt den Unterschied gut: man sieht die rote Fellfarbe in den klassischen Tanmarken, also um die Schnauze, die Augenbrauenflecken, auf der Brust und an den Pfoten. Das braune Pigment der Nase und des umliegenden Fells unterscheidet sich davon deutlich, und nur auf diesen braunen Bereichen sieht man auch die Merle-Zeichnung.</p>'
}; 

const dilutionText = { 
  img1: "dogbreed-pics/blue.jpg",
  slide1: '<p> Das Dilution- oder Verdünnungs-Gen (d/d) verdünnt die Farbe des Eumelanins und wirkt auch auf Nasen- und Augenfarbe. Dabei wird Schwarz zu Blau verdünnt und Braun zu Silber. Es ist rezessiv, der Hund braucht also zwei Kopien des Gens um die verdünnte Farbe aufzuweisen.</p> <p> Sämtliches Eumelanin-Pigment im Hund ist betroffen: ein blauer Hund kann gar kein Schwarz im Fell haben. Die Farbverdünnung ist außerdem schon beim neugeborenen Welpen sichtbar, anders als z.B. progressives Ergrauen, bei dem die Hunde schwarz geboren werden. An der Nasenfarbe lassen sich Hunde mit Farbverdünnung gut erkennen.',
  img2: "dogbreed-pics/isabella.jpg",
  slide2: '<p> Wenn ein Hund sowohl Verdünnung (d/d) als auch braunes Pigment (b/b) aufweist, ist das Ergebnis eine blass braune Farbe, die als Silber, Isabell, oder Lilac bezeichnet wird. Es gibt nicht viele Rassen, in denen beide rezessive Gene gleichzeitig auftauchen, daher ist die Farbe eher selten, bei Weimaranern ist sie aber die einzige akzeptierte Farbe. Gelegentlich sieht man Hunde mit dieser Farbe auch bei Border Collies, Chihuahuas, Französischen Bulldogen, oder dem American Pitbull Terrier. Silberne Labradore sind umstritten, und vermutlich aus einer Kreuzung mit Weimaranern entstanden.</p>',
  img3: "dogbreed-pics/slatemerle.jpg",
  slide3: '<p> Merle-Hunde mit schwarzem Pigment werden oft als "blue merle" bezeichnet, da der Effekt des Merle-Gens bei schwarzem Fell zu einer blaugrauen Farbe führen kann. Es handelt sich aber fast nie um echtes Blau, also verdünntes Schwarz. Grundsätzlich ist die Kombination aus Farbverdünnung und Merle aber möglich: Der Hund im Bild zeigt diese recht seltene Kombination. Man erkennt das blasse Nasenpigment und auch die dunklen Anteile im Merle-Fell sind nie ganz schwarz. Um sie von der "blue merle" genannten Farbe zu unterscheiden werden diese Hunde als "slate merle" bezeichnet.</p><p class="credits"><a href="https://commons.wikimedia.org/wiki/File:Carea_Leon%C3%A9s2.jpg">Diotime</a>, <a href="https://creativecommons.org/licenses/by/3.0">CC BY 3.0</a>, via Wikimedia Commons</p>'
};

const sableText = {
  img1: "dogbreed-pics/sable.jpg",
  slide1: '<p> Der A-Lokus spielt eine entscheidende Rolle für die Zeichnung eines Hundes. Zobel/Sable ist dabei das dominanteste Allel der A-Serie und hat viele Namen und Erscheinungsbilder. Phänotypisch sind es Hunde bei denen rotes oder blondes Pigment (Phäomelanin) vorherrscht, aber je nach Ausprägung mehr oder weniger viele schwarz (oder braun/blau/silber) pigmentierte Haare vorhanden sind. Man unterscheidet zwischen "Clear Sable" (ganz rot, leicht zu verwechseln mit rezessivem Rot), "Shaded Sable" (viel Schwarz, manchmal zu verwechseln mit Agouti) und "Tipped Sable" (eine Zwischenform).</p> <p> Welpen haben dabei mehr dunkel pigmentierte Haare, und können bei der Geburt fast schwarz aussehen. Das Bild zeigt einen Welpen, bei dem im Erwachsenenalter wahrscheinlich nicht viel schwarz übrig bleiben wird.</p>',
  img2: "dogbreed-pics/shaded-sable.jpg",
  slide2: '<p> Was genau die unterschiedlichen Zeichnungen verursacht ist noch nicht ganz klar. Modifizierende Gene auf anderen Loki könnten eine Rolle spielen, aber auch die anderen Allele der A-Serie scheinen eine Rolle zu spielen. Bei einigen Rassen wie dem Sheltie wird beobachtet, dass Hunde, die Ay/At oder Ay/a tragen (also ein Zobel- und ein Tanpoint- oder rezessives Schwarz-Allel) deutlich dunkler sind als Hunde mit Ay/Ay (reinerbiges Zobel). Der Hund im Bild ist ein sogenannter "schwarzfaktorierter" Zobel, also ein mischerbiger Träger. Allerdings treten unterschiedlich starke Schattierungen auch in Rassen auf, in denen alle Hunde reinerbig für Zobel sind, es muss also noch andere Faktoren geben.</p> <p>Die Unterscheidung zu Agouti oder Creeping Tan kann schwer sein, aber der Sheltie im Bild zeigt ein sehr charakteristisches Zobel-Merkmal: den "Witwenspitz", also die V-förmige Zeichnung auf der Stirn.',
  img3: "dogbreed-pics/clear-sable.jpg", 
  slide3: '<p> Ist gar kein Schwarz im Fell vorhanden fällt die Unterscheidung zu rezessivem Rot schwer. Der Hund im Bild ist aber trotzdem eindeutig Zobel: die schwarzen Tasthaare verraten es. Hunde mit rezessivem Rot können gar kein Eumelanin im Fell bilden.</p> <p> Übrigens sind auch alle Hunde mit Stromung am ganzen Körper genetisch Zobel. Bei ihnen wird das Fell aber noch zusätzlich von dunklen Streifen durchzogen.</p>'
};

const agoutiText = {
  img1: "dogbreed-pics/agouti.jpg",
  slide1: '<p> Beim Agouti-Muster sind die Haare gebändert. Das heißt während das Haar wächst produzieren die Zellen abwechselnd Eumelanin und Phäomelanin. In der Dominanzfolge liegt Agouti zwischen Zobel und Tanmarken. Um Agouti auszudrücken braucht ein Hund also mindestens ein Agouti-Allel (Aw) und ein weiteres, das nicht Zobel (Ay) ist.</p> <p>Agouti kann in manchen Fällen mit "shaded sable", also Zobel mit hohem Schwarz-Anteil verwechselt werden, tatsächlich werden im englischsprachigen Raum Deutsche Schäferhunde in Agouti ("gewolkt") auch Sable genannt. Ein Merkmal, das bei der Unterscheidung helfen kann, ist die helle Brille bei Agouti-Hunden. "Shaded Sables" haben dagegen oft einen V-förmigen "Witwenspitz" (siehe Zobel).</p>',
  img2: "dogbreed-pics/schnauzer.jpg",
  slide2: '<p>Agouti wird auch Wolfsgrau genannt, und tatsächlich ist es auch der Wildtyp des Wolfs (das w in Aw steht für "wild type"). Es ist ein sehr altes und bei vielen Säugetieren weit verbreitetes Gen weil die gebänderten Haare eine gute Tarnung bieten.</p> <p> Ist das Phäomelanin des Hundes sehr hell entsteht durch die Bänderung von schwarz und weiß oder creme tatsächlich der Eindruck von grauem Fell. Das ist der Fall beim Schnauzer in der Farbe "Salz-und-Pfeffer". Diese Hunde sind genetisch Agouti mit hellem Phäomelanin.</p><p class="credits"><a href="https://commons.wikimedia.org/wiki/File:Miniature_Schnauzer_salt_%26_pepper.jpg">Canarian</a>, <a href="https://creativecommons.org/licenses/by-sa/3.0">CC BY-SA 3.0</a>, via Wikimedia Commons</p> '
};

const tanpointText = {
  img1: "dogbreed-pics/tanpoint.jpg",
  slide1: '<p> Tanmarken, auf englisch "tan points", sind klar abgegrenzte Flecken von Phäomelanin-Pigment: über den Augenbrauen, seitlich am Fang, mit Wangenflecken, zwei dreieckigen Brustflecken, an den Innenseiten der Beine und unterhalb des Knies bis zu den Pfoten. Es ist die klassische Fellzeichnung von Dobermann und Rottweiler und wird oft als "lohfarben" oder Schwarz & Loh/Brand/Tan bezeichnet.</p> <p> Es ist rezessiv gegenüber Zobel und Agouti auf dem A-Lokus, nur das seltene rezessive Schwarz liegt noch dahinter in der Dominanzfolge. Das heißt in den meisten Fällen braucht ein Hund zwei Kopien des Gens (at/at) um es auszudrücken.',
  img2: "dogbreed-pics/lilac-tanpoint.jpg",
  slide2: '<p> Tanmarken sind eine sehr häufige Zeichnung, aber nicht immer so offensichtlich wie bei einem Rottweiler oder Dobermann.</p> <p> Bei diesem Bild muss man genau hinschauen: der Chihuahua hat ebenfalls Tanmarken wie der Dobermann neben ihm, aber durch das helle Eumelanin (silber oder lilac, eine Kombination aus Braun (b/b) und Verdünnung (d/d)) kann man die Tanmarken kaum noch erkennen.</p> <p class="credits"><a href="https://commons.wikimedia.org/wiki/File:Chihuahua_%26_Doberman_Pup.jpg">PupKatPhotography</a>, <a href="https://creativecommons.org/licenses/by/2.0">CC BY 2.0</a>, via Wikimedia Commons</p>',
  img3: "dogbreed-pics/tricolor.jpg",
  slide3: '<p> Die häufige Farbbezeichnung Tricolor bezieht sich ebenfalls auf Tanmarken, nur kommen außerdem noch weiße Abzeichen dazu. Bei Shelties und Collies sieht man Tricolor auch häufig in Kombination mit Merle. All diese Hunde haben gemeinsam, dass sie auf dem A-Lokus at/at tragen, immer gut erkennbar an den klassischen roten Augenbrauen- und Wangenflecken. </p>',
  img4: "dogbreed-pics/beagle.jpg",
  slide4: '<p>2013 wurde ein Gen entdeckt, das die klassischen Tanmarken zu der Sattelzeichnung modifiziert, die man vor allem von Beagles, Basset Hounds, Deutschen Schäferhunden und Corgis kennt. Diese Hunde werden mit klassischen Tanmarken geboren, der schwarze Anteil zieht sich bald darauf aber langsam zurück, bis nur noch der schwarze Sattel auf dem Rücken übrig bleibt. Trägt der Hund nur eine Kopie dieses Gens stoppt dieser "Rückzug" der schwarzen Farbe früher und hört oft auf Höhe der Stirn auf.</p> '
};

const whiteText = {
  img1: "dogbreed-pics/piebald.jpg",
  slide1: '<p>Weißscheckung kann auf jeder Farbe auftreten und überdeckt jede Farbe. Man geht davon aus, dass Weißscheckung in den meisten Fällen von Genen auf dem S-Lokus bestimmt wird, bisher wurde allerdings nur ein Allel (Piebald, sp) identifiziert. Weißscheckung verhindert die Pigmentproduktion in den betroffenen Haut- und Haarzellen, das Fell wird weiß und die Haut rosa. Es scheint sich um einen unvollständig dominanten Erbgang zu handeln, da heterozygote Träger weniger Weiß zeigen (oder auch gar keins)</p>. ',
  img2: "dogbreed-pics/irish-spotting.jpg",
  slide2: '<p> Irish Spotting ist der Name für das Scheckungsmuster, bei dem die Schwanzspitze, Läufe und Pfoten, Kragen und Schnauze weiß sind, oft auch mit weißer Blesse. Es scheint sich um ein anderes Gen zu handeln als bei der Piebald-Weißscheckung, es ist aber noch nicht klar welches. Echtes Irish Spotting kommt nur bei wenigen Rassen vor, darunter Shelties, Collies und Border Collies, und Sennenhunde.</p>',
  img3: "dogbreed-pics/boxer.jpg",
  slide3: '<p>Minimale weiße Abzeichen (z.B. ein weißer Brustfleck) haben oft keine genetische Ursache und entstehen in der Embryonalentwicklung. Daher kann man sie auch nicht vollständig rauszüchten, auch in Rassen ohne Weißscheckung werden immer mal wieder Hunde mit kleinen weißen Abzeichen geboren. Das Bild zeig zwei Boxer, einer davon mit minimalen weißen Abzeichen an Brust und Pfoten. Ohne Gentest kann man nicht sicher sagen, ob der Hund heterozygoter sp-Träger ist oder nicht. Es ist aber sehr wahrscheinlich, da das Gen bei Boxern aber häufig ist.</p>',
  img4: "dogbreed-pics/bullterrier.jpg",
  slide4: '<p> Extremschecken sind fast komplett weiß, der Bullterrier auf dem Bild hat nur an den Ohren einen größeren Farbfleck. Die genetische Ursache ist nicht vollständig bekannt. Zwar testen Extremschecken reinerbig auf Piebald (sp/sp), aber nicht alle Piebald-Hunde zeigen einen derart hohen Weißanteil, es werden also weitere modifizierende Gene vermutet. Vor allem bei Boxern kommt es häufig vor, dass bei der Verpaarung von zwei Hunden mit eher geringem Weißanteil (bis zu einem Drittel des Fells) unerwartet Extremschecken mit sehr viel weiß geboren werden.</p> <p>Ein zu hoher Weißanteil kann zu gesundheitlichen Problemen führen (siehe Fellfarben und Gesundheit).</p>'
};

const maskText = {
  img1: "dogbreed-pics/mask.jpg",
  slide1: '<p>Hunde mit mindestens einem Em-Gen zeigen eine dunkel pigmentierte (Eumelanin) Maske auf rötlichem Fell (Phäomelanin). Die Maske ist von allen Genen betroffen, die den Farbton des Eumelanin-Pigments verändern, kann also außer schwarz auch blau, braun, oder silber sein. Em liegt auf dem gleichen Lokus wie rezessives Rot und ist dominant über alle anderen Allele des E-Lokus. Die Dominanzfolge ist Em > E (Wildtyp, kein Effekt) > (auf diser Seite nicht behandelt: Eg/a/h) > e (rezessives Rot), ein Hund braucht also nur eine Kopie des Em-Allels um eine Maske zu haben.</p> <p> Hat der Hund allerdings ein Allel für dominantes Schwarz (K) wird man die Maske nicht sehen, denn eine schwarze Maske auf einem schwarzen Hund kann man natürlich nicht erkennen (Ausnahme: siehe Progressives Ergrauen)', 
  img2: "dogbreed-pics/etching.jpg",
  slide2: '<p>Die Maske kann unterschiedlich groß sein und reicht von ein wenig Schwarz um die Nasenspitze bis zu einer Maske die den ganzen Kopf bedeckt und sich auch auf den Hals erstrecken kann. Bei Hunden mit Tanmarken kann die Maske die typische Gesichtszeichnung (Augenbrauen- und Wangenflecken) teilweise oder vollständig überdecken. Die Maske selbst kann ebenfalls überdeckt werden, und zwar von Weißscheckung. Bernhardiner haben typischerweise eine weiße Blesse, aber bei den meisten Bernhardinern ist die Maske groß genug, dass man sie trotzdem noch deutlich erkennt.</p> <p> Welche Gene die Größe der Maske bestimmen ist noch unklar. Der Bernhardiner im Bild zeigt außerdem sogenanntes "watermarking" oder "etching", das vermutlich mit der Maskenzeichnung zusammenhängt: bei Zobel-Hunden mit Weißscheckung zeigen die Farbplatten manchmal Eumelanin-Pigmentierung an den Rändern. Das sieht man am häufigsten bei Bernhardinern und Akitas, kommt aber auch in anderen Rassen gelegentlich vor.</p> <p class="credits"><a href="https://commons.wikimedia.org/wiki/File:Lucky,the_St.Bernard.jpg">Ethel,queen of iris</a>, <a href="https://creativecommons.org/licenses/by-sa/4.0">CC BY-SA 4.0</a>, via Wikimedia Commons</p> ', 
  img3: "dogbreed-pics/bordeaux.jpg",
  slide3: '<p>Bordeauxdoggen, wie die im Bild, können schwarzes oder braunes Pigment haben, wobei Braun häufiger ist. Davon abhängig ist auch die Farbe der Maske, doch die braune Maske ist auf dem roten Fell eher schwer zu erkennen. Die Maskenzeichnung findet sich bei vielen Hunderassen, unter anderem Afghane, Mops, Ridgeback, Leonberger, Deutscher und Belgischer Schäferhund, Boxer.</p>'
}; 

const brindleText = {
  img1: "dogbreed-pics/brindle.jpg",
  slide1: '<p>Stromung (KBr) ist eines der Allele auf dem K-Lokus. Dabei funktioniert KBr so wie das ky-Allel, das die Ausprägung der A-Serie erlaubt, zusätzlich werden die rötlichen Anteile des Fells aber gestromt, also mit dunkel pigmentierten Fell in einem Streifenmuster überzogen. Die Stromung kann unterschiedlich stark ausfallen, bei manchen Hunden sind die dunklen Streifen so dicht, dass man die rote oder blonde Farbe darunter kaum noch erkennen kann.</p>',
  img2: "dogbreed-pics/tanpoint-brindle.jpg", 
  slide2: '<p>An Hunden mit Tanmarken kann man gut erkennen, dass nur das Phäomelanin im Fell gestromt wird. Hunde, die am ganzen Körper gestromt sind, sind genetisch immer Zobel. Der Hund im Foto ist Bobi, ein Rottweiler-Mix, aus einem Tierheim in Zadar, Kroatien. Diese Farbe ist bei Hunden aus der Region recht häufig.</p><p class="credits"><a href="https://commons.wikimedia.org/wiki/File:BrindleBobi.JPG">Mirta12</a>, <a href="https://creativecommons.org/licenses/by-sa/3.0">CC BY-SA 3.0</a>, via Wikimedia Commons</p>',
  img3: "dogbreed-pics/wolfhound-brindle.jpg", 
  slide3: '<p>Wie viele andere Fellzeichnungen ist auch gestromtes Fell bei Langhaar- oder Drahthaarhunden schwerer zu erkennen als auf kurzem Fell. Dieser Irische Wolfshund ist auch gestromt, das Ergebnis sieht bei seiner Fellstruktur eher verwaschen aus.</p> <p class="credits"><a href="https://commons.wikimedia.org/wiki/File:Irish_Wolfhound_brindle_1.jpg">Canarian</a>, <a href="https://creativecommons.org/licenses/by-sa/4.0">CC BY-SA 4.0</a>, via Wikimedia Commons</p>',
  img4: "dogbreed-pics/missing-stripes.jpg",
  slide4: '<p>Ein ungewöhnliches Phänomen, das gelegentlich bei Whippets und Greyhounds auftritt, sind fehlende Streifen. Aus noch unbekannten Gründen finden sich vor allem bei diesen Rassen manchmal gestromte Hunde, bei denen auf einer größeren Fläche keine Stromung zu sehen ist.</p>'  
};

const merleText = {
  img1: "dogbreed-pics/merle.jpg",
  slide1: '<p>Das Merle-Gen ist komplex und zeichnet sich phänotypisch durch ein Muster von unregelmäßigen, "zerrissenen" Farbflecken aus. Merle wirkt auf Eumelanin, also das schwarze oder braune/blaue/silberne Fell und Haut- und Augenfarbe. Auf Phäomelanin hat es meistens keinen Effekt; ein "red merle" Hund ist eigentlich braun, nicht rot. Bei Zobel-Hunden kann man oft nur eine schwache Merle-Zeichnung sehen, abhängig davon wie viel Eumelanin im Fell ist.</p><p> Der Sheltie im Bild ist Schwarz & Loh (Tanmarken) und hat außerdem Weißscheckung im Irish Spotting Muster. Die roten Abzeichen bleiben vom Merlemuster unberührt.</p>',
  img2: "dogbreed-pics/bergamasco.jpg",
  slide2: '<p>Merle kommt auch in einigen Rassen vor, in denen das Muster wegen der Fellstruktur schwer zu erkennen ist. Bei diesem Bergamasco kann man es noch ganz gut sehen, aber bei manchen Vertretern der Rasse kann die Unterscheidung beim ausgewachsenen Hund schwer fallen. Auch bei rauhaarigen Rassen wie dem Rauhaardackel kann es manchmal schwer zu erkennen sein, vor allem wenn wenig Eumelanin im Fell ist.</p> <p class="credits"><a href="https://commons.wikimedia.org/wiki/File:Bergamasco_shepherd_dog_-_merle_female_cropped.jpg">Towncommon</a>, <a href="https://creativecommons.org/licenses/by-sa/3.0">CC BY-SA 3.0</a>, via Wikimedia Commons</p>',
  img3: "dogbreed-pics/catahoula.jpg",
  slide3: '<p> Merle ist deutlich komplexer als zunächst angenommen, aber grundsätzlich kann man sagen: Merle (M) ist dominant gegenüber nicht-Merle (m) und reinerbige Träger ("Doppel-Merle" (M/M)) zeigen einen hohen Weißanteil und haben sehr häufig auch gesundheitliche Probleme (mehr dazu unter Fellfarben und Gesundheit).</p><p> Ursprünglich ging man von nur einem Merle-Allel (M) aus, inzwischen weiß man aber, dass die Länge dieses Gens, also die Anzahl der Basenpaare, stark variieren kann. Darum wurden eine Reihe weiterer Merle-Allele bestimmt, die einen unterschiedlich starken Effekt auf die Fellfarbe haben können.</p> <p>Durch Neumutationen des Merle-Gens auch nach der Befruchtung kommt es teilweise auch dazu, dass nicht alle Zellen den gleichen Genotyp aufweisen (genetisches Mosaik). So kommt es bei einem Gentest unter Umständen auch zu drei oder sogar vier verschiedenen Ergebnissen für den M-Lokus (z.B. Mc/Ma/m).</p><p class="credits"><a href="https://commons.wikimedia.org/wiki/File:Red_Leopard_Catahoula_From_Sasquatch_Catahoulas,_Please_give_credit_when_used.jpg">Bugaflee</a>, <a href="https://creativecommons.org/licenses/by-sa/4.0">CC BY-SA 4.0</a>, via Wikimedia Commons</p>' 
}; 

const greyingText = {
  img1: "dogbreed-pics/greying.jpg",
  slide1: '<p>Hunde mit dem Gen für progressives Ergrauen werden mit vollem Pigment geboren und dann zunehmend heller. Es unterscheidet sich von dem Gen für Verdünnung darin, dass Hunde mit verdünntem Pigment bereits mit dieser Farbe geboren werden und auch die Haut- (Nase) und Augenfarbe heller pigmentiert ist. Es unterscheidet sich ebenfalls von normalem Ergrauen im Alter, das später auftritt und bei dem vor allem die Haare um die Schnauze herum grau werden.</p><p>Es zeigt sich nur bei langhaarigen Hunden mit Gesichtsbehaarung (Furnishings) und den stärksten Effekt sieht man bei Rassen, die nicht durch einen Fellwechsel gehen. Bei Hunden mit kurzem Fell wird der Effekt nicht sichtbar, da die Haare schon ausfallen bevor sie grau werden.</p> ',
  img2: "dogbreed-pics/kerry-blue-terrier.jpg",
  slide2: '<p>Interessant ist, dass die Maske nicht betroffen ist. Der Kerry Blue Terrier ist eine Rasse, die sowohl das Gen für progressives Ergrauen als auch eine Maske hat. Bei der Geburt sind die Hunde komplett schwarz, dann wird das Fell am Körper grau während die Maske ihr volles Pigment behält. So wird die Maske sichtbar, die man sonst auf dem schwarzen Fell nicht gesehen hätte.</p><p>Man weiß noch nicht, welches Gen für progressives Ergrauen verantwortlich ist, aber es scheint sich bei den meisten Rassen um einen unvollständig dominanten Erbgang zu handeln, bei dem mischerbige Hunde einen schwächeren Effekt zeigen.<p class="credits"><a href="https://commons.wikimedia.org/wiki/File:Kerry_blue_terier_540.jpg">Pleple2000</a>, <a href="http://creativecommons.org/licenses/by-sa/3.0/">CC BY-SA 3.0</a>, via Wikimedia Commons</p>'
};

const tickingText = {
  img1: "dogbreed-pics/ticking.jpg",
  slide1: '<p>Bei manchen Hunden mit Weißscheckung sieht man kleine Farbtupfer auf dem weißen Fell, und zwar in der Farbe, die der Hund hätte, wenn er nicht weiß gescheckt wäre. Bei der Geburt sind diese Stellen noch weiß, aber schon nach ein bis zwei Wochen kommt die Farbe zum Vorschein. Dieses Phänomen nennt sich Ticking oder einfach Tüpfelung, beim English Setter spricht man von "Belton".</p>',
  img2: "dogbreed-pics/light-ticking2.jpg",
  slide2: '<p>Das Gen wurde noch nicht identifiziert, aber Ticking scheint unvollständig dominant über nicht-Ticking zu sein. Einige Hunde zeigen nur sehr leichtes Ticking, bei dem oft nur Fang und Läufe mit einigen Tupfen versehen sind. Im Gesicht sieht es oft so aus, als hätte der Hund Sommersprossen. Das könnte darauf hindeuten, dass der Hund nur ein Ticking-Allel hat. Ticking kommt in unterschiedlicher Stärke bei vielen Rassen vor, ist aber besonders häufig in allen Pointer-, Setter- und Spaniel-Rassen.</p>',
  img3: "dogbreed-pics/tanpoint-ticking3.jpg",
  slide3: '<p>Die Tupfen haben immer die selbe Farbe, die der Hund ohne Weißscheckung hätte. Bei dem Hund im Bild würde man ohne Ticking die Tanmarken kaum noch sehen, da der Großteil von Weiß bedeckt ist. So kommt aber die "darunterliegende" Farbe wieder zum Vorschein und man kann die klassischen Tanmarken am Fang und an den Läufen gut erkennen.</p>',
  img4: "dogbreed-pics/acd-puppies.jpg",
  slide4: '<p>Bei "Roan", im Deutschen auch Stichelung oder Schimmel (z.B. Schwarzschimmel, Braunschimmel) genannt sind die weißen Stellen mit einem dichten Muster von farbigen Haaren durchzogen. In manchen Fällen ist die Stichelung so dicht, dass man das Weiß kaum noch erkennen kann, aber tatsächlich werden auch diese Hunde weiß geboren. Das ist die klassische Farbe des Australian Cattle Dog und des Basset Bleu De Gascogne.</p><p> Auf de Bild sieht man einen Australian Cattle Dog mit 2 Wochen alten Welpen. Noch sind die Welpen weiß, aber als erwachsene Tiere werden sie so aussehen wie ihre Mutter.</p><p class="credits"><a href="https://commons.wikimedia.org/wiki/File:ACD_puppies_2_weeks.jpg">Eva holderegger walser</a>, <a href="https://creativecommons.org/licenses/by-sa/3.0">CC BY-SA 3.0</a>, via Wikimedia Commons</p>'
};

const miscText = {
  img1: "dogbreed-pics/dalmatian.jpg",
  slide1: '<p>Zum Schluss noch im Schnelldurchlauf ein Paar der Fellfarben, die hier nicht im Detail vorgestellt werden. </p> <p>Dalmatinerflecken sind wahrscheinlich eine modifizierte Form von Ticking. Sie sind Extremschecken, die bei der Geburt weiß sind (außer es sind größere Farbplatten vorhanden, die nicht von der Extremscheckung überdeckt wurden) und wie beim Ticking kommt die "darunter liegende" Farbe dann unter der Weißscheckung hervor.</p><p> Das ist beim Dalmatiner am häufigsten schwarz, kann aber auch braun, gelb, oder mit Tanmarken sein. Der Unterschied zum Ticking ist die klar abgegrenzte runde Form der Flecken im Gegensatz zu den eher unscharfen Farbtupfen beim klassischen Ticking.</p>',
  img2: "dogbreed-pics/harlequin.jpg",
  slide2: '<p>Das Harlekin-Gen kommt nur bei der Deutschen Dogge vor. Es ist eine Modifikation der Merle-Zeichnung, und wirkt somit nur bei Hunden, die auch das Merle-Gen haben. Dabei werden die helleren Anteile zwischen den dunklen Flecken einer Merle-Zeichnung weiß. Abhängig von der Form und Größe der Flecken kann die Zeichnung manchmal wie Kuhflecken oder Dalmatinerflecken aussehen, es handelt sich aber um ein anderes, nicht verwandtes Gen.</p><p>In seiner reinerbigen Form ist Harlekin ein Lethalfaktor, die Embryos werden noch im Mutterleib resorbiert. Alle phänotypischen Harlekindoggen haben also den Genotyp M/m (heterozygot Merle) und H/h (heterozygot Harlekin).</p><p> In manchen Rassen (z.B. Beauceron) und Sprachen wird "normales" Merle auch als Harlekin bezeichnet, aber nur die Deutsche Dogge hat das "echte" Harlekin-Gen, für welches es auch Gentests gibt. </p>', 
  img3: "dogbreed-pics/husky.jpg",
  slide3: '<p>Auf dem E-Lokus befinden sich außer dem Maskenfaktor (Em), dem Wildtyp (E) und rezessivem Rot (e) noch mindestens 3 weitere Allele. Dabei handelt es sich um Domino (EA), Grizzle (Eg) und Cocker Spaniel Sable (Eh). Diese liegen in der Dominanzfolge über rezessivem Rot, aber hinter dem Wildtyp E.</p><p> "Ancient Domino" findet sich in vielen nordischen Rassen wie dem Husky, Malamute, oder Grönlandhund, sowie den amerikanischen Ur-Rassen Chihuahua und Xoloitzcuintle, die von diesen abstammen. Grizzle (Eg) findet sich bei Windhunden, wie dem Saluki, Afghanen, oder Barsoi.</p><p> Grizzle und Domino interagieren mit anderen Genen auf komplexe Weise, weshalb ich sie hier nicht behandle, aber das Erscheinungsbild ist normalerweise ähnlich wie bei einem "shaded sable" mit stark aufgehelltem Phäomelanin, häufig mit einem dunklen Streifen auf der Schnauze. Da es aber auf einem anderen Lokus als Sable liegt, kann es in Kombination mit jeder Zeichnung der A-Serie auftreten. Der Hund im Bild ist wahrscheinlich Domino in Kombination mit Agouti (Aw).</p> ',
  img4: "dogbreed-pics/urajiro.jpg",
  slide4: '<p>Urajiro kommt in einigen Rassen vor, aber Shiba Inu und Akita Inu wurden auf besonders helle Urajiro-Ausprägung gezüchtet. Bei Urajiro wird Phäomelanin aufgehellt, aber nur an der Unterseite und seitlich am Fang.</p><p> Das Ergebnis sieht oft ähnlich aus wie Domino (siehe letzte Seite), aber Domino kommt nur in wenigen Rassen vor, kann nicht zusammen mit einer Maske auftreten da es auf dem E-Lokus liegt (Akitas haben häufig eine Maske), und der dunkle Streifen über der Nase fehlt bei Urajiro auch.</p>'
};

  const healthText = {
    img1: "dogbreed-pics/murdock-by-erin.jpg",
    slide1: '<p>Die meisten Fellfarben wirken sich nur auf das Erscheinungsbild des Hundes aus. Es gibt aber auch Farben, die zu gesundheitlichen Problem führen können. </p><p> Der bekannteste Fall ist das Merle-Gen: es kann zu Problemen im Zusammenhang mit Pigmentverlust führen, wie Taubheit, Blindheit, Sonnenempfindlichkeit und einem höheren Hautkrebs-Risiko. Dabei sind heterozygote Merle-Träger (M/m) seltener betroffen, "Doppel-Merle" (M/M) dagegen sehr häufig. Die Zucht von zwei Merle-Trägern ist in Deutschland illegal. Dieses Foto zeigt Murdock, einen Doppel-Merle Collie. Murdock ist taub und teilweise blind, die Augen sind nicht vollständig ausgebildet (Mikrophtalmie).</p><p class="credits"> Foto von <a href="https://www.flickr.com/photos/aggieerin/">erin (flickr)</a>, <a href="https://creativecommons.org/licenses/by-nc-sa/2.0/">CC BY-NC-SA 2.0</a>.</p>', 
    img2: "dogbreed-pics/weiss.jpg",
    slide2: '<p>Der Hund auf dem Bild könnte ebenfalls Doppel-Merle oder aber ein Extremschecke (oder eine Kombination) sein. Beide Gene kommen in Deutschen Doggen vor, und da praktisch kein Pigment mehr übrig ist, lässt sich das allein nach Foto schwer beurteilen. Wie bei Murdock im letzten Bild sind auch bei diesem Hund die Augen sehr klein, was in der Regel mit teilweiser bis vollständiger Blindheit einhergeht.</p><p> Die Probleme bei Extremscheckung sind ähnlich wie bei Merle. Vor allem Taubheit ist häufig wenn Pigment im Innenohr fehlt. Dalmatiner sind genetisch immer Extremschecken und sind dadurch besonders häufig betroffen: eine Studie des Kennel Club von 2020 testete 9000 im Kennel Club registrierte Dalmatiner. Von ihnen waren 17,8% von Taubheit auf mindestens einem Ohr betroffen.</p>',
    img3: "dogbreed-pics/mikey-tony-alter.jpg",
    slide3: '<p>Das Foto zeigt Pitbull-Mix Mikey. Auch wenn man nur seinen Kopf sieht, kann man davon ausgehen, dass Mikey ein brauner Merle mit Piebald-Weißscheckung ist. Man erkennt die roten Tanmarken an Augenbrauen und Wange und das braune Pigment im umliegenden Fell und der Haut. Der braune Teil des Fells zeigt ein Fleckenmuster, das nicht gestromt sein kann weil Stromung (Kbr) nur auf rotem Pigment wirkt. Die halb pigmentierte Nase und unterschiedlich farbigen Augen sind ebenfalls typisch für Merle. Mikey ist komplett taub.</p><p class="credits"> Foto von <a href="https://www.flickr.com/photos/78428166@N00//">Tony Alter (flickr)</a>, <a href="https://creativecommons.org/licenses/by/2.0/">CC BY 2.0</a>.</p>',
    img4: "dogbreed-pics/cda.jpg",
    slide4: '<p>Das Dilution-Gen wird oft mit Farbverdünnungsalopezie (CDA) in Verbindung gebracht. Das Bild zeigt einen betroffenen Dobermann in der Farbe Silber bzw. Lilac (b/b, d/d) und Loh. An den silbernen Stellen sind alle Haare ausgefallen und es kommt häufig zu Hautinfektionen. Die rot pigmentierten Stellen bleiben erhalten. </p> <p> Nur Hunde mit dem Verdünnungs-Gen zeigen Symptome, aber es tritt nicht in allen Rassen auf, Weimaraner zum Beispiel sind nicht betroffen. Beim Dobermann ist Farbverdünnung besonders problematisch: 93% aller blauen und 75% aller silbernen Dobermänner sind betroffen. Darum ist die Zucht von Dobermännern mit Farbverdünnung in Deutschland verboten und fällt unters Qualzuchtgesetz.</p> <p class="credits"> <a href="https://commons.wikimedia.org/wiki/File:Color_dilution_alopecia_2.jpg">self</a>, <a href="http://creativecommons.org/licenses/by-sa/3.0/">CC BY-SA 3.0</a>, via Wikimedia Commons </p>',
    img5: "dogbreed-pics/albino.jpg",
    slide5: '<p>Bisher ist nur eine Form von Albinismus bei Hunden bekannt und das bekannteste Beispiel dafür ist der weiße Dobermann. Diese Form von Albinismus (die auch beim Menschen vorkommt) führt zu hellblauen Augen, rosa Haut, und sehr hellem cremefarbenen Fell.</p><p> Neben den bekannten Problemen wie sehr starker Sonnenempfindlichkeit und hohem Hautkrebsrisiko kommt es außerdem zu Problemen in Verbindung mit Inzucht, wenn diese Farbe bewusst gezüchtet wird: als "weiße Dobermänner" und Shih Tzus (siehe Bild) gefragt waren hat man Hunde mit deren Eltern und Wurfgeschwistern verpaart, da das Gen rezessiv ist (es werden zwei Kopien des Gens benötigt um sichtbar zu werden) und es sich um eine seltene Mutation handelt. Die einzige Möglichkeit, Albinos innerhalb einer Rasse bewusst zu züchten, war also starke Inzucht. Tatsächlich stammen alle weißen Dobermänner von einer einzigen Hündin ab, der 1976 geborenen "Sheba".</p> <p class="credits"> Foto von <a href="https://www.flickr.com/photos/liesje/">Liesbeth den Toom (flickr)</a>, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC BY-SA 2.0</a>.</p>'
  };

const imgTextMap = {
  black: blackText,
  brown: brownText,
  dilution: dilutionText,
  red: redText,
  intensity: intensityText,
  sable: sableText,
  agouti: agoutiText,
  tanpoint: tanpointText,
  white: whiteText,
  mask: maskText,
  brindle: brindleText,
  merle: merleText,
  greying: greyingText,
  ticking: tickingText,
  misc: miscText,
  health: healthText
};

