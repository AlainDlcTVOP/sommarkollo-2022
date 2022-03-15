#Sommarkollo 2022

Wireframe finns hos balsamiq: https://balsamiq.cloud/sg6e77r/pwl36wk/r2278 
<br>
Tekniska krav:
> Uppgiften ska lösas med html, css och JavaScript eller TypeScript. Inga externa ramverk/bibliotek är tillåtet såsom jQuery, React, Bootstrap etc.

Demo: https://AlainDlcTVOP.github.io/sommarkollo-2022

### Beskrivning för att hämta ut en inkommen kolloanmälan i beeceptor
Använd gärna beeceptor.com för att fånga och inspektera anropet. Verktyget är dessutom är kostnadsfritt och öppet att använda genom att gå till URL: https://beeceptor.com/console/sommarkolloanmalan .<br>
Verktyget beeceptor behöver vara igång för att anmälan ska fångas upp i runtime och visas därefter direkt på skärmen beeceptor konsolen.

### FAQ
##### Finns det några begräsningar kring beeceptor?
Ja, max 50 anrop till den endpointen per dag. Därefter får man byta URL för att få ytterligare 50 anrop för testning.

##### Hur byter man beeceptor endpoint?
* I funktionen `sendAnmalan()` i filen `logik.js` kan man ändra *beeceptor url*, ändra subdomänen `sommarkolloanmalan` till något annat t.ex. `sommarkolloanmalan2`
    * https://sommarkolloanmlan2.free.beeceptor.com/sendkolloanmalan
* Navigera istället till den nya URL:en: `https://beeceptor.com/console/sommarkolloanmalan2`

##### Går det att prova att få ett tekniskt fel i formuläret via beeceptor?
Ja, det gör det. Vänligen sätt en mockregel med http-statuskod 402, det görs enklast efter ett första anropet har kommit in. Klick därefter `create mock` och skriv in http-statuskoden `402`.
