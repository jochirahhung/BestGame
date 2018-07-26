function Actor(nameString, x, y, r) {
    this.name = nameString;
    this.pos = {x: x, y: y};

    this.boundsRadius = r;
}

Actor.prototype.update = function(dt) {

}

