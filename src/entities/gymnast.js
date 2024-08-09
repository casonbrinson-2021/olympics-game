export function makeGymnast(
    k,
    highBarHeight,
    highBarWidth,
    highBarX,
    highBarY
) {
    const PLAYER_HEIGHT = (highBarHeight * 2) / 3;
    const PLAYER_WIDTH = 50;
    const PLAYER_X = highBarX + 0.5 * highBarWidth;
    const PLAYER_Y = highBarY;

    //create the player object
    const player = k.make([
        k.rect(PLAYER_WIDTH, PLAYER_HEIGHT),
        k.pos(PLAYER_X, PLAYER_Y),
        k.color(255, 243, 12),
        k.rotate(-45),
        k.anchor("top"),
        k.body(),
        k.area(),
    ]);

    //set all the keybindings
    k.onKeyPress("space", () => {
        player.angle -= 20;
    });

    let velocity = 0;
    let previousAngle = player.angle;
    let previousAngularAcceleration = 0;
    //might pull this out into its own function for general spin physics stuff
    //this is called about 60 times per second
    player.onUpdate(() => {
        const GRAVITY = 1; //downward force

        let angularAcceleration = -(GRAVITY * Math.sin(player.angle * (3.14/180))) / 2;

        if (player.angle > 0 && previousAngle < 0) angularAcceleration *= -1;
        else if (player.angle < 0 && previousAngle > 0) angularAcceleration *= -1;
        else if (player.angle > 180 && previousAngle < 180) angularAcceleration *= -1;
        else if (player.angle < 180 && previousAngle > 180) angularAcceleration *= -1;

        velocity += angularAcceleration;
        velocity *= 0.95;

        if (velocity < 0.001 && velocity > -0.001) velocity = 0;
    
        previousAngle = player.angle;
        previousAngularAcceleration = angularAcceleration
        player.angle += velocity;


        console.log(velocity);
    });

    return player;
}
