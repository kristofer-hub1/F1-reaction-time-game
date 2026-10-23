# F1 Telemetry // Reaktsioonikiirus & Taktikaline Mälu

See projekt on veebipõhine küberpunk ja Vormel 1 stiilis minimängude keskkond, mis on loodud treenima ja testima kasutaja kognitiivseid võimeid – spetsiifiliselt reaktsiooniaega ja lühiajalist visuaalset mälu. Mäng töötab otse veebibrauseris ega vaja eraldi paigaldamist.

## 🎮 Mängurežiimid ja mehaanika

### 1. F1 Reaktsioonikiirus
Klassikaline Vormel 1 starditulede simulatsioon.
* **Kuidas mängida:** Oota, kuni viis punast stardituld süttivad. Kui tuled kustuvad, reageeri nii kiiresti kui võimalik, klõpsates hiirega ekraanil või vajutades tühikuklahvi (`SPACE`).
* **Funktsionaalsus:**
  * Jälgib ja kuvab kolme järjestikuse katse aegu.
  * Salvestab ja uuendab isiklikku rekordit (PB).
  * Arvutab turniiri lõpus keskmise reaktsiooniaja ja annab vastava hinnangu (nt "Max Verstappen tase").
  * Sisseehitatud heliefektid stardiprotseduuri jaoks (sisse/välja lülitatavad).

### 2. Taktikaline Mälu (Chimp Test)
Klassikalise "ahvitesti" edasiarendus taktikalises F1 HUD stiilis.
* **Kuidas mängida:** Ekraanile ilmuvad numbrid. Niipea kui vajutad numbrit "1", lähevad ülejäänud numbrid peitu (muutuvad valgeteks kastideks). Sinu ülesanne on klõpsata peidetud kastidel õiges numbrilises järjekorras (2, 3, 4 jne).
* **Funktsionaalsus:**
  * Progresseeruv raskusaste (Tasemed 1–20), kus iga tasemega lisandub uusi numbreid.
  * 3 elu (eksimuse korral kaotad elu, aga saad taset uuesti proovida).
  * Dünaamiliselt genereeritud 8x5 ruudustik, kus numbrite asukohad on iga kord unikaalsed.

## 🛠️ Kasutatud tehnoloogiad

Projekt on ehitatud kasutades standardseid veebitehnoloogiaid (ilma väliste raamistiketa):
* **HTML5:** Lehtede struktuur, semantilised märgendid ja HUD-elemendid.
* **CSS3:** 
  * Küberpunk/Neoon visuaalne stiil (CSS muutujad, `box-shadow` kumafektid).
  * Kohanduv disain (`Flexbox` ja `CSS Grid` mälutesti ruudustiku jaoks).
  * `FontAwesome` ikoonid ja Google Fonts (`Orbitron`, `Share Tech Mono`).
* **JavaScript (Vanilla):** 
  * Sündmuste kuulajad (Event Listeners) hiire ja klaviatuuri sisendite jaoks.
  * Mänguloogika, taimerid (`setTimeout`), tasemete genereerimine ja DOM-i dünaamiline muutmine.

## 📁 Failide struktuur

Projekt on jaotatud kaheks peamiseks mooduliks, et hoida kood puhas ja arusaadav:

* **Reaktsioonimäng (Põhimenüü)**
  * `index.html` – F1 reaktsioonimängu vaade ja stardifoorid.
  * `style.css` – Peamised stiilid ja animatsioonid.
  * `script.js` – Reaktsiooniaja mõõtmine ja katsete loogika.
* **Taktikaline Mälu (Chimp Test)**
  * `chimp.html` – Mälutesti vaade ja HUD raamistik.
  * `chimp.css` – Mälutesti spetsiifilised ruudustiku ja numbrite stiilid.
  * `chimp.js` – Tasemete genereerimine, elude süsteem ja peitmisloogika.

## 🚀 Käivitamine ja kasutamine

1. Laadi repositoorium ZIP-failina alla või klooni Gitiga:
   `git clone https://github.com/sinu-kasutajanimi/F1-reaction-time-game.git` *(asenda link enda GitHubi repoga)*
2. Ava projekti kaust.
3. Topeltklõpsa failil `index.html`, et avada see oma eelistatud veebibrauseris.
4. Navigeeri kahe mängu vahel kasutades ekraanil olevaid nuppe.