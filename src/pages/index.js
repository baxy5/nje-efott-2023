import { useState, useEffect } from "react";
import Answer from "../../components/Answer";
import Questions from "../../components/Question";
import Head from "next/head";
import Lost from "../../components/Lost";
import Start from "../../components/Start";
import Prizes from "../../components/Prizes";
import Next from "../../components/Next";
import Win from "../../components/Win";
import Helpers from "../../components/Helpers";
import End from "../../components/End";
import Image from "next/image";

import WinSound from "../../audio/win.mp3";
import LoseSound from "../../audio/lose.mp3";
import Megjelolo from "../../audio/megjelolo.mp3";
import Suspense from "../../audio/suspense.mp3";

export default function Home() {
  const [isStart, setIsStart] = useState(false);
  const [currentTeamIndex, setCurrentTeamIndex] = useState(0);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(1);
  const [elapsedTime, setElapsedTime] = useState(0);
  const [isEnd, setEnd] = useState(false);
  const [prizeIndex, setPrizeIndex] = useState(0);
  const [displayFlag, setDisplayFlag] = useState(false);
  const [isAudience, setIsAudience] = useState(false);
  const [isTele, setIsTele] = useState(false);
  const [isHalving, setIsHalving] = useState(false);
  const [isHalvingBackg, setHalvingBackg] = useState(false);
  const [teamQuestionsCounter, setTeamQuestionsCounter] = useState(1);
  const [isAnswerClicked, setIsAnswerClicked] = useState(false);
  const [elapsedTimePhone, setElapsedTimePhone] = useState(0);
  const [isPhoneStart, setIsPhoneStart] = useState(false);

  const [winSound, setWinSound] = useState(null);
  const [loseSound, setLoseSound] = useState(null);
  const [flagSound, setFlagSound] = useState(null);
  const [suspenseSound, setSuspenseSound] = useState(null);

  // SOUND OBJECT DEFINING
  useEffect(() => {
    setWinSound(new Audio(WinSound));
    setLoseSound(new Audio(LoseSound));
    setFlagSound(new Audio(Megjelolo));
    setSuspenseSound(new Audio(Suspense));
  }, []);

  const questions = [
    {
      1: {
        question: "Mi a DJB jelentése?",
        answers: [
          "A: Diákjó Bizottság",
          "B: Demokratikus Jogalapú Barátság",
          "C: Diák Járulék Bizottság",
          "D: Diákjóléti Bizottság",
        ],
        rightAnswerIndex: 4,
        // rightAnswerIndex - 1 = can't be in the "halving"
        halving: [2, 0],
      },
      2: {
        question:
          "Meddig érvényes az őszi félévben kapott diákigazolvány matrica?",
        answers: [
          "A: Március 31.",
          "B: Január 31.",
          "C: Február 31.",
          "D: Április 31.",
        ],
        rightAnswerIndex: 1,
        halving: [1, 2],
      },
      3: {
        question: "Neumann János melyik évben született?",
        answers: ["A: 1905", "B: 1915", "C: 1925", "D: 1935"],
        rightAnswerIndex: 1,
        halving: [1, 2],
      },
      4: {
        question: "Melyik nem magyar sörmárka?",
        answers: ["A: Soproni", "B: Dreher", "C: Heineken", "D: Borsodi"],
        rightAnswerIndex: 3,
        halving: [1, 3],
      },
      5: {
        question: "A világ legerősebb sörének mekkora az alkohol százaléka?",
        answers: ["A: 32", "B: 67.5", "C: 67", "D: 55"],
        rightAnswerIndex: 2,
        halving: [0, 3],
      },
      6: {
        question: "Miből készül a fény?",
        answers: ["A: vodka co2-vel", "B: 2 coulomb töltés", "C: vodka, citromlé", "D: vodka, málnaszörp"],
        rightAnswerIndex: 1,
        halving: [3, 2],
      },
      7: {
        question: "Hány neve volt már az egyetemnek a jelenlegivel együtt?",
        answers: [
          "A: 3",
          "B: 6",
          "C: 2",
          "D: 5",
        ],
        rightAnswerIndex: 4,
        halving: [1, 0],
      },
    },
    {
      1: {
        question: "Melyik város az Eiffel-torony otthona?",
        answers: [
          "A: Madrid",
          "B: Berlin",
          "C: London",
          "D: Párizs",
        ],
        rightAnswerIndex: 4,
        halving: [1, 0],
      },
      2: {
        question: "Mi a fővárosa Japánnak?",
        answers: ["A: Peking", "B: Tokió", "C: New York", "D: Bangkok"],
        rightAnswerIndex: 2,
        halving: [3, 0],
      },
      3: {
        question: "Miből áll a házmester fröccs?",
        answers: ["A: 5dl bor, 2dl szóda", "B: 3dl bor 2dl szóda", "C: 2dl bor 3dl szóda", "D: 4dl bor 1dl szóda"],
        rightAnswerIndex: 2,
        halving: [3, 0],
      },
      4: {
        question: "Ki volt a görög istenek ura?",
        answers: ["A: Zeusz", "B: Hádész", "C: Poszeidon", "D: Apollón"],
        rightAnswerIndex: 1,
        halving: [1, 2],
      },
      5: {
        question: "Mi volt Neumann keresztneve?",
        answers: ["A: Gusztáv", "B: Gyuri", "C: Sándor", "D: János"],
        rightAnswerIndex: 4,
        halving: [1, 0],
      },
      6: {
        question: "Mi volt Neumann-hatás?",
        answers: ["A: A kvantumtúlélés jelensége", "B: A szinkronizáció jelensége", "C: Az egységes tudatosság jelensége", "D: Az árnyékeffektus jelensége"],
        rightAnswerIndex: 2,
        halving: [3, 0],
      },
      7: {
        question: "Kiről kapta korábban nevét az NJE?",
        answers: [
          "A: Janus Pannonius",
          "B: Pallasz Athéné",
          "C: Nagy Sándor",
          "D: Julius Caesar",
        ],
        rightAnswerIndex: 2,
        halving: [3, 0],
      },
    },
    {
      1: {
        question: "Melyik híres személyiség született Kecskeméten?",
        answers: [
          "A: Neumann János",
          "B: Petőfi Sándor",
          "C: Jókai Mór",
          "D: Bálint György",
        ],
        rightAnswerIndex: 1,
        // rightAnswerIndex - 1 = can't be in the "halving"
        halving: [2, 3],
      },
      2: {
        question: "Milyen néven ismert az egyik legnagyobb park Kecskeméten?",
        answers: [
          "A: Kossuth tér",
          "B: Kiskerti park",
          "C: Katonai emlékpark",
          "D: Bánki tó",
        ],
        rightAnswerIndex: 2,
        // rightAnswerIndex - 1 = can't be in the "halving"
        halving: [2, 3],
      },
      3: {
        question: "Miből van a Hugo?",
        answers: [
          "A: 10cl prosecco, 2cl bodza szirup, lime, menta, szóda",
          "B: 80% pacek, 20% haj",
          "C: 5cl vodka, 2cl limelé, menta, szóda",
          "D: 4cl tequila, 4cl vodka, 4cl almalé, menta, lime",
        ],
        rightAnswerIndex: 1,
        // rightAnswerIndex - 1 = can't be in the "halving"
        halving: [2, 3],
      },
      4: {
        question: "Melyik állatfajtát lehet megfigyelni Kecskeméten az állatkertben?",
        answers: [
          "A: Tigris",
          "B: Elefánt",
          "C: Pingvin",
          "D: Mindhárom fajta megtalálható az állatkertben",
        ],
        rightAnswerIndex: 4,
        halving: [2, 1],
      },
      5: {
        question: "Melyik gasztronómiai specialitás híres Kecskemétről?",
        answers: [
          "A: Gulyásleves",
          "B: Töltött káposzta",
          "C: Szilvásgombóc",
          "D: Halászlé",
        ],
        rightAnswerIndex: 3,
        halving: [3, 1],
      },
      6: {
        question: "Melyik koktél alapja a tequila?",
        answers: [
          "A: Margarita",
          "B: Cosmopolitan",
          "C: Mojito",
          "D: White Russian",
        ],
        rightAnswerIndex: 1,
        halving: [3, 1],
      },
      7: {
        question: "Milyen ital a mai tai?",
        answers: [
          "A: Gin alapú",
          "B: Rum alapú",
          "C: Tequila alapú",
          "D: Vodka alapú",
        ],
        rightAnswerIndex: 2,
        halving: [3, 2],
      },
    },
    {
      1: {
        question: "Melyik bolygó van a Naprendszerünkben a harmadik helyen a Nap felől számítva?",
        answers: [
          "A: Föld",
          "B: Mars",
          "C: Vénusz",
          "D: Merkúr",
        ],
        rightAnswerIndex: 1,
        halving: [1, 2],
      },
      2: {
        question: "Melyik állam a világ legnagyobb termelője kávéból?",
        answers: [
          "A: Kolumbia",
          "B: Brazília",
          "C: Etiópia",
          "D: Indonézia",
        ],
        rightAnswerIndex: 2,
        halving: [0, 2],
      },
      3: {
        question: "Miből áll a hosszúlépés fröccs?",
        answers: [
          "A: 1dl bor 2dl szóda",
          "B: 2dl bor 1dl szóda",
          "C: 2dl bor 2dl szóda",
          "D: 3dl bor 2dl szóda",
        ],
        rightAnswerIndex: 1,
        halving: [3, 2],
      },
      4: {
        question: "Ki volt a Harry Potter könyvek szerzője?",
        answers: [
          "A: Stephen King",
          "B: George R.R. Martin",
          "C: Jane Austen",
          "D: J.K Rowling",
        ],
        rightAnswerIndex: 4,
        halving: [1, 2],
      },
      5: {
        question: "Neumann János milyen módszert fejlesztett a numerikus számításokhoz?",
        answers: [
          "A: Monte Carlo módszer",
          "B: Jacobi módszer",
          "C: Finite Element módszer",
          "D: Runge-Kutta módszer",
        ],
        rightAnswerIndex: 2,
        halving: [0, 2],
      },
      6: {
        question: "Hogyan írjuk helyesen a műszaki kar nevét?",
        answers: [
          "A: GANF",
          "B: GAMF",
          "C: GAMF MIK",
          "D: Egyik sem",
        ],
        rightAnswerIndex: 3,
        halving: [0, 1],
      },
      7: {
        question: "Mikor alapították az egyetemet?",
        answers: [
          "A: 1974",
          "B: 1654",
          "C: 1964",
          "D: 1864",
        ],
        rightAnswerIndex: 3,
        halving: [0, 1],
      },
    },
    {
      1: {
        question: "Ki alkotta a Mona Lisát?",
        answers: [
          "A: Leonardo Da Vinci",
          "B: Leonardo DiCaprio",
          "C: Michelangelo",
          "D: Vincent van Gogh",
        ],
        rightAnswerIndex: 1,
        halving: [2, 1],
      },
      2: {
        question: "Miből áll a kisfröccs?",
        answers: [
          "A: 1dl bor 1dl szóda",
          "B: 1dl bor 2dl szóda",
          "C: 2dl bor 1dl szóda",
          "D: 2dl bor 2dl szóda",
        ],
        rightAnswerIndex: 1,
        halving: [2, 1],
      },
      3: {
        question: "Mi az IHB jelentése?",
        answers: [
          "A: Iszunk hányunk belefekszünk",
          "B: Indokolatlan házi buli",
          "C: Ismeretlen homeoterápiás beavatkozás",
          "D: Indokolatlan helyi buli",
        ],
        rightAnswerIndex: 4,
        halving: [2, 1],
      },
      4: {
        question: "Ki Kecskemét hírös szülötte?",
        answers: [
          "A: Erkel Ferenc",
          "B: Kölcsey Ferenc",
          "C: Kodály Zoltán",
          "D: Arany János",
        ],
        rightAnswerIndex: 3,
        halving: [3, 1],
      },
      5: {
        question: "Mit jelent az „IPA” rövidítés?",
        answers: [
          "A: Indian Porter Ale",
          "B: Irish Pils Ale",
          "C: International Pale Ale",
          "D: Indian Pale Ale",
        ],
        rightAnswerIndex: 4,
        halving: [2, 1],
      },
      6: {
        question: "Miből készül a Tengeralattjáró?",
        answers: [
          "A: redbull, 4cl jager",
          "B: 4cl vodka, almalé",
          "C: 4cl pálinka, sör",
          "D: 4cl tequila, sör",
        ],
        rightAnswerIndex: 3,
        halving: [3, 1],
      },
      7: {
        question: "Mi az EHÖK jelentése?",
        answers: [
          "A: Egyetemi Hallgatói önkormányzat",
          "B: Egyetemi Hallgatói összkormányzat",
          "C: Egyetemi Hallgatóság összefogó kormánya",
          "D: Együttes Hallgatói összképviselet",
        ],
        rightAnswerIndex: 1,
        halving: [3, 1],
      },
    },
    {
      1: {
        question: "Ki írta a Rómeó és Júliát?",
        answers: [
          "A: William Shakespeare",
          "B: Csörgő Hugó",
          "C: Oscar Wilde",
          "D: Victor Hugo",
        ],
        rightAnswerIndex: 1,
        halving: [3, 1],
      },
      2: {
        question: "Hol található az Akropolisz?",
        answers: [
          "A: Párizsban",
          "B: Rómában",
          "C: Athénban",
          "D: Madridban",
        ],
        rightAnswerIndex: 3,
        halving: [3, 1],
      },
      3: {
        question: "Mi a HSZK jelentése?",
        answers: [
          "A: Hallgatói szociális központ",
          "B: Hallgatói szolgáltató központ",
          "C: Hallgatói szak központ",
          "D: Hallgatói szak kollégium",
        ],
        rightAnswerIndex: 2,
        halving: [3, 0],
      },
      4: {
        question: "Milyen pálinkáról híres Kecskemét?",
        answers: [
          "A: Szilva",
          "B: Barack",
          "C: Körte",
          "D: Birsalma",
        ],
        rightAnswerIndex: 2,
        halving: [3, 0],
      },
      5: {
        question: "Hány férőhelyes a homokbányai kollégium?",
        answers: [
          "A: 346",
          "B: 456",
          "C: 596",
          "D: 432",
        ],
        rightAnswerIndex: 2,
        halving: [3, 0],
      },
      6: {
        question: "Melyik fröccs készítéséhez használnak uborkalevet?",
        answers: [
          "A: kőműves fröccs",
          "B: újházi fröccs",
          "C: viceházmester fröccs",
          "D: lámpás fröccs",
        ],
        rightAnswerIndex: 2,
        halving: [3, 0],
      },
      7: {
        question: "Hány fajta Tatratea létezik? ",
        answers: [
          "A: 14",
          "B: 13",
          "C: 7",
          "D: 16",
        ],
        rightAnswerIndex: 1,
        halving: [3, 2],
      },
    },
    {
      1: {
        question: "Melyik kémiai elem van a vízben?",
        answers: [
          "A: Oxigén és szén",
          "B: Hidrogén és oxigén",
          "C: Nitrogén és oxigén",
          "D: Hidrogén és nitrogén",
        ],
        rightAnswerIndex: 2,
        halving: [3, 2],
      },
      2: {
        question: "Melyik díjat kapta meg Neumann János a matematikában?",
        answers: [
          "A: Nobel-díj",
          "B: Fields-érem",
          "C: Abel-díj",
          "D: Kyoto-díj",
        ],
        rightAnswerIndex: 2,
        halving: [3, 2],
      },
      3: {
        question: "Mi a IJAT jelentése?",
        answers: [
          "A: Innovatív Járgányok Aránytalan Áttétele",
          "B: Innovatív Anyagok és Jármű Tanszék",
          "C: Innovatív Járművek és Anyagok Tanszék",
          "D: Innovatív Jármű és Anyag Tanszék",
        ],
        rightAnswerIndex: 3,
        halving: [3, 1],
      },
      4: {
        question: "Mettől meddig tartott a Campus felépítése?",
        answers: [
          "A: 2014-2018",
          "B: 2016-2019",
          "C: 2016-2018",
          "D: 2017-2019",
        ],
        rightAnswerIndex: 4,
        halving: [2, 1],
      },
      5: {
        question: "Hány fő befogadására alkalmas az új Campus nagyelőadója ÖSSZESEN?",
        answers: [
          "A: 500",
          "B: 300",
          "C: 600",
          "D: 400",
        ],
        rightAnswerIndex: 1,
        halving: [2, 1],
      },
      6: {
        question: "Ki Kecskemét védőszentje?",
        answers: [
          "A: Szent József",
          "B: Szent István",
          "C: Szent Mária",
          "D: Szent Miklós",
        ],
        rightAnswerIndex: 4,
        halving: [2, 1],
      },
      7: {
        question: "Melyik számítógépet tervezte Neumann János?",
        answers: [
          "A: EDVAC",
          "B: UNIVAC",
          "C: EDSAC",
          "D: ENIAC",
        ],
        rightAnswerIndex: 1,
        halving: [2, 1],
      },
    },
    {
      1: {
        question: "Minimum hány hétnek kell lennie a vizsgaidőszaknak?",
        answers: [
          "A: 7",
          "B: 5",
          "C: 6",
          "D: 8",
        ],
        rightAnswerIndex: 2,
        halving: [2, 3],
      },
      2: {
        question: "Mi a KEN jelentése?",
        answers: [
          "A: Kecskeméti egyesületi napok",
          "B: Kecske erőszakoló napok",
          "C: Kecskeméti Egyetemi napok",
          "D: Kecskeméti Egyetemek napja",
        ],
        rightAnswerIndex: 3,
        halving: [1, 3],
      },
      3: {
        question: "Miből készül főként a Lager?",
        answers: [
          "A: Árpa",
          "B: Búza",
          "C: Komló",
          "D: Kukorica",
        ],
        rightAnswerIndex: 1,
        halving: [1, 3],
      },
      4: {
        question: "Mikor rendez az egyetem diplomaátadó ünnepséget?",
        answers: [
          "A: Csak januárban",
          "B: Csak júniusban",
          "C: Januárban és júniusban is",
          "D: Sosem",
        ],
        rightAnswerIndex: 3,
        halving: [1, 3],
      },
      5: {
        question: "Mikor indultak először a GTK alapszakjai?",
        answers: [
          "A: 2017",
          "B: 2018",
          "C: 2016",
          "D: 2019",
        ],
        rightAnswerIndex: 3,
        halving: [1, 3],
      },
      6: {
        question: "Mi a KOB jelentése?",
        answers: [
          "A: Kollégiumi Bizottság",
          "B: Kecskeméti Országos Bizottság",
          "C: Közbiztonság Országos Bírósága",
          "D: Kollégiumi Bográcsozás",
        ],
        rightAnswerIndex: 1,
        halving: [1, 3],
      },
      7: {
        question: "Mióta van Gazdaságtudományi Kar az Egyetemen?",
        answers: [
          "A: 2006",
          "B: 2004",
          "C: 2000",
          "D: 2016",
        ],
        rightAnswerIndex: 4,
        halving: [1, 2],
      },
    },
    {
      1: {
        question: "Ki volt Neumann János?",
        answers: [
          "A: Matematikus",
          "B: Doktor",
          "C: Kvantumfizikus",
          "D: Informatikus",
        ],
        rightAnswerIndex: 1,
        halving: [1, 2],
      },
      2: {
        question: "Mikor alapították az egyetemet?",
        answers: [
          "A: 1961",
          "B: 1972",
          "C: 2000",
          "D: 1964",
        ],
        rightAnswerIndex: 4,
        halving: [1, 2],
      },
      3: {
        question: "Melyik nevet nem viselte még az egyetem?",
        answers: [
          "A: Neumann János Egyetem",
          "B: Pallasz Aténé Egyetem",
          "C: Kecskeméti Egyetem",
          "D: Felsőfokú Gépipari Tecnikum",
        ],
        rightAnswerIndex: 3,
        halving: [1, 0],
      },
      4: {
        question: "Hány tanszék van a GAMF-on?",
        answers: [
          "A: 4",
          "B: 3",
          "C: 3.5",
          "D: 2",
        ],
        rightAnswerIndex: 2,
        halving: [3, 0],
      },
      5: {
        question: "Mi a GAMF jelentése?",
        answers: [
          "A: Műszaki-Informatikai Kar",
          "B: Gépgyártó és autóipari műszaki főiskola",
          "C: Gépipari és automatizálási műszaki főiskola",
          "D: Gépészeti-automatizálási műszaki főiskola",
        ],
        rightAnswerIndex: 3,
        halving: [3, 0],
      },
      6: {
        question: "Miből áll a nagyfröccs?",
        answers: [
          "A: 3dl bor 2dl szóda",
          "B: 5dl bor 3dl szóda",
          "C: 2dl bor 1dl szóda",
          "D: 2dl bor 2dl szóda",
        ],
        rightAnswerIndex: 3,
        halving: [3, 1],
      },
      7: {
        question: "Hány ESZTP ponttól számít valaki szociálisan rászorulónak?",
        answers: [
          "A: 10",
          "B: 18",
          "C: 20",
          "D: 22",
        ],
        rightAnswerIndex: 4,
        halving: [2, 1],
      },
    },
    {
      1: {
        question: "Honnan eredeztethető a Beszélő köntös neve?",
        answers: [
          "A: Egy durva LSD-s sztoriból",
          "B: Egy török hódoltság alatti mondából",
          "C: A tulaj felsőjéről",
          "D: Ez egy fantázianév",
        ],
        rightAnswerIndex: 2,
        halving: [2, 0],
      },
      2: {
        question: "Hányszor vehetsz fel egy tárgyat?",
        answers: [
          "A: 6",
          "B: 3",
          "C: 4",
          "D: 10",
        ],
        rightAnswerIndex: 1,
        halving: [2, 3],
      },
      3: {
        question: "Hány féle gyógynövényt tartalmaz a Jager?",
        answers: [
          "A: 52",
          "B: 56",
          "C: 43",
          "D: 58",
        ],
        rightAnswerIndex: 2,
        halving: [2, 3],
      },
      4: {
        question: "Mi a T.I.B.N jelentése?",
        answers: [
          "A: Te is bedobod, nem?",
          "B: Tibi is bedobja, nem?",
          "C: Team in beer, no?",
          "D: Te is bedobod nem",
        ],
        rightAnswerIndex: 1,
        halving: [2, 3],
      },
      5: {
        question: "Melyik évben hagyta el az országot Neumann János?",
        answers: [
          "A: 1937",
          "B: 1940",
          "C: 1943",
          "D: 1946",
        ],
        rightAnswerIndex: 2,
        halving: [2, 3],
      },
      6: {
        question: "Hogyan készül a Deák bólé?",
        answers: [
          "A: 1 bor 4 szóda",
          "B: sok szóda cseppnyi bor",
          "C: 2 bor 2 szóda",
          "D: Nem is borból készül",
        ],
        rightAnswerIndex: 2,
        halving: [2, 3],
      },
      7: {
        question: "Mi a TDK jelentése?",
        answers: [
          "A: Tudálékos Diákjóléti Közmunkás",
          "B: Tudományos Diák Konferencia",
          "C: Tartalékos diák könyvtáros",
          "D: Tudományos Diákköri Konferencia",
        ],
        rightAnswerIndex: 4,
        halving: [2, 1],
      },
    },
    {
      1: {
        question: "Melyik városban született Neumann János?",
        answers: [
          "A: Budapest",
          "B: Berlin",
          "C: New York",
          "D: London",
        ],
        rightAnswerIndex: 1,
        halving: [2, 1],
      },
      2: {
        question: "Melyik elismerést kapta meg Neumann János az Amerikai Egyesült Államokban?",
        answers: [
          "A: Nobel-díj",
          "B: Presidential Medal of Freedom",
          "C: Fields-érem",
          "D: Pulitzer-díj",
        ],
        rightAnswerIndex: 2,
        halving: [2, 0],
      },
      3: {
        question: "Mi a KIK jelentése?",
        answers: [
          "A: Bevásárlóközpont",
          "B: Könyvtár és informatikai központ",
          "C: Könyvtár és információs központ",
          "D: Könyvtári központ",
        ],
        rightAnswerIndex: 3,
        halving: [1, 0],
      },
      4: {
        question: "Hogyan köthető Neumann neve Kecskeméthez?",
        answers: [
          "A: Itt született",
          "B: Itt tanult",
          "C: Itt találta fel a számítógépet",
          "D: Egyetemet neveztek el róla",
        ],
        rightAnswerIndex: 4,
        halving: [1, 0],
      },
      5: {
        question: "Hol dolgozott Neumann János az Egyesült Államokban?",
        answers: [
          "A: Los Alamos Nemzeti Laboratórium",
          "B: Microsoft",
          "C: NASA",
          "D: Google",
        ],
        rightAnswerIndex: 1,
        halving: [1, 2],
      },
      6: {
        question: "Miből készül a Cuba libre?",
        answers: [
          "A: 4cl, tequila, citrom, só, szóda",
          "B: 5cl vodka, 1dl cola, citrom",
          "C: 5cl barna rum, 1dl cola, lime",
          "D: 5cl fehér rum, 1dl cola, lime",
        ],
        rightAnswerIndex: 4,
        halving: [1, 2],
      },
      7: {
        question: "Hol tanult Neumann János?",
        answers: [
          "A: Bécsi Műszaki Egyetem",
          "B: Harvard Egyetem",
          "C: Eötvös Loránd Tudományegyetem",
          "D: Oxford Egyetem",
        ],
        rightAnswerIndex: 3,
        halving: [1, 3],
      },
    },
    {
      1: {
        question: "Milyen szakterületen volt szakértő Neumann János?",
        answers: [
          "A: Fizika",
          "B: Matematika",
          "C: Kémia",
          "D: Biológia",
        ],
        rightAnswerIndex: 2,
        halving: [0, 3],
      },
      2: {
        question: "Ki volt az első ember az űrben?",
        answers: [
          "A: Neil Armstrong",
          "B: John Glenn",
          "C: Buzz Aldrin",
          "D: Yuri Gagarin",
        ],
        rightAnswerIndex: 4,
        halving: [0, 2],
      },
      3: {
        question: "Melyik az Amerikai Egyesült Államok legnagyobb városa népesség szempontjából?",
        answers: [
          "A: Los Angeles",
          "B: New York",
          "C: Chicago",
          "D: Miami",
        ],
        rightAnswerIndex: 2,
        halving: [0, 2],
      },
      4: {
        question: "Melyik folyó a leghosszabb a Földön?",
        answers: [
          "A: Nilus",
          "B: Amazonas",
          "C: Mississippi",
          "D: Duna",
        ],
        rightAnswerIndex: 1,
        halving: [3, 2],
      },
      5: {
        question: "Mi a FOSZK jelentése?",
        answers: [
          "A: Felzárkóztató Osztatlan Szakképzés ",
          "B: Főiskolai Osztatlan Szakképzés",
          "C: Felnőtt Oktatási Szakképzés",
          "D: Felsőoktatási Szakképzés",
        ],
        rightAnswerIndex: 4,
        halving: [1, 2],
      },
      6: {
        question: "Melyik festő alkotta a Szentivánéji álmot?",
        answers: [
          "A: Vincent van Gogh",
          "B: Johannes Vermeer",
          "C: Sandro Botticelli",
          "D: William Turner",
        ],
        rightAnswerIndex: 3,
        halving: [1, 3],
      },
      7: {
        question: "Mennyi pénz egy havi kollégiumi díj?",
        answers: [
          "A: 15 999 Ft",
          "B: 16 000 Ft",
          "C: 16 500 Ft",
          "D: 18 000 Ft",
        ],
        rightAnswerIndex: 2,
        halving: [2, 3],
      },
    },
    {
      1: {
        question: "Melyik nem hungarikum ital?",
        answers: [
          "A: Unicum",
          "B: Törley",
          "C: St. Hubertus",
          "D: Kőbányai",
        ],
        rightAnswerIndex: 3,
        halving: [1, 3],
      },
      2: {
        question: "Miből készül a Titanic coctail?",
        answers: [
          "A: víz, jég",
          "B: vodka-szóda másnéven",
          "C: tequila, szóda",
          "D: Whiskey jéggel",
        ],
        rightAnswerIndex: 1,
        halving: [1, 3],
      },
      3: {
        question: "Ki volt az első ember, aki bejárta a Földet?",
        answers: [
          "A: Marco Polo",
          "B: Ferdinand Magellan",
          "C: Vasco da Gama",
          "D: Christopher Columbus",
        ],
        rightAnswerIndex: 2,
        halving: [2, 3],
      },
      4: {
        question: "Mi a GTK jelentése?",
        answers: [
          "A: Gép technikai Kar",
          "B: Gazdaságtudományi Kar",
          "C: Gazdaságtanulmányi Kar",
          "D: Gazda tudományi Kar",
        ],
        rightAnswerIndex: 2,
        halving: [2, 3],
      },
      5: {
        question: "Hogyan készül a Krúdy fröccs?",
        answers: [
          "A: 4 bor 1 szóda",
          "B: 5 bor 5 szóda",
          "C: 9 bor 1 szóda",
          "D: 7 bor 3 szóda",
        ],
        rightAnswerIndex: 3,
        halving: [1, 3],
      },
      6: {
        question: "Milyen vitaminokban gazdag a sör?",
        answers: [
          "A: a-vitamin",
          "B: b-vitamin",
          "C: d-vitamin",
          "D: c-vitamin",
        ],
        rightAnswerIndex: 2,
        halving: [2, 3],
      },
      7: {
        question: "Melyik koktél fő összetevői a tequila, vodka, fehér rum, gin, tripple sec?",
        answers: [
          "A: Margarita",
          "B: Sex On The Beach",
          "C: Long Island",
          "D: Bloody Mary",
        ],
        rightAnswerIndex: 3,
        halving: [1, 3],
      },
    },
    {
      1: {
        question: "Melyik a világ legnagyobb szárazföldi állata?",
        answers: [
          "A: Elefánt",
          "B: Gorilla",
          "C: Oroszlán",
          "D: Medve",
        ],
        rightAnswerIndex: 1,
        halving: [1, 3],
      },
      2: {
        question: "Miből készül a Moscowe Mule?",
        answers: [
          "A: 4cl vodka, 2cl citromlé, 3dl sprite",
          "B: 4cl tequila, 2cl eperlé, 3dl szóda",
          "C: 4cl vodka, 2cl limelé, 3dl gyömbér sör",
          "D: 4cl vodka, fél gerezd citrom, 4dl lager",
        ],
        rightAnswerIndex: 3,
        halving: [1, 3],
      },
      3: {
        question: "Ki volt a Mona Lisa modellje?",
        answers: [
          "A: Mona Lisa",
          "B: Catherine de' Medici",
          "C: Lisa Gherardini",
          "D: Beatrice d'Este",
        ],
        rightAnswerIndex: 3,
        halving: [1, 3],
      },
      4: {
        question: "Melyik évben kezdődött az első világháború?",
        answers: [
          "A: 1914",
          "B: 1917",
          "C: 1918",
          "D: 1921",
        ],
        rightAnswerIndex: 1,
        halving: [1, 3],
      },
      5: {
        question: "Miből miből készül a Mojito?",
        answers: [
          "A: 4cl fehér rum, 1db lime, menta, ásványvíz, jég",
          "B: 4cl vodka, fél citrom, menta, szóda",
          "C: 4cl rum, 2cl cukorszirup, lime, menta, ásványvíz, jég",
          "D: 4cl fehér rum, 4cl cukorszirup, lime, menta, ásványvíz, jég",
        ],
        rightAnswerIndex: 4,
        halving: [1, 2],
      },
      6: {
        question: "Ki írta az Othellót?",
        answers: [
          "A: William Shakespeare",
          "B: Edgar Allan Poe",
          "C: Charles Dickens",
          "D: Jane Austen",
        ],
        rightAnswerIndex: 1,
        halving: [1, 2],
      },
      7: {
        question: "Melyik országban található a Taj Mahal?",
        answers: [
          "A: Japán",
          "B: Indonézia",
          "C: Thaiföld",
          "D: India",
        ],
        rightAnswerIndex: 4,
        halving: [1, 2],
      },
    },
    {
      1: {
        question: "Mi a világ legnagyobb óceánja?",
        answers: [
          "A: Atlanti-óceán",
          "B: Indiai-óceán",
          "C: Csendes-óceán",
          "D: Északi-sarki-óceán",
        ],
        rightAnswerIndex: 3,
        halving: [1, 3],
      },
      2: {
        question: "Miből készül a Tequila Sunrise?",
        answers: [
          "A: 2cl tequila, 3cl grenadin, 1dl narancslé",
          "B: 4cl vodka, 2cl gránátalmalé, 8cl narancslé",
          "C: 2cl tequila, 5cl gránátalmalé, 4cl narancslé",
          "D: 4cl tequila, 2cl grenadin, 9cl narancslé",
        ],
        rightAnswerIndex: 4,
        halving: [1, 2],
      },
      3: {
        question: "Melyik nagyvilágvárosban található a Vörös tér?",
        answers: [
          "A: Párizs",
          "B: Moszkva",
          "C: New York",
          "D: Madrid",
        ],
        rightAnswerIndex: 2,
        halving: [3, 2],
      },
      4: {
        question: "Mi a legnagyobb állat a Földön?",
        answers: [
          "A: Elefánt",
          "B: Krokodik",
          "C: Bálna",
          "D: Oroszlán",
        ],
        rightAnswerIndex: 3,
        halving: [3, 1],
      },
      5: {
        question: "Melyik földrész lakosságszáma a legmagasabb?",
        answers: [
          "A: Ázsia",
          "B: Európa",
          "C: Afrika",
          "D: Dél-Amerika",
        ],
        rightAnswerIndex: 1,
        halving: [3, 1],
      },
      6: {
        question: "Hogyan készül a Vice Házmester fröccs?",
        answers: [
          "A: 4 bor 1 szóda",
          "B: 3 bor 2 szóda",
          "C: 2 bor 3 szóda",
          "D: ezek közül egyik sem",
        ],
        rightAnswerIndex: 3,
        halving: [3, 1],
      },
      7: {
        question: "Ki írta az Odüsszeiát?",
        answers: [
          "A: William Shakespeare",
          "B: Homer",
          "C: Dante Alighieri",
          "D: Virgil",
        ],
        rightAnswerIndex: 2,
        halving: [3, 2],
      },
    },
    {
      1: {
        question: "Mi a KVK jelentése?",
        answers: [
          "A: Kertészeti és vidékfejlesztési Kar",
          "B: Kertészeti és agrármérnöki Kar",
          "C: Kedvező feltételek kialakítása Kar",
          "D: Kertész és vidékfejlesztő Kar",
        ],
        rightAnswerIndex: 1,
        halving: [3, 2],
      },
      2: {
        question: "Melyik államnak van a legnagyobb területe?",
        answers: [
          "A: Egyesült Államok",
          "B: Kanada",
          "C: Oroszország",
          "D: Kína",
        ],
        rightAnswerIndex: 3,
        halving: [3, 1],
      },
      3: {
        question: "Ki volt a Beatles együttes tagja?",
        answers: [
          "A: Elvis Presley",
          "B: John Lennon",
          "C: Freddie Mercury",
          "D: Mick Jagger",
        ],
        rightAnswerIndex: 2,
        halving: [3, 2],
      },
      4: {
        question: "Melyik állam az Egyesült Államok főváros?",
        answers: [
          "A: Kalifornia",
          "B: Texas",
          "C: New York",
          "D: District of Columbia",
        ],
        rightAnswerIndex: 4,
        halving: [1, 2],
      },
      5: {
        question: "Ki alkotta az Éjjeli őrség című festményt?",
        answers: [
          "A: Vincent van Gogh",
          "B: Rembrandt",
          "C: Johannes Vermeer",
          "D: Sandro Botticelli",
        ],
        rightAnswerIndex: 2,
        halving: [3, 2],
      },
      6: {
        question: "Melyik ország hivatalos nyelve az arab?",
        answers: [
          "A: Irak",
          "B: Marokkó",
          "C: Egyesült Arab Emirátusok",
          "D: Szaúd-Arábia",
        ],
        rightAnswerIndex: 3,
        halving: [3, 1],
      },
      7: {
        question: "Melyik nagyvilágvárosban található a Világkerék?",
        answers: [
          "A: Párizs",
          "B: London",
          "C: New York",
          "D: Dubai",
        ],
        rightAnswerIndex: 2,
        halving: [3, 2],
      },
    },
    {
      1: {
        question: "Melyik városban található a híres Halászbástya?",
        answers: [
          "A: Bécs",
          "B: Budakeszi",
          "C: Budapest",
          "D: London",
        ],
        rightAnswerIndex: 3,
        halving: [3, 1],
      },
      2: {
        question: "Ki volt a kubai forradalom vezetője?",
        answers: [
          "A: Fidel Castro",
          "B: Hugo Chávez",
          "C: Salvador Allende",
          "D: Juan Perón",
        ],
        rightAnswerIndex: 1,
        halving: [3, 1],
      },
      3: {
        question: "Melyik növénytől nyerik a teát?",
        answers: [
          "A: Kávéból",
          "B: Szőlőből",
          "C: Kamillából",
          "D: Teafából",
        ],
        rightAnswerIndex: 4,
        halving: [2, 1],
      },
      4: {
        question: "Mi a világ legnagyobb óceánja?",
        answers: [
          "A: Atlanti-óceán",
          "B: Indiai-óceán",
          "C: Csendes-óceán",
          "D: Északi-sarki-óceán",
        ],
        rightAnswerIndex: 3,
        halving: [3, 1],
      },
      5: {
        question: "Melyik város Európa legnagyobb városa?",
        answers: [
          "A: Párizs",
          "B: London",
          "C: Berlin",
          "D: Madrid",
        ],
        rightAnswerIndex: 2,
        halving: [3, 2],
      },
      6: {
        question: "Melyik földrész a legnagyobb területű?",
        answers: [
          "A: Afrika",
          "B: Ázsia",
          "C: Ausztrália",
          "D: Dél-Amerika",
        ],
        rightAnswerIndex: 2,
        halving: [3, 2],
      },
      7: {
        question: "Ki írta a Don Quijote című regényt?",
        answers: [
          "A: William Shakespeare",
          "B: Leo Tolstoy",
          "C: Victor Hugo",
          "D: Cervantes",
        ],
        rightAnswerIndex: 4,
        halving: [1, 2],
      },
    },
    {
      1: {
        question: "Melyik országban található a Notre-Dame katedrális?",
        answers: [
          "A: Spanyolország",
          "B: Anglia",
          "C: Olaszország",
          "D: Franciaország",
        ],
        rightAnswerIndex: 4,
        halving: [1, 2],
      },
      2: {
        question: "Melyik földrészen található a Szahara sivatag?",
        answers: [
          "A: Afrika",
          "B: Ázsia",
          "C: Ausztrália",
          "D: Észak-Amerika",
        ],
        rightAnswerIndex: 1,
        halving: [1, 2],
      },
      3: {
        question: "Melyik növényt nevezik a virágok királynőjének?",
        answers: [
          "A: Ibolya",
          "B: Tulipán",
          "C: Rózsa",
          "D: Levendula",
        ],
        rightAnswerIndex: 3,
        halving: [1, 3],
      },
      4: {
        question: "Melyik város Európa legnagyobb városa?",
        answers: [
          "A: Párizs",
          "B: London",
          "C: Berlin",
          "D: Madrid",
        ],
        rightAnswerIndex: 2,
        halving: [2, 3],
      },
      5: {
        question: "Melyik város az olasz pizza születési helye?",
        answers: [
          "A: Firenze",
          "B: Róma",
          "C: Velence",
          "D: Napoli",
        ],
        rightAnswerIndex: 4,
        halving: [2, 1],
      },
      6: {
        question: "Melyik a világ legmagasabb hegye?",
        answers: [
          "A: K2",
          "B: Mont Blanc",
          "C: Mount Everest",
          "D: Kilimandzsáró",
        ],
        rightAnswerIndex: 3,
        halving: [3, 1],
      },
      7: {
        question: "Melyik évben volt az első ember a Holdon?",
        answers: [
          "A: 1957",
          "B: 1961",
          "C: 1969",
          "D: 1973",
        ],
        rightAnswerIndex: 3,
        halving: [3, 1],
      },
    },
    {
      1: {
        question: "Milyen ital az Old Fashioned?",
        answers: [
          "A: Gin alapú",
          "B: Rum alapú",
          "C: Whiskey alapú",
          "D: Vodka alapú",
        ],
        rightAnswerIndex: 3,
        halving: [3, 1],
      },
      2: {
        question: "Milyen ital az Aperol Spritz?",
        answers: [
          "A: Gin alapú",
          "B: Rum alapú",
          "C: Tequila alapú",
          "D: Aperol alapú",
        ],
        rightAnswerIndex: 4,
        halving: [2, 1],
      },
      3: {
        question: "Melyik koktél alapja a tequila, a lime lé és a Triple sec likőr?",
        answers: [
          "A: Margarita",
          "B: White Russian",
          "C: Old Fashioned",
          "D: Bloody Mary",
        ],
        rightAnswerIndex: 1,
        halving: [2, 1],
      },
      4: {
        question: "Milyen híres zongoraművész született Kecskeméten?",
        answers: [
          "A: Bartók Béla",
          "B: Liszt Ferenc",
          "C: Kodály Zoltán",
          "D: Dohnányi Ernő",
        ],
        rightAnswerIndex: 4,
        halving: [2, 1],
      },
      5: {
        question: "Melyik évszázadban alapították Kecskemétet?",
        answers: [
          "A: 10. század",
          "B: 12. század",
          "C: 14. század",
          "D: 16. század",
        ],
        rightAnswerIndex: 4,
        halving: [2, 1],
      },
      6: {
        question: "Milyen építészeti stílusban épült a kecskeméti városháza?",
        answers: [
          "A: reneszánsz",
          "B: barokk",
          "C: klasszicista",
          "D: art deco",
        ],
        rightAnswerIndex: 3,
        halving: [3, 1],
      },
      7: {
        question: "Melyik híres színész született Kecskeméten?",
        answers: [
          "A: Karinthy Frigyes",
          "B: Sinkovits Imre",
          "C: Reviczky Gábor",
          "D: Latinovits Zoltán",
        ],
        rightAnswerIndex: 2,
        halving: [3, 2],
      },
    },
    {
      1: {
        question: "Hol található a kecskeméti állatkert?",
        answers: [
          "A: a belvárosban",
          "B: a város szélén",
          "C: az erdőben",
          "D: a Tisza partján",
        ],
        rightAnswerIndex: 2,
        halving: [3, 2],
      },
      2: {
        question: "Melyik épület a híres turisztikai látványosság Kecskeméten?",
        answers: [
          "A: Cifrapalota",
          "B: városháza",
          "C: katolikus templom",
          "D: sportcsarnok",
        ],
        rightAnswerIndex: 1,
        halving: [3, 2],
      },
      3: {
        question: "Milyen régióban található Kecskemét?",
        answers: [
          "A: Észak-Magyarország",
          "B: Dél-Magyarország",
          "C: Nyugat-Magyarország",
          "D: Közép-Magyarország",
        ],
        rightAnswerIndex: 4,
        halving: [1, 2],
      },
      4: {
        question: "Melyik koktél nevét a színéből kapta?",
        answers: [
          "A: Blue Hawaii",
          "B: Bloody Mary",
          "C: Long Island Iced Tea",
          "D: Pina Colada",
        ],
        rightAnswerIndex: 1,
        halving: [1, 2],
      },
      5: {
        question: "Melyik gasztronómiai specialitás híres Kecskeméten?",
        answers: [
          "A: halászlé",
          "B: gulyásleves",
          "C: savanyú káposzta",
          "D: paprikás csirke",
        ],
        rightAnswerIndex: 4,
        halving: [1, 2],
      },
      6: {
        question: "Melyik koktélban van leggyakrabban jelen a mentalevél?",
        answers: [
          "A: Daiquiri",
          "B: Mojito",
          "C: Margarita",
          "D: Sex on the Beach",
        ],
        rightAnswerIndex: 2,
        halving: [3, 2],
      },
      7: {
        question: "Melyik koktélban van jelen a legtöbb koffein?",
        answers: [
          "A: White Russian",
          "B: Espresso Martini",
          "C: Old Fashioned",
          "D: Daiquiri",
        ],
        rightAnswerIndex: 2,
        halving: [3, 2],
      },
    }
  ];
  const prizes = [
    "2 shot",
    "4 pohár sör",
    "4 shot",
    "2 shot",
    "4 hosszúlépés",
    "8 shot",
    "12 shot",
  ];

  // LEJÁR AZ IDO HANDLER
  useEffect(() => {
    if (elapsedTime == 60) {
      setElapsedTime(0);
      setEnd(true);
      setPrizeIndex(0);
      suspenseSound.pause();
      loseSound.load();
      loseSound.play();
    }
  }, [elapsedTime]);

  const currentQuestions = questions[currentTeamIndex];
  const currentQuestion = currentQuestions[currentQuestionIndex];

  // COUNTER 60s
  useEffect(() => {
    let timerId = 0;
    if (isStart) {
      timerId = setInterval(() => {
        if (elapsedTime !== 60 && !isAnswerClicked && !isTele) {
          setElapsedTime((prevTime) => prevTime + 1);
        } else {
          setElapsedTime(elapsedTime);
        }
      }, 1000);
    }

    return () => {
      clearInterval(timerId);
    };
  }, [elapsedTime, isStart, isAnswerClicked, isTele]);

  //COUNTER 30s -- Phone help
  useEffect(() => {
    let timerId = 0;
    if (isPhoneStart) {
      timerId = setInterval(() => {
        if (elapsedTimePhone !== 30) {
          setElapsedTimePhone((prevTime) => prevTime + 1);
        } else {
          setElapsedTimePhone(elapsedTimePhone);
        }
      }, 1000);
    }

    return () => {
      clearInterval(timerId);
    };
  }, [elapsedTimePhone, isPhoneStart]);

  // START SUSPENSE SOUND HANDLER
  useEffect(() => {
    if (isStart) {
      suspenseSound.load();
      suspenseSound.play();
      setTimeout(() => {
        suspenseSound.pause();
      }, 60000);
    }
  }, [isStart]);

  // Answer handler
  function handleAnswer(index) {
    setIsAnswerClicked(true);
    if (currentQuestion.rightAnswerIndex === index + 1) {
      setTimeout(() => {
        winSound.load();
        winSound.play();
        suspenseSound.pause();
      }, 3000);
      setTimeout(() => {
        setDisplayFlag(true);
        setPrizeIndex((prev) => prev + 1);
        winSound.pause();
        flagSound.load();
        flagSound.play();
        setTimeout(() => {
          flagSound.pause();
        }, 4000);
      }, 7000);
    } else {
      setTimeout(() => {
        setEnd(true);
        setPrizeIndex(0);
        suspenseSound.pause();
        loseSound.load();
        loseSound.play();
      }, 5000);
    }
  }

  // NEXT QUESTION HANDLER
  function nextQuestion() {
    setCurrentQuestionIndex((prev) => prev + 1);
    setElapsedTime(0);
    setDisplayFlag(false);
    setIsHalving(false);
    setIsAnswerClicked(false);
    suspenseSound.load();
    suspenseSound.play();
  }

  // Next team handler
  function restartNext() {
    setTeamQuestionsCounter((prev) => prev + 1);
    if (questions.length !== teamQuestionsCounter) {
      setCurrentTeamIndex((prev) => prev + 1);
    }
    setCurrentQuestionIndex(1);
    setElapsedTime(0);
    setEnd(false);
    setIsStart(false);
    setIsAnswerClicked(false);
    setDisplayFlag(false);
    setIsAudience(false);
    setIsTele(false);
    setIsHalving(false);
    setHalvingBackg(false);
    setPrizeIndex(0);
    setElapsedTimePhone(0);
    setIsPhoneStart(false);
  }

  // HALVING HANDLER
  function halving() {
    if (isHalving) {
      delete currentQuestion.answers[currentQuestion.halving[0]];
      delete currentQuestion.answers[currentQuestion.halving[1]];
    }
  }

  return (
    <>
      <Head>
        <title>Legyen Ön is Ittas! | NJE</title>
        <meta name="description" content="Legyen Ön is Ittas! | NJE" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/beer.png" />
      </Head>
      <main className="cursor-default">
        <div className="text-white text-[40px] flex justify-center items-center gap-10">
          <div>
            <Image src="/hoklogo.png" width={200} height={200} alt="" />
          </div>
          <div>
            <Image src="/kontoslogo.svg" width={200} height={200} alt="" />
          </div>
        </div>
        {/* IDE LEHET KELL NEGATIV MARGIN */}
        <div className="-mt-64">
          <div className="flex justify-between">
            <Prizes prizes={prizes} prizeIndex={prizeIndex} />
            <Helpers
              halving={halving()}
              audience={setIsAudience}
              isAudience={isAudience}
              tele={setIsTele}
              isTele={isTele}
              isHalving={isHalving}
              setHalving={setIsHalving}
              setHalvingBackg={setHalvingBackg}
              isHalvingBackg={isHalvingBackg}
              setIsPhoneStart={setIsPhoneStart}
              elapsedTimePhone={elapsedTimePhone}
            />
          </div>
          <div className="grid justify-center">
            {isEnd && <Lost restartHandler={restartNext} />}
            {!isStart && <Start startHandler={setIsStart} isStart={isStart} />}
            {displayFlag && prizes.length !== prizeIndex && (
              <Next
                nextQuestion={nextQuestion}
                prizes={prizes}
                prizeIndex={prizeIndex}
                restartNext={restartNext}
              />
            )}
            {prizes.length === prizeIndex && (
              <Win
                prizes={prizes}
                prizeIndex={prizeIndex}
                restartNext={restartNext}
              />
            )}
            {questions.length + 1 === teamQuestionsCounter && <End />}
            <div className="flex justify-center items-center text-white">
              <p className="text-[72px]">{60 - elapsedTime}</p>
            </div>
            <Questions q={currentQuestion.question} />
            <div className="grid grid-cols-2 gap-5">
              {currentQuestion.answers.map((answer, index) => {
                return (
                  <Answer
                    key={index}
                    a={answer}
                    i={index}
                    rightAnswerIndex={currentQuestion.rightAnswerIndex}
                    handleAnswer={handleAnswer}
                  />
                );
              })}
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
