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
    ball.graphics.beginStroke("#").drawCircle(x, y, r);

    app.stage.addChild(ball);

    this.update = function(dt){
        var angleRad = Math.atan2(app.playerChar.y - app.enemy.pos.y, app.playerChar.x - app.enemy.pos.x);
        var angleDeg = angleRad * 180 / Math.PI;
        app.enemy.rotation = angleDeg;
        app.enemy.pos.x += Math.cos(angleRad) * 25 * dt;
        app.enemy.pos.y += Math.sin(angleRad) * 25 * dt;
        ball.x = app.enemy.pos.x;
        ball.y = app.enemy.pos.y;
    }
}
ball.prototype = Object.create(Actor.prototype);
ball.prototype.constructor = ball;

function ball2(parent, nameString, x, y, r){
    Actor.call(this, nameString, x, y, r);
    var ball2 = new createjs.Shape();
    ball2.graphics.beginStroke("#").drawCircle(x, y, r);

    app.stage.addChild(ball2);

    this.update = function(dt){
        var angleRad = Math.atan2(app.playerChar.y - app.enemy2.pos.y, app.playerChar.x - app.enemy2.pos.x);
        var angleDeg = angleRad * 180 / Math.PI;
        app.enemy2.rotation = angleDeg;
        app.enemy2.pos.x += Math.cos(angleRad) * 50 * dt;
        app.enemy2.pos.y += Math.sin(angleRad) * 50 * dt;
        ball2.x = app.enemy2.pos.x;
        ball2.y = app.enemy2.pos.y;
    }
}
ball2.prototype = Object.create(Actor.prototype);
ball2.prototype.constructor = ball2;


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