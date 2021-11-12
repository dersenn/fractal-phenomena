class Cell {
    constructor(posCell, Cellsize) {
        this.pos = posCell;
        this.Cellsize = Cellsize;
        this.forest = [];
        this.forest.push(new Tree(this.Cellsize))
    }

    show() {
        // rect(this.pos.x, this.pos.y, this.Cellsize)
        push();
        translate(this.pos.x, this.pos.y);
        for (let bonsai of this.forest) {
            bonsai.grow();
        }
        pop();
    }
}

class Tree {
    constructor(treeSize) {
        this.tree = [];
        this.midPoint = treeSize / 2
        // Begin Vector Zeichnung (Vector (x, y, z) allesamt Optional)
        this.begin = createVector(this.midPoint, this.midPoint*1.5); //der Beginn ist pro Zelle x mittig unten
        this.end = createVector(this.midPoint, this.midPoint); //das Ende ist pro Zelle x mittig bis ins Zentrum
        // Anzahl Äste am Baum
        this.twig = random(1,50)

        this.root = new Branch(this.begin, this.end);
    } 
    grow() {
        this.tree[0] = this.root;
      
        for (var i =  0 ; i < this.twig; i++) {
            this.tree.push(this.tree[i].branchA());
            this.tree.push(this.tree[i].branchB());
            this.tree[i].show();
            this.tree[i].angleRotation();
        }
    }
}

class Branch {
    constructor(begin, end) {    
        this.begin = begin;
        this.end = end;
        //Winkelspiel
        this.a = random(0.5/0.02);
        this.increment = TAU / 360;
        this.angle = sin(this.a);
        //Farbspiel
        this.green = random(150,250);
        this.blue = random(150,250);
        //Ast A
        this.branchA = function() {
            let dir = p5.Vector.sub(this.end, this.begin);
            dir.rotate(this.angle)
            dir.mult(0.45)
            let newEnd = p5.Vector.add(this.end, dir)  
            let b = new Branch (this.end, newEnd)
            
            return b;
        }
        //Ast A
        this.branchB = function() {
            let dir = p5.Vector.sub(this.end, this.begin);
            dir.rotate(-this.angle)
            dir.mult(0.45)
            let newEnd = p5.Vector.add(this.end, dir)  
            let b = new Branch (this.end, newEnd)
            return b;
        }
    }  

    show() {
        stroke(0, this.green, this.blue);
        line(this.begin.x, this.begin.y, this.end.x, this.end.y)
        fill(0, this.green, this.blue)
        circle(this.begin.x, this.begin.y-25, random(2,5)) // proof obs bis hier hin funktioniert
    }

    angleRotation() {
        this.a = this.a + this.increment;
      }

}

