import React, { useMemo, useState } from "react";
import { ArrowLeft, Sparkles } from "lucide-react";

const pages = [
  { id: "new", icon: "🌱", title: "Ny som Team Coach", text: "Stöd för din första tid i rollen.", accent: "bg-violet-500" },
  { id: "ceremonies", icon: "📅", title: "Ceremoniguiden", text: "Praktiskt stöd för Scrum-event och refinement.", accent: "bg-teal-500" },
  { id: "problems", icon: "🚑", title: "TC-akuten", text: "Praktiskt stöd när något i teamet, samarbetet eller arbetssättet skaver.", accent: "bg-orange-500" },
  { id: "compass", icon: "🧭", title: "Scrum-kompassen", text: "Förstå Scrum, roller, artefakter, empirism och samband.", accent: "bg-indigo-500" },
];

const roleAreas = [
  ["Coacha och utveckla", "Stärk samarbete, kvalitet, tvärfunktionalitet, självledarskap och ansvarstagande."],
  ["Optimera flödet", "Synliggör hinder och hjälp teamet förbättra arbetsflödet."],
  ["Kontinuerlig förbättring", "Skapa lärande genom retrospektiv, feedback och reflektion."],
  ["Transparens", "Hjälp teamet följa mål och synliggöra framsteg för lärande och beslut."],
  ["Stötta och samverka", "Arbeta nära Produktägare, andra Team Coaches och relevanta intressenter."],
  ["Ceremonier", "Etablera nödvändiga möten och facilitera bara i den mån det behövs."],
];

const newCoachPhases = [
  { title: "0–30 dagar", icon: "🌱", subtitle: "Förstå och lär känna", groups: [
    { title: "Teamet", items: ["Lär känna teammedlemmarna", "Prata om deras förväntningar på dig", "Förstå vad teamet tycker fungerar bra", "Fånga utmaningar teamet själva ser", "Förstå ansvar och kompetens i teamet", "Lär dig hur teamet kommunicerar"] },
    { title: "Uppdraget", items: ["Förstå teamets uppdrag och mål", "Förstå vilka användare teamet skapar värde för", "Lär känna Produktägaren", "Identifiera intressenter", "Identifiera beroenden", "Sätt dig in i backlogg och prioritering"] },
    { title: "Arbetssättet", items: ["Observera Daily Scrum", "Delta i Sprint Planning", "Se hur Refinement fungerar", "Observera Sprint Review", "Observera Sprint Retrospective", "Förstå hur arbete kommer in i teamet", "Se hur hinder hanteras", "Undersök om retro-actions följs upp"] },
  ]},
  { title: "30–60 dagar", icon: "🔍", subtitle: "Skapa en nulägesbild", groups: [
    { title: "Reflektera", items: ["Vad fungerar riktigt bra?", "Vilka utmaningar återkommer?", "Hur självgående är teamet?", "Tar teamet gemensamt ansvar?", "Är mandat otydliga?", "Finns flaskhalsar?", "Hur fungerar samarbetet med Produktägaren?", "Hur fungerar kommunikationen?", "Ger ceremonierna rätt värde?"] },
    { title: "Stäm av med teamet", items: ["Dela vad som fungerar bra", "Dela mönster som skaver", "Fråga om teamet känner igen bilden", "Be teamet komplettera", "Välj 1–2 utvecklingsområden", "Bestäm hur ni följer upp"] },
  ]},
  { title: "60–90 dagar", icon: "🧪", subtitle: "Coacha förändring", groups: [
    { title: "Experiment", items: ["Välj 1–2 förbättringsområden", "Formulera ett experiment", "Bestäm uppföljning", "Testa en ny faciliteringsmetod", "Följ upp effekten", "Justera det som inte fungerar"] },
    { title: "Självledarskap", items: ["Fråga efter teamets lösning först", "Låt teamet facilitera Daily", "Låt teamet äga retro-actions", "Synliggör beslut teamet kan fatta", "Sluta göra en sak teamet kan ta över", "Uppmuntra teamet att hantera hinder"] },
  ]},
  { title: "90+ dagar", icon: "🚀", subtitle: "Vad kan jag sluta göra?", groups: [
    { title: "Självledarskap", items: ["Kan teamet köra Daily utan dig?", "Driver teamet egna förbättringar?", "Följer teamet upp retro-actions?", "Tar teamet gemensamt ansvar?", "Anpassar teamet sitt arbetssätt?", "Går beslut via dig i onödan?"] },
    { title: "Din utveckling", items: ["Vad behöver teamet mest från dig nu?", "Vad kan teamet göra själva?", "Vilka hinder behöver lyftas externt?", "Hur utvecklar du samarbetet med Produktägaren?", "Vilken coachningsförmåga vill du utveckla?", "Be teamet om feedback på ditt TC-stöd"] },
  ]},
];

const ceremonies = [
  {
    id: "daily", icon: "☀️", title: "Daily Scrum", time: "15 min",
    purpose: "Granska framsteg mot Sprintmålet och anpassa Sprintbackloggen för att skapa en genomförbar plan för nästa arbetsdag.",
    guide: "Scrumguiden beskriver Daily Scrum som ett 15-minuters event för Utvecklarna i Scrumteamet. Syftet är att granska framsteg mot Sprintmålet och vid behov anpassa Sprintbackloggen. Det finns inget obligatoriskt frågeformat: Utvecklarna väljer den struktur och teknik som hjälper dem fokusera på Sprintmålet och skapa en plan för nästa arbetsdag.",
    scrumGuide: ["15 minuter varje arbetsdag under Sprinten", "Utvecklarna deltar och ansvarar för upplägget", "Fokus är framsteg mot Sprintmålet, inte statusrapportering", "Sprintbackloggen anpassas vid behov", "Ingen särskild tre-frågor-rutin krävs"],
    before: ["Ha Sprintmålet synligt", "Öppna Sprintbackloggen eller teamets tavla", "Se till att pågående arbete, blockers och beroenden är synliga", "Förbered inte en statusrunda"],
    steps: ["Börja med Sprintmålet", "Titta på arbetet tillsammans", "Synliggör hinder, beroenden och behov av samarbete", "Anpassa dagens plan och Sprintbackloggen vid behov", "Parkera problemlösning som inte kräver hela teamet"],
    coach: ["Låt teamet prata med varandra, inte rapportera till dig", "Ställ frågor som för samtalet tillbaka till Sprintmålet", "Undvik att fördela uppgifter eller lösa varje blocker själv", "Hjälp teamet hålla 15-minutersramen", "Backa gradvis ur faciliteringen"],
    rescue: "Blir Daily en statusrapport? Sluta gå person för person. Visa Sprintmålet och fråga: Vad behöver vi göra tillsammans idag för att komma närmare målet?",
    runbook: [
      { title: "Sätt fokus på Sprintmålet", do: "Börja med Sprintmålet och gör det synligt för teamet.", say: "Hur ligger vi till mot Sprintmålet just nu?", check: "Teamet pratar om Sprintmålet och arbetet som helhet, inte rapporterar person för person till Team Coachen." },
      { title: "Granska nuläget tillsammans", do: "Titta gemensamt på Sprintbackloggen eller teamets tavla och börja med pågående arbete.", say: "Vad behöver vi få framåt eller avsluta idag för att komma närmare Sprintmålet?", check: "Teamet har en gemensam bild av nuläget och dagens viktigaste fokus." },
      { title: "Synliggör hinder och beroenden", do: "Fånga sådant som blockerar arbetet eller kräver samarbete utan att lösa allt i detalj under Daily.", say: "Finns något som blockerar oss, kräver hjälp eller gör att vi behöver samordna oss idag?", check: "Hinder och beroenden är synliga och rätt personer vet vad som behöver hända efter Daily." },
      { title: "Skapa dagens gemensamma plan", do: "Låt teamet anpassa planen utifrån det ni precis lärt er.", say: "Behöver vi ändra något i dagens plan för att maximera våra chanser att nå Sprintmålet?", check: "Teamet har en genomförbar gemensam plan för nästa arbetsdag." },
      { title: "Avsluta och parkera fördjupningar", do: "Avsluta inom 15 minuter och parkera problemlösning till efter Daily.", say: "Är planen tydlig för idag? Vilka behöver stanna kvar efter Daily?", check: "Daily är avslutad inom tidsboxen och fortsatta diskussioner har rätt deltagare." },
    ],
  },
  {
    id: "planning", icon: "🎯", title: "Sprint Planning", time: "max 8 h för en Sprint på en månad",
    purpose: "Starta Sprinten genom att gemensamt skapa ett Sprintmål, välja relevant arbete och göra en plan för hur arbetet kan genomföras.",
    guide: "Scrumguiden beskriver Sprint Planning som eventet som initierar Sprinten genom att lägga planen för det kommande arbetet. Hela Scrumteamet skapar planen tillsammans. Planeringen behandlar tre områden: varför Sprinten är värdefull, vad som kan bli klart och hur det valda arbetet ska genomföras.",
    scrumGuide: ["Hela Scrumteamet deltar", "Ett Sprintmål formuleras innan Sprint Planning avslutas", "Utvecklarna väljer tillsammans med Produktägaren vad som kan göras", "Utvecklarna bestämmer hur arbetet genomförs", "Sprintmålet, valda poster och planen bildar Sprintbackloggen", "Max 8 timmar för en månads Sprint"],
    before: ["Säkerställ att viktiga Product Backlog-poster är tillräckligt förstådda", "Ha Produktmålet synligt", "Ha en realistisk bild av kapacitet och förutsättningar", "Ta med relevanta lärdomar från tidigare Sprintar", "Bjud vid behov in personer som kan ge råd"],
    steps: ["Varför är Sprinten värdefull? Formulera Sprintmålet", "Vad kan bli klart? Välj arbete som stödjer målet", "Hur ska arbetet genomföras? Skapa en första plan", "Synliggör beroenden, risker och kapacitet", "Kontrollera att teamet tror på helheten"],
    coach: ["Håll samtalet kring varför, vad och hur", "Låt hela Scrumteamet formulera Sprintmålet", "Låt Utvecklarna bedöma vad som är realistiskt", "Undvik att fördela arbete till individer", "Synliggör risker utan att detaljplanera bort all osäkerhet", "Fråga om teamet tror på planen"],
    rescue: "Blir Sprint Planning en dragkamp om hur mycket som ska pressas in? Gå tillbaka till Sprintmålet och fråga vilket arbete teamet realistiskt behöver kunna genomföra för att nå målet.",
    runbook: [
      { title: "Skapa sammanhang och visa Produktmålet", do: "Börja med Produktmålet, de viktigaste prioriteringarna och sådant som påverkar teamets kapacitet.", say: "Vad är viktigast för produkten just nu, och vilka förutsättningar behöver vi ta hänsyn till?", check: "Teamet förstår sammanhanget och de viktigaste förutsättningarna." },
      { title: "Formulera varför Sprinten är värdefull", do: "Låt Scrumteamet formulera ett Sprintmål som ger arbetet riktning.", say: "Vad vill vi ha åstadkommit när Sprinten är slut?", check: "Det finns ett begripligt Sprintmål som beskriver värde eller resultat." },
      { title: "Välj vad som kan bli klart", do: "Utgå från Sprintmålet och låt Utvecklarna tillsammans med Produktägaren välja relevant arbete.", say: "Vilket arbete behöver vi realistiskt kunna färdigställa för att nå Sprintmålet?", check: "Det valda arbetet stödjer Sprintmålet och mängden bedöms som realistisk." },
      { title: "Planera hur arbetet ska genomföras", do: "Låt Utvecklarna diskutera hur arbetet kan utvecklas till ett färdigt Inkrement.", say: "Hur behöver vi angripa arbetet och vilka beroenden behöver vi tänka på?", check: "Teamet har en genomförbar första plan och Utvecklarna äger hur." },
      { title: "Kontrollera Sprintmålet och Sprintbackloggen", do: "Granska målet, arbetet och planen som en helhet.", say: "Tror vi på den här planen?", check: "Sprintmålet är tydligt och Sprintbackloggen hänger ihop." },
    ],
  },
  {
    id: "refinement", icon: "🔍", title: "Backlog Refinement", time: "Löpande under Sprinten",
    purpose: "Gör kommande Product Backlog-poster mindre, tydligare och tillräckligt förstådda för framtida Sprint Planning.",
    guide: "Scrumguiden beskriver Product Backlog refinement som en löpande aktivitet där Product Backlog-poster bryts ner och preciseras. Refinement är alltså inte ett formellt Scrum-event med föreskriven tidsbox eller mötesform. Det kan vara återkommande möten, men också en kontinuerlig process under Sprinten.",
    scrumGuide: ["Refinement är en löpande aktivitet, inte ett formellt event", "Poster bryts ner och preciseras", "Detaljer kan vara beskrivning, ordning och storlek", "Hur mycket refinement som behövs varierar", "Utvecklarna ansvarar för uppskattningen av storlek", "Refinement kan ske i möten eller kontinuerligt"],
    before: ["Välj poster som faktiskt behöver mer förståelse", "Säkerställ att behov och värde kan beskrivas", "Ta med relevanta frågor, beroenden och tekniska osäkerheter", "Fundera på vilka personer som faktiskt behövs", "Vänta inte på nästa möte om en post behöver förtydligas tidigare"],
    steps: ["Skapa sammanhang kring behovet och Produktmålet", "Skapa gemensam förståelse", "Synliggör risker, beroenden och antaganden", "Bryt ner stora poster när det hjälper", "Låt Utvecklarna bedöma storleken när förståelsen räcker", "Bestäm nästa steg"],
    coach: ["Målet är gemensam förståelse, inte perfekta krav", "Skapa utrymme för frågor och utmaning", "Undvik att refinement blir en presentation", "Bryt ner utan att detaljplanera för tidigt", "Anpassa arbetssättet efter behov", "Sluta förfina när förståelsen är tillräcklig"],
    rescue: "Blir refinement ett långt möte där Produktägaren går igenom backloggen rad för rad? Välj bara de poster som faktiskt behöver gemensam förståelse och behandla refinement som en löpande process.",
    runbook: [
      { title: "Välj vad som behöver förfinas", do: "Börja med de poster som faktiskt behöver mer gemensam förståelse.", say: "Vilka poster behöver vi förstå bättre för att kunna fatta bra beslut framåt?", check: "Teamet arbetar med ett begränsat antal relevanta poster." },
      { title: "Beskriv behov och värde", do: "Beskriv problemet, användarbehovet och varför posten är viktig.", say: "Vilket problem försöker vi lösa, för vem och vilket värde hoppas vi skapa?", check: "Teamet förstår behovet bakom posten." },
      { title: "Skapa gemensam förståelse", do: "Bjud in frågor och synliggör antaganden, risker och beroenden.", say: "Vad behöver vi veta för att förstå den här posten bättre?", check: "Viktiga frågor och osäkerheter är synliga." },
      { title: "Bryt ner och uppskatta när det behövs", do: "Bryt ner posten om storleken gör den svår att förstå eller genomföra.", say: "Är posten tillräckligt liten och begriplig?", check: "Posten är tillräckligt tydlig för nästa steg utan onödig detaljplanering." },
      { title: "Bestäm nästa steg", do: "Avsluta med om posten är tillräckligt förstådd eller behöver mer information.", say: "Vad är nästa steg för den här posten?", check: "Öppna frågor har en tydlig väg framåt." },
    ],
  },
  {
    id: "review", icon: "👀", title: "Sprint Review", time: "max 4 h för en Sprint på en månad",
    purpose: "Granska resultatet av Sprinten tillsammans med intressenter och avgör vilka anpassningar som är mest värdefulla framåt.",
    guide: "Scrumguiden beskriver Sprint Review som ett arbetstillfälle där Scrumteamet och relevanta intressenter granskar resultatet och diskuterar framsteg mot Produktmålet. Sprint Review ska vara ett samarbetsmöte, inte en presentation där intressenterna bara tittar på.",
    scrumGuide: ["Resultatet granskas med relevanta intressenter", "Framsteg mot Produktmålet diskuteras", "Förändrade förutsättningar utforskas", "Deltagarna samarbetar kring möjliga nästa steg", "Product Backlog kan anpassas", "Review är ett arbetstillfälle, inte bara en demo", "Max 4 timmar för en månads Sprint"],
    before: ["Bjud in relevanta intressenter", "Ha Sprintmålet och Produktmålet synliga", "Bestäm vilket faktiskt resultat som är mest värdefullt att granska", "Förbered riktade feedbackfrågor", "Synliggör förändrade behov, risker och lärdomar"],
    steps: ["Sätt sammanhanget", "Granska resultatet", "Skapa dialog", "Titta framåt", "Knyt ihop nästa steg"],
    coach: ["Designa Review som dialog, inte demo", "Koppla resultatet till Produktmålet och värdet", "Bjud aktivt in intressenternas perspektiv", "Låt teamet visa och diskutera resultatet", "Ge plats åt nya insikter och förändrade förutsättningar", "Översätt feedback till lärande utan att göra nästa Planning"],
    rescue: "Blir Sprint Review bara en demo där alla säger 'ser bra ut'? Stanna efter varje relevant resultat och fråga: Vad lär vi oss? Vad har förändrats? Påverkar det vad vi borde prioritera framåt?",
    runbook: [
      { title: "Sätt sammanhang med Produktmål och Sprintmål", do: "Påminn om Produktmålet, Sprintmålet och vad teamet försökte åstadkomma.", say: "Vad var Sprintmålet och hur bidrar resultatet till Produktmålet?", check: "Fokus ligger på värde och resultat, inte aktiviteter." },
      { title: "Granska Sprintens resultat", do: "Låt teamet visa det faktiska Inkrementet och relevanta lärdomar.", say: "Vad ser vi när vi jämför resultatet med Sprintmålet?", check: "Det som granskas är verkligt resultat, inte en statusrapport." },
      { title: "Skapa dialog och samla perspektiv", do: "Bjud aktivt in intressenter att reagera, ställa frågor och bidra med kunskap.", say: "Vad fungerar? Vad saknas? Vad har vi lärt oss?", check: "Review har blivit en dialog mellan Scrumteamet och intressenterna." },
      { title: "Utforska vad som har förändrats", do: "Lyft nya behov, risker och möjligheter som uppstått sedan Sprinten startade.", say: "Vad vet vi nu som vi inte visste när Sprinten började?", check: "Nya insikter som kan påverka riktningen är synliga." },
      { title: "Fånga lärande och möjliga nästa steg", do: "Sammanfatta de viktigaste insikterna och möjliga anpassningar.", say: "Vad betyder detta för Product Backlog och våra kommande prioriteringar?", check: "Gruppen delar bilden av lärandet utan att detaljplanera nästa Sprint." },
    ],
  },
  {
    id: "retro", icon: "🔄", title: "Sprint Retrospective", time: "max 3 h för en Sprint på en månad",
    purpose: "Granska hur den senaste Sprinten fungerade och planera konkreta sätt att öka kvalitet och effektivitet.",
    guide: "Scrumguiden beskriver Sprint Retrospective som Scrumteamets tillfälle att planera hur kvalitet och effektivitet kan öka. Teamet granskar hur Sprinten gick vad gäller individer, interaktioner, processer, verktyg och Definition of Done och identifierar de mest hjälpsamma förändringarna.",
    scrumGuide: ["Hela Scrumteamet granskar Sprinten", "Individer, interaktioner, processer, verktyg och Definition of Done kan granskas", "Problem och orsaker utforskas", "Hjälpsamma förändringar prioriteras", "Förbättringar kan läggas till nästa Sprintbacklogg", "Max 3 timmar för en månads Sprint"],
    before: ["Följ upp förra retrons förbättring", "Välj ett format som passar teamets aktuella behov", "Ta med relevanta observationer eller data", "Skapa en miljö där teamet kan prata öppet", "Fundera på hur alla kan komma till tals"],
    steps: ["Skapa trygghet och sätt syftet", "Följ upp förra förbättringen", "Samla perspektiv på Sprinten", "Utforska mönster och orsaker", "Välj det viktigaste området", "Bestäm experiment, ägarskap och uppföljning"],
    coach: ["Skapa psykologisk trygghet", "Börja med uppföljning", "Använd tyst reflektion och strukturerade rundor när det behövs", "Hjälp teamet gå från symptom till orsaker", "Begränsa förbättringsarbetet till en eller ett par förändringar", "Låt teamet äga förändringen"],
    rescue: "Blir retron samma diskussion utan förändring? Börja med förra retrons beslut: Vad testade vi faktiskt och vilken effekt såg vi? Välj sedan ett mindre experiment med tydlig ägare och uppföljning.",
    runbook: [
      { title: "Skapa trygghet och sätt syftet", do: "Inled med varför ni är här och etablera spelregler för ett öppet, respektfullt samtal.", say: "Vi granskar vårt arbetssätt för att lära och förbättra, inte för att hitta syndabockar.", check: "Alla förstår syftet och samtalsklimatet känns tryggt." },
      { title: "Följ upp föregående förbättring", do: "Ta fram förra retrons experiment och utvärdera vad som faktiskt hände.", say: "Vad testade vi? Vad såg vi för effekt?", check: "Teamet har fångat konkret lärande innan nya förbättringsidéer skapas." },
      { title: "Samla perspektiv på Sprinten", do: "Ge först tyst reflektionstid och samla sedan observationer från hela teamet.", say: "Vad hjälpte oss, vad bromsade oss och vad överraskade oss?", check: "Alla har fått möjlighet att bidra." },
      { title: "Utforska mönster och orsaker", do: "Gruppera observationer och välj det viktigaste området att förstå djupare.", say: "Vilket mönster ser vi och vad i vårt arbetssätt kan bidra till det?", check: "Samtalet handlar om arbetssätt och system, inte om att bedöma individer." },
      { title: "Välj förbättring och bestäm uppföljning", do: "Formulera ett litet experiment som teamet realistiskt kan genomföra nästa Sprint.", say: "Vad testar vi nästa Sprint, vem tar första steget och när följer vi upp?", check: "Förbättringen är konkret, synlig och har ett tydligt sätt att följas upp." },
    ],
  },
];

const problems = [
  { id: "direction", category: "Självledarskap", icon: "👥", title: "Teamet väntar på att jag ska styra", causes: ["Teamets mandat är otydligt", "Team Coachen har gradvis blivit beslutsfattare", "Teamet är vant vid att någon annan organiserar arbetet"], questions: ["Vad tycker ni att vi ska göra?", "Vilket beslut kan ni själva fatta här?", "Vad behöver ni från mig för att komma vidare?"], experiment: "Fråga före svar: ställ två öppna frågor innan du själv föreslår en lösning.", watch: "Teammedlemmarna börjar prata mer direkt med varandra och tar fler beslut utan att gå via Team Coachen." },
  { id: "solve", category: "Självledarskap", icon: "👥", title: "Jag löser för mycket åt teamet", causes: ["Det känns snabbare att lösa problemet själv", "Gränsen mellan stöd och ansvar är otydlig", "Teamet har lärt sig att TC tar över"], questions: ["Vem äger egentligen problemet?", "Vad har ni redan testat?", "Vilket första steg kan teamet ta?"], experiment: "Två frågor först: låt teamet beskriva två möjliga vägar innan du ger ett förslag.", watch: "Teamet kommer oftare med egna alternativ och ber om stöd snarare än färdiga svar." },
  { id: "shared", category: "Självledarskap", icon: "👥", title: "Teamet tar inte gemensamt ansvar", causes: ["Arbetet är starkt kopplat till individer", "Sprintmålet används inte som gemensam riktning", "Teamet saknar vana att hjälpa varandra över kompetensgränser"], questions: ["Vad behöver teamet lyckas med tillsammans?", "Var är vi mest sårbara om bara en person kan arbetet?", "Vad kan vi göra gemensamt redan denna Sprint?"], experiment: "Välj en prioriterad backloggpost och planera den gemensamt med pararbete, swarming eller tydliga hjälppunkter.", watch: "Fler erbjuder hjälp och Sprintmålet diskuteras som ett gemensamt ansvar." },
  { id: "quiet", category: "Samarbete", icon: "🤝", title: "Teamet är väldigt tyst", causes: ["Frågorna är för breda eller ställs direkt i helgrupp", "Några behöver mer reflektionstid", "Det kan saknas trygghet att uttrycka avvikande perspektiv"], questions: ["Vad gör det lättare för alla att bidra?", "Vilken del av frågan kan vi först tänka på individuellt?", "Finns perspektiv vi ännu inte har hört?"], experiment: "Tänk, skriv, runda: ge två minuters tyst reflektion och låt sedan alla dela ett perspektiv var.", watch: "Fler röster hörs och teamet bygger vidare på varandras tankar.", research: { summary: "Forskning om psykologisk trygghet pekar på samband med lärande, informationsdelning och möjligheten att uttrycka avvikande perspektiv. Evidensen för exakt vilka enskilda interventioner som bäst skapar psykologisk trygghet är mer begränsad.", practice: "Tyst individuell reflektion och strukturerade rundor kan sänka tröskeln för deltagande, men bör ses som samtalsstöd och inte som en snabb lösning på låg psykologisk trygghet.", sources: [{ label: "Frazier et al. (2017), Psychological Safety: A Meta-Analytic Review and Extension", url: "https://doi.org/10.1111/peps.12183", doi: "10.1111/peps.12183" }] } },
  { id: "dominate", category: "Samarbete", icon: "🤝", title: "Några få personer dominerar", causes: ["Mötesformatet premierar snabba svar", "Roller eller expertstatus påverkar samtalet", "Faciliteringen saknar struktur för jämlikt deltagande"], questions: ["Vilka perspektiv saknas?", "Hur kan vi skapa mer tänketid?", "Vad behöver vi ändra i mötesformatet?"], experiment: "Använd tyst start och strukturerad runda innan fri diskussion.", watch: "Talutrymmet blir jämnare och beslut innehåller fler perspektiv." },
  { id: "individual", category: "Samarbete", icon: "🤝", title: "Vi jobbar mer som individer än som team", causes: ["Backloggposter fördelas tidigt per person", "Kompetensområden har blivit permanenta silos", "Teamet optimerar upptagenhet snarare än avslutat värde"], questions: ["Vilket arbete kräver att vi samarbetar?", "Var kan vi minska personberoendet?", "Vad är viktigare: upptagenhet eller att viktigt arbete blir klart?"], experiment: "Välj en viktig post och arbeta med pararbete, swarming eller gemensam granskning tills den är klar.", watch: "Färre parallella arbeten, mer kunskapsdelning och kortare tid från start till klart." },
  { id: "wip", category: "Flöde", icon: "🌊", title: "Vi startar mycket men avslutar lite", causes: ["Pågående arbete begränsas inte", "Nya uppgifter upplevs som mer akuta", "Teamet optimerar individers beläggning i stället för flöde"], questions: ["Vad är närmast klart?", "Vad kan vi pausa för att avsluta viktigare arbete?", "Hur mycket pågående arbete klarar vi faktiskt?"], experiment: "Sluta börja, börja avsluta: välj det viktigaste pågående arbetet och låt teamet hjälpa till innan något nytt startas.", watch: "Antalet samtidiga arbeten minskar och fler backloggposter når klart under Sprinten.", research: { summary: "Little's Law beskriver sambandet mellan genomsnittligt pågående arbete, genomströmning och genomloppstid i ett stabilt system. För samma genomströmning hänger mer WIP ihop med längre genomsnittlig genomloppstid.", practice: "Mät antal pågående arbeten, genomloppstid och genomströmning före och efter ett mindre WIP-experiment. Kontrollera samtidigt förändringar i efterfrågan och bemanning.", sources: [{ label: "AWS, Deliver Faster by Limiting Work in Progress", url: "https://aws.amazon.com/blogs/enterprise-strategy/deliver-faster-by-limiting-work-in-progress/", doi: "Praktisk branschkälla, inte peer review" }] } },
  { id: "blockers", category: "Flöde", icon: "🌊", title: "Blockers blir liggande", causes: ["Blockers synliggörs men får ingen ägare", "Teamet väntar på externa svar utan aktiv uppföljning", "Eskalering sker för sent"], questions: ["Vem tar nästa steg?", "När följer vi upp?", "Vilken del kan vi påverka själva?"], experiment: "24-timmarsregeln: varje blocker ska inom ett dygn ha en ägare, ett nästa steg och ett uppföljningstillfälle.", watch: "Blockers får snabbare rörelse och färre hinder återkommer flera dagar utan förändring." },
  { id: "unplanned", category: "Flöde", icon: "🌊", title: "Vi får in mycket oplanerat arbete", causes: ["Inflödet saknar tydlig väg och prioritering", "Avbrott hanteras individuellt", "Sprintens kapacitet och servicebehov balanseras inte öppet"], questions: ["Varifrån kommer arbetet?", "Vem kan prioritera det mot Sprintmålet?", "Vilken kapacitet behöver vi realistiskt reservera?"], experiment: "Logga allt oplanerat arbete under en Sprint med källa, omfattning och effekt på Sprintmålet. Granska mönstret i retron.", watch: "Teamet kan skilja verkligt brådskande arbete från vana och Produktägaren får bättre prioriteringsunderlag." },
  { id: "goal", category: "Fokus & mål", icon: "🎯", title: "Sprintmålet styr inte arbetet", causes: ["Sprintmålet är en omskrivning av backlogglistan", "Målet är inte synligt", "Arbete tas in utan tydlig koppling till målet"], questions: ["Vilket värde försöker Sprinten skapa?", "Vilket arbete stödjer inte målet?", "Hur kan vi använda målet i våra dagliga beslut?"], experiment: "Visa Sprintmålet på tavlan och börja varje Daily med frågan: Hur ligger vi till mot målet?", watch: "Teamet använder Sprintmålet för att prioritera, samarbeta och anpassa planen." },
  { id: "missed", category: "Fokus & mål", icon: "🎯", title: "Vi når sällan Sprintmålet", causes: ["Målet är för omfattande eller otydligt", "För mycket oplanerat arbete kommer in", "Teamet startar för mycket eller upptäcker beroenden för sent"], questions: ["Vad brukar hindra målet?", "Vilket mönster ser vi över flera Sprintar?", "Vad behöver vi göra annorlunda redan i Planning eller Daily?"], experiment: "Välj en orsak att mäta nästa Sprint och testa en riktad förändring.", watch: "Teamet ser tidigare när Sprintmålet är hotat och anpassar arbetet innan slutet av Sprinten." },
  { id: "priority", category: "Fokus & mål", icon: "🎯", title: "Allt känns lika viktigt", causes: ["Prioriteringar uttrycks utan tydliga avvägningar", "Flera intressenter driver egna brådskande behov", "Produktmål och Sprintmål används inte som filter"], questions: ["Vad skapar mest värde nu?", "Vad händer om vi inte gör detta i Sprinten?", "Vilket arbete väljer vi aktivt bort?"], experiment: "Tvinga fram en topp tre och gör även en synlig inte-nu-lista.", watch: "Teamet kan förklara ordningen mellan arbeten och avbrott bedöms mot tydliga prioriteringar." },
  { id: "daily-status", category: "Ceremonier", icon: "📅", title: "Daily är en statusrapport", causes: ["Teamet pratar till TC eller Produktägaren", "Mötet går person för person", "Sprintmålet och dagens plan är inte i centrum"], questions: ["Vad behöver vi planera tillsammans idag?", "Hur ligger vi till mot Sprintmålet?", "Vilka behöver samarbeta efter mötet?"], experiment: "Ställ dig åt sidan och låt teamet gå via tavlan från viktigaste pågående arbete till dagens gemensamma plan.", watch: "Teammedlemmarna pratar mer med varandra och Daily leder till anpassningar i planen." },
  { id: "retro-no-change", category: "Ceremonier", icon: "📅", title: "Retron leder inte till förändring", causes: ["Föregående förbättring följs inte upp", "För många eller för vaga åtgärder väljs", "Ingen äger första steget"], questions: ["Vad testade vi senast?", "Vilken effekt såg vi?", "Vilken enda förändring är mest värdefull nu?"], experiment: "Välj ett litet experiment med ägare, synlig uppföljning och ett tydligt tecken på om det hjälpte.", watch: "Förbättringar följs upp i nästa retro och teamet kan beskriva vad de lärde sig.", research: { summary: "Forskning om teamreflexivitet studerar hur team gemensamt granskar mål, strategier och arbetssätt och anpassar dem utifrån lärande. Meta-analyser pekar på positiva samband och effekter på prestationsrelaterade utfall, men resultaten varierar mellan sammanhang och mätmetoder.", practice: "En retro blir mer verksam när teamet följer upp ett tidigare experiment, väljer en begränsad förändring och bestämmer hur effekten ska observeras. Reflektion utan uppföljning räcker inte.", sources: [{ label: "Lines et al. (2021), The effectiveness of team reflexivity interventions", url: "https://doi.org/10.1037/spy0000251", doi: "10.1037/spy0000251" }] } },
  { id: "passive-refinement", category: "Ceremonier", icon: "📅", title: "Refinement är passivt", causes: ["Produktägaren presenterar färdiga lösningar", "Teamet får frågorna för sent", "Mötet försöker behandla för många poster"], questions: ["Vad är oklart?", "Vilken risk eller vilket antagande ser ni?", "Vad behöver vi veta för att kunna arbeta med posten?"], experiment: "Frågor före lösningar: låt alla skriva en fråga, risk eller oklarhet innan diskussionen börjar.", watch: "Fler bidrar och osäkerheter blir synliga tidigare." },
  { id: "review-demo", category: "Ceremonier", icon: "📅", title: "Review blir bara en demo", causes: ["Intressenter bjuds in som publik", "Feedbackfrågorna är för allmänna", "Samtalet kopplas inte till Produktmålet eller förändrade behov"], questions: ["Vad lär vi oss av resultatet?", "Vad har förändrats sedan Sprinten började?", "Vad betyder detta för kommande prioriteringar?"], experiment: "Stanna efter varje relevant resultat och ställ en konkret feedbackfråga till intressenterna.", watch: "Review skapar dialog och leder till nya insikter eller möjliga anpassningar av Product Backlog." },
];

const compassSections = [
  { id: "team", icon: "👥", title: "Scrumteamet", summary: "Produktägare, Scrum Master och Utvecklare med gemensamt ansvar för att skapa värde.", intro: "Scrumteamet är litet, tvärfunktionellt och självledande. Det finns inga underteam eller hierarkier inom Scrumteamet.", blocks: [
    { title: "Produktägaren", items: ["Ansvarar för att maximera produktens värde", "Ansvarar för effektiv hantering av Product Backlog", "Kommunicerar Produktmålet och ordnar backloggposter", "Kan delegera arbete men behåller ansvaret"] },
    { title: "Scrum Master / Team Coach", items: ["Hjälper teamet förstå och använda Scrum", "Coachar mot självledarskap och tvärfunktionalitet", "Hjälper Produktägaren med mål, backlogg och empirisk produktplanering", "Arbetar med organisationen för att undanröja hinder"] },
    { title: "Utvecklarna", items: ["Skapar ett användbart Inkrement varje Sprint", "Skapar och anpassar Sprintbackloggen", "Följer Definition of Done", "Håller varandra ansvariga som professionella"] },
  ], misconception: "Team Coachen är inte teamets arbetsledare och ska inte fördela uppgifter eller fatta teamets beslut." },
  { id: "events", icon: "📅", title: "Eventen", summary: "Sprinten skapar rytm för planering, daglig anpassning, granskning och förbättring.", intro: "Alla Scrums event sker inom Sprinten. Eventen skapar regelbundna tillfällen för transparens, granskning och anpassning.", blocks: [
    { title: "Sprint Planning", items: ["Varför är Sprinten värdefull?", "Vad kan bli klart?", "Hur ska arbetet genomföras?"] },
    { title: "Daily Scrum", items: ["15 minuter varje arbetsdag", "Granska framsteg mot Sprintmålet", "Anpassa planen för nästa arbetsdag"] },
    { title: "Sprint Review", items: ["Granska Sprintens resultat med intressenter", "Diskutera förändrade förutsättningar", "Anpassa Product Backlog vid behov"] },
    { title: "Sprint Retrospective", items: ["Granska arbetssätt och kvalitet", "Välj hjälpsamma förbättringar", "Öka kvalitet och effektivitet"] },
  ], misconception: "Backlog Refinement är en löpande aktivitet, inte ett formellt Scrum-event." },
  { id: "artifacts", icon: "📦", title: "Artefakter & commitments", summary: "Tre artefakter skapar transparens och kopplas till varsitt åtagande.", intro: "Scrums artefakter representerar arbete eller värde. Varje artefakt har ett commitment som stärker fokus och gör framsteg möjliga att granska.", blocks: [
    { title: "📋 Product Backlog → 🎯 Produktmål", items: ["Product Backlog är den framväxande ordnade listan över vad som behövs", "Produktmålet beskriver ett framtida tillstånd som Scrumteamet planerar mot"] },
    { title: "📋 Sprint Backlog → 🎯 Sprintmål", items: ["Sprintbackloggen innehåller Sprintmålet, valda poster och planen", "Sprintmålet ger ett gemensamt syfte men lämnar flexibilitet kring exakt arbete"] },
    { title: "📦 Inkrement → ✅ Definition of Done", items: ["Ett Inkrement är ett konkret steg mot Produktmålet", "Definition of Done beskriver det kvalitetsläge som krävs för att arbete ska räknas som färdigt"] },
  ], misconception: "En backloggpost som inte uppfyller Definition of Done är inte en del av Inkrementet." },
  { id: "empiricism", icon: "🧭", title: "Empirism & värderingar", summary: "Scrum bygger på transparens, granskning och anpassning samt fem värderingar.", intro: "Empirism innebär att kunskap skapas genom erfarenhet och att beslut fattas utifrån det som observeras.", blocks: [
    { title: "Transparens", items: ["Arbete och processer måste vara synliga", "Låg transparens leder till sämre beslut och högre risk"] },
    { title: "Granskning", items: ["Artefakter och framsteg mot mål granskas ofta", "Granskning ska möjliggöra lärande, inte kontroll för kontrollens skull"] },
    { title: "Anpassning", items: ["När resultat eller arbetssätt avviker behöver de justeras", "Anpassning ska ske så snart som möjligt"] },
    { title: "Scrums värderingar", items: ["Engagemang", "Fokus", "Öppenhet", "Respekt", "Mod"] },
  ], misconception: "Scrum är inte en detaljerad metod som berättar exakt hur arbetet ska utföras. Ramverket är avsiktligt ofullständigt." },
];

const myths = [
  { claim: "Daily är ett statusmöte för Scrum Master eller Team Coach", answer: "Falskt. Daily Scrum är Utvecklarnas event för att granska framsteg mot Sprintmålet och anpassa planen." },
  { claim: "Produktägaren bestämmer hur mycket teamet ska ta in", answer: "Falskt. Utvecklarna väljer tillsammans med Produktägaren vad som realistiskt kan bli klart under Sprinten." },
  { claim: "Refinement är ett obligatoriskt Scrum-event", answer: "Falskt. Refinement är en löpande aktivitet som kan organiseras på olika sätt." },
  { claim: "Sprint Review är samma sak som en demo", answer: "Falskt. Review är ett arbetsmöte där Scrumteamet och intressenter granskar resultat och möjliga anpassningar." },
  { claim: "Scrum Master leder och fördelar teamets arbete", answer: "Falskt. Scrumteamet är självledande. Scrum Master hjälper teamet förstå Scrum och förbättra sin effektivitet." },
  { claim: "Teamet kan ändra planen under Sprinten", answer: "Sant. Sprintbackloggen anpassas under Sprinten när teamet lär sig mer, så länge Sprintmålet inte äventyras." },
];

export default function App() {
  const [view, setView] = useState("home");
  const page = pages.find((p) => p.id === view);
  const goHome = () => setView("home");
  return <div className="min-h-screen bg-slate-50 text-slate-900">
    <Header onHome={goHome} />
    <main className="mx-auto max-w-6xl px-5 py-9">
      {view !== "home" && <BackButton onClick={goHome} />}
      {view === "home" ? <Home onOpen={setView} /> : <div className="space-y-8">
        <Hero title={`${page.icon} ${page.title}`} text={page.text} />
        {view === "new" && <NewCoach />}
        {view === "ceremonies" && <CeremonyGuide />}
        {view === "problems" && <ProblemContent />}
        {view === "compass" && <Compass />}
      </div>}
    </main>
  </div>;
}

function Header({ onHome }) {
  return <header className="sticky top-0 z-20 border-b border-slate-200 bg-white/90 backdrop-blur">
    <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-4">
      <button onClick={onHome} className="flex items-center gap-2 font-black">
        <span className="grid h-8 w-8 place-items-center rounded-xl bg-gradient-to-br from-indigo-700 to-teal-500 text-white"><Sparkles className="h-4 w-4" /></span>
        TC-guiden
      </button>
      <span className="rounded-full bg-indigo-50 px-3 py-1 text-[10px] font-black uppercase tracking-widest text-indigo-700">MVP 1.0</span>
    </div>
  </header>;
}

function Home({ onOpen }) {
  return <div className="space-y-8">
    <Hero title="Vad behöver du hjälp med idag?" text="Praktiskt stöd för att facilitera, coacha och hjälpa teamet bli mer självledande." />
    <section className="grid gap-5 md:grid-cols-2">
      {pages.map((p) => <button key={p.id} onClick={() => onOpen(p.id)} className="group relative min-h-48 overflow-hidden rounded-[2rem] border border-slate-200 bg-white p-6 text-left shadow-sm transition-all duration-200 hover:-translate-y-1 hover:border-violet-300 hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-violet-500">
        <div className={`absolute inset-x-0 top-0 h-1.5 ${p.accent}`} />
        <div className="flex items-start justify-between">
          <span className="grid h-14 w-14 place-items-center rounded-2xl bg-slate-50 text-3xl ring-1 ring-slate-100 transition group-hover:scale-105">{p.icon}</span>
          <span className="rounded-full bg-slate-50 px-3 py-1.5 text-xs font-black text-slate-500 transition group-hover:bg-violet-50 group-hover:text-violet-700">Öppna →</span>
        </div>
        <h2 className="mt-5 text-xl font-black tracking-tight">{p.title}</h2>
        <p className="mt-2 text-sm leading-6 text-slate-500">{p.text}</p>
      </button>)}
    </section>
  </div>;
}

function NewCoach() {
  const [phase, setPhase] = useState(0);
  const selected = newCoachPhases[phase];
  return <div className="space-y-8">
    <section className="rounded-3xl bg-violet-50 p-7 ring-1 ring-violet-100">
      <p className="text-xs font-black uppercase tracking-[0.2em] text-violet-700">Kom igång</p>
      <h2 className="mt-2 text-2xl font-black">Välkommen till rollen</h2>
      <p className="mt-3 max-w-3xl text-sm leading-7 text-slate-600">Som Team Coach hjälper du teamet att lyckas genom facilitering, coachning och kontinuerlig förbättring. Rollen handlar mindre om att ge svar och mer om att skapa förutsättningar för att teamet själva ska hitta lösningar, utvecklas och nå sina mål.</p>
    </section>
    <section>
      <SectionTitle label="Ditt uppdrag" title="Rollen i praktiken" />
      <div className="mt-5 grid gap-5 md:grid-cols-2">{roleAreas.map((area, i) => <div key={area[0]} className="rounded-2xl bg-white p-5 ring-1 ring-slate-200"><div className="flex gap-4"><span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-violet-100 font-black text-violet-700">{i + 1}</span><div><h3 className="font-black">{area[0]}</h3><p className="mt-1 text-sm leading-6 text-slate-600">{area[1]}</p></div></div></div>)}</div>
    </section>
    <section className="rounded-3xl bg-slate-900 p-7 text-white">
      <p className="text-xs font-black uppercase tracking-[0.2em] text-violet-300">Bra gränsdragning</p>
      <h2 className="mt-2 text-2xl font-black">Vad rollen inte är</h2>
      <div className="mt-5 grid gap-5 md:grid-cols-2">
        <div className="rounded-2xl bg-white/10 p-5"><h3 className="font-black">👔 Du är inte teamets chef</h3><p className="mt-2 text-sm leading-6 text-slate-300">Personalärenden, lön och prestation, rehabilitering, formella arbetsmiljöfrågor, allvarliga individkonflikter och beslut om bemanning hör inte hemma hos Team Coachen.</p></div>
        <div className="rounded-2xl bg-white/10 p-5"><h3 className="font-black">📝 Du är inte teamets sekreterare</h3><p className="mt-2 text-sm leading-6 text-slate-300">Du ska inte permanent skriva alla anteckningar, uppdatera tavlan, skapa alla möten eller påminna alla om vad de lovat.</p></div>
      </div>
    </section>
    <section>
      <SectionTitle label="Din utveckling" title="Din första tid i rollen" />
      <p className="mt-2 text-sm text-slate-500">Välj en fas för att se vad som är relevant att fokusera på just då.</p>
      <div className="mt-5 grid grid-cols-4 gap-3">{newCoachPhases.map((item, i) => <button key={item.title} onClick={() => setPhase(i)} className={`rounded-2xl border p-4 text-left transition ${phase === i ? "border-violet-500 bg-violet-600 text-white shadow-md" : "border-slate-200 bg-white hover:border-violet-300"}`}><span className="text-2xl">{item.icon}</span><b className="mt-2 block">{item.title}</b><span className={`text-xs ${phase === i ? "text-white/75" : "text-slate-500"}`}>{item.subtitle}</span></button>)}</div>
      <div className="mt-6 rounded-3xl bg-white p-6 ring-1 ring-slate-200">
        <div className="flex items-center gap-3"><span className="text-3xl">{selected.icon}</span><div><p className="text-xs font-black uppercase tracking-[0.2em] text-violet-600">Aktiv fas</p><h3 className="text-xl font-black">{selected.title} · {selected.subtitle}</h3></div></div>
        <div className="mt-6 grid gap-6 md:grid-cols-2">{selected.groups.map((group) => <div key={group.title}><h4 className="font-black">{group.title}</h4><ul className="mt-3 space-y-2">{group.items.map((item) => <li key={item} className="flex gap-3 text-sm leading-6 text-slate-600"><span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-violet-400" />{item}</li>)}</ul></div>)}</div>
      </div>
    </section>
  </div>;
}

function CeremonyGuide() {
  const [selected, setSelected] = useState(null);
  const [tab, setTab] = useState("guide");
  const [step, setStep] = useState(0);
  const [checked, setChecked] = useState(false);
  const open = (item) => { setSelected(item); setTab("guide"); setStep(0); setChecked(false); };
  if (!selected) return <section><SectionTitle label="Ceremoniguiden" title="Välj ceremoni" /><p className="mt-2 text-sm text-slate-500">Öppna en ceremoni för Scrumguide, praktiskt upplägg, TC-stöd och körschema.</p><div className="mt-5 grid gap-4 md:grid-cols-2">{ceremonies.map((c, i) => <button key={c.id} onClick={() => open(c)} className="group relative overflow-hidden rounded-2xl border border-slate-200 bg-white p-5 text-left shadow-sm transition-all duration-200 hover:-translate-y-1 hover:border-teal-300 hover:shadow-lg"><div className={`absolute inset-y-0 left-0 w-1.5 ${["bg-amber-400", "bg-violet-500", "bg-sky-500", "bg-teal-500", "bg-fuchsia-500"][i]}`} /><div className="flex items-start gap-4 pl-2"><span className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-slate-50 text-2xl ring-1 ring-slate-100">{c.icon}</span><div className="min-w-0 flex-1"><div className="flex items-start justify-between gap-3"><h3 className="font-black tracking-tight">{c.title}</h3><span className="shrink-0 rounded-full bg-teal-50 px-3 py-1 text-xs font-black text-teal-700">Öppna →</span></div><p className="mt-1 text-xs font-bold uppercase tracking-wide text-slate-400">{c.time}</p><p className="mt-3 text-sm leading-6 text-slate-500">{c.purpose}</p></div></div></button>)}</div></section>;
  const current = selected.runbook[step];
  return <section className="space-y-6">
    <BackButton onClick={() => setSelected(null)} label="Till Ceremoniguiden" />
    <div className="rounded-3xl bg-white p-7 ring-1 ring-slate-200">
      <p className="text-xs font-black uppercase tracking-[0.2em] text-teal-700">{selected.time}</p><h2 className="mt-2 text-3xl font-black">{selected.icon} {selected.title}</h2><p className="mt-2 max-w-4xl text-sm leading-6 text-slate-600">{selected.purpose}</p>
      <div className="mt-7 flex gap-2 border-b border-slate-200"><button onClick={() => setTab("guide")} className={`border-b-2 px-4 py-3 text-sm font-black ${tab === "guide" ? "border-teal-600 text-teal-700" : "border-transparent text-slate-500"}`}>Om ceremonin</button><button onClick={() => setTab("runbook")} className={`border-b-2 px-4 py-3 text-sm font-black ${tab === "runbook" ? "border-teal-600 text-teal-700" : "border-transparent text-slate-500"}`}>Körschema</button></div>
      {tab === "guide" ? <div className="mt-7 space-y-5">
        <section className="rounded-2xl bg-violet-50 p-6 ring-1 ring-violet-100"><p className="text-xs font-black uppercase tracking-[0.2em] text-violet-700">Scrumguiden</p><h3 className="mt-2 text-xl font-black">Vad är {selected.title} till för?</h3><p className="mt-3 text-sm leading-7 text-slate-700">{selected.guide}</p><ul className="mt-5 grid gap-3 md:grid-cols-2">{selected.scrumGuide.map((text) => <li key={text} className="flex gap-3 rounded-xl bg-white p-4 text-sm leading-6 text-slate-700 ring-1 ring-violet-100"><span className="font-black text-violet-600">✓</span>{text}</li>)}</ul></section>
        <CeremonyList title="Inför mötet" items={selected.before} />
        <CeremonyList title="Enkelt upplägg" items={selected.steps} />
        <CeremonyList title="Din roll som TC" items={selected.coach} />
        <section className="rounded-2xl bg-amber-50 p-6 ring-1 ring-amber-200"><h3 className="font-black">🚑 När det kör fast</h3><p className="mt-3 text-sm leading-7 text-slate-700">{selected.rescue}</p></section>
        {selected.id === "retro" && <RetroGenerator />}
      </div> : <div className="mt-7">
        {step >= selected.runbook.length ? <section className="rounded-2xl bg-teal-50 p-6 ring-1 ring-teal-200"><h3 className="text-xl font-black">✅ Körschemat är klart</h3><p className="mt-2 text-sm leading-6 text-slate-600">Sammanfatta beslut, förbättring, ägarskap och uppföljning innan mötet avslutas.</p><button onClick={() => { setStep(0); setChecked(false); }} className="mt-4 rounded-xl bg-teal-700 px-4 py-2 font-bold text-white">Börja om</button></section> : <section className="rounded-2xl bg-teal-50 p-6 ring-1 ring-teal-200"><div className="flex flex-wrap items-center justify-between gap-3"><p className="text-xs font-black uppercase tracking-[0.2em] text-teal-700">Steg {step + 1} av {selected.runbook.length}</p><span className="rounded-full bg-white px-3 py-1 text-xs font-black text-teal-700 ring-1 ring-teal-200">{selected.title}</span></div><h3 className="mt-3 text-2xl font-black">{current.title}</h3><RunbookBlock label="Gör" text={current.do} tone="teal" /><RunbookBlock label="Säg eller fråga" text={`“${current.say}”`} tone="violet" /><RunbookBlock label="Kontrollera innan du går vidare" text={current.check} tone="amber" /><label className="mt-6 flex cursor-pointer items-center gap-3"><input type="checkbox" checked={checked} onChange={(e) => setChecked(e.target.checked)} className="h-5 w-5 accent-teal-700" /><span className="font-bold">Steget är klart</span></label><button disabled={!checked} onClick={() => { setStep(step + 1); setChecked(false); }} className="mt-5 rounded-xl bg-teal-700 px-5 py-3 font-bold text-white disabled:cursor-not-allowed disabled:opacity-40">{step === selected.runbook.length - 1 ? "Avsluta körschemat →" : "Nästa steg →"}</button></section>}
      </div>}
    </div>
  </section>;
}

function RetroGenerator() {
  const formats = [
    { name: "Start / Stop / Continue", time: "30–45 min", fit: "När teamet behöver ett enkelt och handlingsorienterat format.", questions: ["Vad ska vi börja göra?", "Vad ska vi sluta göra?", "Vad fungerar bra och ska fortsätta?", "Vilken förändring testar vi nästa Sprint?"] },
    { name: "4L", time: "45–60 min", fit: "När ni vill fånga både lärande och upplevelser från Sprinten.", questions: ["Loved: Vad uppskattade vi?", "Learned: Vad lärde vi oss?", "Lacked: Vad saknade vi?", "Longed for: Vad önskar vi mer av?", "Vad testar vi nästa Sprint?"] },
    { name: "Segelbåten", time: "45–60 min", fit: "När teamet behöver se drivkrafter, hinder och risker tillsammans.", questions: ["Ön: Vad försöker vi uppnå?", "Vinden: Vad driver oss framåt?", "Ankaren: Vad bromsar oss?", "Klipporna: Vilka risker ser vi?", "Vilket område arbetar vi med nästa Sprint?"] },
    { name: "Snabbpulsen", time: "20–30 min", fit: "När tiden är knapp men ni fortfarande behöver avsluta med en konkret förbättring.", questions: ["Vad fungerade bra?", "Vad skavde?", "Vad är viktigast att förändra?", "Vad testar vi nästa Sprint?"] },
    { name: "Tyst retro", time: "30–45 min", fit: "När få personer brukar dominera samtalet eller teamet behöver mer reflektionstid.", questions: ["Skriv individuellt: Vad fungerade?", "Skriv individuellt: Vad bromsade oss?", "Gruppera observationer", "Rösta på viktigaste området", "Vad testar vi nästa Sprint?"] },
    { name: "Mad / Sad / Glad", time: "30–45 min", fit: "När ni behöver fånga reaktioner på konkreta händelser och sedan gå vidare till förbättring.", questions: ["Mad: Vad frustrerade eller hindrade arbetet?", "Sad: Vad blev inte som vi hoppades?", "Glad: Vad fungerade och gav energi?", "Vilket mönster är viktigast?", "Vad testar vi nästa Sprint?"] },
    { name: "Data först", time: "45–60 min", fit: "När samma problem återkommer och ni vill titta på faktiska mönster.", questions: ["Vilka fakta ser vi från Sprinten?", "Vad sticker ut i blockers, flöde, kvalitet eller oplanerat arbete?", "Vilka möjliga orsaker ser vi?", "Vad vill vi testa?", "Hur ser vi nästa Sprint om experimentet hjälpte?"] },
  ];
  const [format, setFormat] = useState(null);
  const generate = () => setFormat(formats[Math.floor(Math.random() * formats.length)]);
  return <section className="rounded-2xl bg-violet-50 p-6 ring-1 ring-violet-100"><p className="text-xs font-black uppercase tracking-[0.2em] text-violet-700">Variation</p><h3 className="mt-2 text-xl font-black">🎲 Retrogeneratorn</h3><p className="mt-2 text-sm leading-6 text-slate-600">Slumpa fram ett komplett upplägg och anpassa frågorna efter teamets situation.</p><button onClick={generate} className="mt-4 rounded-xl bg-violet-700 px-5 py-3 font-bold text-white">Generera retro</button>{format && <div className="mt-5 rounded-2xl bg-white p-5 ring-1 ring-violet-100"><div className="flex flex-wrap items-start justify-between gap-3"><div><h4 className="text-lg font-black">{format.name}</h4><p className="mt-1 text-sm text-slate-600">{format.fit}</p></div><span className="rounded-full bg-violet-100 px-3 py-1 text-xs font-black text-violet-700">{format.time}</span></div><ol className="mt-5 space-y-3">{format.questions.map((q, i) => <li key={q} className="flex gap-3 text-sm leading-6 text-slate-700"><span className="grid h-6 w-6 shrink-0 place-items-center rounded-full bg-violet-100 text-xs font-black text-violet-700">{i + 1}</span>{q}</li>)}</ol><div className="mt-5 rounded-xl bg-teal-50 p-4 text-sm text-slate-700 ring-1 ring-teal-100"><b>Avsluta med:</b> Vad testar vi nästa Sprint, vem tar första steget och när följer vi upp?</div></div>}</section>;
}

function ProblemContent() {
  const [selected, setSelected] = useState(null);
  const [filter, setFilter] = useState("Alla");
  const [researchOpen, setResearchOpen] = useState(false);
  const categories = useMemo(() => [...new Set(problems.map((p) => p.category))], []);
  const visible = filter === "Alla" ? problems : problems.filter((p) => p.category === filter);
  if (selected) return <section><BackButton onClick={() => { setSelected(null); setResearchOpen(false); }} label="Till TC-akuten" /><div className="rounded-3xl bg-white p-7 ring-1 ring-slate-200"><span className="rounded-full bg-orange-100 px-3 py-1 text-xs font-black text-orange-700">{selected.icon} {selected.category}</span><h2 className="mt-4 text-3xl font-black">{selected.title}</h2><ProblemList title="🔎 Det här kan ligga bakom" items={selected.causes} /><ProblemList title="💬 Frågor att ställa" items={selected.questions} /><section className="mt-5 rounded-2xl bg-violet-50 p-6 ring-1 ring-violet-100"><p className="text-xs font-black uppercase tracking-[0.2em] text-violet-700">Experiment</p><h3 className="mt-2 text-xl font-black">🧪 Testa detta</h3><p className="mt-3 text-sm leading-7 text-slate-700">{selected.experiment}</p></section><section className="mt-5 rounded-2xl bg-teal-50 p-6 ring-1 ring-teal-100"><h3 className="font-black">👀 Håll utkik efter</h3><p className="mt-3 text-sm leading-7 text-slate-700">{selected.watch}</p></section>{selected.research && <section className="mt-5 overflow-hidden rounded-2xl border border-sky-200 bg-sky-50"><button onClick={() => setResearchOpen((v) => !v)} className="flex w-full items-center justify-between gap-4 p-6 text-left"><div><p className="text-xs font-black uppercase tracking-[0.2em] text-sky-700">Evidens & fördjupning</p><h3 className="mt-2 text-lg font-black">🔬 Forskningsperspektivet</h3></div><span className="rounded-full bg-white px-3 py-1 text-lg font-black text-sky-700 ring-1 ring-sky-200">{researchOpen ? "−" : "+"}</span></button>{researchOpen && <div className="border-t border-sky-200 px-6 pb-6 pt-5"><h4 className="font-black">Vad forskningen pekar på</h4><p className="mt-2 text-sm leading-7 text-slate-700">{selected.research.summary}</p><h4 className="mt-5 font-black">Vad betyder det i praktiken?</h4><p className="mt-2 text-sm leading-7 text-slate-700">{selected.research.practice}</p><div className="mt-5 rounded-xl bg-white p-5 ring-1 ring-sky-100"><h4 className="font-black">Referenser</h4><ul className="mt-3 space-y-3">{selected.research.sources.map((source) => <li key={source.url} className="text-sm leading-6"><a href={source.url} target="_blank" rel="noreferrer" className="font-bold text-sky-700 underline decoration-sky-300 underline-offset-2 hover:text-sky-900">{source.label}</a><p className="mt-1 text-xs text-slate-500">DOI / källa: {source.doi}</p></li>)}</ul></div></div>}</section>}</div></section>;
  return <section className="space-y-8"><div><SectionTitle label="När något skaver" title="Vad behöver du hjälp med?" /><p className="mt-2 text-sm text-slate-500">Välj en situation för möjliga orsaker, coachande frågor och ett konkret experiment.</p><div className="mt-5 flex flex-wrap gap-2">{["Alla", ...categories].map((cat) => <button key={cat} onClick={() => setFilter(cat)} className={`rounded-full px-4 py-2 text-sm font-bold transition ${filter === cat ? "bg-orange-500 text-white shadow-sm" : "bg-white text-slate-600 ring-1 ring-slate-200 hover:ring-orange-300"}`}>{cat}</button>)}</div></div><div className="grid gap-4 md:grid-cols-2">{visible.map((p) => <button key={p.id} onClick={() => { setSelected(p); setResearchOpen(false); }} className="group relative overflow-hidden rounded-2xl border border-slate-200 bg-white p-5 text-left shadow-sm transition-all duration-200 hover:-translate-y-1 hover:border-orange-300 hover:shadow-lg"><div className="absolute inset-y-0 left-0 w-1.5 bg-gradient-to-b from-orange-400 to-amber-500" /><div className="flex items-start gap-4 pl-2"><span className="grid h-11 w-11 shrink-0 place-items-center rounded-2xl bg-orange-50 text-xl ring-1 ring-orange-100">{p.icon}</span><div className="min-w-0 flex-1"><div className="flex items-start justify-between gap-3"><h4 className="font-black tracking-tight">{p.title}</h4><span className="shrink-0 rounded-full bg-orange-50 px-3 py-1 text-xs font-black text-orange-700">Få stöd →</span></div><p className="mt-3 text-xs font-bold uppercase tracking-wide text-slate-400">{p.category}</p></div></div></button>)}</div><section className="rounded-2xl bg-slate-900 p-6 text-white"><h3 className="font-black">🚨 Är detta verkligen en TC-fråga?</h3><p className="mt-3 text-sm leading-7 text-slate-300">Personalärenden, rehabilitering, formella arbetsmiljöfrågor, allvarliga individkonflikter och beslut om bemanning ska inte lösas i TC-akuten. Ta frågan vidare till ansvarig chef.</p></section></section>;
}

function Compass() {
  const [selected, setSelected] = useState(null);
  const [myth, setMyth] = useState(null);
  if (selected) return <section><BackButton onClick={() => setSelected(null)} label="Till Scrum-kompassen" /><div className="rounded-3xl bg-white p-7 ring-1 ring-slate-200"><p className="text-xs font-black uppercase tracking-[0.2em] text-violet-700">Fördjupning</p><h2 className="mt-2 text-3xl font-black">{selected.icon} {selected.title}</h2><p className="mt-3 max-w-4xl text-sm leading-7 text-slate-600">{selected.intro}</p><div className="mt-7 grid gap-5 md:grid-cols-2">{selected.blocks.map((block) => <section key={block.title} className="rounded-2xl bg-slate-50 p-6 ring-1 ring-slate-200"><h3 className="font-black">{block.title}</h3><ul className="mt-4 space-y-3">{block.items.map((item) => <li key={item} className="flex gap-3 text-sm leading-6 text-slate-700"><span className="text-violet-500">●</span>{item}</li>)}</ul></section>)}</div><section className="mt-6 rounded-2xl bg-amber-50 p-6 ring-1 ring-amber-200"><h3 className="font-black">💡 Vanlig missuppfattning</h3><p className="mt-2 text-sm leading-7 text-slate-700">{selected.misconception}</p></section></div></section>;
  return <section className="space-y-10"><div><h2 className="text-2xl font-black">Scrum på djupet, utan att drunkna</h2><p className="mt-2 text-sm text-slate-500">Välj ett område för att förstå ansvar, samband och vanliga missuppfattningar.</p><div className="mt-5 grid gap-4 md:grid-cols-2">{compassSections.map((section, i) => <button key={section.id} onClick={() => setSelected(section)} className="group relative overflow-hidden rounded-2xl border border-slate-200 bg-white p-6 text-left shadow-sm transition-all duration-200 hover:-translate-y-1 hover:border-violet-300 hover:shadow-lg"><div className={`absolute inset-y-0 left-0 w-1.5 ${["bg-indigo-500", "bg-teal-500", "bg-amber-500", "bg-violet-500"][i]}`} /><div className="flex items-start gap-4 pl-2"><span className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-violet-50 text-2xl ring-1 ring-violet-100">{section.icon}</span><div className="min-w-0 flex-1"><div className="flex items-start justify-between gap-3"><h3 className="font-black tracking-tight">{section.title}</h3><span className="shrink-0 rounded-full bg-violet-50 px-3 py-1 text-xs font-black text-violet-700">Fördjupa →</span></div><p className="mt-3 text-sm leading-6 text-slate-600">{section.summary}</p></div></div></button>)}</div></div><section className="rounded-3xl bg-white p-7 ring-1 ring-slate-200"><p className="text-xs font-black uppercase tracking-[0.2em] text-teal-700">Helhetsbilden</p><h2 className="mt-2 text-2xl font-black">Hur hänger allt ihop?</h2><div className="mt-6 flex flex-col items-stretch gap-3">{["🎯 Produktmål", "📋 Product Backlog", "📅 Sprint Planning", "🎯 Sprintmål + Sprint Backlog", "🔨 Daily, utvecklingsarbete & refinement", "📦 Inkrement", "👀 Sprint Review", "🔁 Nya insikter tillbaka till Product Backlog"].map((s, index) => <React.Fragment key={s}><div className="rounded-2xl bg-teal-50 p-4 text-center font-bold ring-1 ring-teal-100">{s}</div>{index < 7 && <div className="text-center font-black text-teal-600">↓</div>}</React.Fragment>)}</div><div className="mt-5 rounded-2xl bg-violet-50 p-5 text-sm leading-7 text-slate-700 ring-1 ring-violet-100"><b>Parallellt:</b> Sprint Retrospective förbättrar hur Scrumteamet samarbetar och arbetar inför nästa Sprint.</div></section><section><p className="text-xs font-black uppercase tracking-[0.2em] text-orange-700">Sant eller falskt?</p><h2 className="mt-2 text-2xl font-black">Vanliga missuppfattningar</h2><div className="mt-5 space-y-3">{myths.map((item, index) => <button key={item.claim} onClick={() => setMyth(myth === index ? null : index)} className="w-full rounded-2xl bg-white p-5 text-left ring-1 ring-slate-200 transition hover:ring-orange-300"><div className="flex items-center justify-between gap-4"><h3 className="font-black">{item.claim}</h3><span className="text-orange-600">{myth === index ? "−" : "+"}</span></div>{myth === index && <p className="mt-4 border-t border-slate-200 pt-4 text-sm leading-7 text-slate-600">{item.answer}</p>}</button>)}</div></section></section>;
}

function CeremonyList({ title, items }) { return <section className="w-full rounded-2xl bg-white p-6 ring-1 ring-slate-200"><h3 className="font-black">{title}</h3><ol className="mt-4 space-y-3">{items.map((item, i) => <li key={item} className="flex gap-3 text-sm leading-6 text-slate-600"><span className="font-black text-violet-500">{i + 1}.</span>{item}</li>)}</ol></section>; }
function RunbookBlock({ label, text, tone }) { const style = tone === "amber" ? "bg-amber-50 ring-amber-200 text-amber-700" : tone === "violet" ? "bg-white ring-violet-100 text-violet-700" : "bg-white ring-teal-100 text-teal-700"; return <section className={`mt-4 rounded-xl p-5 ring-1 ${style}`}><p className="text-xs font-black uppercase tracking-widest">{label}</p><p className="mt-2 text-sm font-medium leading-6 text-slate-700">{text}</p></section>; }
function ProblemList({ title, items }) { return <section className="mt-5 rounded-2xl bg-white p-6 ring-1 ring-slate-200"><h3 className="font-black">{title}</h3><ul className="mt-4 space-y-3">{items.map((item) => <li key={item} className="flex gap-3 text-sm leading-6 text-slate-700"><span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-orange-400" />{item}</li>)}</ul></section>; }
function SectionTitle({ label, title }) { return <div><p className="text-xs font-black uppercase tracking-[0.2em] text-violet-600">{label}</p><h2 className="mt-1 text-2xl font-black">{title}</h2></div>; }
function BackButton({ onClick, label = "Till startsidan" }) { return <button onClick={onClick} className="mb-7 inline-flex items-center gap-2 text-sm font-bold text-slate-500 hover:text-indigo-700"><ArrowLeft className="h-4 w-4" />{label}</button>; }
function Hero({ title, text }) { return <section className="rounded-[2rem] bg-gradient-to-br from-indigo-950 via-indigo-900 to-teal-700 p-8 text-white shadow-lg"><h1 className="text-4xl font-black">{title}</h1><p className="mt-2 max-w-3xl text-white/75">{text}</p></section>; }
