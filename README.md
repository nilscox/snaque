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

Le fichier principal qui va charger le jeu est le `main.js`. Pour le moment, il
nous pouvons l'utiliser pour instancier le `Canvas` et tester le code, mais il
sera utilisé plus tard pour l'écran de bienvenue et le lancement du jeu.

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
dessiner un carré de la taille d'une cellule de la grille, une pour du texte, et
la dernière pour tout effacer.

Toutes les instances de `Point` passés en arguments à ces méthodes représentent
un point sur la grille, et non pas en pixels. C'est à dire que si l'instance du
`Point` passé à `Canvas.square` sont `(3, 1)`, alors le carré sera dessiné à la
position `(30px, 10px)` sur le canvas.

```
prototype: Canvas.square(p: Point, color: string)
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

Enfin, la méthode `clear()` n'a pas besoin d'arguments et ne renvoie rien. Elle
efface la totalité du canvas.

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
Elle hérite elle aussi de `Drawable`, et override sa méthode `draw()` pour
appeller celles de sa tête et de ses éléments de son corps.

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
jeu : le serpent, et le fruit.

```
prototype: Game.draw(canvas: Canvas)
canvas: the canvas where to draw the game
```

## Boucle de jeu

Un jeu qui ne bouge pas, c'est une image. Faisons bouger un peu tout ça...

C'est maintenant que nous allons mettre en place le point d'entrée du JS,
c'est-à-dire le code qui sera éxécuté en tout premier. Ce code se trouve dans le
fichier `main.js`.

La fonction `start()` créer un nouveau game, et va appeler
[`setInterval`](https://www.w3schools.com/jsref/met_win_setinterval.asp), dans
le but d'éxécuter une fonction en particulier. Cette fonction est une *inner
function* de la fonction `start()`, et s'apelle `frame`. Elle ne prend pas de
paramètre, et va simplement effacer le canvas et (re-)dessiner le jeu.

```
prototype: start(canvas: Canvas)
canvas: the canvas where to draw the game
```

La fonction principale s'apelle `main()`, c'est la seule fontction applée dans
le scope globale, ce qui en fait le *pont d'entrée* du programme. Elle se
chargera pour l'instant de créer une instance de `Canvas`, et appelle `start()`.
Plus tard, elle s'occupera aussi de l'écran d'accueil.

### Mise à jour

A chaque frame, nous allons calculer les nouvelles positions des éléments du
jeu. La classe `Game` a besoin d'une nouvelle méthode, `update()`, qui est
appelée à chaque frame, avant le dessin du jeu. Cette fonction va pour le moment
simplement appeler la fonction `move()` du serpent.


```
prototype: Game.update()
```

```
prototype: Snake.move()
```

La méthode `move()` du serpent va faire évoluer sa position d'une case en
fonction de sa direction actuelle. Le serpent va devoir mémoriser la direction
dans laquelle is se déplace. Son constructeur peut déclarer un attribut
`direction`, qui est à `left` par défaut.

A chaque fois que le joueur appuie sur une flèche du clavier, le serpent
enregistrera cette direction dans un attribut `nextDirection`. Nous pouvons
l'initialiser à `null` dans le constructeur.

A chaque fois que la fonction `move()` est appelée, le serpent remplace la
valeur de `direction` par celle de `nextDirection` si nécéssaire. Chaque partie
de son corps est déplacée vers la position de sa suivante, et la tête avance
d'une case dans la direction du serpent.

Protip : pour tester, il est possible de donner une `nextDirection` aléatoire
dans la fonction `frame()`, afin d'obtenir un serpent fou :

```
game.snake.nextDirection = ['left', 'right', 'up', 'down'][~~(Math.random() * 4)]
```

### Take control

Next step : gérer les événements utilisateurs (les touches du clavier). La
classe `Game` se charge d'écouter les événements clavier, via sa méthode
`onKeyDown()`. A chaque fois qu'une flèche est appuiée, la direction du serpent
doit évoluer en conséquence, via sa méthode `go()` (mais le déplacement dans
cette nouvelle direction ne sera visible qu'à la prochaine frame). L'event
listener peut être enregistré depuis le constructeur du `Game`.

```
prototype: Game.onKeyDown(e: Event)
e: the event
```

```
prototype: Snake.go(direction: string)
direction: the snake's next move direction
```

Si la direction donnée en parmètre de `go()` est opposée à la direction
actuelle, alors la `nextDirection` du serpent est annulée. Cela lui évitera de
se ramper dessus.

### Manger des fruits

Nous avons maintenant toutes les clés en mains pour gérer le ramassage de fruits
par le serpent. Lorsque le serpent mange un fruit, son corps grandit de deux
cases au cours des deux prochaines frames. C'est à dire que l'on va avoir :

- frame 0 : la tête du serpent passe sur un fruit
- frame 1 : la tête du serpent avance, mais le bout de la queue reste à la même place
- frame 2 : la tête du serpent avance, mais le bout de la queue reste à la même place
- frame 3 : la tête du serpent avance, et la dernière partie du corps du serpent prend la place de l'avant dernière

Ainsi, le serpent aura grandi de deux cases. Pour implémenter cette logique de
jeu, le serpent aura besoin de se souvenir combien de casses il lui reste à
grandir, décrémenter ce nombre à chaque appel à `move()`, et ajouter un nouveau
morceau de corps. Cet attribut est appelé `growLeft`, et est initialisé à zéro
dans le constructeur. Le serpent est capable de grandir, et cela se traduit par
une méthode `grow()`.

```
prototype: Snake.grow(n: number)
n: the number of cells that the snake will grow of
```

Si on évalue :

```js
snake.grow(3);
snake.move();
snake.move();
snake.grow(1);
```

la valeur de `snake.growLeft` sera donc de `2`.

Pour terminer, il nous faut bien appeler `grow()` quelque part, et créer un
nouveau fruit...

### RIP

Nous pouvons presque presque jouer, il ne nous manque plus qu'une fin de partie.
Le serpent a deux façons de mourir :

- si sa tête sort du jeu
- si sa tête passe par l'une des cases de son corps.

Avant d'implémenter la fonction qui vérifira si le serpent est mort, nous allons
nous faciliter la tâche en répondant à une question un peu plus simples :
quelles cases occupent le serpent ? Une méthode `getCells()` de la classe
`Snake` serait bien utile.

```
prototype: Snake.getCells() -> Point[]
returns: the celles containing a part of the snake
```

```
prototype: Snake.isDead(width: number, height: number) -> boolean
width: the grid's width
height: the grid's height
returns: true if the snake is dead
```

Pour vérifier que notre fonction fonctionne, nous pouvons simplement utiliser
l'attribut `gameOver` de la classe `Game`. Si la partie est terminé, il ne
faudra plus faire avancer le jeu (cette vérification peut être faite au tout
début de la fonction `update()`).

## Finalisation

Le coeur du *snaque* est maintenant en place. Les élémets restants à implémenter
sont :

- la gestion du score
- la gestion de la position du fruit
- l'écran de fin de partie
- l'écran de bienvenue
- la gestion du highscore

### Score

Le joueur gagne 1 point à chaque frame, et 3 points à chaque fois que le serpent
mange un fruit. Le score peut être affiché par le game avec les options
`{ size: 10, color: '#666', x: 5, y: 12 }`.

Acune autre déclaration de méthode n'est nécéssaire.

### Position du fruit

Pour le moment, nous choisissons une position aléatoire pour le fruit. Plus le
serpent grandit, et plus il est probable que cette position tombe sur une des
cases occupée par une partie du serpent, et le fruit ne serait pas visible tout
de suite. Nous allons avoir besoin d'une fonction trouvant une case vide pour y
ajouter un fruit.

```
prototype: Game.getRandomFruitPosition() -> Point
returns: an empty cell's position
```

> Hint : la fonction `snake.getCells()` peut peut-être nous servir...

### Game Over

Lorsque le serpent décède, le jeu doit afficher un écran de fin de partie,
invitant le joueur à rejouer appuiant sur espace.

Les valeurs des options utilisées pour dessiner les textes de l'écran de game
over sont :

```
"Game Over" : { size: 30, color: 'black', y: 80 }
"score" : { size: 15, color: 'black', y: 120 }
"<press space to restart>" { size: 10, color: '#666', y: 190 }
```

### Welcome

Lorsque le joueur lance le jeu, il est tout de suite dans une partie. Il n'a pas
trop le temps de réagir... Pour concidérer notre `snaque` comme un vrai jeu, il
lui manque un écran d'accueil, proposant de démarrer une partie.

Cet écran ne fait pas vraiment partie de la boucle de jeu, et ne sera donc pas
géré par la classe `Game`.

Il ne faut modifier que la fonction `main()` pour afficher le message de
bienvenue et indiquer au joueur qu'il peut démarrer une partie (`start()`) avec
une touche du clavier.

Textes :

```
"SNAIQUE": { size: 30, color: 'greenforest', y: 50 }
"<press any key to start>": { size: 10, color: '#666', y: 190 }
```

### Highscore

La partie finale de ce projet permettra de faire gagner en longévité à notre
jeu, en affichant le meilleur score atteint au cours des dernières parties sur
l'écran de game over, dans le but de motiver le joueur à lancer une nouvelle
partie...

Le meilleur score est stocké dans le
[`localStorage`](https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage).
A chaque fin de partie, le `Game` va enregistrer le nouveau score si celui-ci
est suppérieur au score actuel. Le `Game` va donc permettre un accès au meilleur
score via deux méthodes : `getHighscore()` et `setHighscore()`.

```
prototype: Game.getHighscore() -> number
returns: the highscore
```

```
prototype: Game.setHighscore(score: number)
score: the score
```

## Fin

Le jeu est terminé et doit maintenant respecter les spécifications données en
introduction. Pour continuer, il est possible d'y ajouter par exemple :

- la mise en pause du jeu
- une animation fluide
- des vrai dessins
- de l'audio
- ...
