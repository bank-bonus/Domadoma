import React from 'react';
import { BuildingType } from '../types';
import { BUILDINGS } from '../constants';
import { BuildingIcon } from './BuildingIcon';
import { Hammer, Users, Banknote } from 'lucide-react';

interface ControlPanelProps {
  money: number;
  onBuy: (type: BuildingType) => void;
  income: number;
}

export const ControlPanel: React.FC<ControlPanelProps> = ({ money, onBuy, income }) => {
  return (
    <div className="bg-white border-t border-gray-300 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.1)] h-1/2 md:h-1/3 flex flex-col">
      <div className="px-4 py-2 bg-gray-100 border-b border-gray-200 flex justify-between items-center text-xs text-gray-500 uppercase tracking-wider font-bold">
        <span>Стройтрест №1</span>
        <span className="flex items-center gap-1">
          <Banknote size={14} />
          {income} ₽/сек
        </span>
      </div>

      <div className="flex-1 overflow-y-auto p-4 grid gap-3 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {Object.values(BUILDINGS).map((building) => {
          const canAfford = money >= building.baseCost;
          return (
            <button
              key={building.id}
              onClick={() => onBuy(building.id)}
              disabled={!canAfford}
              className={`
                relative flex items-center p-3 rounded-lg border-2 text-left transition-all
                ${canAfford 
                  ? 'border-gray-300 bg-white hover:border-blue-500 hover:shadow-md active:scale-95' 
                  : 'border-gray-100 bg-gray-50 opacity-60 cursor-not-allowed grayscale'
                }
              `}
            >
              <div className={`p-2 rounded-md mr-3 ${building.color} bg-opacity-50`}>
                <BuildingIcon iconName={building.iconName} size={24} className="text-gray-700" />
              </div>
              
              <div className="flex-1">
                <div className="font-bold text-gray-800 text-sm leading-tight mb-0.5">
                  {building.name}
                </div>
                <div className="text-xs text-gray-500 leading-tight mb-1">
                  {building.description}
                </div>
                <div className="flex items-center gap-3 text-xs font-mono">
                  <span className={`${canAfford ? 'text-green-600 font-bold' : 'text-red-400'}`}>
                    {building.baseCost.toLocaleString()} ₽
                  </span>
                  <span className="text-blue-600 flex items-center gap-0.5">
                    +{building.baseIncome}/с
                  </span>
                  {building.population > 0 && (
                    <span className="text-orange-600 flex items-center gap-0.5">
                      <Users size={10} /> {building.population}
                    </span>
                  )}
                </div>
              </div>

              {!canAfford && (
                <div className="absolute top-2 right-2">
                   <Hammer size={12} className="text-gray-300" />
                </div>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
};