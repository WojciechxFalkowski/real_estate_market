<template>
  <div class="container mx-auto mt-16 lg:mt-32 mb-32">
    <Accordion :sections="accordionData" />
  </div>
</template>

<script setup lang="ts">
// Twoje dane dla akordeonu - można je załadować z zewnątrz lub zdefiniować tutaj
const accordionData = [
  {
    title: "Co wchodzi w zakres usługi zarządzania najmem?",
    content: "",
    listTitle:'Zakres naszych obowiązków przy zarządzaniu najmem obejmuje:'
    //listItems:[]
  },
  {
    title: "Ile kosztuje zarządzanie najmem?",
    content: "Koszt usługi szacowany jest indywidualnie, po zapoznaniu się z nieruchomością oraz ustaleniu zakresu działań jakim ma ona być objęta.",
  },
  {
    title: "Jak możemy załatwić formalności?",
    content:
      "Naszą dewizą jest budowanie zaufania i długofalowej relacji z klientem, powierzającym nam swój majątek. W związku z tym proponujemy niezobowiązujące spotkanie, w idealnym wariancie połączone z wizytą w nieruchomości, która ma być otoczona opieką. Zależy nam na poznaniu Państwa potrzeb, dlatego to rozmowa jest dla nas podstawą do nawiązania potencjalnej współpracy. Jeżeli nasz model działania wzbudzi zaufanie, wówczas prezentujemy wzory dokumentów niezbędnych do objęcia mieszkania usługą zarządzania. Po zapoznaniu się z nimi i złożeniu podpisów do lokalu przydzielany zostaje indywidualny opiekun, który od tej pory kontaktuje się z właścicielem we wszystkich sprawach związanych z daną nieruchomością,",
  },
  {
    title: "Na jaki czas zawierana jest umowa?",
    content:
      "Umowa zawierana jest standardowo na czas nieokreślony, z 3-miesięcznym wypowiedzeniem.",
  },
  {
    title: "Czy doradzacie w zakresie zakupu nieruchomości?",
    content:
      "Tak, oferujemy naszą pomoc także w zakresie doradztwa inwestycyjnego w obszarze nieruchomości. Bazując na bogatym portfolio, budowanym przez ponad 10 lat oraz realnych stopach zwrotu uzyskiwanych z najmu, wskazujemy najtrafniejsze kierunki inwestycyjne dla Państwa środków.",
  },
  {
    title: "Czy pomagacie w znalezieniu najemcy?",
    content:
      "Tak, na podstawie osobnej umowy, świadczymy usługę pośrednictwa w wynajmie. Nie jest ona jednak warunkiem koniecznym, abyśmy mogli przejąć mieszkanie w zarządzanie – nasi klienci mają w tej materii swobodę działania.",
  },
  {
    title: "Jak często odwiedzane są mieszkania znajdujące się pod opieką?",
    content:
      "Mieszkania znajdujące się pod nasza opieką odwiedzamy minimum raz na 6 miesięcy z takiej wizyty sporządzany jest oficjalny protokół, który następnie wraz z komentarzem jest przesyłany do właściciela. dzięki czemu na bieżąco monitorujemy czy są jakieś zniszczenia i czy lokator dba o mieszkanie.",
  },
  {
    title:
      "Jak staracie się zabezpieczyć nieruchomość przed nieuczciwym najemcą?",
    content:
      "Nie wydajemy mieszkania bez otrzymanej kaucji. Przeprowadzamy weryfikację najemcy nie tylko na podstawie ogólnodostępnych źródeł, ale także poprzez kontakt z pośrednikami w obrocie nieruchomościami. Znamy od podszewki procedury związane z najmem okazjonalnym i rekomendujemy ich wdrożenie właścicielom, a następnie przeprowadzamy ich przez ten proces.",
  },
  {
    title: "Czy zajmują się Państwo najmem krótkoterminowym?",
    content:
      "W tym momencie pod naszą pieczą znajdują się mieszkania przeznaczone na najem długoterminowy, jednakże współpracujemy z podmiotami oferującymi wsparcie w zakresie najmu krótkoterminowego.",
  },
];
</script>
