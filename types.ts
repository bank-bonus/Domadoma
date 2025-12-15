export enum BuildingType {
  KIOSK = 'KIOSK',
  GARAGE = 'GARAGE',
  KHRUSHCHEVKA = 'KHRUSHCHEVKA',
  BREZHNEVKA = 'BREZHNEVKA',
  PANELKA_9 = 'PANELKA_9',
  MODERN_TOWER = 'MODERN_TOWER',
  PARK = 'PARK',
  FACTORY = 'FACTORY'
}

export interface BuildingDef {
  id: BuildingType;
  name: string;
  description: string;
  baseCost: number;
  baseIncome: number; // Rubles per second
  population: number; // Adds to population
  iconName: string;
  color: string;
}

export interface PlacedBuilding {
  id: string; // Unique instance ID
  type: BuildingType;
  builtAt: number;
}

export interface GameState {
  money: number;
  population: number;
  buildings: PlacedBuilding[];
  lifetimeEarnings: number;
}