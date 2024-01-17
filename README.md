# Github Search
##### Fulll hiring technical test

Code écrit dans le but de répondre à un test technique pour un poste de développeur Web React chez Fulll.

#### Énoncé du test : https://github.com/fulll/hiring/blob/master/Frontend/github-user-search-junior.md

## Installation

```bash
git clone https://github.com/EloxFire/fulll-frontend-hiring-technical-test.git
```

```bash
npm install
```

## Usage

```bash
# Créer un fichier .env à la racine du projet et y ajouter la ligne suivante:
REACT_APP_GITHUB_TOKEN=YOUR_GITHUB_TOKEN

# Remplacer YOUR_GITHUB_TOKEN par votre token Github
Génération d'un token Github : Profile > Settings > Developer settings > Personal access tokens > Generate new token
```

```bash
npm start
```

## Léger écart par rapport à l'énoncé
Une librairie externe à été utilisé : Octokit.
Cette librairie est utilisée pour tous les appels à l'API Github sur recommandations de la documentation Github.
L'énoncé demandais d'essayer de ne pas utiliser de bibliothèque externe, j'ai décidé de suivre tout de même la documentation de l'API de Gitthub.

Voir plus : https://docs.github.com/en/rest/quickstart?apiVersion=2022-11-28