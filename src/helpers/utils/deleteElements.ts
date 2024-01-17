import { GithubProfile } from './../../types/GithubProfile';

// La fonction deleteElements prends en paramèttre un tableau d'objets GithubProfile et un tableau
// des des éléments à supprimer. Elle retourne un tableau d'objets GithubProfile sans les éléments
export const deleteElements = (baseArray: GithubProfile[], elements: GithubProfile[]) => {
  const newArray = baseArray.filter((element) => {
    return !elements.includes(element);
  });

  console.log(newArray);


  return newArray;
}