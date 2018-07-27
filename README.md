# Snaique

Le but de ce projet est de réaliser un petit jeu en Javascript :
[https://fr.wikipedia.org/wiki/Snake_(jeu_vid%C3%A9o)](snake).

## Introduction

### Scope

Pour commencer, nous allons devoir définir un périmètre (scope *in english*). Le
périmètre est l'ensemble des fonctionnalités devant être implémentées pour
pouvoir affirmer fièrement que le jeu est terminé.

Le joueur ouvre une page web, qui affiche un message de bienvenu, et l'invite à
commencer une partie en appuiant sur n'importe quelle touche de son clavier.

Lorsqu'il appuie sur une touche, alors le jeu commence. L'affichage d'une partie
est composée de :

- la tête du serpent
- le corps du serpent
- un fruit

Ces éléments sont disposés sur une grille (invisible), et les déplacements du
serpent se font de cases en cases.

La tête du serpent est initialement positionnée aléatoirement sur une case de la
grille. Son corps à une taille de 3 cases, situées à la droite de sa tête, sa
direction initiale est donc la gauche. Enfin, le fruit est lui aussi positionné
de aléatoirement sur une case la grille, qui n'est pas occupée le serpent.

Le jeu avance à intervalle de temps régulier (par exemple, 100ms). A chaque
intervalle, la tête du serpent avance dans une direction donnée, et chaque
élément composant son corps vient prendre la place de celui qui le précède, à
l'exception du premier qui prend l'ancienne place de la tête.

Si la tête du serpent passe par la position du fruit, alors le serpent "mange"
le fruit, et sa taille s'agrandit de 2. La tête et le corps du serpent
continuent à avancer, mais lors des deux prochaines frames la queue du serpent
n'avance pas, ce qui l'a fait grandir de 2 cases pendant 2 frames (ceci sera
réexpliqué).

Lorsque le joueur appuie sur les touches directionnelles du clavier, la
direction du serpent est mise à jour en conséquence. En revanche, si la
direction donnée par le joueur est opposée à la direction actuelle, alors la
direction du serpent n'évolue pas.

Un dernier élément du jeu est affiché : le score. Il est situé en haut à gauche
du jeu, et affiche le score actuel. Il est calculé de la manière suivante :

- le score est initialement à zéro
- le joueur gagne 1 point à chaque frame
- le joueur gagne 3 points à chaque fois que le serpent mange un fruit

Enfin, lorsque le serpent sort du jeu ou bien que sa tête passe sur l'une des
cases de son corps, alors la partie est terminée et le jeu s'arrête, et apparaît
par dessus un message de consolation, son score total (le score en haut à gauche
n'est plus affiché), le score maximal atteint au cours des parties, ainsi qu'un
message l'invitant à appuyer sur espace pour rejouer. Lorsqu'il appuie sur
espace, son PC explose... mais non, le jeu recommence bien sur.

### Découpage du projet

Nous aurons une approche "bottom-up", c'est à dire que nous commencerons par
mettre en place les briques de bases, que nous ferons évoluer au fur et à mesure
de la réalisation du jeu.

Dans un premier temps, nous nous occuperons de mettre en place des outils qui
nous seront bien pratiques lors de l'implémentation du jeu lui-même.

Ensuite, nous verrons l'architecture globale du projet complet, et commencerons
les fonctions de dessins.

Il nous faudra ensuite réagir aux touches du clavier, et gérer les déplacements
du serpent en fonction de sa direction, à intervalle de temps régulier.

Pour terminer la boucle de jeu, il ne reste plus qu'à faire grandir le serpent
lorsqu'il mange un fruit, et agrandir sa taille.

A ce stade, le jeu est fonctionnel. Il ne reste plus que quelques éléments à
mettre en place :

- gestion du score
- fin de partie
- écran de bienvenue

### Structure du projet

Le projet est réalisé sous forme de page web, le point d'entrée sera donc un
fichier `index.html`, et les fichiers JavaScript y seront linkés. Cette
structure est donnée à titre indicatif, il est possible de la modifier, ou même
de choisir un organisation différente.

```
.
├── index.html: point d'entrée
└── js
    ├── utils.js: définition d'outils utilitaires
    ├── drawable.js: classe Drawable
    ├── rectangle.js: classe Rectangle
    ├── snake.js: classe Snake
    ├── fruit.js: classe Fruit
    ├── canvas.js: classe Canvas
    ├── game.js: classe Game
    └── main.js: initialisation du jeu
```

### Remarques

La solution fait ~650 lignes de code, et est écrite avec la syntaxe ES6 et le
mot clé `class` du JavaScript. Il est tout à fait possible de réaliser ce projet
en ES5, ou même dans un autre langage de programmation.

Pour utiliser la syntaxe ES6 sans passer par un compilateur, il est possible
d'utiliser [babel](https://babeljs.io/) directement dans le navigateur, avec :

```html
<body>
  <script type="text/javascript" src="https://unpkg.com/babel-standalone@6/babel.min.js"></script>
  <script type="text/babel" src="js/some-es6-file.js"></script>
</body>
```

Il est aussi possible d'utiliser
[`livereload`](https://www.npmjs.com/package/livereload), un package node
permettant de reload automatiquement la page quand un fichier source est
sauvegardé.

## Gettin' started

## Boucle de jeu

## Finalisation
