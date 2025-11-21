import React from 'react';
import type { FooterData, HeroData } from '@/mock/data';
import type { HijriDate } from '@/utils/hijri';

interface AboutData {
  paragraphOne: string;
  paragraphTwo: string;
  services: { title: string; body: string }[];
}

interface PortfolioContextType {
  hero?: HeroData;
  hijri?: HijriDate;
  footer?: FooterData;
  about?: AboutData;
}

const PortfolioContext = React.createContext<PortfolioContextType | undefined>(undefined);

export const PortfolioProvider = PortfolioContext.Provider;
export const PortfolioConsumer = PortfolioContext.Consumer;

export default PortfolioContext;
export type { PortfolioContextType };
