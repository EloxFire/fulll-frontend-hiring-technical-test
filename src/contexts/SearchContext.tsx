import React, { useState, useEffect, ReactNode, createContext } from 'react';

// Création d'un contexte pour la recherche afin de pouvoir y accéder depuis n'importe ou dand le projet
export const SearchContext = createContext<any>({});

// Création d'une interface pour typer les props du composent SearchProvider
interface SearchProviderProps {
  children: ReactNode
}

// Création d'un composent SearchProvider qui va permettre de fournir les informations de recherche à l'ensemble de l'application
export function SearchProvider({ children }: SearchProviderProps) {

  const [searchResults, setSearchResults] = useState<any>([]);


  useEffect(() => {

  }, []);


  const value = {
    searchResults,
  }

  return (
    <SearchContext.Provider value={value}>
      {children}
    </SearchContext.Provider>
  )
}