class Cell {
    constructor(posCell, Cellsize) {
        this.pos = posCell;
        this.Cellsize = Cellsize;
        this.forest = [];
        this.forest.push(new Tree(this.Cellsize))
    }

    // changed this, we will grow the tree (fill the array) in setup.
    // otherwise it gets grown every time the loop runs. and manymany branches.
    grow() {
        // rect(this.pos.x, this.pos.y, this.Cellsize)
        push();
        translate(this.pos.x, this.pos.y);
        for (let bonsai of this.forest) {
            bonsai.grow();
        }
        pop();
    }

    // then we just show the tree
    // musste hier etwas tricksen mit einem neuerlichen push/pop.
    show() {
        push()
        translate(this.pos.x, this.pos.y)
        this.forest[0].show()
        pop()
    }
}

class Tree {
    constructor(treeSize) {
        //Eröffnet den Baum als Liste
        this.tree = [];

        this.midPoint = treeSize / 2
        // Begin Vector Zeichnung (Vector (x, y, z) allesamt Optional)
        this.begin = createVector(this.midPoint, this.midPoint*1.5); //der Beginn ist pro Zelle x mittig unten
        this.end = createVector(this.midPoint, this.midPoint); //das Ende ist pro Zelle x mittig bis ins Zentrum
        // Anzahl Äste am Baum
        this.twig = Math.floor(random(1,50)) 
        // Der Baum wird initialisiert
        this.root = new Branch(this.begin, this.end);
    } 
    grow() {
        // Der Stamm des Baums
        this.tree[0] = this.root;
        // Die Äste des Baums
        for (var i = 0 ; i < this.twig; i++) {
            this.tree[i].winkelRotation();// Warum bewegt es sich nicht??
            push()
            this.tree.push(this.tree[i].branchA())
            this.tree.push(this.tree[i].branchB())
            pop()
        }
    }
    // show each branch
    show() {
        for (let branch in this.tree) {
            this.tree[branch].show()
        }
        // this.tree[i].show();
    }
}

class Branch {
    constructor(begin, end) {    
        this.begin = begin
        this.end = end

        //Winkelspiel
        this.a = 0; //eigentlich sollte hier 0 stehen... um die Sinus Animation zu machen.
        this.winkel;
        this.increment;

        //Farbspiel
        this.green = random(150,250);
        this.blue = random(150,250);

        //Ast A
        this.branchA = function() {
            let dir = p5.Vector.sub(this.end, this.begin);
            dir.rotate(this.winkel)
            dir.mult(0.45)
            let newEnd = p5.Vector.add(this.end, dir)  
            let b = new Branch (this.end, newEnd)
            return b;
        }
        //Ast B
        this.branchB = function() {
            let dir = p5.Vector.sub(this.end, this.begin);
            dir.rotate(-this.winkel)
            dir.mult(0.45)
            let newEnd = p5.Vector.add(this.end, dir)  
            let b = new Branch (this.end, newEnd)
            return b;
        }
    }

    show() {
        // ich glaube hier muss man nun das spiel aus .branchA/B mit dem Vektor und der Rotation wiederholen...
        stroke(0, this.green, this.blue);
        line(this.begin.x, this.begin.y, this.end.x, this.end.y)
        fill(0, this.green, this.blue)
        // circle(this.begin.x, this.begin.y-35, random(2,5)) // proof obs bis hier hin funktioniert

        // und am schluss den winkel updaten.
        this.winkelRotation()
    }

    // wie kann ich diese Funktion so einstellen, damit sich die Sinuskurve bewegt?
    winkelRotation() {
        this.increment = TWO_PI / 25;
        this.a = this.a + this.increment
        this.winkel = sin(this.a);

        // console.log(this.winkel)
      }

}

