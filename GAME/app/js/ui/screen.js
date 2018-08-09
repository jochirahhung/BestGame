//base screen class
function Screen(name) {
    createjs.Container.call(this);
    this.title = name;
}
Screen.prototype = Object.create(createjs.Container.prototype);
Screen.prototype.constructor = Screen;

//main landing screen
function LandingScreen(playButton, instructionsButton) {
    Screen.call(this, "landing_screen");

    ui.makeTitleText(this, "CRYPTIDS DECLASSIFIED", "60px", SCREEN_WIDTH / 2, (SCREEN_HEIGHT / 2) - 50);

    
    
    ui.makeBasicButton(this, "PLAY", 400, 400, playButton);
    ui.makeBasicButton(this, "HOW TO PLAY", 400, 450, instructionsButton);
}
LandingScreen.prototype = Object.create(Screen.prototype);
LandingScreen.prototype.constructor = LandingScreen;

//instructions screen
function InstructionScreen(backButton) {
    Screen.call(this, "instruction_screen");

    //filler text; tweak later to accomodate any new features/additions
    var text = "Move with the W, A, S, and D keys. Click to shoot, and avoid the cryptids!";

    ui.makeBasicText(this, text, "20px", SCREEN_WIDTH / 2, SCREEN_HEIGHT / 2);
    ui.makeBasicButton(this, "BACK", 50, 10, backButton);
}
InstructionScreen.prototype = Object.create(createjs.Container.prototype);
InstructionScreen.prototype.constructor = InstructionScreen;

//main game screen
function GameplayScreen() {
    Screen.call(this, "gameplay_screen");
}
GameplayScreen.prototype = Object.create(createjs.Container.prototype);
GameplayScreen.prototype.constructor = GameplayScreen;

//game over screen
function GameOverScreen(playAgainButton, mainMenuButton) {
    Screen.call(this, "gameover_screen");
    
    ui.makeBasicText(this, "GAME OVER", "60px", SCREEN_WIDTH / 2, SCREEN_HEIGHT / 2);
    ui.makeBasicText(this, "Guess you weren't up to the task...", "35px", SCREEN_WIDTH / 2, (SCREEN_HEIGHT / 2) + 35);

    ui.makeBasicButton(this, "TRY AGAIN?", (SCREEN_WIDTH / 2) - 20, (SCREEN_HEIGHT / 2) + 50, playAgainButton);
    ui.makeBasicButton(this, "MAIN MENU", (SCREEN_WIDTH / 2) + 20, (SCREEN_HEIGHT / 2) + 50, mainMenuButton);
}
GameOverScreen.prototype = Object.create(createjs.Container.prototype);
GameOverScreen.prototype.constructor = GameOverScreen;

//win screen
function WinScreen(playAgainButton, mainMenuButton) {
    Screen.call(this, "win_screen");
    
    ui.makeBasicText(this, "VICTORIOUS", "60px", SCREEN_WIDTH / 2, SCREEN_HEIGHT / 2);
    ui.makeBasicText(this, "As you leave, you can't help but feel...watched.", "35px", SCREEN_WIDTH / 2, (SCREEN_HEIGHT / 2) + 35);

    ui.makeBasicButton(this, "HEAD BACK IN?", (SCREEN_WIDTH / 2) - 20, (SCREEN_HEIGHT / 2) + 50, playAgainButton);
    ui.makeBasicButton(this, "MAIN MENU", (SCREEN_WIDTH / 2) + 20, (SCREEN_HEIGHT / 2) + 50, mainMenuButton);
}
WinScreen.prototype = Object.create(createjs.Container.prototype);
WinScreen.prototype.constructor = WinScreen;