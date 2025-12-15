import React from 'react';
import { 
  Store, 
  Warehouse, 
  Building, 
  Building2, 
  Hotel, 
  Factory, 
  Trees, 
  Castle,
  HelpCircle
} from 'lucide-react';

interface Props {
  iconName: string;
  size?: number;
  className?: string;
}

export const BuildingIcon: React.FC<Props> = ({ iconName, size = 24, className = "" }) => {
  switch (iconName) {
    case 'Store': return <Store size={size} className={className} />;
    case 'Warehouse': return <Warehouse size={size} className={className} />;
    case 'Building': return <Building size={size} className={className} />;
    case 'Building2': return <Building2 size={size} className={className} />;
    case 'Hotel': return <Hotel size={size} className={className} />;
    case 'Factory': return <Factory size={size} className={className} />;
    case 'Trees': return <Trees size={size} className={className} />;
    case 'Castle': return <Castle size={size} className={className} />;
    default: return <HelpCircle size={size} className={className} />;
  }
};