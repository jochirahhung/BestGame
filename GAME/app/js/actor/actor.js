function Actor(nameString, x, y, r)
{
    this.name = nameString;
    this.pos = {x: x, y: y};
    this.stats = null;

    this.boundsRadius = r;

}
Actor.prototype.update = function(dt)
{

};

function Enemy(nameString, x, y, r){
    Actor.call(this, nameString, x, y, r);
    this.stats = { health: 3, dmg: 2};

    var ball = new createjs.Shape();
    ball.graphics.beginStroke("#000").drawCircle(0, 0, r);
    ball.x = x;
    ball.y = y;

    app.stage.addChild(ball);

    this.update = function(dt){
        var angleRad = Math.atan2(app.playerChar.pos.y - this.pos.y, app.playerChar.pos.x - this.pos.x);
        var angleDeg = angleRad * 180 / Math.PI;
        this.rotation = angleDeg;
        this.pos.x += Math.cos(angleRad) * 35 * dt;
        this.pos.y += Math.sin(angleRad) * 35 * dt;
        ball.x = this.pos.x;
        ball.y = this.pos.y;
    }

    this.onCollect = function(entry) {
        this.stats.health -= entry.stats.dmg;
        if(this.stats.health < 1) {
            app.stage.removeChild(ball);
            app.enemy1Array.splice(app.enemy1Array.indexOf(this), 1);
            var x = Math.floor(Math.random() * (201)) + 600;
            var y = Math.floor(Math.random() * SCREEN_HEIGHT);
            app.enemy1Array.push(new Enemy("ball", x, y, 40));
        }
    }
}
Enemy.prototype = Object.create(Actor.prototype);
Enemy.prototype.constructor = Enemy;

function Enemy2(nameString, x, y, r){
    Actor.call(this, nameString, x, y, r);
    this.stats = { health: 1, dmg: 1 };

    var ball2 = new createjs.Shape();
    ball2.graphics.beginStroke("#000").drawCircle(0, 0, r);
    ball2.x = x;
    ball2.y = y;

    app.stage.addChild(ball2);

    this.update = function(dt){
        var angleRad = Math.atan2(app.playerChar.pos.y - this.pos.y, app.playerChar.pos.x - this.pos.x);
        var angleDeg = angleRad * 180 / Math.PI;
        this.rotation = angleDeg;
        this.pos.x += Math.cos(angleRad) * 70 * dt;
        this.pos.y += Math.sin(angleRad) * 70 * dt;
        ball2.x = this.pos.x;
        ball2.y = this.pos.y;
    }

    this.onCollect = function(entry) {
        this.stats.health -= entry.stats.dmg;
        if(this.stats.health < 1) {
            app.stage.removeChild(ball2);
            app.enemy2Array.splice(app.enemy2Array.indexOf(this), 1);
            var x = Math.floor(Math.random() * SCREEN_WIDTH);
            var y = Math.floor(Math.random() * (31)) + 50;
            app.enemy2Array.push(new Enemy2("ball2", x, y, 10));
        }
    }
}
Enemy2.prototype = Object.create(Actor.prototype);
Enemy2.prototype.constructor = Enemy2;

function Enemy3(nameString, x, y, r){
    Actor.call(this, nameString, x, y, r);
    this.stats = { health: 3, dmg: 3 };

    var ball3 = new createjs.Shape();
    ball3.graphics.beginStroke("#000").drawCircle(0, 0, r);
    ball3.x = x;
    ball3.y = y;

    app.stage.addChild(ball3);

    this.update = function(dt){
        var angleRad = Math.atan2(app.playerChar.pos.y - this.pos.y, app.playerChar.pos.x - this.pos.x);
        var angleDeg = angleRad * 180 / Math.PI;
        this.rotation = angleDeg;
        this.pos.x += Math.cos(angleRad) * 50 * dt;
        this.pos.y += Math.sin(angleRad) * 50 * dt;
        ball3.x = this.pos.x;
        ball3.y = this.pos.y;
    }

    this.onCollect = function(entry) {
        this.stats.health -= entry.stats.dmg;
        if(this.stats.health < 1) {
            app.stage.removeChild(ball3);
            app.enemy3Array.splice(app.enemy3Array.indexOf(this), 1);
            var x = Math.floor(Math.random() * (31)) + 50;
            var y = Math.floor(Math.random() * SCREEN_HEIGHT);
            app.enemy3Array.push(new Enemy3("ball3", x, y, 30));
        }
    }
}
Enemy3.prototype = Object.create(Actor.prototype);
Enemy3.prototype.constructor = Enemy3;

function Boss(nameString, x, y, width, height, r){
    Actor.call(this, nameString, x, y, r);
    this.stats = { health: 5, dmg: 5 };

    var bossCircle = new createjs.Shape();
    bossCircle.graphics.beginFill("#F00").drawRect(0, 0, width, height);
    bossCircle.x = x;
    bossCircle.y = y;
    bossCircle.setBounds(0, 0, width, height);
    bossCircle.regX = width/2;
    bossCircle.regY = height/2;

    app.stage.addChild(bossCircle);

    this.update = function(dt){
        var angleRad = Math.atan2(app.playerChar.pos.y - this.pos.y, app.playerChar.pos.x - this.pos.x);
        var angleDeg = angleRad * 180 / Math.PI;
        this.rotation = angleDeg;
        this.pos.x += Math.cos(angleRad) * 25 * dt;
        this.pos.y += Math.sin(angleRad) * 25 * dt;
        bossCircle.x = this.pos.x;
        bossCircle.y = this.pos.y;
    }

    this.onCollect = function(entry) {
        this.stats.health -= entry.stats.dmg;
        if(entry instanceof Bullet && this.stats.health < 1) {
            thePlayer.bossKills++;
            this.resetBoss();
        } else if (entry instanceof Player && this.stats.health < 1) {
            this.resetBoss();
        }
        console.log(thePlayer.bossKills);
    }

    this.resetBoss = function() {
        app.stage.removeChild(bossCircle);
        app.BossArray.splice(app.BossArray.indexOf(this), 1);
    }
}
Boss.prototype = Object.create(Actor.prototype);
Boss.prototype.constructor = Boss;

function Player(nameString, x, y, width, height, r) {
    Actor.call(this, nameString, x, y, r);
    this.stats = { health: thePlayer.baseHealth, dmg: thePlayer.baseDmg }

    var player = new createjs.Shape();
    player.graphics.beginFill('#fffff').drawRect(0, 0, width, height);
    player.x = x;
    player.y = y;
    player.setBounds(0, 0, width, height);
    player.regX = width/2;
    player.regY = height/2;
    app.stage.addChild(player);  

    this.update = function(dt) {
        var angleRad = Math.atan2(app.mousePos.y - app.playerChar.pos.y, app.mousePos.x - app.playerChar.pos.x);
        var angleDeg = angleRad * 180 / Math.PI;
        app.playerChar.rotation = angleDeg;
        if(app.keyboard.w.isPressed)
        {
            app.playerChar.pos.y -= 150 * dt;
        }
        
        if(app.keyboard.s.isPressed)
        {
            app.playerChar.pos.y += 150 * dt;
        }
        
        if(app.keyboard.d.isPressed) {
            app.playerChar.pos.x += 150 * dt;
        }
        
        if(app.keyboard.a.isPressed) {
            app.playerChar.pos.x -= 150 * dt;
        }

        app.BossArray.forEach(function(entry){
            if(areActorsColliding(this, entry)) {
                this.collisionCalc(entry);
            }
        }, this);

        app.enemy1Array.forEach(function(entry){
            if(areActorsColliding(this, entry)) {
                this.collisionCalc(entry);
            }
        }, this);
        
        app.enemy2Array.forEach(function(entry){
            if(areActorsColliding(this, entry)) {
                this.collisionCalc(entry);
            }
        }, this);

        app.enemy3Array.forEach(function(entry){
            if(areActorsColliding(this, entry)) {
                this.collisionCalc(entry);
            }
        }, this);

        player.x = app.playerChar.pos.x;
        player.y = app.playerChar.pos.y;
    }

    this.onCollect = function(entry) {
        this.stats.health -= entry.stats.dmg;
        if(this.stats.health < 1) {
            console.log("Im dead yo");
        }
    }

    this.collisionCalc = function(entry) {
        this.onCollect(entry);
        entry.onCollect(this);
    }
}
Player.prototype = Object.create(Actor.prototype);
Player.prototype.constructor = Player;

function Bullet(nameString, x, y, r) {
    Actor.call(this, nameString, x, y, r);

    this.stats = {dmg: 1};

    var bullet = new createjs.Shape();
    bullet.graphics.beginFill('#00ff00').drawCircle(0, 0, r);
    app.stage.addChild(bullet);
    var angleRad = Math.atan2(app.mousePos.y - this.pos.y, app.mousePos.x - this.pos.x);
    var angleDeg = angleRad * 180 / Math.PI;
    app.playerChar.rotation = angleDeg;
    
    this.update = function(dt) {
        this.pos.x += Math.cos(angleRad) * 150 * dt;
        this.pos.y += Math.sin(angleRad) * 150 * dt;
        bullet.x = this.pos.x;
        bullet.y = this.pos.y;

        app.BossArray.forEach(function(entry){
            if(areActorsColliding(this, entry)) {
                this.collisionCalc(entry);
            }
        }, this);

        app.enemy1Array.forEach(function(entry){
            if(areActorsColliding(this, entry)) {
                this.collisionCalc(entry);
            }
        }, this);

        app.enemy2Array.forEach(function(entry){
            if(areActorsColliding(this, entry)) {
                this.collisionCalc(entry);
            }
        }, this);

        app.enemy3Array.forEach(function(entry){
            if(areActorsColliding(this, entry)) {
                this.collisionCalc(entry);
            }
        }, this);
    }

    this.onCollect = function() {
        app.stage.removeChild(bullet);
        app.bullets.splice( app.bullets.indexOf(this), 1 );
    }

    this.collisionCalc = function(entry) {
        this.onCollect();
        entry.onCollect(this);
    }
}
Bullet.prototype = Object.create(Actor.prototype);
Bullet.prototype.constructor = Bullet;