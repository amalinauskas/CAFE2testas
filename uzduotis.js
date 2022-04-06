// Back-end’o URL: http://18.193.250.181:1337

// People: /api/people/
// Countries: /api/countries/
// Activities: /api/activities

// People POST:
// {data: {
// first_name, last_name, email, country (ID), activities (array of IDs)
// }}

// Du puslapiai:

//  Registracijos forma klientui (index.html, index.css, index.js);
// Puslapio dešinė pusė keičiasi dinamiškai (t.y. JS keičia);
// Pirma išoka checkbox’ai, kuriuos vartotojas gali pasirinkti – informaciją išsaugome į localStorage.
// Antra dalis, kurioje vartotojas suveda savo duomenis, pasiimame info iš localStorage ir siunčiame į back-end‘ą – išsaugome ID.
// Trečia dalis – pagal ID išsiunčiame query į back-end‘ą ir atvaizduojame gautus duomenis ir paklausiame ar jie teisingi – jei ne, ištrinam duomenis.
// Ketvirta dalis – success message.
//  Dashboard (dashboard.html, dashboard.css, dashboard.js).
// Viršuje, keturi statistikos taškai:

// Kiek vartotojų – random skaičius nuo 5000 iki 10000.
// Kiek registracijų – count‘as visų ‚people‘ iš back-end‘o.
// Signup Countries – suskaičiuojame kiek skirtingų šalių turime pagal ‚people‘ back-end‘e.
// Names not capitalized – suskaičiuojame kiek yra registruotų vartotojų, kurių vardas/ar pavardė prasideda iš mažosios.

// Žemiau – blokas su visais people. Viršuje – search, kuris veikia onTyping (filtruoja pagal back-end‘ą); šone – filtravimas pagal šalį (filtruoja back-end‘e). Turi veikti net pasirinkus šalį ir pradėjus searchint (t.y. complex filtering su dviem laukeliais).

// Puslapiai turi būti:

//  Mobile-friendly;
//  Error-proof (tiek client, tiek server errorai turi būti pagauti ir atvaizduoti);
//  Zero-proof (jei duomenų nėra – atvaizduojame irgi teisingai).
