interface Consultation {
  name: string;
  public: boolean;
  attendees: string[];
}

const konzik: Consultation[] = [
  {
    name: 'Grafika házi help',
    public: true,
    attendees: ['Attila', 'Álmos', 'Huba'],
  },
  {
    name: 'Adatb vizsgára készülés',
    public: false,
    attendees: ['Attila', 'Todor'],
  },
  {
    name: 'Prog2 konzi',
    public: true,
    attendees: ['Márton', 'Zalán', 'Tibor', 'Sándor'],
  },
];

// Feladat:
// Számoljuk össze, összesen hány résztvevő volt a publikus a konzultációkon!
