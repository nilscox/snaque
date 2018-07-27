# Snaique

Le but de ce projet est de réaliser un petit jeu en Javascript :
[snake](https://fr.wikipedia.org/wiki/Snake_(jeu_vid%C3%A9o)).

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

Dans le prototype des fonctions données, les variables sont annotées d'un type.
La description des paramètres et de la valeur de retour est donnée ensuite. Par
exemple :

```
prototype: foo(name: string, score: number) -> boolean
name: the player's first name
score: the player's current score
returns: true if the player has a cool name
```

Le nom de la fonction à implémenter est `foo`, elle prend deux paramètres, une
string et un entier, et retourne un booléen.

La solution fait ~250 lignes de code réparties dans ~30 fonctions, et est écrite
avec la syntaxe ES6 et le mot clé `class` du JavaScript. Il est tout à fait
possible de réaliser ce projet en ES5, ou même dans un autre langage de
programmation.

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

Les valeurs utilisées dans la solutions (couleurs, tailles, ...) sont donnés
à titre indicatif également.

## Gettin' started

Tout d'abord, nous avons besoin d'un index.html. Il s'occupera de définir un
élément `<canvas>`, et d'inclure tous les `.js`. De plus, il peut afficher une
bordure autour du canvas en CSS, directement inline dans le HTML. La réf définit
les dimensions du canvas à 200x200.

Nous allons commencer par définir des bouts de code utilitaires dont nous nous
servirons plus tard dans le jeu. Nous aurons besoin d'une fonction `rand()`,
permettant de générer un nombre aléatoire, et une classe `Point`, qui
représentera un point `(x, y)`.

```
prototype: rand(min: number, max: number) -> number
a: the minimum value
b: the maximum value
returns: a random integer bewteen min and max
```

```
prototype: Point.constructor(x: number, y: number)
x: the point's x coordinate
y: the point's y coordinate
```

```
prototype: Point.eql(point: Point) -> boolean
point: another point
returns: true if the x and y coordinates are matches the point
```

## Dessine moi un serpent

### Canvas

Pour faciliter le dessin du jeu, nous allons utiliser une classe `Canvas`, qui
s'occupera de gérer l'élement canvas du DOM et de dessiner juste ce dont on a
besoin. Elle conservera deux attributs : `domCanvas` (l'élément `<canvas>` du
DOM), et `context` (le Context2D du canvas).

```
prototype: Canvas.constructor(domCanvas: Canvas)
domCanvas: the <canvas /> DOM element
```

Les éléments du jeu sont positionés sur le canvas, à une position donnée en
pixels. Le jeu en revanche, traite les position de ses éléments sur une grille.
La grille est composée de cellules, dont le ratio avec les pixels est une valeur
constante. Cette valeur est accessible via une méthode statique du canvas.

```
prototype: static Canvas.CELL_SIZE() -> number
returns: the size of a cell (ref: 10)
```

Le `Canvas` nous permettra de récupérer la taille de la grille.

```
prototype: Canvas.getGridDimensions() -> { width: number, height: number }
returns: an object with keys "width" and "height"
```

Les méthodes permettant réellement de dessiner sont au nombre de trois, une pour
dessiner un carré, une pour du texte, et la dernière pour tout effacer.
Toutes les instances de `Point` passés en arguments à ces méthodes représentent
un point sur la grille, et non pas en pixels.

```
prototype: Canvas.square(p: Point, size: number)
p: the square's position on the grid
color: the square's color
```

```
prototype: Canvas.text(p: Point, opts: {
  size: number,
  x: number,
  y: number,
  color: string,
})
p: the square's position on the grid
opts.size: the text's font size
opts.x: the text's x coordinate (optional)
opts.y: the text's y coordinate
opts.color: the text's color
```

Si la position x du texte n'est pas donnée, alors elle est
[calculée](https://www.w3schools.com/tags/canvas_measuretext.asp) pour centrer
le texte sur le canvas.

Enfin, la méthode `clear()` n'a pas besoin d'arguments et ne renvoie rien.

```
prototype: Canvas.clear()
```

### Dessinable

Certains éléments du jeu peuvent être représentés sur le canvas. Ces éléments
sont représentés par des classes qui héritent toutes de la classe `Drawable`.

`Drawable` est en réalité une
[interface](https://en.wikipedia.org/wiki/Interface_(computing)). Elle ne
définie qu'une seule méthode, `draw(canavas)`. Cette méthode doit impérativement
être overridée par ses classes enfants. Elle est donc définie comme tel :

```js
class Drawable {

  draw(canvas) {
    throw new Error('not implemented');
  }

}
```

Voyons maintenant ces éléments "dessinables".

### Le carré

En effet, les éléments du jeu sont représentés par des carrés. Nous allons avoir
besoin d'une classe qui hérite de `Drawable`, et override sa méthode `draw()`
pour afficher un carré.

```
prototype: Square.constructor(position: Point, color: string)
position: the square's position
color: the square's color
```

```
prototype: draw(canvas: Canvas)
canvas: the canvas where to draw the square
```

### Les éléments carrés

Les éléments représentés par un seul carrés sont : la tête du serpent, un des
membres du corps du serpent, et le fruit. Tous ces éléments héritent de la
classe `Square`. Les valeur des couleurs utilisées dans la réf sont données
après les prototypes des constructeurs.

```
prototype: SnakeHead.constructor(position: Point)
position: the snake's head position
ref color: 'blue'
```

```
prototype: SnakeBody.constructor(position: Point)
position: the snake's body position
ref color: 'magenta'
```

```
prototype: Fruit.constructor(position: Point)
position: the fruit's position
ref color: 'yellow'
```

### Le serpent

La classe `Snake` représente un serpent, composé d'une tête de bouts de corps.
Elle hérite elle aussi de `Drawable`, mais override sa méthode `draw()` pour
appeller celles de sa tête et de ses bouts de corps.

```
prototype: Snake.constructor(p: Point, size: number)
p: the snake's head position
size: the snake's initial number body parts
```

```
prototype: Snake.draw(canvas: Canvas)
canvas: the canvas where to draw the snake
```

### Game

Le code principal se trouve dans la classe `Game`. Cette classe gère l'affichage
du jeu, la mise à jour des éléments, la gestion du score, la fin de partie, ...
Bref, la *game loop*. Un game est dessinable, il va donc hériter de `Drawable`.
Pour l'instant, nous allons juste implémenter son constructor, ainsi que sa
méthode `draw()`, pour l'afficher.

Le constructeur va initialiser les attributs nécéssaires à la gestion du jeu. Il
peut leur affecter la valeur `null` pour le moment.

- `width`: la largeur de la grille de jeu
- `height`: la hauteur de la grille de jeu
- `snake`: le serpent (Snake)
- `fruit`: un fruit (Fruit)
- `score`: le score actuel (number)
- `gameOver`: l'état du jeu (boolean)

```
prototype: Game.constructor(width: number, height: number)
width: the grid's width
height: the grid's height
```

La fonction d'initialisation nous permettra de remettre à zéro les valeurs du
jeu, pour commencer (ou recommencer) une partie. Elle va instancier un nouveau
`Snake` à une position aléatoire sur la grille (attention tout de même à donner
assez de marge pour dessiner les 3 cases initiales du corps), ainsi qu'un
nouveau fruit, à une position aléatoire. Pour le moment, il n'est pas nécéssaire
de gérer le cas ou le fruit apparait sur une case occupée par le serpent.

```
prototype: Game.init()
```

Après avoir implémenté les bases du code, nous remontons de plus en plus dans la
partie "up" du design "bottom-up". Nous allons maintenant faire la dernière
fonction de dessin, qui va se charger de l'affichage de tous les éléments du
jeu.

```
prototype: Game.draw(canvas: Canvas)
canvas: the canvas where to draw the game
```

## Boucle de jeu

### start ?

Le fichier principal qui va charger le jeu (et plus tard afficher l'écran de
bienvenue), est le fichier `main.js`. Pour le moment, il ne fera qu'instancier
un `Game` et appeler sa méthode `init()`.

## Finalisation
