import React, { useState, useEffect, ReactNode, createContext } from 'react';
import { GithubProfile } from '../types/GithubProfile';
import { getUsers } from '../helpers/api/getUsers';

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
  const [searchLoading, setSearchLoading] = useState<boolean>(false);
  const [moreLoading, setMoreLoading] = useState<boolean>(false);
  const [nextPageUrl, setNextPageUrl] = useState<string>("");
  const [totalItems, setTotalItems] = useState<number>(0);

  useEffect(() => {
    // Création d'un délai de 300ms avant de lancer la requête
    let debouncedFetch: ReturnType<typeof setTimeout>;
    debouncedFetch = setTimeout(() => {

      fetchGithub(searchTerm);
    }, 300)
    return () => clearTimeout(debouncedFetch);
  }, [searchTerm])


  const fetchGithub = async (username: string) => {
    setSearchLoading(true);
    if (username === "") {
      setSearchResults([]);
      setHasSearched(false);
      setSearchLoading(false);
      return;
    } else {
      setHasSearched(true);
    }

    if (nextPageUrl === "") {

      try {
        const { users, nextUrl, totalItems } = await getUsers(`/search/users?q=${username}`);
        setSearchResults(users);
        setNextPageUrl(nextUrl);
        setSearchLoading(false);
        setTotalItems(totalItems);
      } catch (error) {
        console.log(error);
        setSearchError("Une erreur est survenue lors de la recherche...");
        setSearchLoading(false);
      }
    } else {

    }

  }

  const loadMore = async () => {
    if (nextPageUrl === "") return;

    setMoreLoading(true);
    try {
      const { users, nextUrl, totalItems } = await getUsers(nextPageUrl);
      setSearchResults([...searchResults, ...users]);
      setNextPageUrl(nextUrl);
      setMoreLoading(false);
      setTotalItems(totalItems);
    } catch (error) {
      console.log(error);
      setSearchError("Une erreur est survenue lors de la recherche...");
      setMoreLoading(false);
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
    searchError,
    searchLoading,
    totalItems,
    loadMore,
    moreLoading
  }

  return (
    <SearchContext.Provider value={value}>
      {children}
    </SearchContext.Provider>
  )
}