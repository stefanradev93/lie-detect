const mongoose = require("mongoose")
      config   = require("../config"),
      {Item}   = require("./models/itemModel");


// NOTE ** This has to be done only once,
// when item collection/selection is finished

const items = [
{"content":"Ich bin ein aktiver Mensch","inverted":"Ich bin ein träger Mensch"},
{"content":"Ich habe häufiger Streit mit meiner Familie und meinen Kollegen","inverted":"Ich habe selten Streit mit meiner Familie und meinen Kollegen"},
{"content":"Man könnte mich als arbeitssüchtig bezeichnen","inverted":"Man könnte mich als faul bezeichnen"},
{"content":"Ich bin stets in der Lage meine Gefühle unter Kontrolle zu halten","inverted":"Ich bin nie in der Lage meine Gefühle unter Kontrolle zu halten"},
{"content":"Ich glaube, dass ich anderen überlegen bin","inverted":"Ich glaube, dass ich anderen unterlegen bin"},
{"content":"Ich besitze ein hohes Mass an Selbstdisziplin","inverted":"Ich besitze ein geringes Mass an Selbstdisziplin"},
{"content":"Ich bin gefühlsmäßig ziemlich stabil","inverted":"Ich bin gefühlsmäßig ziemlich labil"},
{"content":"Ich bin leicht zum Lachen zu bringen","inverted":"Ich bin schwer zum Lachen zu bringen"},
{"content":"Ich bin sehr wissbeegierig","inverted":"Ich bin nicht wissbeegierig"},
{"content":"Ich arbeite zielstrebig und effektiv","inverted":"Ich arbeite chaotisch und ineffektiv"},
{"content":"Selbst kleinere Ärgernisse können mich frustrieren","inverted":"Selbst kleinere Ärgernisse frustrieren mich nicht"},
{"content":"Ich mag Parties mit vielen Leuten","inverted":"Ich meide Parties mit vielen Leuten"},
{"content":"Es fällt mir schwer eine führende Rolle zu übernehmen","inverted":"Es fällt mir leicht eine führende Rolle zu übernehmen"},
{"content":"Ich habe weniger Ängste als die meisten Menschen","inverted":"Ich habe mehr Ängste als die meisten Menschen"},
{"content":"Zu meinen Freunden habe ich starke Gefühlsbindungen","inverted":"Zu meinen Freunden habe ich keine Gefühlsbindungen"},
{"content":"Gesellige Zusammenkünfte finde ich langweilig","inverted":"Gesellige Zusammenkünfte finde ich spannend"},
{"content":"Ich bin beim Putzen nicht pingelig","inverted":"Ich bin beim Putzen sehr pingelig"},
{"content":"Manchmal erscheint mir alles ziemlich düster und hoffnungslos","inverted":"Häufig erscheint mir alles sehr hell und hoffnungsvoll"},
{"content":"Bei Unterhaltungen rede ich am meisten","inverted":"Bei Unterhaltungen rede ich am wenigsten"},
{"content":"Ich führe ein hektisches Leben","inverted":"Ich führe ein ruhiges Leben"},
{"content":"Ich bin ziemlich hartnäckig und dickköpfig","inverted":"Ich bin ziemlich locker und lässig"},
{"content":"Ich halte nicht viel von mir selbst","inverted":"Ich halte sehr viel von mir selbst"},
{"content":"Wenn jemand einen Streit anzettelt, bin ich bereit zurückzuschlagen","inverted":"Wenn jemand einen Streit anzettelt, halte ich mich zurück"},
{"content":"In Krisensituationen habe ich mich sehr gut im Griff","inverted":"In Krisensituationen habe ich mich sehr schlecht im Griff"},
{"content":"Ich bin ein fröhlicher und gut gelaunter Mensch","inverted":"Ich bin ein trauriger und schlecht gelaunter Mensch"},
{"content":"Ich fühle mich anderen oft unterlegen","inverted":"Ich fühle mich anderen oft überlegen"},
{"content":"Ich gebe selten meinen spontanen Gefühlen nach","inverted":"Ich gebe häufig meinen spontanen Gefühlen nach"},
{"content":"Ich stehe gerne im Zentrum des Geschehens","inverted":"Ich stehe ungerne im Zentrum des Geschehens"},
{"content":"Ich löse gerne Denksportaufgaben","inverted":"Ich löse ungerne Denksportaufgaben"},
{"content":"Ich habe eine sehr hohe Meinung von mir selbst","inverted":"Ich habe eine sehr geringe Meinung von mir selbst"},
{"content":"Ich kann mich oft schwer entschließen","inverted":"Ich kann mich oft leicht entschließen"},
{"content":"Ich handele oft ganz spontan","inverted":"Ich handele selten ganz spontan"},
{"content":"Ich bin häufiger beunruhigt über Dinge die schief gehen können","inverted":"Ich bin seltener beunruhigt über Dinge die schief gehen können"},
{"content":"Ich finde es leicht zu lächeln und mit Fremden auszukommen","inverted":"Ich finde es schwer zu lächeln und mit Fremden auszukommen"},
{"content":"Meine erste Reaktion ist es Menschen zu vertrauen","inverted":"Meine erste Reaktion ist es Menschen zu misstrauen"},
{"content":"Ich habe mit nichts richtig Erfolg","inverted":"Ich habe mit allem richtig Erfolg"},
{"content":"In Notfallsituationen bewahre ich einen kühlen Kopf","inverted":"In Notfallsituationen werde ich schnell panisch"},
{"content":"Mit Bettlern habe ich kein Mitleid","inverted":"Mit Bettlern habe ich starkes Mitleid"},
{"content":"Ich unterhalte mich gerne mit anderen Menschen","inverted":"Ich unterhalte mich ungerne mit anderen Menschen"},
{"content":"Ich werde misstrauisch wenn andere mir einen Gefallen tuen","inverted":"Ich traue anderen sofort, wenn sie mir einen Gefallen tun"},
{"content":"Ich werde niemals fähig sein Ordnung in mein Leben zu bringen","inverted":"Ich bin fähig Ordnung in mein Leben zu bringen"},
{"content":"Ich neige dazu mir Vorwürfe zu machen, wenn etwas schief geht","inverted":"Ich neige dazu mir keine Vorwürfe zu machen, wenn etwas schief geht"},
{"content":"Poesie beeindruckt mich gar nicht","inverted":"Poesie beeindruckt mich sehr"},
{"content":"Ich finde es schlimm für einen Heuchler gehalten zu werden","inverted":"Mir gefällt es für einen Heuchler gehalten zu werden"},
{"content":"Andere Menschen erwarten häufig von mir, dass ich Entscheidungen treffe","inverted":"Andere Menschen erwarten nie von mir, dass ich Entscheidungen treffe"},
{"content":"Ich bin für meine Großzügigkeit bekannt","inverted":"Ich bin für meinen Geiz bekannt"},
{"content":"Ich fühle mich oft angespannt und nervös","inverted":"Ich fühle mich oft locker und entspannt"},
{"content":"Viele Leute halten mich für kühl und distanziert","inverted":"Viele Leute halten mich für warm und kontaktfreudig"},
{"content":"Ich mag es meine Zeit mit Tagträumereien zu verschwenden","inverted":"Ich hasse es meine Zeit mit Tagträumereien zu verschwenden"},
{"content":"Ich empfinde manchmal ein tiefes Gefühl von Schuld oder Sünde","inverted":"Ich empfinde nie ein tiefes Gefühl von Schuld oder Sünde"},
{"content":"Ich versuche stets rücksichtsvoll und sensibel zu handeln","inverted":"Ich versuche stets rücksichtslos und hart zu handeln"},
{"content":"Ich habe oft das Gefühl vor Energie Überzuschäumen","inverted":"Ich habe selten das Gefühl vor Energie Überzuschäumen"},
{"content":"Ich probiere oft neue und fremde Speisen aus","inverted":"Ich probiere nie neue und fremde Speisen aus"},
{"content":"Wenn ich Menschen nicht mag, dann zeige ich es Ihnen auch offen","inverted":"Wenn ich Menschen nicht mag, dann behalte ich es für mich"},
{"content":"Ich ziehe es gewöhnlich vor, Dinge alleine zu tun","inverted":"Ich ziehe es gewöhnlich vor, Dinge mit anderen zusammen zu tun"},
{"content":"Ich könnte niemanden betrügen, selbst wenn ich es wollte","inverted":"Ich könnte ohne ein schlechtes Gewissen jemanden betrügen"},
{"content":"Ich bin selten traurig oder deprimiert","inverted":"Ich bin häufig traurig oder deprimiert"},
{"content":"Manche Leute halten mich für kalt und berechnend","inverted":"Viele Leute halten mich für warm und gutherzig"},
{"content":"Ich habe wenig Schwierigkeiten Versuchungen zu widerstehen","inverted":"Ich habe große Schwierigkeiten Versuchungen zu widerstehen"},
{"content":"Ich löse gerne Problem oder knifflige Aufgaben","inverted":"Ich löse ungerne Problem oder knifflige Aufgaben"},
{"content":"Ich bin besser als die meisten Menschen und das weiss ich auch","inverted":"Ich bin schlechter als die meisten Menschen und das weiss ich auch"},
{"content":"Ich bin eine tüchtige Person, die seine Arbeit immer erledigt","inverted":"Ich bin eine faule Person, die seine Arbeit nie erledigt"},
{"content":"Ich bin ein gut gelaunter Optimist","inverted":"Ich bin ein schecht gelaunter Pessimist"},
{"content":"Ich bin selten verlegen, wenn ich unter Leuten bin","inverted":"Ich bin aufdringlich, wenn ich unter Leuten bin"},
{"content":"Wenn ich etwas mache, dann auch mit viel Elan","inverted":"Wenn ich etwas mache, dann meist ohne Elan"},
{"content":"Ich habe Schwierigkeiten meinen Begierden zu widerstehen","inverted":"Mir fällt es leicht meinen Begierden zu widerstehen"},
{"content":"Ich finde philosophische Diskussionen langweilig","inverted":"Ich finde philosophische Diskussionen spannend"},
{"content":"Ich denke gründlich über etwas nach, bevor ich eine Entscheidung treffe","inverted":"Ich denke nicht darüber nach, bevor ich eine Entscheidung treffe"},
{"content":"Ich empfinde selten Furcht oder Angst","inverted":"Ich empfinde häufig Furcht oder Angst"},
{"content":"Ich habe ein lebendiges und aktives Phantasieleben","inverted":"Ich habe ein stumpfes Phantasieleben"},
{"content":"Ich glaube, dass man von den meisten Menschen ausgenutzt wird","inverted":"Ich glaube, dass man von keinem Menschen ausgenutzt wird"},
{"content":"Es macht mir nichts, mit meinen Leistungen anzugeben","inverted":"Es stört mich, mit meinen Leistungen anzugeben"},
{"content":"Ich kann mir meine Zeit sehr gut einteilen","inverted":"Ich kann mir meine Zeit sehr schlecht einteilen"},
{"content":"Ich bin noch nie vor Freude in die Luft gesprungen","inverted":"Ich bin sehr oft vor Freude in die Luft gesprungen"},
{"content":"Ich bin leicht zu erschrecken","inverted":"Ich bin schwer zu erschrecken"},
{"content":"Es macht mir keinen Spaß mit anderen zu plaudern","inverted":"Es macht mir viel Spaß mit anderen zu plaudern"},
{"content":"Ich habe gerne viele Leute um mich herum","inverted":"Ich habe gerne wenig Leute um mich herum"},
{"content":"Um zu bekommen was ich will, bin ich bereit Menschen zu manipulieren","inverted":"Um zu bekommen was ich will, würde ich nie Menschen manipulieren"},
{"content":"Ich halte meine Sachen ordentlich und sauber","inverted":"Meine Sachen sind unordentlich und dreckig"},
{"content":"Ich habe eine sehr lebhafte Vorstellungskraft","inverted":"Ich habe keine lebhafte Vorstellungskraft"},
{"content":"Ich gehe Menschenansammlungen aus dem Weg","inverted":"Ich suche Menschenansammlungen aktiv auf"},
{"content":"Ich fühle mich selten einsam oder traurig","inverted":"Ich fühle mich häufig einsam oder traurig"},
{"content":"Ich bin dominant, selbstsicher und durchsetzungsfähig","inverted":"Ich bin zurückhaltend, unsicher und kann mich nicht durchsetzen"},
{"content":"Ich sehne mich danach mehr Aufregendes zu erleben","inverted":"Ich meide es mehr Aufregendes zu erleben"},
{"content":"Ich habe Spaß daran, mit Theorien und abstrakten Ideen zu spielen","inverted":"Ich hasse es, mit Theorien und abstrakten Ideen zu spielen"},
{"content":"Ich spreche manchmal von Dingen von denen ich nichts verstehe","inverted":"Ich spreche niemals von Dingen von denen ich nichts verstehe"},
{"content":"Ich bin mit meinen Lebensbedingungen unzufrieden","inverted":"Ich bin mit meinen Lebensbedingungen zufrieden"},
{"content":"Ich bin schadenfroh","inverted":"Ich bin nicht aufrichtig"},
{"content":"Hin und wieder gebe ich ein bisschen an","inverted":"Ich gebe niemals an"},
{"content":"Ich bin im Grunde eher ein ängstlicher Mensch","inverted":"Ich bin im Grunde eher ein mutiger Mensch"},
{"content":"Ich bin häufiger angespannt und erschöpft","inverted":"Ich bin häufig entspannt und gut erholt"},
{"content":"Ich schließe nur langsam Freundschaften","inverted":"Ich schließe sehr schnell Freundschaften"},
{"content":"Ich bin immer guter Laune","inverted":"Ich bin immer schlechter Laune"},
{"content":"Wenn ich wütend bin, dann bin ich in der Lage jemanden zu schlagen","inverted":"Wenn ich wütend bin, dann würde ich nie jemanden schlagen"},
{"content":"Ich erröte leicht","inverted":"Ich erröte nie"},
{"content":"Meine Hände sind häufig zittrig","inverted":"Meine Hände sind immer ruhig"},
{"content":"Ich grüble viel über mein Leben nach","inverted":"Ich grüble nie über mein Leben nach"},
{"content":"Ich neige zu Hast und Eile","inverted":"Ich meide Hast und Eile"},
{"content":"Wenn mir einmal etwas schief geht, regt mich das nicht weiter auf","inverted":"Wenn mir einmal etwas schief geht, regt mich das sehr stark auf"},
{"content":"Es macht mir Spaß anderen Fehler nachzuweisen","inverted":"Ich mag es nicht anderen Fehler nachzuweisen"},
{"content":"Ich pflege schnell und sicher zu handeln","inverted":"Ich handle langsam und unsicher"},
{"content":"Mit anderen zu wetteifern macht mir Spaß","inverted":"Mit anderen zu wetteifern hasse ich"},
{"content":"Wenn ich körperliche Gewalt anwenden muss, dann tue ich dies auch","inverted":"Körperliche Gewalt würde ich niemals anwenden"},
{"content":"Ich mache mir oft Sorgen um meine Gesundheit","inverted":"Ich mache mir keine Sorgen um meine Gesundheit"},
{"content":"Ich würde mich als gesprächig bezeichnen","inverted":"Ich würde mich als still bezeichnen"},
{"content":"Ich gehe abends gerne aus","inverted":"Ich gehe abends ungerne aus"},
{"content":"Ich habe immer eine schlagfertige Antwort bereit","inverted":"Ich habe nie eine schlagfertige Antwort bereit"},
{"content":"Ich mache manchmal hässliche Bemerkungen über andere Menschen","inverted":"Ich mache niemals hässliche Bemerkungen über andere Menschen"},
{"content":"Wenn jemand seine Arbeit nicht ernst nimmt, ist mir das egal","inverted":"Wenn jemand seine Arbeit nicht ernst nimmt, stört mich das"},
{"content":"In Konfliktsituationen gebe ich immer nach","inverted":"In Konfliktsituationen gebe ich nie nach"},
{"content":"Ich bin weniger reizbar als andere Menschen","inverted":"Ich bin stärker reizbar als andere Menschen"},
{"content":"Ich bin neidisch, wenn andere Glück haben","inverted":"Ich schätze es, wenn andere Glück haben"},
{"content":"Herausforderungen begegne ich mutig","inverted":"Herausforderungen begegne ich feige"}
];

// --- Use built-in promise library --- //
mongoose.Promise = global.Promise;

// --- Connect to database --- //
mongoose.connect(config.MONGODB_URI, {
  useMongoClient: true
})
.then(() => {
  console.log(`MongoDB server running at ${config.MONGODB_URI}...`); 
  console.log("Populating database...");
  items.forEach((item) => {
	  let dbItem = Item(item);
	  dbItem.save();
  });
  console.log("Population finished successfully. You can now exit the script (Ctrl + C)");
}, (e) => {
  console.log("Could not connect to database:", e);
});




