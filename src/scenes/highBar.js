import { makeGymnast } from "../entities/gymnast";

export function highBar(k) {
    const FLOOR_Y = (k.height() / 10) * 9;
    const HIGH_BAR_WIDTH = k.width() / 50;
    const HIGH_BAR_HEIGHT = k.height() * (2/3);
    const HIGH_BAR_X = k.width()/3;
    const HIGH_BAR_y = FLOOR_Y - HIGH_BAR_HEIGHT;


    k.setBackground("89CFF0");
 
    //floor
    k.add([
        k.rect(k.width(), k.height() / 10),
        k.pos(0, FLOOR_Y),
        k.color(Color.fromHex("#7CFC00")),
        k.area(),
        k.body({isStatic: true}),
        fixed(),
    ]);

    //player
    k.add(makeGymnast(k, HIGH_BAR_HEIGHT, HIGH_BAR_WIDTH, HIGH_BAR_X, HIGH_BAR_y));

    //high bar
    k.add([
        k.rect(HIGH_BAR_WIDTH, HIGH_BAR_HEIGHT),
        k.pos(HIGH_BAR_X, HIGH_BAR_y),
        k.color(Color.fromHex("#ffffff")),
    ]);

}
