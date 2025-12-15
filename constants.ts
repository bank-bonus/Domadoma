import { BuildingDef, BuildingType } from './types';

export const GAME_TICK_MS = 1000;
export const AUTO_SAVE_MS = 30000;

export const BUILDINGS: Record<BuildingType, BuildingDef> = {
  [BuildingType.KIOSK]: {
    id: BuildingType.KIOSK,
    name: "Ларёк с шавермой",
    description: "Источник пищи и культуры района.",
    baseCost: 100,
    baseIncome: 1,
    population: 0,
    iconName: "Store",
    color: "bg-orange-200 border-orange-400"
  },
  [BuildingType.GARAGE]: {
    id: BuildingType.GARAGE,
    name: "Гаражный кооператив",
    description: "Мужской клуб по интересам.",
    baseCost: 500,
    baseIncome: 4,
    population: 0,
    iconName: "Warehouse",
    color: "bg-stone-300 border-stone-500"
  },
  [BuildingType.KHRUSHCHEVKA]: {
    id: BuildingType.KHRUSHCHEVKA,
    name: "Хрущёвка",
    description: "Пятиэтажная классика. Тесно, но уютно.",
    baseCost: 1200,
    baseIncome: 10,
    population: 50,
    iconName: "Building",
    color: "bg-yellow-100 border-yellow-300"
  },
  [BuildingType.BREZHNEVKA]: {
    id: BuildingType.BREZHNEVKA,
    name: "Брежневка",
    description: "Улучшенная планировка, 9 этажей.",
    baseCost: 3500,
    baseIncome: 35,
    population: 120,
    iconName: "Building2",
    color: "bg-gray-300 border-gray-400"
  },
  [BuildingType.PANELKA_9]: {
    id: BuildingType.PANELKA_9,
    name: "Панелька П-44",
    description: "Легендарная серия домов. Бетон и грусть.",
    baseCost: 10000,
    baseIncome: 90,
    population: 300,
    iconName: "Hotel",
    color: "bg-blue-100 border-blue-300"
  },
  [BuildingType.FACTORY]: {
    id: BuildingType.FACTORY,
    name: "Завод ЖБИ",
    description: "Даёт рабочие места и загрязняет воздух.",
    baseCost: 25000,
    baseIncome: 250,
    population: 0,
    iconName: "Factory",
    color: "bg-red-200 border-red-400"
  },
  [BuildingType.PARK]: {
    id: BuildingType.PARK,
    name: "Сквер с Лениным",
    description: "Место для прогулок и размышлений.",
    baseCost: 5000,
    baseIncome: 15, // Tourism/Happiness converted to money
    population: 0,
    iconName: "Trees",
    color: "bg-green-200 border-green-500"
  },
  [BuildingType.MODERN_TOWER]: {
    id: BuildingType.MODERN_TOWER,
    name: "ЖК «Элитный»",
    description: "Человейник на 25 этажей.",
    baseCost: 100000,
    baseIncome: 1200,
    population: 1500,
    iconName: "Castle",
    color: "bg-indigo-200 border-indigo-400"
  }
};