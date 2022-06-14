var velikost = 31

var matrix = new Array(velikost);
var stevci = new Array(velikost);

let finalOutput = new Array(11);

var xhr = new XMLHttpRequest();

let indeks = 0; // indeks trenutnega besedila

function initializeMatrices() {
    // zgenerira glavno matriko
    for (var i = 0; i < matrix.length; i++) {
        matrix[i] = new Array(velikost);
        for (var j = 0; j < matrix[i].length; j++) {
            matrix[i][j] = 0;
        }
    }

    // zgenerira matriko, ki steje kolikokrat se pojavi doloceno zaporedje crk
    for (var i = 0; i < stevci.length; i++) {
        stevci[i] = new Array(velikost);
        for (var j = 0; j < stevci[i].length; j++) {
            stevci[i][j] = 0;
        }
    }    
}

initializeMatrices();

// deli vrednosti v matriki matrix z stevci v matriki stevci
function deli(A, B) {
    for (var i = 0; i < A.length; i++) {
        for (var j = 0; j < A[i].length; j++) {
            if (B[i][j] != 0)
                A[i][j] = A[i][j]/B[i][j];
            else
                A[i][j] = 0;
        }
    }

    return A;
}

// vrne index matrike, ki predstvalja znak c
function getIndex(c) {
    c = c.toLowerCase();
    if(c === " ")
        return 26;
    if (c === ".")
        return 27;
    if (c === ",")
        return 28;
    if(c === "\"")
        return 29;
    if(c === "'")
        return 30;
    
    return c.charCodeAt(0)-'a'.charCodeAt(0);
}

// izpiše matriko
function print(callback) {
    deli(matrix, stevci);

    let log = [...matrix];
    console.log(log);

    if (indeks == 0) string = "[";
    else string = ""

    for (var i = 0; i < matrix.length; i++) {
        for (var j = 0; j < matrix[i].length; j++) {
            string = string.concat(matrix[i][j]);
            if (i != matrix.length-1 || j != matrix.length-1) {
                string = string.concat(", ");
            }
        }
    }

    if (indeks < finalOutput.length-1) string = string.concat("; ");
    else string = string.concat("]");

    callback(string);
}

var d = new Date();

var pcas = 0; // prejsnji cas
var pchar = ''; // prejsnji znak
var zchar = ''; // trenutni znak
var prvic = true;

// Primer 1

let text1 = "There is a theory which states that if ever anyone discovers exactly what the Universe is for and why it is here, it will instantly disappear and be replaced by something even more bizarre and inexplicable. There is another theory which states that this has already happened."
let text2 = "\"Space,\" it says, \"is big. Really big. You just won't believe how vastly, hugely, mindbogglingly big it is. I mean, you may think it's a long way down the road to the chemist's, but that's just peanuts to space.\""
let text3 = "Forrest Gump is a simple man with a low I.Q. but good intentions. He is running through childhood with his best and only friend Jenny. His mama teaches him the ways of life and leaves him to choose his destiny. Forrest joins the army for service in Vietnam, finding new friends called Dan and Bubba.";
let text4 = "In ASCII, a particular numerical value is given to different characters and symbols for computers to store and manipulate. Besides ASCII there are many other encodings that are in use, some of them are EBICDIC, Mac OS Roman, MIK, ISCII, TSCII, VISCII, GBK, HKSCS, Unicode, ANSEL and many other.";
let text5 = "Mosasauria is a clade of essentially Late Cretaceous marine reptiles. Although well known by several nicely preserved specimens, phylogenetic relationships of mosasaurians within Squamata are still a matter of intense debate. Most of the works discussing the relationships of mosasaurians in global contexts of squamates were based mainly on more derived taxa.";
//let text6 = "Quasi tutto il territorio della Germania subisce l influsso dei venti atlantici provenienti da ovest cio fa si che il clima sia piu umido mano a mano che ci si spinge da sud verso nord. Le zone dal clima piu umido sono le pianure a ridosso dei Paesi Bassi e le regioni affacciate sul Mare del Nord, tra cui la penisola dello Jutland, che hanno un clima oceanico.";
let text6 = "\"You know,\" said Arthur, \"it's at times like this, when I'm trapped in a Vogon airlock with a man from Betelgeuse, and about to die of asphyxiation in deep space that I really wish I'd listened to what my mother told me when I was young.\" \"Why, what did she tell you.\" \"I don't know, I didn't listen.\"";
let text7 = "Isle of Man TT race organisers have confirmed that they named the wrong French sidecar competitor to have died in an incident on Saturday. In a statement, they said rider Cesar Chanal had now been confirmed as having died in the crash during lap one of the first sidecar race on the Mountain Course.";
let text8 = "Volcanos in the deep sea are much more difficult to locate than those at ground level indeed, we know more about the surface of the Moon than we do about the ocean floor. But Hunga Tonga eruption has galvanised the scientific community and underscored the need for further exploration of this uncharted realm.";
let text9 = "According to Martin Krzywinski, a Canadian specialist in bioinformatics, who should know about difficult to type words, given his last name, these are some of the hardest words to type on a standard QWERTY keyboard pizazz, piazzas, pizzas, suburban, assuming, obstinance, foramens.";
let text10 = "The Nagoya University team comprising Professor Takaya Arita, Yusuke Yamato, and Reiji Suzuki of the Graduate School of Informatics created an artificial neural network model that performed the delayed matching to sample task and analyzed how it behaved.";
let text11 = "Among breast cancers without human epidermal growth factor receptor two amplification, overexpression, or both, a large proportion express low levels of HER two that may be targetable. Currently available HER two directed therapies have been ineffective in patients with these HER two low cancers.";

let texts = [text1, text2, text3, text4, text5, text6, text7, text8, text9, text10, text11];

let z1 = false;

let before1 = ""; // ne obarvan text
let correct1 = ""; // obarvan pravilno napisan text

function intialize(i) {
    before1 = texts[i];
    correct1 = "";

    pcas = 0;
    pchar = '';
    zchar = '';
    prvic = true;

    initializeMatrices();

    if (i == finalOutput.length-1) {
        document.getElementById("naslednji").style.display = "none";
        document.getElementById("konec").style.display = "inline-block";
    }

    document.getElementById("primer").innerHTML = indeks+1;
    document.getElementById("naslednji").disabled = "true";

    document.getElementById("area1").value = "";
    document.getElementById("correct1").innerHTML = "";
    document.getElementById("before1").innerHTML = before1;
}

intialize(0);

function konec1() {
    print((out) =>  {
        finalOutput[indeks] = out;
        console.log(finalOutput);
    });

    z1 = false;
    pcas = 0;
    pchar = '';
    zchar = '';
    prvic = true;

    let finalOutputString = "";

    for (let i = 0; i < finalOutput.length; i++) {
        finalOutputString = finalOutputString + finalOutput[i];
    }

    let username = document.getElementById("username").value;

    if (username == "") username = "user" + Math.floor(Math.random() * 10001);

    xhr.open("POST", "/matematicno-modeliranje/add", true);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.send(JSON.stringify({
        name: username,
        value: finalOutputString
    }));

    document.getElementById("area1").value = "";

    document.getElementById("test").style.display = "none";
    document.getElementById("thanks").style.display = "block";
}

function naslednji() {
    print((out) => {
        finalOutput[indeks] = out;

        console.log(finalOutput);

        indeks++;
        intialize(indeks);
    });
}

function zacetek1() {
    z1 = true;
    before1 = texts[indeks];
    correct1 = "";

    document.getElementById("area1").value = "";
    document.getElementById("correct1").innerHTML = "";
    document.getElementById("before1").innerHTML = before1;

    document.getElementById("zacetek").disabled = "true";
}

document.getElementById("area1").addEventListener("keypress", (event) => {
    if (before1.charAt(0) === event.key) {
        if (z1) {
            if (!prvic) {
                zchar = event.key;
                d = new Date();
                zcas = d.getTime();
                matrix[getIndex(pchar)][getIndex(zchar)] = matrix[getIndex(pchar)][getIndex(zchar)] + zcas-pcas;
                stevci[getIndex(pchar)][getIndex(zchar)]++;
                pcas = zcas;
                pchar = zchar;
            } else {
                pchar = event.key;
                prvic = false;
                d = new Date();
                pcas = d.getTime();
            }
        }

        correct1 += before1.charAt(0);
        document.getElementById("correct1").innerHTML = correct1;

        before1 = before1.slice(0, 0) + before1.slice(1);
        document.getElementById("before1").innerHTML = before1;

        if (before1.length == 0 && z1) document.getElementById("naslednji").disabled = "";
    }
})