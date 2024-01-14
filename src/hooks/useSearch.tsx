import { useContext } from "react";
import { SearchContext } from "../contexts/SearchContext";

// Création d'un hook qui nous met a disposition toutes les fonctions de recherche nécéssaires
export function useSearch() {
  return useContext(SearchContext);
}