import { Octokit } from "octokit";
import { GithubProfile } from "../../types/GithubProfile";

// Utilisation d'Octokit sur recommandation de la documentation de Github
// pour effectuer des requêtes sur l'API
// Création d'une instance d'Octokit avec un token d'authentification personnel Github
const octokit = new Octokit({
  auth: process.env.REACT_APP_GITHUB_ACCESS_TOKEN
});

// Adaptation des fonctions d'exemple de la documentation de Github
// https://docs.github.com/en/rest/using-the-rest-api/using-pagination-in-the-rest-api?apiVersion=2022-11-28

// getUsers retourne un objet contenant les utilisateurs, le nombre total d'utilisateurs et l'URL de la page suivante
export const getUsers = async (url: string) => {
  const nextUrlPattern = /(?<=<)([\S]*)(?=>; rel="Next")/i;

  const response = await octokit.request(`GET ${url}`, {
    headers: {
      "X-GitHub-Api-Version":
        "2022-11-28",
    },
  });

  const totalItems: number = response.data.total_count;
  const users: GithubProfile[] = response.data.items;
  const linkHeader = response.headers.link;

  const pagesRemaining = linkHeader && linkHeader.includes(`rel="next"`);
  let nextUrl: string = "";
  if (pagesRemaining) {
    nextUrl = linkHeader.match(nextUrlPattern)![0] || "";
  }


  return { totalItems, users, nextUrl };
}