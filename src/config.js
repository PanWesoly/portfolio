/**
 * Globalna konfiguracja portfolio
 * 
 * Ustaw ENABLE_GAME na false, jeśli chcesz wyłączyć mini-grę Snake.
 */
export const CONFIG = {
  // Mini-gra wyłączona domyślnie dla zachowania profesjonalnego charakteru portfolio
  ENABLE_GAME: false,

  // Dane programisty
  DEVELOPER: {
    name: "Daniel",
    brandName: "daniel.dev",
    initials: "</>",
    title: "Programista Webowy & Full-Stack",
    subtitle: "Tworzenie nowoczesnych, wydajnych stron i aplikacji internetowych",
    tagline: "Cześć, jestem Daniel. Jestem programistą webowym i tworzę strony oraz aplikacje internetowe. Pracuję z HTML, JavaScript, PHP, Python, Node.js, Java i Next.js. Lubię rozwiązywać problemy, uczyć się nowych technologii i pisać czysty, zrozumiały kod.",
    bio: "Jestem pasjonatem tworzenia przejrzystego, skalowalnego i dobrze zorganizowanego oprogramowania. Z równą swobodą buduję dynamiczne interfejsy użytkownika oraz solidne zaplecze serwerowe i bazy danych.",
    location: "Polska / Zdalnie",
    status: "Dostępny do projektów i współpracy",
    email: "kontakt@daniel.dev",
    avatar: "/avatar.jpg",
    yearsExperience: "Full-Stack",
    projectsCompleted: "Nowoczesne",
    satisfiedClients: "Czysty kod",
  },

  // Linki nawigacji
  NAV_LINKS: [
    { label: "O mnie", href: "#about" },
    { label: "Umiejętności", href: "#skills" },
    { label: "Projekty", href: "#projects" },
    { label: "Doświadczenie", href: "#experience" },
    { label: "Edukacja", href: "#education" },
    { label: "Kursy i Warsztaty", href: "#training" },
    { label: "Osiągnięcia", href: "#achievements" },
    { label: "Kontakt", href: "#contact" },
  ]
};
