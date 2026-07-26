export interface Accommodation {
  id: number;
  nome: string;
  preco: number;
  localizacao: string;
  lat: number;
  lng: number;
  universidade: string;
  pais: string;
  amenities: string[];
  imagem: string;
  descricao: string;
  link: string;
}

export const accommodations: Accommodation[] = [
  // 🌍 Moçambique
  {
    id: 1,
    nome: "Alojamento Estudantil Maputo",
    preco: 3500,
    localizacao: "Maputo, Moçambique",
    lat: -25.9653,
    lng: 32.5892,
    universidade: "Universidade Eduardo Mondlane",
    pais: "Moçambique",
    amenities: ["WiFi", "Água quente", "Segurança 24h"],
    imagem: "/placeholder.png",
    descricao:
      "Alojamento confortável próximo da Universidade Eduardo Mondlane, com WiFi incluído e ambiente seguro para estudantes.",
    link: "https://uem.mz",
  },
  {
    id: 2,
    nome: "Residência Académica Polana",
    preco: 4000,
    localizacao: "Maputo, Moçambique",
    lat: -25.9725,
    lng: 32.5889,
    universidade: "Universidade Politécnica",
    pais: "Moçambique",
    amenities: ["WiFi", "Lavandaria", "Estudo 24h"],
    imagem: "/placeholder.png",
    descricao:
      "Residência moderna com espaços de estudo e lavandaria, ideal para estudantes que procuram conforto e praticidade.",
    link: "https://politecnica.ac.mz",
  },

  // 🇿🇦 África do Sul
  {
    id: 3,
    nome: "Cape Town Student Lodge",
    preco: 4500,
    localizacao: "Cidade do Cabo, África do Sul",
    lat: -33.9249,
    lng: 18.4241,
    universidade: "University of Cape Town (UCT)",
    pais: "África do Sul",
    amenities: ["WiFi", "Ginásio", "TV", "Estudo 24h"],
    imagem: "/placeholder.png",
    descricao:
      "Lodge estudantil moderno, perto da UCT com todas as comodidades, incluindo ginásio e sala de estudo 24h.",
    link: "https://www.uct.ac.za/",
  },
  {
    id: 4,
    nome: "Stellenbosch Student Housing",
    preco: 4300,
    localizacao: "Stellenbosch, África do Sul",
    lat: -33.9344,
    lng: 18.861,
    universidade: "Stellenbosch University",
    pais: "África do Sul",
    amenities: ["WiFi", "Estacionamento", "Piscina"],
    imagem: "/placeholder.png",
    descricao:
      "Residência universitária com ambiente calmo e acesso rápido ao campus de Stellenbosch University.",
    link: "https://www.sun.ac.za/",
  },
  {
    id: 5,
    nome: "Joburg Student Village",
    preco: 4200,
    localizacao: "Johannesburg, África do Sul",
    lat: -26.2041,
    lng: 28.0473,
    universidade: "University of Johannesburg",
    pais: "África do Sul",
    amenities: ["WiFi", "Lavandaria", "Segurança 24h", "Ginásio"],
    imagem: "/placeholder.png",
    descricao:
      "Alojamento seguro e moderno localizado no coração de Joburg, ideal para estudantes da UJ.",
    link: "https://www.uj.ac.za/",
  },

  // 🇵🇹 Portugal
  {
    id: 6,
    nome: "Residência Universitária Lisboa",
    preco: 4800,
    localizacao: "Lisboa, Portugal",
    lat: 38.7169,
    lng: -9.139,
    universidade: "Universidade de Lisboa",
    pais: "Portugal",
    amenities: ["WiFi", "Refeitório", "Estudo 24h", "Ginásio"],
    imagem: "/placeholder.png",
    descricao:
      "Residência central com fácil acesso a transportes públicos e ao campus universitário.",
    link: "https://www.ulisboa.pt/",
  },
  {
    id: 7,
    nome: "Residência Coimbra Académica",
    preco: 4600,
    localizacao: "Coimbra, Portugal",
    lat: 40.2033,
    lng: -8.4103,
    universidade: "Universidade de Coimbra",
    pais: "Portugal",
    amenities: ["WiFi", "Lavandaria", "Água quente", "Segurança 24h"],
    imagem: "/placeholder.png",
    descricao:
      "Residência tradicional portuguesa com ambiente estudantil acolhedor e histórico.",
    link: "https://www.uc.pt/",
  },

  // 🇩🇪 Alemanha
  {
    id: 8,
    nome: "Berlin Studentenhaus",
    preco: 6000,
    localizacao: "Berlim, Alemanha",
    lat: 52.52,
    lng: 13.405,
    universidade: "Humboldt University of Berlin",
    pais: "Alemanha",
    amenities: ["WiFi", "Estudo 24h", "Ginásio", "Lavandaria"],
    imagem: "/placeholder.png",
    descricao:
      "Residência estudantil moderna em Berlim, próxima de cafés e zonas culturais vibrantes.",
    link: "https://www.hu-berlin.de/",
  },
  {
    id: 9,
    nome: "Munich Academic Residence",
    preco: 6200,
    localizacao: "Munique, Alemanha",
    lat: 48.1351,
    lng: 11.582,
    universidade: "LMU Munich",
    pais: "Alemanha",
    amenities: ["WiFi", "Estacionamento", "Ginásio"],
    imagem: "/placeholder.png",
    descricao:
      "Alojamento premium com quartos espaçosos, perfeito para estudantes internacionais.",
    link: "https://www.lmu.de/",
  },

  // 🇺🇸 Estados Unidos
  {
    id: 10,
    nome: "NYC Student Apartments",
    preco: 8000,
    localizacao: "Nova Iorque, EUA",
    lat: 40.7128,
    lng: -74.006,
    universidade: "NYU",
    pais: "Estados Unidos da América",
    amenities: ["WiFi", "Estudo 24h", "Segurança 24h"],
    imagem: "/placeholder.png",
    descricao:
      "Apartamentos modernos em Nova Iorque, perfeitos para estudantes da NYU e outras universidades locais.",
    link: "https://www.nyu.edu/",
  },
  {
    id: 11,
    nome: "Boston Student Residences",
    preco: 7500,
    localizacao: "Boston, EUA",
    lat: 42.3601,
    lng: -71.0589,
    universidade: "Harvard University",
    pais: "Estados Unidos da América",
    amenities: ["WiFi", "Ginásio", "Biblioteca"],
    imagem: "/placeholder.png",
    descricao:
      "Residência universitária próxima a Harvard, com biblioteca privada e ginásio moderno.",
    link: "https://www.harvard.edu/",
  },

  // 🇬🇧 Reino Unido
  {
    id: 12,
    nome: "London Central Halls",
    preco: 7200,
    localizacao: "Londres, Reino Unido",
    lat: 51.5074,
    lng: -0.1278,
    universidade: "Imperial College London",
    pais: "Reino Unido",
    amenities: ["WiFi", "Lavandaria", "Ginásio"],
    imagem: "/placeholder.png",
    descricao:
      "Alojamento moderno no centro de Londres, ideal para estudantes do Imperial College e outras universidades.",
    link: "https://www.imperial.ac.uk/",
  },
  {
    id: 13,
    nome: "Manchester Student Village",
    preco: 6900,
    localizacao: "Manchester, Reino Unido",
    lat: 53.4808,
    lng: -2.2426,
    universidade: "University of Manchester",
    pais: "Reino Unido",
    amenities: ["WiFi", "Segurança 24h", "Estacionamento"],
    imagem: "/placeholder.png",
    descricao:
      "Residência estudantil vibrante, rodeada de restaurantes e cafés na zona central de Manchester.",
    link: "https://www.manchester.ac.uk/",
  },
  // India
  {
    id: 14,
    nome: "India: Casita - Your student home",
    preco: 7200,
    localizacao: "Uttar Pradesh, India", 
    lat: 27.876,
    lng: 79.870,
    universidade: "SDGI Global University / HRIT University / IMS Ghaziabad ",
    pais: "Índia",
    amenities: ["WiFi", "Lavandaria", "área de lazer"],
    imagem: "/placeholder.png",
    descricao:
      "Alojamento moderno em Ghaziabad, Lucknow, Gurugram, Indore, Bangalore, Goa, Mathura e Bhubaneswar. ",
    link: "https://www.casita.com/student-accommodation/india",
  },
  {
    id: 15,
    nome: "Manchester Student Village",
    preco: 6900,
    localizacao: "Manchester, Reino Unido",
    lat: 53.4808,
    lng: -2.2426,
    universidade: "University of Manchester",
    pais: "Reino Unido",
    amenities: ["WiFi", "Segurança 24h", "Estacionamento"],
    imagem: "/placeholder.png",
    descricao:
      "Residência estudantil vibrante, rodeada de restaurantes e cafés na zona central de Manchester.",
    link: "https://www.manchester.ac.uk/",
  },
];
