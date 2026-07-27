import React, { createContext, useContext, useState } from 'react';

const JourneyContext = createContext(null);

export function JourneyProvider({ children }) {
  const [selections, setSelections] = useState({
    season: null,
    tracks: [],
    budget: null,
  });

  return (
    <JourneyContext.Provider value={{ selections, setSelections }}>
      {children}
    </JourneyContext.Provider>
  );
}

export function useJourney() {
  return useContext(JourneyContext);
}
