import { GithubProfile } from '../../types/GithubProfile';

// La fonction duplicateElement prend en paramètre un tableau d'objets GithubProfile et un tableau
// des éléments à dupliquer. Elle retourne un tableau d'objets GithubProfile avec les éléments
// dupliqués.
export const duplicateElements = (baseArray: GithubProfile[], elements: GithubProfile[]) => {
  const duplicatedElements: GithubProfile[] = [];

  elements.forEach((element) => {
    const elementToDuplicate = baseArray.find((item) => item.id === element.id);
    if (elementToDuplicate) {
      duplicatedElements.push(elementToDuplicate);
    }
  });

  const newArray = [...baseArray, ...duplicatedElements];
  return newArray;

}