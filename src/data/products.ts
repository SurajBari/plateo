export type Product = {
  id: number;
  name: string;
  subtitle: string;
  price: number;
  image: string;
  quality: "Standard" | "Premium" | "Royal";
  category: "Tableware" | "Serveware" | "Decor";
};

export const products: Product[] = [
  {
    id: 1,
    name: "Nawabi Tea Kettle Set",
    subtitle: "15 Piece Heritage Set",
    price: 2490,
    quality: "Royal",
    category: "Serveware",
    image: "https://i.pinimg.com/1200x/52/8d/29/528d29d28a24bdf0678fe704c33090de.jpg",
  },
  {
    id: 2,
    name: "Maharaja Sugar Pot Pair",
    subtitle: "Set of 2",
    price: 980,
    quality: "Premium",
    category: "Serveware",
    image: "https://i.pinimg.com/736x/b6/31/91/b63191032b463a67ff51ac52de5005fb.jpg",
  },
  {
    id: 3,
    name: "Nawabi Sugar Pot",
    subtitle: "Single Pot",
    price: 620,
    quality: "Standard",
    category: "Serveware",
    image: "https://i.pinimg.com/1200x/ef/21/1d/ef211d0bdc836affe149bbba4307bdea.jpg",
  },
  {
    id: 4,
    name: "Bengal Kulhad Glass",
    subtitle: "Lead-Free Clay Cup",
    price: 540,
    quality: "Standard",
    category: "Tableware",
    image: "https://i.pinimg.com/1200x/ae/ac/ed/aeacedef8573cefbd2cc301ae8a650a9.jpg",
  },
  {
    id: 5,
    name: "Ritual Serving Bowl",
    subtitle: "Hand-thrown Rim",
    price: 760,
    quality: "Premium",
    category: "Tableware",
    image: "https://i.pinimg.com/736x/4e/3c/e2/4e3ce2c9916365b93ab68f279330cf2b.jpg",
  },
  {
    id: 6,
    name: "Terracotta Dinner Plate",
    subtitle: "Traditional Round",
    price: 850,
    quality: "Premium",
    category: "Tableware",
    image: "https://i.pinimg.com/1200x/0a/43/58/0a4358c622ca2c0f737d247773b67243.jpg",
  },
  {
    id: 7,
    name: "Clay Condiment Set",
    subtitle: "Mini Trio",
    price: 690,
    quality: "Standard",
    category: "Serveware",
    image: "https://i.pinimg.com/1200x/ee/7c/52/ee7c52f031f7cb7545afc41fcaded03a.jpg",
  },
  {
    id: 8,
    name: "Heritage Table Ensemble",
    subtitle: "Curated Gift Box",
    price: 3290,
    quality: "Royal",
    category: "Tableware",
    image: "https://i.pinimg.com/1200x/f7/7e/53/f77e5307c5724c120a9224a9763c3331.jpg",
  },
  {
    id: 9,
    name: "Royal Clay Vessel",
    subtitle: "Decor Archive",
    price: 1450,
    quality: "Royal",
    category: "Decor",
    image: "https://i.pinimg.com/736x/95/e3/3c/95e33cda252401629e56c042daba7484.jpg",
  },
  {
    id: 10,
    name: "Temple Finish Serveware",
    subtitle: "Textured Classic",
    price: 1120,
    quality: "Premium",
    category: "Decor",
    image: "https://i.pinimg.com/736x/f1/72/c0/f172c091d208d29a4c5567c07f2f3f2e.jpg",
  },
  {
    id: 11,
    name: "Bengal Earth Platter",
    subtitle: "Studio Signature",
    price: 990,
    quality: "Premium",
    category: "Tableware",
    image: "https://i.pinimg.com/736x/9b/16/f2/9b16f28cf3be77c9e5e8e19cd800239f.jpg",
  },
];
