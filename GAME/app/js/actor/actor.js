function Actor(nameString, x, y, r)
{
    this.name = nameString;
    this.pos = {x: x, y: y};

    this.boundsRadius = r;

}
Actor.prototype.update = function(dt)
{

};

function ball(parent, nameString, x, y, r){
    Actor.call(this, nameString, x, y, r);
    var ball = new createjs.Shape()
    ball.graphics.beginStroke("#").drawCircle(0,0, 20);

    app.stage.addChild(ball);
}

