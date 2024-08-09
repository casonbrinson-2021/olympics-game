import kaplay from "kaplay";
import "kaplay/global";
import { highBar } from "./scenes/highBar";

const k = kaplay({ width: 1280, height: 720 });

//creating the scenes
k.scene("highBar", () => highBar(k));

//setting the initial scene
k.go("highBar");
