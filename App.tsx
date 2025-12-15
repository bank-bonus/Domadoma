import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { PlacedBuilding, BuildingType, GameState } from './types';
import { BUILDINGS, GAME_TICK_MS } from './constants';
import { CityView } from './components/CityView';
import { ControlPanel } from './components/ControlPanel';
import { AdvisorModal } from './components/AdvisorModal';
import { getCityAdvice } from './services/geminiService';
import { Wallet, Users, Info, Sparkles } from 'lucide-react';

const INITIAL_STATE: GameState = {
  money: 0,
  population: 0,
  buildings: [],
  lifetimeEarnings: 0,
};

function App() {
  // State
  const [money, setMoney] = useState(INITIAL_STATE.money);
  const [population, setPopulation] = useState(INITIAL_STATE.population);
  const [buildings, setBuildings] = useState<PlacedBuilding[]>(INITIAL_STATE.buildings);
  
  // Floating text state for manual clicks
  const [clickEffects, setClickEffects] = useState<{id: number, x: number, y: number, value: number}[]>([]);

  // Advisor State
  const [isAdvisorOpen, setIsAdvisorOpen] = useState(false);
  const [advisorMessage, setAdvisorMessage] = useState("");
  const [isAdvisorLoading, setIsAdvisorLoading] = useState(false);

  // Derived Statistics
  const incomePerSecond = useMemo(() => {
    return buildings.reduce((acc, b) => acc + BUILDINGS[b.type].baseIncome, 0);
  }, [buildings]);

  // Load Game
  useEffect(() => {
    const saved = localStorage.getItem('panelka_save_v1');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        setMoney(parsed.money || 0);
        setBuildings(parsed.buildings || []);
        setPopulation(parsed.population || 0);
      } catch (e) {
        console.error("Failed to load save", e);
      }
    }
  }, []);

  // Save Game
  useEffect(() => {
    const saveData: GameState = {
      money,
      population,
      buildings,
      lifetimeEarnings: 0
    };
    localStorage.setItem('panelka_save_v1', JSON.stringify(saveData));
  }, [money, population, buildings]);

  // Game Loop (Passive Income)
  useEffect(() => {
    const interval = setInterval(() => {
      if (incomePerSecond > 0) {
        setMoney(prev => prev + incomePerSecond);
      }
    }, GAME_TICK_MS);
    return () => clearInterval(interval);
  }, [incomePerSecond]);

  // Handlers
  const handleBuy = useCallback((type: BuildingType) => {
    const def = BUILDINGS[type];
    if (money >= def.baseCost) {
      setMoney(prev => prev - def.baseCost);
      setPopulation(prev => prev + def.population);
      
      const newBuilding: PlacedBuilding = {
        id: Date.now().toString() + Math.random().toString(),
        type: type,
        builtAt: Date.now()
      };
      
      setBuildings(prev => [...prev, newBuilding]);
    }
  }, [money]);

  const handleManualClick = useCallback((e: React.MouseEvent) => {
    // Base click value + small bonus based on population
    const clickValue = 1 + Math.floor(population / 50);
    
    setMoney(prev => prev + clickValue);

    // Visual effect
    const newEffect = {
      id: Date.now(),
      x: e.clientX,
      y: e.clientY,
      value: clickValue
    };
    
    setClickEffects(prev => [...prev, newEffect]);
    
    // Cleanup effect after animation
    setTimeout(() => {
      setClickEffects(prev => prev.filter(eff => eff.id !== newEffect.id));
    }, 800);
  }, [population]);

  const handleAskAdvisor = async () => {
    setIsAdvisorOpen(true);
    setIsAdvisorLoading(true);
    setAdvisorMessage(""); // Clear previous
    
    const advice = await getCityAdvice(money, population, buildings);
    
    setAdvisorMessage(advice);
    setIsAdvisorLoading(false);
  };

  return (
    <div className="h-screen w-full flex flex-col bg-gray-200 font-sans text-gray-900 overflow-hidden">
      
      {/* HEADER */}
      <header className="bg-slate-800 text-white p-3 shadow-lg z-20 flex justify-between items-center sticky top-0">
        <div className="flex flex-col">
          <h1 className="font-bold text-lg leading-tight text-yellow-400 font-mono tracking-tighter">СИМУЛЯТОР ПАНЕЛЬКИ</h1>
          <span className="text-[10px] text-slate-400 uppercase tracking-widest">Yandex Edition</span>
        </div>

        <div className="flex gap-4 text-sm font-mono">
          <div className="flex flex-col items-end">
             <div className="flex items-center gap-1.5 text-green-400 font-bold text-lg">
                <Wallet size={18} />
                {Math.floor(money).toLocaleString()} ₽
             </div>
             <div className="text-[10px] text-slate-400">Бюджет</div>
          </div>
          
          <div className="flex flex-col items-end">
             <div className="flex items-center gap-1.5 text-blue-300 font-bold text-lg">
                <Users size={18} />
                {population.toLocaleString()}
             </div>
             <div className="text-[10px] text-slate-400">Жители</div>
          </div>
        </div>
      </header>

      {/* FLOATING CLICK EFFECTS */}
      {clickEffects.map(effect => (
        <div 
          key={effect.id}
          className="fixed pointer-events-none text-green-600 font-bold text-2xl z-50 animate-[ping_0.8s_ease-out_reverse] select-none"
          style={{ top: effect.y - 40, left: effect.x }}
        >
          +{effect.value}
        </div>
      ))}

      {/* MAIN GAME VIEW */}
      <CityView buildings={buildings} onManualClick={handleManualClick} />

      {/* ADVISOR BUTTON (Floating) */}
      <button 
        onClick={handleAskAdvisor}
        className="absolute bottom-[35%] right-4 z-20 bg-gradient-to-br from-indigo-500 to-purple-600 text-white p-3 rounded-full shadow-lg hover:scale-110 active:scale-95 transition-all border-2 border-white"
        title="Спросить советника"
      >
        <Sparkles size={24} />
      </button>

      {/* CONTROLS */}
      <ControlPanel 
        money={money} 
        onBuy={handleBuy} 
        income={incomePerSecond} 
      />

      {/* MODALS */}
      <AdvisorModal 
        isOpen={isAdvisorOpen} 
        onClose={() => setIsAdvisorOpen(false)} 
        isLoading={isAdvisorLoading}
        message={advisorMessage}
      />
    </div>
  );
}

export default App;