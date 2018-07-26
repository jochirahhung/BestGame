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
    var ball = new createjs.Shape();
    ball.graphics.beginStroke("#").drawCircle(0,0, 20);

    app.stage.addChild(ball);
}
ball.prototype = Object.create(Actor.prototype);
ball.prototype.constructor = ball;


function Player() {
    Actor.call(this, nameString, x, y, r);

    this.playerChar = new createjs.Shape();
    this.playerChar.graphics.beginFill('#000000').drawRect(0,0, app.SCREEN_WIDTH, app.SCREEN_HEIGHT);

    this.update = function(dt) {
        console.log("We in this loop");
        Actor.prototype.update.call(this, dt);
    }

    app.stage.addChild(playerChar);
}
Player.prototype = Object.create(Actor.prototype);
Player.prototype.constructor = Player;