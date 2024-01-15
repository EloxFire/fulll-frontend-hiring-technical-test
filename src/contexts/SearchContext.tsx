import { Octokit } from 'octokit';
import React, { useState, useEffect, ReactNode, createContext } from 'react';
import { GithubProfile } from '../types/GithubProfile';
import { getPaginatedUsers } from '../helpers/api/getUsers';

// Création d'un contexte pour la recherche afin de pouvoir y accéder depuis n'importe ou dand le projet
export const SearchContext = createContext<any>({});

// Création d'une interface pour typer les props du composent SearchProvider
interface SearchProviderProps {
  children: ReactNode
}

// Création d'un composent SearchProvider qui va permettre de fournir les informations de recherche à l'ensemble de l'application
export function SearchProvider({ children }: SearchProviderProps) {

  const [searchTerm, setSearchTerm] = useState<string>("");
  const [searchResults, setSearchResults] = useState<GithubProfile[]>([]);
  const [hasSearched, setHasSearched] = useState<boolean>(false);
  const [selectedElements, setSelectedElements] = useState<GithubProfile[]>([]);
  const [searchError, setSearchError] = useState<string>("");

  useEffect(() => {
    // Création d'un délai de 300ms avant de lancer la requête
    let debouncedFetch: ReturnType<typeof setTimeout>;
    debouncedFetch = setTimeout(() => {

      fetchGithub(searchTerm);
    }, 300)
    return () => clearTimeout(debouncedFetch);
  }, [searchTerm])


  const fetchGithub = async (username: string) => {
    if (username === "") {
      setSearchResults([]);
      setHasSearched(false);
      return;
    } else {
      setHasSearched(true);
    }

    try {
      const data = await getPaginatedUsers(username);
      console.log(data);
      setSearchResults(data);

    } catch (error) {
      console.log(error);
      // setSearchError(error.message);
    }
  }

  const addSelectedElement = (element: GithubProfile) => {
    setSelectedElements([...selectedElements, element]);
  }

  const removeSelectedElement = (element: GithubProfile) => {
    setSelectedElements(selectedElements.filter((selectedElement: GithubProfile) => selectedElement.id !== element.id));
  }


  const value = {
    searchResults,
    fetchGithub,
    hasSearched,
    selectedElements,
    addSelectedElement,
    removeSelectedElement,
    searchTerm,
    setSearchTerm,
  }

  return (
    <SearchContext.Provider value={value}>
      {children}
    </SearchContext.Provider>
  )
}