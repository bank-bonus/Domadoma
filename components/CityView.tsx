import React, { useRef, useEffect } from 'react';
import { PlacedBuilding } from '../types';
import { BUILDINGS } from '../constants';
import { BuildingIcon } from './BuildingIcon';

interface CityViewProps {
  buildings: PlacedBuilding[];
  onManualClick: (e: React.MouseEvent) => void;
}

export const CityView: React.FC<CityViewProps> = ({ buildings, onManualClick }) => {
  const containerRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom when new building is added
  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTop = containerRef.current.scrollHeight;
    }
  }, [buildings.length]);

  return (
    <div 
      className="flex-1 bg-gray-200 relative overflow-hidden flex flex-col items-center"
      onClick={onManualClick}
    >
      {/* Sky/Background atmosphere */}
      <div className="absolute inset-0 bg-gradient-to-b from-gray-300 via-gray-200 to-gray-300 pointer-events-none opacity-50" />
      
      {/* Clouds / Smog */}
      <div className="absolute top-10 left-10 text-gray-400 opacity-40 animate-pulse">☁️</div>
      <div className="absolute top-20 right-20 text-gray-400 opacity-30 animate-pulse delay-700">☁️</div>

      {/* The City Container */}
      <div 
        ref={containerRef}
        className="w-full max-w-4xl h-full overflow-y-auto p-4 z-10 scroll-smooth pb-32"
      >
        {buildings.length === 0 && (
          <div className="h-full flex flex-col items-center justify-center text-gray-500 text-center opacity-70">
            <BuildingIcon iconName="Trees" size={64} className="mb-4" />
            <p className="text-xl font-bold">Чистое поле</p>
            <p className="text-sm">Кликай, чтобы заработать первые рубли!</p>
          </div>
        )}

        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-2">
          {buildings.map((building) => {
            const def = BUILDINGS[building.type];
            return (
              <div 
                key={building.id}
                className={`
                  aspect-square flex flex-col items-center justify-center 
                  rounded-sm border-b-4 shadow-sm relative group
                  transition-transform hover:scale-105
                  ${def.color}
                `}
                title={def.name}
              >
                <BuildingIcon iconName={def.iconName} size={32} className="text-gray-700 opacity-80" />
                {/* Windows/Texture overlay effect */}
                <div className="absolute inset-x-2 bottom-2 top-1/2 flex flex-wrap gap-0.5 justify-center opacity-30">
                  <div className="w-1 h-1 bg-black rounded-full" />
                  <div className="w-1 h-1 bg-black rounded-full" />
                  <div className="w-1 h-1 bg-yellow-300 rounded-full animate-pulse" />
                  <div className="w-1 h-1 bg-black rounded-full" />
                </div>
              </div>
            );
          })}
        </div>
      </div>
      
      {/* Click effect feedback could go here */}
    </div>
  );
};