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


  // La fonction fetchGithub permet de faire une requête à l'API Github
  // C'est la fonction qui est appelée lorsque l'utilisateur tape un nom d'utilisateur
  // cette fonctio est appelée dans le useEffect ci-dessus avec un délai de 300ms
  // Ce delais permet d'éviter de faire une requête à chaque fois que l'utilisateur
  // tape une lettre dans le champ de recherche. C'est un "debounce" fait maison.
  const fetchGithub = async (username: string) => {
    setNextPageUrl("");
    setSearchLoading(true);
    if (username === "") {
      setSearchResults([]);
      setHasSearched(false);
      setSearchLoading(false);
      return;
    }

    setHasSearched(true);

    try {
      // La fonction getUsers est une fonction qui se trouve dans le fichier src/helpers/api/getUsers.ts
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

  }

  // La fonction loadMore permet de charger plus de résultats s'il en existe.
  // Elle est appelée lorsque l'utilisateur clique sur le bouton "LOAD MORE"
  // et se base sur l'existance d'une URL de requête suivante fournis lors de
  // la première recherche.
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

  // Les fonctions addSelectedElement et removeSelectedElement permettent d'ajouter
  // ou de supprimer un élément de la liste des éléments sélectionnés.
  const addSelectedElement = (element: GithubProfile) => {
    setSelectedElements([...selectedElements, element]);
  }

  const removeSelectedElement = (element: GithubProfile) => {
    setSelectedElements(selectedElements.filter((selectedElement: GithubProfile) => selectedElement.id !== element.id));
  }

  // La fonction selectAllElements permet de sélectionner tous les éléments de la liste
  const selectAllElements = () => {
    setSelectedElements(searchResults);
  }


  const value = {
    searchResults,
    fetchGithub,
    hasSearched,
    selectedElements,
    addSelectedElement,
    removeSelectedElement,
    selectAllElements,
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