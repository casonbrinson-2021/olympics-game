export function makeGymnast(
    k,
    highBarHeight,
    highBarWidth,
    highBarX,
    highBarY,
    floor,
) {
    const PLAYER_HEIGHT = (highBarHeight * 2) / 3;
    const PLAYER_WIDTH = 50;
    const PLAYER_X = highBarX + 0.5 * highBarWidth;
    const PLAYER_Y = highBarY;

    const GRAVITY = 1;
    const FRICTION_MULTIPLIER = 0.98;
    const KICK_FORCE = 17;

    //create the player object
    const player = k.make([
        k.rect(PLAYER_WIDTH, PLAYER_HEIGHT),
        k.pos(PLAYER_X, PLAYER_Y),
        k.color(255, 243, 12),
        k.rotate(-360),
        k.anchor("top"),
        k.body(),
        k.area(),
    ]);

    let angularVelocity = 0;
    let angularAcceleration = 0;
    let kickAngularAcceleration = 0;
    let linearVelocityX = 0;
    let linearVelocityY = 0;

    let playerIsAirborne = false;
    let playerIsOnGround = false;

    //set all the keybindings
    k.onKeyPress("space", () => {
        // const currentTime = time();
        if (!playerIsAirborne) {
            kickAngularAcceleration =
                (-KICK_FORCE * Math.cos(Math.PI / 4)) / 1.5;
        }
    });

    //refactor this eventually cuz its ugly
    k.onKeyPress("enter", () => {
        if (!playerIsAirborne) {
            playerIsAirborne = true;

            //change the axis of rotation to be the persons center of gravity
            player.anchor = "center";

            let offsetX = 0;
            let offsetY = 0;

            let angle = player.angle < 0 ? player.angle+360 : player.angle;
            
            if (angle === 0) {
                offsetY = PLAYER_HEIGHT / 2;
            } else if (angle === 180) {
                offsetY = -PLAYER_HEIGHT / 2;
            } else if(angle === 90){
                offsetX = -PLAYER_HEIGHT / 2;
            } else if (angle === 270) {
                offsetX = PLAYER_HEIGHT / 2;
            } else if (angle > 0 && angle < 180) {
                offsetY = (PLAYER_HEIGHT / 2) * Math.cos(angle*Math.PI/180);
                offsetX = (PLAYER_HEIGHT / 2) * -1 * Math.sin(angle*Math.PI/180);
            } else {
                offsetX = (PLAYER_HEIGHT / 2) * -1 * Math.sin(angle*Math.PI/180);
                offsetY = (PLAYER_HEIGHT / 2) * Math.cos(angle*Math.PI/180);
            }

            player.pos = vec2(player.pos.x + offsetX, player.pos.y + offsetY);

            linearVelocityX = angularVelocity*-1*Math.cos(angle*Math.PI/180) * 60;
            linearVelocityY = angularVelocity*-1*Math.sin(angle*Math.PI/180) * 60;
        }

    });

    player.onCollide("floor", () => {
        playerIsOnGround = true;
    })

    //might pull this out into its own function for general spin physics stuff
    //this is called about 60 times per second
    player.onUpdate(() => {
        //player is swinging
        if (playerIsOnGround) {
            return;
        }
        if (!playerIsAirborne) {
            angularAcceleration =
                -(GRAVITY * Math.sin(player.angle * (Math.PI / 180))) / 1.5;
            angularAcceleration += kickAngularAcceleration;
            kickAngularAcceleration = 0;

            angularVelocity += angularAcceleration;
            angularVelocity *= FRICTION_MULTIPLIER;

            player.angle += angularVelocity;
            player.angle %= 360;
        }

        //player is airborne
        else {
            player.angle += angularVelocity;
            linearVelocityX *= 0.95 ;
            linearVelocityY += 30 * GRAVITY;

            player.move(linearVelocityX, linearVelocityY);
        }
    });

    return player;
}
