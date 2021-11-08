class Cell {
    constructor(posCell, size) {
        this.pos = posCell;
        this.size = size;
        this.bonsai = new Tree(this.size);
    }

    show() {
        rect(this.pos.x, this.pos.y, this.size)
        push();
        translate(this.pos.x, this.pos.y)
        this.bonsai.show();
        // for (let i = 0; i < this.bonsai.length; i += 1) {
        //     this.bonsai[i].show();
        //     //   this.jitter[i].jitter();
        //     //   this.bonsai[i].angleRotation();
        // }
        pop();
    }
}

class Tree {
    constructor(Treesize) {
        this.tree = [];
        this.midPoint = Treesize/2
        this.begin = createVector(this.midPoint, 0);
        this.end = createVector(this.midPoint, Treesize/4);
        this.twig = random(1,100)

        this.root = new Branch(this.begin, this.end);
    }
    show() {
        this.tree[0] = this.root;
        for (var i =  0 ; i < this.twig; i++) {
            this.tree.push(this.root[i].branchA())
            this.tree.push(this.root[i].branchB()) 
        }
    }
}

class Branch {
    constructor(begin, end) {    
        this.begin = begin;
        this.end = end;
        this.finished = false;

        this.a = 0.3;
        this.increment = TWO_PI / (360 * random(1,6));
        this.angle = sin(this.a);

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

    angleRotation() {
        this.a = this.a + this.increment;
      }

    jitter() {
        this.end.x += random(-1, 1)/10
        this.end.y += random(-1, 1)/10
    }

    show() {
        stroke(0, this.green, this.blue);
        line(this.begin.x, this.begin.y, this.end.x, this.end.y)
    }
}

