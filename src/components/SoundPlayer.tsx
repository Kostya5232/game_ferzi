import React from "react";

import queenSound from "../assets/music/The_sound_of_running.mp3";
import victorySound from "../assets/music/И вы выиграли.mp3";
import defeatSound from "../assets/music/wasted.mp3";
import backgroundMusic from "../assets/music/FonMusic.mp3";

type SoundAction = "queen" | "victory" | "defeat" | "background";

interface SoundPlayerProps {
    action: SoundAction | null;
}

const SoundPlayer: React.FC<SoundPlayerProps> = ({ action }) => {
    React.useEffect(() => {
        let audio: HTMLAudioElement | null = null;

        switch (action) {
            case "queen":
                audio = new Audio(queenSound);
                break;
            case "victory":
                audio = new Audio(victorySound);
                break;
            case "defeat":
                audio = new Audio(defeatSound);
                break;
            case "background":
                audio = new Audio(backgroundMusic);
                audio.loop = true;
                break;
            default:
                break;
        }

        if (audio) {
            audio.play();
        }

        return () => {
            if (audio) {
                audio.pause();
                audio.currentTime = 0;
            }
        };
    }, [action]);

    return null;
};

export default SoundPlayer;
