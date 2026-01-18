export interface Cupon {
  id: number;
  title: string;
  emoji: string;
  description: string;
  isRedeemed: boolean;
  terms?: string;
  cooldownHours?: number;   
  lastRedeemed?: number;    
  requiresInput?: boolean;  
  userNote?: string;
}