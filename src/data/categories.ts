import { CategoryInfo, SubcategoryInfo } from '../types';

export const OFFICIAL_CATEGORIES: CategoryInfo[] = [
  {
    id: 'cat1',
    name: 'Categoría 1: Poblacional y Recreacional',
    shortName: 'Cat. 1: Poblacional y Recreacional',
    description: 'Aguas destinadas a producción de agua potable y recreación (contacto primario y secundario).',
    articleRef: 'Art. 3.1 del D.S. N° 004-2017-MINAM',
    anexoPages: [14, 15],
    subcategories: [
      {
        id: 'A1',
        code: 'A1',
        name: 'A1: Desinfección simple',
        category: 'cat1',
        description: 'Aguas aptas para abastecimiento poblacional con únicamente desinfección simple.',
        applicableUses: ['Abastecimiento poblacional con desinfección simple (cloración)'],
        articleRef: 'Art. 3.1.a) A1',
        anexoPage: 14,
      },
      {
        id: 'A2',
        code: 'A2',
        name: 'A2: Tratamiento convencional',
        category: 'cat1',
        description: 'Aguas para consumo humano tratadas con procesos convencionales y desinfección.',
        applicableUses: ['Abastecimiento poblacional con tratamiento convencional'],
        articleRef: 'Art. 3.1.a) A2',
        anexoPage: 14,
      },
      {
        id: 'A3',
        code: 'A3',
        name: 'A3: Tratamiento avanzado',
        category: 'cat1',
        description: 'Aguas para consumo humano tratadas con filtración avanzada y ósmosis inversa.',
        applicableUses: ['Abastecimiento poblacional con tratamiento físico-químico avanzado'],
        articleRef: 'Art. 3.1.a) A3',
        anexoPage: 14,
      },
      {
        id: 'B1',
        code: 'B1',
        name: 'B1: Contacto primario',
        category: 'cat1',
        description: 'Uso recreativo de contacto primario: natación, buceo, surf, canotaje o similares.',
        applicableUses: ['Natación, buceo, surf, deportes náuticos de inmersión'],
        articleRef: 'Art. 3.1.b) B1',
        anexoPage: 15,
      },
      {
        id: 'B2',
        code: 'B2',
        name: 'B2: Contacto secundario',
        category: 'cat1',
        description: 'Aguas para uso recreativo secundario: deportes náuticos con botes o lanchas.',
        applicableUses: ['Navegación en botes, lanchas, remo recreativo'],
        articleRef: 'Art. 3.1.b) B2',
        anexoPage: 15,
      }
    ]
  },
  {
    id: 'cat2',
    name: 'Categoría 2: Extracción, Cultivo y Otras Actividades Marino Costeras y Continentales',
    shortName: 'Cat. 2: Marino Costeras y Continentales',
    description: 'Extracción y cultivo hidrobiológico, actividades portuarias y lagos o lagunas.',
    articleRef: 'Art. 3.2 del D.S. N° 004-2017-MINAM',
    anexoPages: [16],
    subcategories: [
      {
        id: 'C1',
        code: 'C1',
        name: 'C1: Moluscos, equinodermos y tunicados (marino costeras)',
        category: 'cat2',
        description: 'Extracción y cultivo de moluscos bivalvos, equinodermos y tunicados marino costeros.',
        applicableUses: ['Maricultura de moluscos bivalvos (área aprobada y restringida)'],
        articleRef: 'Art. 3.2.a) C1',
        anexoPage: 16,
      },
      {
        id: 'C2',
        code: 'C2',
        name: 'C2: Otras especies hidrobiológicas (marino costeras)',
        category: 'cat2',
        description: 'Extracción y cultivo de peces y algas marinas para consumo humano directo e indirecto.',
        applicableUses: ['Pesca artesanal, piscicultura marina, cultivo de algas'],
        articleRef: 'Art. 3.2.b) C2',
        anexoPage: 16,
      },
      {
        id: 'C3',
        code: 'C3',
        name: 'C3: Actividades marino portuarias, industriales o de saneamiento',
        category: 'cat2',
        description: 'Zonas marino portuarias, actividades industriales y áreas de emisarios submarinos.',
        applicableUses: ['Puertos, muelles industriales, zonas de amortiguamiento de emisarios'],
        articleRef: 'Art. 3.2.c) C3',
        anexoPage: 16,
      },
      {
        id: 'C4',
        code: 'C4',
        name: 'C4: Especies hidrobiológicas en lagos o lagunas',
        category: 'cat2',
        description: 'Extracción y acuicultura de especies hidrobiológicas en lagos o lagunas continentales.',
        applicableUses: ['Piscicultura continental en lagos/lagunas (ej. truchas, paiche, tilapia)'],
        articleRef: 'Art. 3.2.d) C4',
        anexoPage: 16,
      }
    ]
  },
  {
    id: 'cat3',
    name: 'Categoría 3: Riego de Vegetales y Bebida de Animales',
    shortName: 'Cat. 3: Riego y Bebida Animal',
    description: 'Aguas para riego agrícola (consumo crudo, cocido o industrial) y bebida de animales.',
    articleRef: 'Art. 3.3 del D.S. N° 004-2017-MINAM',
    anexoPages: [17],
    subcategories: [
      {
        id: 'D1-NR',
        code: 'D1 (No Restringido)',
        name: 'D1: Riego no restringido',
        category: 'cat3',
        description: 'Riego de cultivos consumidos crudos, frutales de tallo bajo, parques y áreas verdes.',
        applicableUses: ['Hortalizas crudas, frutales de tallo bajo, parques públicos'],
        articleRef: 'Art. 3.3.a) D1 No Restringido',
        anexoPage: 17,
      },
      {
        id: 'D1-R',
        code: 'D1 (Restringido)',
        name: 'D1: Riego restringido',
        category: 'cat3',
        description: 'Riego de cultivos consumidos cocidos, granos, pastos, forrajes e industriales.',
        applicableUses: ['Cultivos cocidos, granos, pastos y forrajes, cultivos industriales'],
        articleRef: 'Art. 3.3.a) D1 Restringido',
        anexoPage: 17,
      },
      {
        id: 'D2',
        code: 'D2',
        name: 'D2: Bebida de animales',
        category: 'cat3',
        description: 'Abrevadero y bebida de animales mayores (vacuno, equino) y menores (ovino, aves).',
        applicableUses: ['Abrevadero de ganado vacuno, ovino, camélidos, porcinos, aves y cuyes'],
        articleRef: 'Art. 3.3.b) D2',
        anexoPage: 17,
      }
    ]
  },
  {
    id: 'cat4',
    name: 'Categoría 4: Conservación del Ambiente Acuático',
    shortName: 'Cat. 4: Conservación Ambiente Acuático',
    description: 'Cuerpos de agua en ecosistemas frágiles, áreas protegidas (ANP) y amortiguamiento.',
    articleRef: 'Art. 3.4 del D.S. N° 004-2017-MINAM',
    anexoPages: [18, 19],
    subcategories: [
      {
        id: 'E1',
        code: 'E1',
        name: 'E1: Lagunas y lagos',
        category: 'cat4',
        description: 'Cuerpos naturales de agua lénticos sin corriente continua, incluyendo humedales.',
        applicableUses: ['Conservación de lagos, lagunas altoandinas, humedales y cochas'],
        articleRef: 'Art. 3.4.a) E1',
        anexoPage: 18,
      },
      {
        id: 'E2-CS',
        code: 'E2 (Costa y Sierra)',
        name: 'E2: Ríos de costa y sierra',
        category: 'cat4',
        description: 'Ríos de vertientes del Pacífico, Titicaca y vertiente oriental sobre 600 msnm.',
        applicableUses: ['Conservación de ríos andinos y de cuencas de la costa (>600 msnm)'],
        articleRef: 'Art. 3.4.b) E2 Costa y Sierra',
        anexoPage: 18,
      },
      {
        id: 'E2-S',
        code: 'E2 (Selva)',
        name: 'E2: Ríos de selva',
        category: 'cat4',
        description: 'Ríos y afluentes amazónicos en llanura aluvial por debajo de los 600 msnm.',
        applicableUses: ['Conservación de ríos amazónicos y llanura aluvial (<600 msnm)'],
        articleRef: 'Art. 3.4.b) E2 Selva',
        anexoPage: 18,
      },
      {
        id: 'E3-Estuarios',
        code: 'E3 (Estuarios)',
        name: 'E3: Ecosistemas costeros - Estuarios',
        category: 'cat4',
        description: 'Zonas de mezcla de agua de mar y ríos hasta el límite de marea, marismas y manglares.',
        applicableUses: ['Conservación de estuarios, manglares (ej. Tumbes) y marismas'],
        articleRef: 'Art. 3.4.c) E3 Estuarios',
        anexoPage: 18,
      },
      {
        id: 'E3-Marinos',
        code: 'E3 (Marinos)',
        name: 'E3: Ecosistemas costeros - Marinos',
        category: 'cat4',
        description: 'Ámbito marino desde la línea de baja marea hasta el límite del mar territorial.',
        applicableUses: ['Conservación de ecosistemas marino costeros y mar territorial'],
        articleRef: 'Art. 3.4.c) E3 Marinos',
        anexoPage: 18,
      }
    ]
  }
];

export const CATEGORIES = OFFICIAL_CATEGORIES;

export function getAllSubcategories(): SubcategoryInfo[] {
  return OFFICIAL_CATEGORIES.flatMap(c => c.subcategories);
}

export function getSubcategoryById(id: string): SubcategoryInfo | undefined {
  return getAllSubcategories().find(s => s.id === id);
}

export function getCategoryBySubcategoryId(subId: string): CategoryInfo | undefined {
  return OFFICIAL_CATEGORIES.find(c => c.subcategories.some(s => s.id === subId));
}
