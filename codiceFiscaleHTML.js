function CodiceFiscale(cognome, nome, sesso, lNascita, provincia, giorno, mese, anno) {
    let CodFiscale = "";
    let consonanti = /[bcdfghjklmnpqrstvwxyz]/gi
    let vocali = /[aeiou]/gi
    const data = require("./CodiciComuni.json");

    //Calcolo delle prime tre cifre (cognome)
    let p1 = cognome.match(consonanti);
    switch (true) {
        case p1.length === 2: {
            let p1_v = cognome.match(vocali);
            p1 = (p1[0] + p1[1] + p1_v[0]).toUpperCase();
            break;
        }

        case p1.length < 2: {
            let p1_v = cognome.match(vocali);
            p1 = (p1[0] + p1_v[0] + p1_v[1]).toUpperCase();
            break;
        }

        default: {
            p1 = (p1[0] + p1[1] + p1[2]).toUpperCase();
            break;
        }
    }

    //Calcolo delle seconde tre cifre (nome)
    let p2 = nome.match(consonanti);
    switch (true) {
        case p2.length === 2: {
            let p2_v = nome.match(vocali);
            p2 = (p2[0] + p2[1] + p2_v[0]).toUpperCase();
            break;
        }

        case p2.length < 2: {
            let p2_v = nome.match(vocali);
            p2 = (p2[0] + p2_v[0] + p2_v[1]).toUpperCase();
            break;
        }

        case p2.length >= 4: {
            p2 = (p2[0] + p2[2] + p2[3]).toUpperCase();
            break;
        }

        default: {
            p2 = (p2[0] + p2[1] + p2[2]).toUpperCase();
            break;
        }
    }

    //Calcolo delle terze tre cifre (mese, anno)
    let p3 = (anno[2] + anno[3]).toUpperCase();
    mese = mese.toUpperCase();
    CodFiscale = p1 + p2 + p3;

    let objMese = {
        "1": "A",
        "2": "B",
        "3": "C",
        "4": "D",
        "5": "E",
        "6": "H",
        "7": "L",
        "8": "M",
        "9": "P",
        "10": "R",
        "11": "S",
        "12": "T",
    }
    CodFiscale += objMese[mese];

    //Calcolo delle quarte due cifre (giorno, sesso)
    let p4 = giorno;
    if (sesso === "f") {
        p4 = parseInt(p4);
        p4 += 40;
        p4 = p4.toString();
    }

    if (giorno > 1 && giorno < 9) {
        CodFiscale += "0" + p4;
    } else {
        CodFiscale += p4;
    }

    //Calcolo delle quinte quattro cifre (comune)
    let p5;
    for(let i = 0; i < data.length; i++) {
        if(data[i].COMUNE === lNascita.toUpperCase()) {
            p5 = data[i].ID;
        }
    }
    CodFiscale += p5;

    //Calcolo della sedicesima cifra (carattere di controllo)
    let p6;
    let p6_pari = [];
    for(let i = 1; i < CodFiscale.length; i = i + 2) { //Caratteri del codice in posizione pari (0, 2, 4, 6, 8, 10, 12, 14)
        p6_pari.push(CodFiscale[i])
    }

    let p6_dispari = [];
    for(let j = 0; j < CodFiscale.length; j = j + 2) { //Caratteri del codice in posizione dispari (1, 3, 5, 7, 9, 11, 13)
        p6_dispari.push(CodFiscale[j])
    }

    let count_pari = 0;
    for(let i = 0; i < p6_pari.length; i++) {
        //Pari
        let objCodPari = {
            "0": 0,
            "1": 1,
            "2": 2,
            "3": 3,
            "4": 4,
            "5": 5,
            "6": 6,
            "7": 7,
            "8": 8,
            "9": 9,
            "A": 0,
            "B": 1,
            "C": 2,
            "D": 3,
            "E": 4,
            "F": 5,
            "G": 6,
            "H": 7,
            "I": 8,
            "J": 9,
            "K": 10,
            "L": 11,
            "M": 12,
            "N": 13,
            "O": 14,
            "P": 15,
            "Q": 16,
            "R": 17,
            "S": 18,
            "T": 19,
            "U": 20,
            "V": 21,
            "W": 22,
            "X": 23,
            "Y": 24,
            "Z": 25,
        }
        count_pari += objCodPari[p6_pari[i]];
    }

    let count_dispari = 0;
    for(let i = 0; i < p6_dispari.length; i++) {
        //Dispari
        let objCodDispari = {
            "0": 1,
            "1": 0,
            "2": 5,
            "3": 7,
            "4": 9,
            "5": 13,
            "6": 15,
            "7": 17,
            "8": 19,
            "9": 21,
            "A": 1,
            "B": 0,
            "C": 5,
            "D": 7,
            "E": 9,
            "F": 13,
            "G": 15,
            "H": 17,
            "I": 19,
            "J": 21,
            "K": 2,
            "L": 4,
            "M": 18,
            "N": 20,
            "O": 11,
            "P": 3,
            "Q": 6,
            "R": 8,
            "S": 12,
            "T": 14,
            "U": 16,
            "V": 10,
            "W": 22,
            "X": 25,
            "Y": 24,
            "Z": 23,
        }
        count_dispari += objCodDispari[p6_dispari[i]];
    }
    p6 = (count_dispari + count_pari) % 26;
    p6 = Math.floor(p6);

    let objCodControllo = {
        "0": "A",
        "1": "B",
        "2": "C",
        "3": "D",
        "4": "E",
        "5": "F",
        "6": "G",
        "7": "H",
        "8": "I",
        "9": "J",
        "10": "K",
        "11": "L",
        "12": "M",
        "13": "N",
        "14": "O",
        "15": "P",
        "16": "Q",
        "17": "R",
        "18": "S",
        "19": "T",
        "20": "U",
        "21": "V",
        "22": "W",
        "23": "X",
        "24": "Y",
        "24": "Z",
    }
    CodFiscale += objCodControllo[p6];
    return CodFiscale
}
