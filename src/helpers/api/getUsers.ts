import { Octokit } from "octokit";
import { GithubProfile } from "../../types/GithubProfile";

// Utilisation d'Octokit sur recommandation de la documentation de Github
// pour effectuer des requêtes sur l'API
// Création d'une instance d'Octokit avec un token d'authentification personnel Github
const octokit = new Octokit({
  auth: process.env.REACT_APP_GITHUB_ACCESS_TOKEN
});

// Récupération et adaptation des fonctions d'exemple de la documentation de Github
// GetPaginatedUsers permet de récupérer les utilisateurs Github en fonction d'un username
// L'API Github ne permettant pas de récupérer plus de 30 utilisateurs par requête
// On utilise une boucle while pour récupérer tous les utilisateurs via la pagination de la requete
//
// https://docs.github.com/en/rest/using-the-rest-api/using-pagination-in-the-rest-api?apiVersion=2022-11-28

export const getUsers = async (username: string) => {
  const response = await octokit.request(`GET /search/users?q=${username}`, {
    headers: {
      "X-GitHub-Api-Version":
        "2022-11-28",
    },
  });

  console.log(response.data);
}

export async function getPaginatedUsers(username: string) {
  const nextPattern = /(?<=<)([\S]*)(?=>; rel="Next")/i;
  let pagesRemaining: boolean | string | undefined = true;
  let data: GithubProfile[] = [];
  let url = `/search/users?q=${username}`;

  while (pagesRemaining) {
    const response = await octokit.request(`GET ${url}`, {
      per_page: 100,
      headers: {
        "X-GitHub-Api-Version":
          "2022-11-28",
      },
    });

    console.log(response.data);

    const parsedData = parseData(response.data)
    console.log(parsedData);

    data = [...data, ...parsedData];

    const linkHeader = response.headers.link;

    pagesRemaining = linkHeader && linkHeader.includes(`rel="next"`);

    if (pagesRemaining) {
      url = linkHeader!.match(nextPattern)![0];
    }
  }

  return data;
}

// ParseData permet de récupérer les données de la requête
// et de les mettre en forme (si besoin) pour les utiliser dans l'application
function parseData(data: any) {
  if (Array.isArray(data)) {
    return data
  }

  // Selon la documentation de Github, certaines requêtes peuvent renvoyer
  // une réponse vide (204). Dans ce cas, on renvoie un tableau vide
  if (!data) {
    return []
  }

  // // Otherwise, the array of items that we want is in an object
  // // Delete keys that don't include the array of items
  delete data.incomplete_results;
  delete data.repository_selection;
  delete data.total_count;
  // Pull out the array of items
  const namespaceKey = Object.keys(data)[0];
  data = data[namespaceKey];

  return data;
}