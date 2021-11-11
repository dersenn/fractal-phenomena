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
        circle(50, 50, 10) // proof obs bis hier hin funktioniert

        // for (let i = 0; i < this.bonsai.length; i += 1) {
        //     //   this.jitter[i].jitter();
        //     //   this.bonsai[i].angleRotation();
        // }
        pop();
    }
}

class Tree {
    constructor(treeSize) {
        this.tree = [];
        this.midPoint = treeSize / 2

        this.begin = createVector(this.midPoint, 0);
        this.end = createVector(this.midPoint, treeSize - this.midPoint);
        this.twig = random(1,100)

        this.root = new Branch(this.begin, this.end);
    } 
    grow() {
        this.tree[0] = this.root;
      
        for (var i =  0 ; i < this.twig; i++) {
            rotate(PI / 180) // proof obs funktioniert verfeinern
            rect(this.midPoint, 10, 20*[i]*0.1) // proof obs bis hier hin funktioniert

            this.tree.push(this.tree[i].branchA());
            this.tree.push(this.tree[i].branchB());
        }
    }
}

class Branch {
    constructor(begin, end) {    
        this.begin = begin;
        this.end = end;

        this.a = 0.3;
        this.increment = TWO_PI / (360 * random(1,6));
        this.angle = PI / 4 //sin(this.a);

        this.green = random(150,250);
        this.blue = random(150,250);

        this.branchA = function() {
            let dir = p5.Vector.sub(this.end, this.begin);
            dir.rotate(this.angle)
            dir.mult(0.67)
            let newEnd = p5.Vector.add(this.end, dir)  
            let b = new Branch (this.end, newEnd)
            return b;
        }

        this.branchB = function() {
            let dir = p5.Vector.sub(this.end, this.begin);
            dir.rotate(-this.angle)
            dir.mult(0.67)
            let newEnd = p5.Vector.add(this.end, dir)  
            let b = new Branch (this.end, newEnd)
            return b;
        }
    }  

    show() {
        stroke(0, this.green, this.blue);
        line(this.begin.x, this.begin.y, this.end.x, this.end.y)
        fill(255, 0, 0)
        circle(150, 150, random(5,10)) // proof obs bis hier hin funktioniert

    }

    angleRotation() {
        this.a = this.a + this.increment;
      }

    jitter() {
        this.end.x += random(-1, 1)/10
        this.end.y += random(-1, 1)/10
    }
}

