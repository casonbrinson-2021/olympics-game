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

    const GRAVITY = 1;
    const FRICTION_MULTIPLIER = 0.98;
    const KICK_FORCE = 18;

    //create the player object
    const player = k.make([
        k.rect(PLAYER_WIDTH, PLAYER_HEIGHT),
        k.pos(PLAYER_X, PLAYER_Y),
        k.color(255, 243, 12),
        k.rotate(-90),
        k.anchor("top"),
        k.body(),
        k.area(),
    ]);

    let angularVelocity = 0;
    let angularAcceleration = 0;
    // let previousAngle = 0;
    let kickAngularAcceleration = 0;
    // let timeSinceLastKick = 0;

    //set all the keybindings
    k.onKeyPress("space", () => {
        // const currentTime = time();
        kickAngularAcceleration = (-KICK_FORCE * Math.cos(Math.PI / 4)) / 1.5;
        player.height = PLAYER_HEIGHT / 2;
    });

    //might pull this out into its own function for general spin physics stuff
    //this is called about 60 times per second
    player.onUpdate(() => {
        angularAcceleration =
            -(GRAVITY * Math.sin(player.angle * (Math.PI / 180))) / 1.5;
        angularAcceleration += kickAngularAcceleration;
        kickAngularAcceleration = 0;

        // if (player.angle > 0 && previousAngle < 0) angularAcceleration *= -1;
        // else if (player.angle < 0 && previousAngle > 0) angularAcceleration *= -1;
        // else if (player.angle > 180 && previousAngle < 180) angularAcceleration *= -1;
        // else if (player.angle < 180 && previousAngle > 180) angularAcceleration *= -1;

        //update all the things
        angularVelocity += angularAcceleration;
        angularVelocity *= FRICTION_MULTIPLIER;

        if (angularVelocity < 0.001 && angularVelocity > -0.001)
            angularVelocity = 0;
        player.angle += angularVelocity;
    });

    return player;
}
