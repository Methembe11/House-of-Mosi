import { useState, useCallback, useEffect } from 'react';

export function useTripPlanner() {
  const [trip, setTrip] = useState(() => {
    try {
      const saved = localStorage.getItem('mosi_trip');
      return saved ? JSON.parse(saved) : {
        id: Date.now(),
        name: 'My Victoria Falls Journey',
        createdAt: Date.now(),
        updatedAt: Date.now(),
        components: {
          stays: [],
          experiences: [],
          dining: [],
          transfers: []
        },
        dates: {
          checkIn: '',
          checkOut: ''
        },
        travelers: {
          adults: 2,
          children: 0
        },
        budget: null,
        interests: []
      };
    } catch {
      return {
        id: Date.now(),
        name: 'My Victoria Falls Journey',
        createdAt: Date.now(),
        updatedAt: Date.now(),
        components: {
          stays: [],
          experiences: [],
          dining: [],
          transfers: []
        },
        dates: {
          checkIn: '',
          checkOut: ''
        },
        travelers: {
          adults: 2,
          children: 0
        },
        budget: null,
        interests: []
      };
    }
  });

  // Save to localStorage whenever trip changes
  useEffect(() => {
    trip.updatedAt = Date.now();
    localStorage.setItem('mosi_trip', JSON.stringify(trip));
  }, [trip]);

  const addComponent = useCallback((type, item) => {
    setTrip(prev => {
      // Avoid duplicates
      const exists = prev.components[type].some(i => i.id === item.id);
      if (exists) return prev;
      
      const newComponents = {
        ...prev.components,
        [type]: [...prev.components[type], { ...item, addedAt: Date.now() }]
      };
      
      return {
        ...prev,
        components: newComponents,
        updatedAt: Date.now()
      };
    });
  }, []);

  const removeComponent = useCallback((type, id) => {
    setTrip(prev => {
      const newComponents = {
        ...prev.components,
        [type]: prev.components[type].filter(i => i.id !== id)
      };
      
      return {
        ...prev,
        components: newComponents,
        updatedAt: Date.now()
      };
    });
  }, []);

  const updateTripInfo = useCallback((updates) => {
    setTrip(prev => ({
      ...prev,
      ...updates,
      updatedAt: Date.now()
    }));
  }, []);

  const clearTrip = useCallback(() => {
    setTrip({
      id: Date.now(),
      name: 'My Victoria Falls Journey',
      createdAt: Date.now(),
      updatedAt: Date.now(),
      components: {
        stays: [],
        experiences: [],
        dining: [],
        transfers: []
      },
      dates: {
        checkIn: '',
        checkOut: ''
      },
      travelers: {
        adults: 2,
        children: 0
      },
      budget: null,
      interests: []
    });
    localStorage.removeItem('mosi_trip');
  }, []);

  // Calculate totals
  const getTotalNights = useCallback(() => {
    if (!trip.dates.checkIn || !trip.dates.checkOut) return 0;
    const checkIn = new Date(trip.dates.checkIn);
    const checkOut = new Date(trip.dates.checkOut);
    const timeDiff = checkOut - checkIn;
    return Math.ceil(timeDiff / (1000 * 3600 * 24));
  }, [trip.dates]);

  const getEstimatedCost = useCallback(() => {
    let total = 0;
    
    // Accommodation cost
    const nights = getTotalNights();
    trip.components.stays.forEach(stay => {
      total += (stay.priceFrom || 0) * nights;
    });
    
    // Experiences
    trip.components.experiences.forEach(exp => {
      total += (exp.priceFrom || 0);
    });
    
    // Dining (estimated per person per meal)
    trip.components.dining.forEach(dine => {
      // Assume 2 meals per day per person
      total += (dine.pricePerPerson || 0) * 2 * nights * trip.travelers.adults;
    });
    
    // Transfers (one-time)
    trip.components.transfers.forEach(trans => {
      // Assuming transfers have price or we estimate
      total += (trans.price || 50); // Default airport transfer estimate
    });
    
    return total;
  }, [trip.components.stays, trip.components.experiences, trip.components.dining, 
        trip.components.transfers, trip.travelers.adults, getTotalNights]);

  const getTripSummary = useCallback(() => {
    return {
      id: trip.id,
      name: trip.name,
      nights: getTotalNights(),
      travelers: trip.travelers,
      estimatedCost: getEstimatedCost(),
      components: {
        stays: trip.components.stays.length,
        experiences: trip.components.experiences.length,
        dining: trip.components.dining.length,
        transfers: trip.components.transfers.length
      },
      updatedAt: trip.updatedAt
    };
  }, [trip, getTotalNights, getEstimatedCost]);

  // Collection (saved items)
  const [collection, setCollection] = useState(() => {
    try {
      const saved = localStorage.getItem('mosi_collection');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem('mosi_collection', JSON.stringify(collection));
  }, [collection]);

  const toggleCollection = useCallback((item) => {
    setCollection(prev => {
      const exists = prev.some(i => i.id === item.id);
      if (exists) {
        return prev.filter(i => i.id !== item.id);
      }
      return [...prev, item];
    });
  }, []);

  const isInCollection = useCallback((id) => {
    return collection.some(i => i.id === id);
  }, [collection]);

  return { 
    trip, 
    setTrip: updateTripInfo,
    addComponent,
    removeComponent,
    clearTrip,
    getTripSummary,
    getTotalNights,
    getEstimatedCost,
    collection,
    toggleCollection,
    isInCollection
  };
}
