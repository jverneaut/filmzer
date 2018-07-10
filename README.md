# Filmzer — Quel film allez-vous regarder ce soir ?

Filmzer offre une solution à l'éternel problème du choix du film à regarder.

![Imgur](https://i.imgur.com/RnAa2UJ.png)

Que vous soyez seul ou accompagné, entrez votre liste de films à voir dans l'application et laissez la en choisir un pour vous. Elle affiche alors l'affiche, la note, la description et d'autres informations sur un film choisi aléatoirement parmis cette liste.

## Installation et lancement
```shell
git clone https://github.com/jverneaut/filmzer
cd filmzer && npm install
cd app && npm install
cd ..
npm run start
```

## Configuration

Cette application récupère les informations sur les films grâce à l'api de [themoviedb.org](https://www.themoviedb.org/).

Pour utiliser cette api, vous devez créer une clef [à cette adresse](https://developers.themoviedb.org/3).

Editez ensuite le fichier ```filmzer/app/.env.example``` et insérez votre clef à l'emplacement prévu à cet effet.
Renommez ensuite ce fichier ```.env.example``` en ```.env```.

## Editer la liste de films
La liste des films se trouve dans le fichier ```filmzer/app/src/films.json```. Pour ajouter un film, ajoutez une virgule à la fin de la liste puis écrivez son titre à la ligne entre guillemets.
```json
[
  "A bout de souffle",
  "Snwoden",
  "...",
  "mon nouveau titre de film"
]
```
