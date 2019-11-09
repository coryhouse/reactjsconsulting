import React from 'react';

export type Language = 'English' | 'Español';
export const InternationalizationContext = React.createContext<{
  language: Language;
  setLanguage: (l: Language) => void;
}>({
  language: 'English',
  setLanguage: () => {}
});
