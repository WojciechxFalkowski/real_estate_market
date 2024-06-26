import { Flat } from "~/composables/useFlat"

export default defineEventHandler(async (event): Promise<Flat[]> => {
    return [
        {
            id: 1,
            title: "Warszawa, Wola, ul. Wolska 113",
            description: "Apartament z widokiem na skyline Warszawy",
            image: 'https://k2am.pl/wp-content/uploads/2024/01/salon.jpg',
            url: '2-pokoje-73m2-bobrowiecka-mokotów-sielce',
            flatDetails: [
                {
                    id: 'area',
                    title: "Powierzchnia",
                    description: "50 m²",
                },
                {
                    id: 'floor',
                    title: "Piętro",
                    description: "10 / 11",
                },
                {
                    id: 'bedroom',
                    title: "Sypialnie",
                    description: "2",
                },
                {
                    id: 'rooms',
                    title: "Pokoje",
                    description: "3",
                },
                {
                    id: 'year_of_construction',
                    title: "Rok budowy",
                    description: "2022",
                },
                {
                    id: 'transaction_type',
                    title: "Apartament",
                    description: "Na wynajem",
                },
            ],
            location: "Żoliborz",
            images: ['https://k2am.pl/wp-content/uploads/2024/01/salon.jpg', 'https://k2am.pl/wp-content/uploads/2024/01/biuro.jpg', 'https://k2am.pl/wp-content/uploads/2024/01/korytarz2.jpg', 'https://k2am.pl/wp-content/uploads/2024/01/sypialnia3.jpg', 'https://k2am.pl/wp-content/uploads/2024/01/kuchnia.jpg', 'https://k2am.pl/wp-content/uploads/2024/01/korytarz1.jpg', 'https://k2am.pl/wp-content/uploads/2024/01/toaleta.jpg', 'https://k2am.pl/wp-content/uploads/2024/01/salon.jpg'],
            price: '5 789',
            currency: 'PLN',
            pricePerMeter: '45',
            tiptapHTML: `<p><strong>LUKSUSOWY APARTAMENT W UNIQUE TOWER WYKOŃCZONY POD KLUCZ</strong></p><br/><p><strong><em>Trzy sypialnie | W pełni umeblowany | Wysokie piętro | Luksusowe wykończenie | Wysoki standard | Klimatyzacja</em></strong><br><br><strong>ROZKŁAD I STANDARD:<br></strong></p><p>Apartament składa się z:<br>* Przestronnego salonu z otwartą kuchnią i jadalnią,<br>* trzech sypialni,<br>* trzech łazienek,<br>* reprezentacyjnego holu z garderobą.<br></p><p>Apartament zaprojektowany przez architekta, jego głównymi zaletami jest wysoka jakość wykończenia oraz uniwersalny styl. Ponadczasowy design, idealnie skomponowane materiały, kolorystyka.&nbsp;Wyposażony został w klimatyzację, w pełni umeblowany i wyposażony w zastawę stołową, pościel, ręczniki, gotowy do wprowadzenia od zaraz.<br></p><p>Wykończenie z najwyższą dbałością o jakość.<br></p><p><strong><br>INWESTYCJA:</strong><br></p><p>Unique Tower to kompleks apartamentowców, zlokalizowany na bliskiej Woli, przy ul. Grzybowskiej 51. W budynku o 29 kondygnacjach poza apartamentami znajduje się szereg udogodnień- na parterze budynku mieści się przestrzeń usługowo-handlowa, najwyższej klasy restauracja, strefa SPA i fitness oraz kompleks konferencyjno-biznesowy.</p><p>Designerskie wnętrza części wspólnych i 5-gwiazdkowy standard apartamentów to gwarancja komfortu, prestiżu oraz najwyższej jakości.<br></p><p><strong><br>LOKALIZACJA:</strong></p><p>Ulica Grzybowska położona jest w samym sercu Warszawy.<br>Pieszy dystans do wszystkich środków komunikacji miejskiej, w tym stacji przesiadkowej metra M1/M2 Świętokrzyska.</p><p>Centralna lokalizacja wraz z doskonałą infrastrukturą handlowo – usługową dają duży komfort mieszkania, tuż obok znajdują się takie punkty usługowe jak: apteka, sklepy spożywcze, salon fryzjerko- kosmetyczny, banki. W pobliżu także: kina, teatry, Ogród Saski, sklepy, piekarnie, kawiarnie, biurowce, pięciogwiazdkowe hotele.</p><p>Dwa kroki do Dworca Centralnego i CH Złote Tarasy. Okolica pełna najbardziej znanych i cenionych w Warszawie restauracji.<br></p><p><strong><br>INFORMACJE DODATKOWE:</strong></p><ul><li><p>Wymagana jest kaucja.</p></li><li><p>Miejsce parkingowe płatne dodatkowo oraz zaliczki na media.</p></li><li><p>Do kwoty najmu należy doliczyć 23% podatku VAT.</p></li></ul><p><strong><br>Serdecznie zapraszam na prezentację!</strong></p>`,
        },
        {
            id: 2,
            title: "Warszawa, Mokotów, ul. Puławska 27",
            description: "Mokotów | 4 pokoje | Taras na dachu",
            image: 'https://k2am.pl/wp-content/uploads/2024/01/IMG_5556.jpg',
            url: '2-pokoje-51-m2-pl.-niemena-żoliborz-artystyczny',
            flatDetails: [
                {
                    id: 'area',
                    title: "Powierzchnia",
                    description: "130 m²",
                },
                {
                    id: 'floor',
                    title: "Piętro",
                    description: "13 / 14",
                },
                {
                    id: 'bedroom',
                    title: "Sypialnie",
                    description: "3",
                },
                {
                    id: 'rooms',
                    title: "Pokoje",
                    description: "4",
                },
                {
                    id: 'year_of_construction',
                    title: "Rok budowy",
                    description: "2018",
                },
                {
                    id: 'transaction_type',
                    title: "Apartament",
                    description: "Na wynajem",
                },
            ],
            location: "Żoliborz",
            images: ['https://k2am.pl/wp-content/uploads/2024/01/salon.jpg', 'https://k2am.pl/wp-content/uploads/2024/01/biuro.jpg', 'https://k2am.pl/wp-content/uploads/2024/01/korytarz2.jpg', 'https://k2am.pl/wp-content/uploads/2024/01/sypialnia3.jpg', 'https://k2am.pl/wp-content/uploads/2024/01/kuchnia.jpg', 'https://k2am.pl/wp-content/uploads/2024/01/korytarz1.jpg', 'https://k2am.pl/wp-content/uploads/2024/01/toaleta.jpg', 'https://k2am.pl/wp-content/uploads/2024/01/salon.jpg'],
            price: '1 233',
            currency: 'PLN',
            pricePerMeter: '51',
            tiptapHTML: `<p><strong>LUKSUSOWY APARTAMENT W UNIQUE TOWER WYKOŃCZONY POD KLUCZ</strong></p><br/><p><strong><em>Trzy sypialnie | W pełni umeblowany | Wysokie piętro | Luksusowe wykończenie | Wysoki standard | Klimatyzacja</em></strong><br><br><strong>ROZKŁAD I STANDARD:<br></strong></p><p>Apartament składa się z:<br>* Przestronnego salonu z otwartą kuchnią i jadalnią,<br>* trzech sypialni,<br>* trzech łazienek,<br>* reprezentacyjnego holu z garderobą.<br></p><p>Apartament zaprojektowany przez architekta, jego głównymi zaletami jest wysoka jakość wykończenia oraz uniwersalny styl. Ponadczasowy design, idealnie skomponowane materiały, kolorystyka.&nbsp;Wyposażony został w klimatyzację, w pełni umeblowany i wyposażony w zastawę stołową, pościel, ręczniki, gotowy do wprowadzenia od zaraz.<br></p><p>Wykończenie z najwyższą dbałością o jakość.<br></p><p><strong><br>INWESTYCJA:</strong><br></p><p>Unique Tower to kompleks apartamentowców, zlokalizowany na bliskiej Woli, przy ul. Grzybowskiej 51. W budynku o 29 kondygnacjach poza apartamentami znajduje się szereg udogodnień- na parterze budynku mieści się przestrzeń usługowo-handlowa, najwyższej klasy restauracja, strefa SPA i fitness oraz kompleks konferencyjno-biznesowy.</p><p>Designerskie wnętrza części wspólnych i 5-gwiazdkowy standard apartamentów to gwarancja komfortu, prestiżu oraz najwyższej jakości.<br></p><p><strong><br>LOKALIZACJA:</strong></p><p>Ulica Grzybowska położona jest w samym sercu Warszawy.<br>Pieszy dystans do wszystkich środków komunikacji miejskiej, w tym stacji przesiadkowej metra M1/M2 Świętokrzyska.</p><p>Centralna lokalizacja wraz z doskonałą infrastrukturą handlowo – usługową dają duży komfort mieszkania, tuż obok znajdują się takie punkty usługowe jak: apteka, sklepy spożywcze, salon fryzjerko- kosmetyczny, banki. W pobliżu także: kina, teatry, Ogród Saski, sklepy, piekarnie, kawiarnie, biurowce, pięciogwiazdkowe hotele.</p><p>Dwa kroki do Dworca Centralnego i CH Złote Tarasy. Okolica pełna najbardziej znanych i cenionych w Warszawie restauracji.<br></p><p><strong><br>INFORMACJE DODATKOWE:</strong></p><ul><li><p>Wymagana jest kaucja.</p></li><li><p>Miejsce parkingowe płatne dodatkowo oraz zaliczki na media.</p></li><li><p>Do kwoty najmu należy doliczyć 23% podatku VAT.</p></li></ul><p><strong><br>Serdecznie zapraszam na prezentację!</strong></p>`,
        },
        {
            id: 3,
            title: "Warszawa, Żoliborz, ul. Słowackiego 19",
            description: "Klasyczne mieszkanie w przedwojennej kamienicy z widokiem na Park Żeromskiego.",
            image: 'https://k2am.pl/wp-content/uploads/2024/01/salon.jpg',
            url: '2-pokoje-39m2-słowackiego-żoliborz',
            flatDetails: [
                {
                    id: 'area',
                    title: "Powierzchnia",
                    description: "39 m²",
                },
                {
                    id: 'floor',
                    title: "Piętro",
                    description: "1/4",
                },
                {
                    id: 'bedroom',
                    title: "Sypialnie",
                    description: "1",
                },
                {
                    id: 'rooms',
                    title: "Pokoje",
                    description: "2",
                },
                {
                    id: 'year_of_construction',
                    title: "Rok budowy",
                    description: "2015",
                },
                {
                    id: 'transaction_type',
                    title: "Apartament",
                    description: "Na wynajem",
                },
            ],

            location: "Praga",
            images: ['https://k2am.pl/wp-content/uploads/2024/01/salon.jpg', 'https://k2am.pl/wp-content/uploads/2024/01/biuro.jpg', 'https://k2am.pl/wp-content/uploads/2024/01/korytarz2.jpg', 'https://k2am.pl/wp-content/uploads/2024/01/sypialnia3.jpg', 'https://k2am.pl/wp-content/uploads/2024/01/kuchnia.jpg', 'https://k2am.pl/wp-content/uploads/2024/01/korytarz1.jpg', 'https://k2am.pl/wp-content/uploads/2024/01/toaleta.jpg', 'https://k2am.pl/wp-content/uploads/2024/01/salon.jpg'],
            price: '4 732',
            currency: 'PLN',
            pricePerMeter: '64',
            tiptapHTML: `<p><strong>LUKSUSOWY APARTAMENT W UNIQUE TOWER WYKOŃCZONY POD KLUCZ</strong></p><br/><p><strong><em>Trzy sypialnie | W pełni umeblowany | Wysokie piętro | Luksusowe wykończenie | Wysoki standard | Klimatyzacja</em></strong><br><br><strong>ROZKŁAD I STANDARD:<br></strong></p><p>Apartament składa się z:<br>* Przestronnego salonu z otwartą kuchnią i jadalnią,<br>* trzech sypialni,<br>* trzech łazienek,<br>* reprezentacyjnego holu z garderobą.<br></p><p>Apartament zaprojektowany przez architekta, jego głównymi zaletami jest wysoka jakość wykończenia oraz uniwersalny styl. Ponadczasowy design, idealnie skomponowane materiały, kolorystyka.&nbsp;Wyposażony został w klimatyzację, w pełni umeblowany i wyposażony w zastawę stołową, pościel, ręczniki, gotowy do wprowadzenia od zaraz.<br></p><p>Wykończenie z najwyższą dbałością o jakość.<br></p><p><strong><br>INWESTYCJA:</strong><br></p><p>Unique Tower to kompleks apartamentowców, zlokalizowany na bliskiej Woli, przy ul. Grzybowskiej 51. W budynku o 29 kondygnacjach poza apartamentami znajduje się szereg udogodnień- na parterze budynku mieści się przestrzeń usługowo-handlowa, najwyższej klasy restauracja, strefa SPA i fitness oraz kompleks konferencyjno-biznesowy.</p><p>Designerskie wnętrza części wspólnych i 5-gwiazdkowy standard apartamentów to gwarancja komfortu, prestiżu oraz najwyższej jakości.<br></p><p><strong><br>LOKALIZACJA:</strong></p><p>Ulica Grzybowska położona jest w samym sercu Warszawy.<br>Pieszy dystans do wszystkich środków komunikacji miejskiej, w tym stacji przesiadkowej metra M1/M2 Świętokrzyska.</p><p>Centralna lokalizacja wraz z doskonałą infrastrukturą handlowo – usługową dają duży komfort mieszkania, tuż obok znajdują się takie punkty usługowe jak: apteka, sklepy spożywcze, salon fryzjerko- kosmetyczny, banki. W pobliżu także: kina, teatry, Ogród Saski, sklepy, piekarnie, kawiarnie, biurowce, pięciogwiazdkowe hotele.</p><p>Dwa kroki do Dworca Centralnego i CH Złote Tarasy. Okolica pełna najbardziej znanych i cenionych w Warszawie restauracji.<br></p><p><strong><br>INFORMACJE DODATKOWE:</strong></p><ul><li><p>Wymagana jest kaucja.</p></li><li><p>Miejsce parkingowe płatne dodatkowo oraz zaliczki na media.</p></li><li><p>Do kwoty najmu należy doliczyć 23% podatku VAT.</p></li></ul><p><strong><br>Serdecznie zapraszam na prezentację!</strong></p>`,
        },
        {
            id: 4,
            title: "Warszawa, Ochota, ul. Grójecka 12",
            description: "Nowoczesny apartament z dwoma sypialniami, idealny dla młodej rodziny.",
            image: 'https://k2am.pl/wp-content/uploads/2024/01/IMG_5556.jpg',
            url: '2-pokoje-73m2-bobrowiecka-mokotów-sielce',
            flatDetails: [
                {
                    id: 'area',
                    title: "Powierzchnia",
                    description: "130 m²",
                },
                {
                    id: 'floor',
                    title: "Piętro",
                    description: "13 / 14",
                },
                {
                    id: 'bedroom',
                    title: "Sypialnie",
                    description: "3",
                },
                {
                    id: 'rooms',
                    title: "Pokoje",
                    description: "4",
                },
                {
                    id: 'year_of_construction',
                    title: "Rok budowy",
                    description: "2018",
                },
                {
                    id: 'transaction_type',
                    title: "Apartament",
                    description: "Na wynajem",
                },
            ],

            location: "Wola",
            images: ['https://k2am.pl/wp-content/uploads/2024/01/salon.jpg', 'https://k2am.pl/wp-content/uploads/2024/01/biuro.jpg', 'https://k2am.pl/wp-content/uploads/2024/01/korytarz2.jpg', 'https://k2am.pl/wp-content/uploads/2024/01/sypialnia3.jpg', 'https://k2am.pl/wp-content/uploads/2024/01/kuchnia.jpg', 'https://k2am.pl/wp-content/uploads/2024/01/korytarz1.jpg', 'https://k2am.pl/wp-content/uploads/2024/01/toaleta.jpg', 'https://k2am.pl/wp-content/uploads/2024/01/salon.jpg'],
            price: '2 732',
            currency: 'PLN',
            pricePerMeter: '66',
            tiptapHTML: `<p><strong>LUKSUSOWY APARTAMENT W UNIQUE TOWER WYKOŃCZONY POD KLUCZ</strong></p><br/><p><strong><em>Trzy sypialnie | W pełni umeblowany | Wysokie piętro | Luksusowe wykończenie | Wysoki standard | Klimatyzacja</em></strong><br><br><strong>ROZKŁAD I STANDARD:<br></strong></p><p>Apartament składa się z:<br>* Przestronnego salonu z otwartą kuchnią i jadalnią,<br>* trzech sypialni,<br>* trzech łazienek,<br>* reprezentacyjnego holu z garderobą.<br></p><p>Apartament zaprojektowany przez architekta, jego głównymi zaletami jest wysoka jakość wykończenia oraz uniwersalny styl. Ponadczasowy design, idealnie skomponowane materiały, kolorystyka.&nbsp;Wyposażony został w klimatyzację, w pełni umeblowany i wyposażony w zastawę stołową, pościel, ręczniki, gotowy do wprowadzenia od zaraz.<br></p><p>Wykończenie z najwyższą dbałością o jakość.<br></p><p><strong><br>INWESTYCJA:</strong><br></p><p>Unique Tower to kompleks apartamentowców, zlokalizowany na bliskiej Woli, przy ul. Grzybowskiej 51. W budynku o 29 kondygnacjach poza apartamentami znajduje się szereg udogodnień- na parterze budynku mieści się przestrzeń usługowo-handlowa, najwyższej klasy restauracja, strefa SPA i fitness oraz kompleks konferencyjno-biznesowy.</p><p>Designerskie wnętrza części wspólnych i 5-gwiazdkowy standard apartamentów to gwarancja komfortu, prestiżu oraz najwyższej jakości.<br></p><p><strong><br>LOKALIZACJA:</strong></p><p>Ulica Grzybowska położona jest w samym sercu Warszawy.<br>Pieszy dystans do wszystkich środków komunikacji miejskiej, w tym stacji przesiadkowej metra M1/M2 Świętokrzyska.</p><p>Centralna lokalizacja wraz z doskonałą infrastrukturą handlowo – usługową dają duży komfort mieszkania, tuż obok znajdują się takie punkty usługowe jak: apteka, sklepy spożywcze, salon fryzjerko- kosmetyczny, banki. W pobliżu także: kina, teatry, Ogród Saski, sklepy, piekarnie, kawiarnie, biurowce, pięciogwiazdkowe hotele.</p><p>Dwa kroki do Dworca Centralnego i CH Złote Tarasy. Okolica pełna najbardziej znanych i cenionych w Warszawie restauracji.<br></p><p><strong><br>INFORMACJE DODATKOWE:</strong></p><ul><li><p>Wymagana jest kaucja.</p></li><li><p>Miejsce parkingowe płatne dodatkowo oraz zaliczki na media.</p></li><li><p>Do kwoty najmu należy doliczyć 23% podatku VAT.</p></li></ul><p><strong><br>Serdecznie zapraszam na prezentację!</strong></p>`,
        },
        {
            id: 5,
            title: "Warszawa, Praga-Południe, ul. Grochowska 112",
            description: "Przestronny lokal użytkowy idealny na biuro lub małą gastronomię.",
            image: 'https://ireland.apollo.olxcdn.com/v1/files/eyJmbiI6Ino3NDE2ZWNuZzNkZzMtQVBMIiwidyI6W3siZm4iOiJlbnZmcXFlMWF5NGsxLUFQTCIsInMiOiIxNCIsInAiOiIxMCwtMTAiLCJhIjoiMCJ9XX0.U-dlgGtVM2O2mjsU60WzUo7SrzjAcyQG7El5M1iMaBQ/image;s=1280x1024;q=80',
            url: '2-pokoje-73m2-bobrowiecka-mokotów-sielce',
            flatDetails: [
                {
                    id: 'area',
                    title: "Powierzchnia",
                    description: "130 m²",
                },
                {
                    id: 'floor',
                    title: "Piętro",
                    description: "13 / 14",
                },
                {
                    id: 'bedroom',
                    title: "Sypialnie",
                    description: "3",
                },
                {
                    id: 'rooms',
                    title: "Pokoje",
                    description: "4",
                },
                {
                    id: 'year_of_construction',
                    title: "Rok budowy",
                    description: "2018",
                },
                {
                    id: 'transaction_type',
                    title: "Apartament",
                    description: "Na wynajem",
                },
            ],

            location: "Żoliborz",
            images: ['https://k2am.pl/wp-content/uploads/2024/01/salon.jpg', 'https://k2am.pl/wp-content/uploads/2024/01/biuro.jpg', 'https://k2am.pl/wp-content/uploads/2024/01/korytarz2.jpg', 'https://k2am.pl/wp-content/uploads/2024/01/sypialnia3.jpg', 'https://k2am.pl/wp-content/uploads/2024/01/kuchnia.jpg', 'https://k2am.pl/wp-content/uploads/2024/01/korytarz1.jpg', 'https://k2am.pl/wp-content/uploads/2024/01/toaleta.jpg', 'https://k2am.pl/wp-content/uploads/2024/01/salon.jpg'],
            price: '1 231',
            currency: 'PLN',
            pricePerMeter: '23',
            tiptapHTML: `<p><strong>LUKSUSOWY APARTAMENT W UNIQUE TOWER WYKOŃCZONY POD KLUCZ</strong></p><br/><p><strong><em>Trzy sypialnie | W pełni umeblowany | Wysokie piętro | Luksusowe wykończenie | Wysoki standard | Klimatyzacja</em></strong><br><br><strong>ROZKŁAD I STANDARD:<br></strong></p><p>Apartament składa się z:<br>* Przestronnego salonu z otwartą kuchnią i jadalnią,<br>* trzech sypialni,<br>* trzech łazienek,<br>* reprezentacyjnego holu z garderobą.<br></p><p>Apartament zaprojektowany przez architekta, jego głównymi zaletami jest wysoka jakość wykończenia oraz uniwersalny styl. Ponadczasowy design, idealnie skomponowane materiały, kolorystyka.&nbsp;Wyposażony został w klimatyzację, w pełni umeblowany i wyposażony w zastawę stołową, pościel, ręczniki, gotowy do wprowadzenia od zaraz.<br></p><p>Wykończenie z najwyższą dbałością o jakość.<br></p><p><strong><br>INWESTYCJA:</strong><br></p><p>Unique Tower to kompleks apartamentowców, zlokalizowany na bliskiej Woli, przy ul. Grzybowskiej 51. W budynku o 29 kondygnacjach poza apartamentami znajduje się szereg udogodnień- na parterze budynku mieści się przestrzeń usługowo-handlowa, najwyższej klasy restauracja, strefa SPA i fitness oraz kompleks konferencyjno-biznesowy.</p><p>Designerskie wnętrza części wspólnych i 5-gwiazdkowy standard apartamentów to gwarancja komfortu, prestiżu oraz najwyższej jakości.<br></p><p><strong><br>LOKALIZACJA:</strong></p><p>Ulica Grzybowska położona jest w samym sercu Warszawy.<br>Pieszy dystans do wszystkich środków komunikacji miejskiej, w tym stacji przesiadkowej metra M1/M2 Świętokrzyska.</p><p>Centralna lokalizacja wraz z doskonałą infrastrukturą handlowo – usługową dają duży komfort mieszkania, tuż obok znajdują się takie punkty usługowe jak: apteka, sklepy spożywcze, salon fryzjerko- kosmetyczny, banki. W pobliżu także: kina, teatry, Ogród Saski, sklepy, piekarnie, kawiarnie, biurowce, pięciogwiazdkowe hotele.</p><p>Dwa kroki do Dworca Centralnego i CH Złote Tarasy. Okolica pełna najbardziej znanych i cenionych w Warszawie restauracji.<br></p><p><strong><br>INFORMACJE DODATKOWE:</strong></p><ul><li><p>Wymagana jest kaucja.</p></li><li><p>Miejsce parkingowe płatne dodatkowo oraz zaliczki na media.</p></li><li><p>Do kwoty najmu należy doliczyć 23% podatku VAT.</p></li></ul><p><strong><br>Serdecznie zapraszam na prezentację!</strong></p>`,
        },
        {
            id: 6,
            title: "Warszawa, Bielany, ul. Conrada 5",
            description: "Ciche mieszkanie dwupokojowe z balkonem, blisko lasu Bielańskiego.",
            image: 'https://ireland.apollo.olxcdn.com/v1/files/eyJmbiI6IjA2YTV4eXQxbmR6NDItQVBMIiwidyI6W3siZm4iOiJlbnZmcXFlMWF5NGsxLUFQTCIsInMiOiIxNCIsInAiOiIxMCwtMTAiLCJhIjoiMCJ9XX0.J5I0TXuUPbIPPWdTTGEfFGUa29lDQxrkfKUboaB1VsQ/image;s=1280x1024;q=800',
            url: '2-pokoje-51-m2-pl.-niemena-żoliborz-artystyczny',
            flatDetails: [
                {
                    id: 'area',
                    title: "Powierzchnia",
                    description: "130 m²",
                },
                {
                    id: 'floor',
                    title: "Piętro",
                    description: "13 / 14",
                },
                {
                    id: 'bedroom',
                    title: "Sypialnie",
                    description: "3",
                },
                {
                    id: 'rooms',
                    title: "Pokoje",
                    description: "4",
                },
                {
                    id: 'year_of_construction',
                    title: "Rok budowy",
                    description: "2018",
                },
                {
                    id: 'transaction_type',
                    title: "Apartament",
                    description: "Na wynajem",
                },
            ],
            location: "Mokotów",

            images: ['https://k2am.pl/wp-content/uploads/2024/01/salon.jpg', 'https://k2am.pl/wp-content/uploads/2024/01/biuro.jpg', 'https://k2am.pl/wp-content/uploads/2024/01/korytarz2.jpg', 'https://k2am.pl/wp-content/uploads/2024/01/sypialnia3.jpg', 'https://k2am.pl/wp-content/uploads/2024/01/kuchnia.jpg', 'https://k2am.pl/wp-content/uploads/2024/01/korytarz1.jpg', 'https://k2am.pl/wp-content/uploads/2024/01/toaleta.jpg', 'https://k2am.pl/wp-content/uploads/2024/01/salon.jpg'],
            price: '6 125',
            currency: 'PLN',
            pricePerMeter: '52',
            tiptapHTML: `<p><strong>LUKSUSOWY APARTAMENT W UNIQUE TOWER WYKOŃCZONY POD KLUCZ</strong></p><br/><p><strong><em>Trzy sypialnie | W pełni umeblowany | Wysokie piętro | Luksusowe wykończenie | Wysoki standard | Klimatyzacja</em></strong><br><br><strong>ROZKŁAD I STANDARD:<br></strong></p><p>Apartament składa się z:<br>* Przestronnego salonu z otwartą kuchnią i jadalnią,<br>* trzech sypialni,<br>* trzech łazienek,<br>* reprezentacyjnego holu z garderobą.<br></p><p>Apartament zaprojektowany przez architekta, jego głównymi zaletami jest wysoka jakość wykończenia oraz uniwersalny styl. Ponadczasowy design, idealnie skomponowane materiały, kolorystyka.&nbsp;Wyposażony został w klimatyzację, w pełni umeblowany i wyposażony w zastawę stołową, pościel, ręczniki, gotowy do wprowadzenia od zaraz.<br></p><p>Wykończenie z najwyższą dbałością o jakość.<br></p><p><strong><br>INWESTYCJA:</strong><br></p><p>Unique Tower to kompleks apartamentowców, zlokalizowany na bliskiej Woli, przy ul. Grzybowskiej 51. W budynku o 29 kondygnacjach poza apartamentami znajduje się szereg udogodnień- na parterze budynku mieści się przestrzeń usługowo-handlowa, najwyższej klasy restauracja, strefa SPA i fitness oraz kompleks konferencyjno-biznesowy.</p><p>Designerskie wnętrza części wspólnych i 5-gwiazdkowy standard apartamentów to gwarancja komfortu, prestiżu oraz najwyższej jakości.<br></p><p><strong><br>LOKALIZACJA:</strong></p><p>Ulica Grzybowska położona jest w samym sercu Warszawy.<br>Pieszy dystans do wszystkich środków komunikacji miejskiej, w tym stacji przesiadkowej metra M1/M2 Świętokrzyska.</p><p>Centralna lokalizacja wraz z doskonałą infrastrukturą handlowo – usługową dają duży komfort mieszkania, tuż obok znajdują się takie punkty usługowe jak: apteka, sklepy spożywcze, salon fryzjerko- kosmetyczny, banki. W pobliżu także: kina, teatry, Ogród Saski, sklepy, piekarnie, kawiarnie, biurowce, pięciogwiazdkowe hotele.</p><p>Dwa kroki do Dworca Centralnego i CH Złote Tarasy. Okolica pełna najbardziej znanych i cenionych w Warszawie restauracji.<br></p><p><strong><br>INFORMACJE DODATKOWE:</strong></p><ul><li><p>Wymagana jest kaucja.</p></li><li><p>Miejsce parkingowe płatne dodatkowo oraz zaliczki na media.</p></li><li><p>Do kwoty najmu należy doliczyć 23% podatku VAT.</p></li></ul><p><strong><br>Serdecznie zapraszam na prezentację!</strong></p>`,
        },
        {
            id: 7,
            title: "Warszawa, Ursynów, al. KEN 88",
            description: "Apartament z widokiem na skyline Warszawy, idealny dla osób ceniących miejski styl życia.",
            image: 'https://ireland.apollo.olxcdn.com/v1/files/eyJmbiI6IjB3MXdmZzc0Njk5MS1BUEwiLCJ3IjpbeyJmbiI6ImVudmZxcWUxYXk0azEtQVBMIiwicyI6IjE0IiwicCI6IjEwLC0xMCIsImEiOiIwIn1dfQ.3hw7ZPkFJH4tDbRONnPeXu5zxStdMUM-gGFSaflW9xg/image;s=1280x1024;q=80',
            url: '2-pokoje-73m2-bobrowiecka-mokotów-sielce',
            flatDetails: [
                {
                    id: 'area',
                    title: "Powierzchnia",
                    description: "130 m²",
                },
                {
                    id: 'floor',
                    title: "Piętro",
                    description: "13 / 14",
                },
                {
                    id: 'bedroom',
                    title: "Sypialnie",
                    description: "3",
                },
                {
                    id: 'rooms',
                    title: "Pokoje",
                    description: "4",
                },
                {
                    id: 'year_of_construction',
                    title: "Rok budowy",
                    description: "2018",
                },
                {
                    id: 'transaction_type',
                    title: "Apartament",
                    description: "Na wynajem",
                },
            ],
            location: "Praga",

            images: ['https://k2am.pl/wp-content/uploads/2024/01/salon.jpg', 'https://k2am.pl/wp-content/uploads/2024/01/biuro.jpg', 'https://k2am.pl/wp-content/uploads/2024/01/korytarz2.jpg', 'https://k2am.pl/wp-content/uploads/2024/01/sypialnia3.jpg', 'https://k2am.pl/wp-content/uploads/2024/01/kuchnia.jpg', 'https://k2am.pl/wp-content/uploads/2024/01/korytarz1.jpg', 'https://k2am.pl/wp-content/uploads/2024/01/toaleta.jpg', 'https://k2am.pl/wp-content/uploads/2024/01/salon.jpg'],
            price: '5 444',
            currency: 'PLN',
            pricePerMeter: '132',
            tiptapHTML: `<p><strong>LUKSUSOWY APARTAMENT W UNIQUE TOWER WYKOŃCZONY POD KLUCZ</strong></p><br/><p><strong><em>Trzy sypialnie | W pełni umeblowany | Wysokie piętro | Luksusowe wykończenie | Wysoki standard | Klimatyzacja</em></strong><br><br><strong>ROZKŁAD I STANDARD:<br></strong></p><p>Apartament składa się z:<br>* Przestronnego salonu z otwartą kuchnią i jadalnią,<br>* trzech sypialni,<br>* trzech łazienek,<br>* reprezentacyjnego holu z garderobą.<br></p><p>Apartament zaprojektowany przez architekta, jego głównymi zaletami jest wysoka jakość wykończenia oraz uniwersalny styl. Ponadczasowy design, idealnie skomponowane materiały, kolorystyka.&nbsp;Wyposażony został w klimatyzację, w pełni umeblowany i wyposażony w zastawę stołową, pościel, ręczniki, gotowy do wprowadzenia od zaraz.<br></p><p>Wykończenie z najwyższą dbałością o jakość.<br></p><p><strong><br>INWESTYCJA:</strong><br></p><p>Unique Tower to kompleks apartamentowców, zlokalizowany na bliskiej Woli, przy ul. Grzybowskiej 51. W budynku o 29 kondygnacjach poza apartamentami znajduje się szereg udogodnień- na parterze budynku mieści się przestrzeń usługowo-handlowa, najwyższej klasy restauracja, strefa SPA i fitness oraz kompleks konferencyjno-biznesowy.</p><p>Designerskie wnętrza części wspólnych i 5-gwiazdkowy standard apartamentów to gwarancja komfortu, prestiżu oraz najwyższej jakości.<br></p><p><strong><br>LOKALIZACJA:</strong></p><p>Ulica Grzybowska położona jest w samym sercu Warszawy.<br>Pieszy dystans do wszystkich środków komunikacji miejskiej, w tym stacji przesiadkowej metra M1/M2 Świętokrzyska.</p><p>Centralna lokalizacja wraz z doskonałą infrastrukturą handlowo – usługową dają duży komfort mieszkania, tuż obok znajdują się takie punkty usługowe jak: apteka, sklepy spożywcze, salon fryzjerko- kosmetyczny, banki. W pobliżu także: kina, teatry, Ogród Saski, sklepy, piekarnie, kawiarnie, biurowce, pięciogwiazdkowe hotele.</p><p>Dwa kroki do Dworca Centralnego i CH Złote Tarasy. Okolica pełna najbardziej znanych i cenionych w Warszawie restauracji.<br></p><p><strong><br>INFORMACJE DODATKOWE:</strong></p><ul><li><p>Wymagana jest kaucja.</p></li><li><p>Miejsce parkingowe płatne dodatkowo oraz zaliczki na media.</p></li><li><p>Do kwoty najmu należy doliczyć 23% podatku VAT.</p></li></ul><p><strong><br>Serdecznie zapraszam na prezentację!</strong></p>`,
        },
        {
            id: 8,
            title: "Warszawa, Żoliborz, ul. Słowackiego 19",
            description: "Apartament z widokiem na skyline Warszawy, idealny dla osób ceniących miejski styl życia.",
            image: 'https://ireland.apollo.olxcdn.com/v1/files/eyJmbiI6ImMwbW1iMHJ3a2ozbDItQVBMIiwidyI6W3siZm4iOiJlbnZmcXFlMWF5NGsxLUFQTCIsInMiOiIxNCIsInAiOiIxMCwtMTAiLCJhIjoiMCJ9XX0.j-Yl8QMzRzPtlsKgzP7MgpMRRaeABfSxjFJs85MHClE/image;s=1280x1024;q=80',
            url: '2-pokoje-73m2-bobrowiecka-mokotów-sielce',
            flatDetails: [
                {
                    id: 'area',
                    title: "Powierzchnia",
                    description: "130 m²",
                },
                {
                    id: 'floor',
                    title: "Piętro",
                    description: "13 / 14",
                },
                {
                    id: 'bedroom',
                    title: "Sypialnie",
                    description: "3",
                },
                {
                    id: 'rooms',
                    title: "Pokoje",
                    description: "4",
                },
                {
                    id: 'year_of_construction',
                    title: "Rok budowy",
                    description: "2018",
                },
                {
                    id: 'transaction_type',
                    title: "Apartament",
                    description: "Na wynajem",
                },
            ],
            location: "Wola",

            images: ['https://k2am.pl/wp-content/uploads/2024/01/salon.jpg', 'https://k2am.pl/wp-content/uploads/2024/01/biuro.jpg', 'https://k2am.pl/wp-content/uploads/2024/01/korytarz2.jpg', 'https://k2am.pl/wp-content/uploads/2024/01/sypialnia3.jpg', 'https://k2am.pl/wp-content/uploads/2024/01/kuchnia.jpg', 'https://k2am.pl/wp-content/uploads/2024/01/korytarz1.jpg', 'https://k2am.pl/wp-content/uploads/2024/01/toaleta.jpg', 'https://k2am.pl/wp-content/uploads/2024/01/salon.jpg'],
            price: '999',
            currency: 'PLN',
            pricePerMeter: '52',
            tiptapHTML: `<p><strong>LUKSUSOWY APARTAMENT W UNIQUE TOWER WYKOŃCZONY POD KLUCZ</strong></p><br/><p><strong><em>Trzy sypialnie | W pełni umeblowany | Wysokie piętro | Luksusowe wykończenie | Wysoki standard | Klimatyzacja</em></strong><br><br><strong>ROZKŁAD I STANDARD:<br></strong></p><p>Apartament składa się z:<br>* Przestronnego salonu z otwartą kuchnią i jadalnią,<br>* trzech sypialni,<br>* trzech łazienek,<br>* reprezentacyjnego holu z garderobą.<br></p><p>Apartament zaprojektowany przez architekta, jego głównymi zaletami jest wysoka jakość wykończenia oraz uniwersalny styl. Ponadczasowy design, idealnie skomponowane materiały, kolorystyka.&nbsp;Wyposażony został w klimatyzację, w pełni umeblowany i wyposażony w zastawę stołową, pościel, ręczniki, gotowy do wprowadzenia od zaraz.<br></p><p>Wykończenie z najwyższą dbałością o jakość.<br></p><p><strong><br>INWESTYCJA:</strong><br></p><p>Unique Tower to kompleks apartamentowców, zlokalizowany na bliskiej Woli, przy ul. Grzybowskiej 51. W budynku o 29 kondygnacjach poza apartamentami znajduje się szereg udogodnień- na parterze budynku mieści się przestrzeń usługowo-handlowa, najwyższej klasy restauracja, strefa SPA i fitness oraz kompleks konferencyjno-biznesowy.</p><p>Designerskie wnętrza części wspólnych i 5-gwiazdkowy standard apartamentów to gwarancja komfortu, prestiżu oraz najwyższej jakości.<br></p><p><strong><br>LOKALIZACJA:</strong></p><p>Ulica Grzybowska położona jest w samym sercu Warszawy.<br>Pieszy dystans do wszystkich środków komunikacji miejskiej, w tym stacji przesiadkowej metra M1/M2 Świętokrzyska.</p><p>Centralna lokalizacja wraz z doskonałą infrastrukturą handlowo – usługową dają duży komfort mieszkania, tuż obok znajdują się takie punkty usługowe jak: apteka, sklepy spożywcze, salon fryzjerko- kosmetyczny, banki. W pobliżu także: kina, teatry, Ogród Saski, sklepy, piekarnie, kawiarnie, biurowce, pięciogwiazdkowe hotele.</p><p>Dwa kroki do Dworca Centralnego i CH Złote Tarasy. Okolica pełna najbardziej znanych i cenionych w Warszawie restauracji.<br></p><p><strong><br>INFORMACJE DODATKOWE:</strong></p><ul><li><p>Wymagana jest kaucja.</p></li><li><p>Miejsce parkingowe płatne dodatkowo oraz zaliczki na media.</p></li><li><p>Do kwoty najmu należy doliczyć 23% podatku VAT.</p></li></ul><p><strong><br>Serdecznie zapraszam na prezentację!</strong></p>`,
        },
        {
            id: 9,
            title: "Warszawa, Ochota, ul. Grójecka 42",
            description: "Apartament z widokiem na skyline Warszawy, idealny dla osób ceniących miejski styl życia.",
            image: 'https://ireland.apollo.olxcdn.com/v1/files/eyJmbiI6Im8zeGM3dzBpaDNjZjEtRUNPU1lTVEVNIiwidyI6W3siZm4iOiJlbnZmcXFlMWF5NGsxLUFQTCIsInMiOiIxNCIsInAiOiIxMCwtMTAiLCJhIjoiMCJ9XX0.M8YSWuf8LM42HszPrQQvZXNEhPSXhPgw65RyXMrQnAE/image;s=1280x1024;q=80',
            url: '2-pokoje-73m2-bobrowiecka-mokotów-sielce',
            flatDetails: [
                {
                    id: 'area',
                    title: "Powierzchnia",
                    description: "130 m²",
                },
                {
                    id: 'floor',
                    title: "Piętro",
                    description: "13 / 14",
                },
                {
                    id: 'bedroom',
                    title: "Sypialnie",
                    description: "3",
                },
                {
                    id: 'rooms',
                    title: "Pokoje",
                    description: "4",
                },
                {
                    id: 'year_of_construction',
                    title: "Rok budowy",
                    description: "2018",
                },
                {
                    id: 'transaction_type',
                    title: "Apartament",
                    description: "Na wynajem",
                },
            ],
            location: "Praga",

            images: ['https://k2am.pl/wp-content/uploads/2024/01/salon.jpg', 'https://k2am.pl/wp-content/uploads/2024/01/biuro.jpg', 'https://k2am.pl/wp-content/uploads/2024/01/korytarz2.jpg', 'https://k2am.pl/wp-content/uploads/2024/01/sypialnia3.jpg', 'https://k2am.pl/wp-content/uploads/2024/01/kuchnia.jpg', 'https://k2am.pl/wp-content/uploads/2024/01/korytarz1.jpg', 'https://k2am.pl/wp-content/uploads/2024/01/toaleta.jpg', 'https://k2am.pl/wp-content/uploads/2024/01/salon.jpg'],
            price: '999',
            currency: 'PLN',
            pricePerMeter: '64',
            tiptapHTML: `<p><strong>LUKSUSOWY APARTAMENT W UNIQUE TOWER WYKOŃCZONY POD KLUCZ</strong></p><br/><p><strong><em>Trzy sypialnie | W pełni umeblowany | Wysokie piętro | Luksusowe wykończenie | Wysoki standard | Klimatyzacja</em></strong><br><br><strong>ROZKŁAD I STANDARD:<br></strong></p><p>Apartament składa się z:<br>* Przestronnego salonu z otwartą kuchnią i jadalnią,<br>* trzech sypialni,<br>* trzech łazienek,<br>* reprezentacyjnego holu z garderobą.<br></p><p>Apartament zaprojektowany przez architekta, jego głównymi zaletami jest wysoka jakość wykończenia oraz uniwersalny styl. Ponadczasowy design, idealnie skomponowane materiały, kolorystyka.&nbsp;Wyposażony został w klimatyzację, w pełni umeblowany i wyposażony w zastawę stołową, pościel, ręczniki, gotowy do wprowadzenia od zaraz.<br></p><p>Wykończenie z najwyższą dbałością o jakość.<br></p><p><strong><br>INWESTYCJA:</strong><br></p><p>Unique Tower to kompleks apartamentowców, zlokalizowany na bliskiej Woli, przy ul. Grzybowskiej 51. W budynku o 29 kondygnacjach poza apartamentami znajduje się szereg udogodnień- na parterze budynku mieści się przestrzeń usługowo-handlowa, najwyższej klasy restauracja, strefa SPA i fitness oraz kompleks konferencyjno-biznesowy.</p><p>Designerskie wnętrza części wspólnych i 5-gwiazdkowy standard apartamentów to gwarancja komfortu, prestiżu oraz najwyższej jakości.<br></p><p><strong><br>LOKALIZACJA:</strong></p><p>Ulica Grzybowska położona jest w samym sercu Warszawy.<br>Pieszy dystans do wszystkich środków komunikacji miejskiej, w tym stacji przesiadkowej metra M1/M2 Świętokrzyska.</p><p>Centralna lokalizacja wraz z doskonałą infrastrukturą handlowo – usługową dają duży komfort mieszkania, tuż obok znajdują się takie punkty usługowe jak: apteka, sklepy spożywcze, salon fryzjerko- kosmetyczny, banki. W pobliżu także: kina, teatry, Ogród Saski, sklepy, piekarnie, kawiarnie, biurowce, pięciogwiazdkowe hotele.</p><p>Dwa kroki do Dworca Centralnego i CH Złote Tarasy. Okolica pełna najbardziej znanych i cenionych w Warszawie restauracji.<br></p><p><strong><br>INFORMACJE DODATKOWE:</strong></p><ul><li><p>Wymagana jest kaucja.</p></li><li><p>Miejsce parkingowe płatne dodatkowo oraz zaliczki na media.</p></li><li><p>Do kwoty najmu należy doliczyć 23% podatku VAT.</p></li></ul><p><strong><br>Serdecznie zapraszam na prezentację!</strong></p>`,
        },
        {
            id: 10,
            title: "Warszawa, Praga-Południe, ul. Grochowska 112",
            description: "Apartament z widokiem na skyline Warszawy, idealny dla osób ceniących miejski styl życia.",
            image: 'https://ireland.apollo.olxcdn.com/v1/files/eyJmbiI6IjFqdHE5dGxpMDNhMy1BUEwiLCJ3IjpbeyJmbiI6ImVudmZxcWUxYXk0azEtQVBMIiwicyI6IjE0IiwicCI6IjEwLC0xMCIsImEiOiIwIn1dfQ.zAIylO0-Luc8XuzOTNWKf_G6AOo0v-x3XXGS8SQyNA0/image;s=1280x1024;q=80',
            url: '2-pokoje-73m2-bobrowiecka-mokotów-sielce',
            flatDetails: [
                {
                    id: 'area',
                    title: "Powierzchnia",
                    description: "130 m²",
                },
                {
                    id: 'floor',
                    title: "Piętro",
                    description: "13 / 14",
                },
                {
                    id: 'bedroom',
                    title: "Sypialnie",
                    description: "3",
                },
                {
                    id: 'rooms',
                    title: "Pokoje",
                    description: "4",
                },
                {
                    id: 'year_of_construction',
                    title: "Rok budowy",
                    description: "2018",
                },
                {
                    id: 'transaction_type',
                    title: "Apartament",
                    description: "Na wynajem",
                },
            ],
            location: "Wola",

            images: ['https://k2am.pl/wp-content/uploads/2024/01/salon.jpg'],
            price: '1 233',
            currency: 'PLN',
            pricePerMeter: '53',
            tiptapHTML: `<p><strong>LUKSUSOWY APARTAMENT W UNIQUE TOWER WYKOŃCZONY POD KLUCZ</strong></p><br/><p><strong><em>Trzy sypialnie | W pełni umeblowany | Wysokie piętro | Luksusowe wykończenie | Wysoki standard | Klimatyzacja</em></strong><br><br><strong>ROZKŁAD I STANDARD:<br></strong></p><p>Apartament składa się z:<br>* Przestronnego salonu z otwartą kuchnią i jadalnią,<br>* trzech sypialni,<br>* trzech łazienek,<br>* reprezentacyjnego holu z garderobą.<br></p><p>Apartament zaprojektowany przez architekta, jego głównymi zaletami jest wysoka jakość wykończenia oraz uniwersalny styl. Ponadczasowy design, idealnie skomponowane materiały, kolorystyka.&nbsp;Wyposażony został w klimatyzację, w pełni umeblowany i wyposażony w zastawę stołową, pościel, ręczniki, gotowy do wprowadzenia od zaraz.<br></p><p>Wykończenie z najwyższą dbałością o jakość.<br></p><p><strong><br>INWESTYCJA:</strong><br></p><p>Unique Tower to kompleks apartamentowców, zlokalizowany na bliskiej Woli, przy ul. Grzybowskiej 51. W budynku o 29 kondygnacjach poza apartamentami znajduje się szereg udogodnień- na parterze budynku mieści się przestrzeń usługowo-handlowa, najwyższej klasy restauracja, strefa SPA i fitness oraz kompleks konferencyjno-biznesowy.</p><p>Designerskie wnętrza części wspólnych i 5-gwiazdkowy standard apartamentów to gwarancja komfortu, prestiżu oraz najwyższej jakości.<br></p><p><strong><br>LOKALIZACJA:</strong></p><p>Ulica Grzybowska położona jest w samym sercu Warszawy.<br>Pieszy dystans do wszystkich środków komunikacji miejskiej, w tym stacji przesiadkowej metra M1/M2 Świętokrzyska.</p><p>Centralna lokalizacja wraz z doskonałą infrastrukturą handlowo – usługową dają duży komfort mieszkania, tuż obok znajdują się takie punkty usługowe jak: apteka, sklepy spożywcze, salon fryzjerko- kosmetyczny, banki. W pobliżu także: kina, teatry, Ogród Saski, sklepy, piekarnie, kawiarnie, biurowce, pięciogwiazdkowe hotele.</p><p>Dwa kroki do Dworca Centralnego i CH Złote Tarasy. Okolica pełna najbardziej znanych i cenionych w Warszawie restauracji.<br></p><p><strong><br>INFORMACJE DODATKOWE:</strong></p><ul><li><p>Wymagana jest kaucja.</p></li><li><p>Miejsce parkingowe płatne dodatkowo oraz zaliczki na media.</p></li><li><p>Do kwoty najmu należy doliczyć 23% podatku VAT.</p></li></ul><p><strong><br>Serdecznie zapraszam na prezentację!</strong></p>`,
        },
    ]

})