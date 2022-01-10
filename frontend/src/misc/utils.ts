import { UserAgent } from "./interfaces";

export function animateMixerBars(id: string) {
    const mixers = (document.getElementById(id) as HTMLDivElement).children!

    for(let i = 0; i < mixers.length; i++) {
        setTimeout(() => {
            const mixer = mixers[i] as HTMLDivElement;
            const y: number = Math.random();

            if(y > 0.8) {
                mixer.style.backgroundColor = 'var(--clr-err)';
                
            }

            else if(y > 0.55) {
                mixer.style.backgroundColor = 'var(--clr-warn)';
            }

            else {
                mixer.style.backgroundColor = 'var(--clr-primary)';
            }

            mixer.style.transform = `scaleY(${y})`;
        }, genNum(400))
    }
}

export const toggleMusicPlayer = (ignore: boolean=false) => {
    if(!ignore) {
        const musicPlayer = document.getElementById('music-player')!

        if(!musicPlayer.style.transform) {
            musicPlayer.style.transform = 'translateY(96%)';
            musicPlayer.classList.remove('active');
            musicPlayer.focus();
        }

        if(musicPlayer.style.transform === 'translateY(96%)') {
            musicPlayer.classList.add('active');
            musicPlayer.style.transform = `translateY(2%)`;
        }
            
        else {
            musicPlayer.style.transform = 'translateY(96%)';
            musicPlayer.classList.remove('active');
        }
    }
}

export const getSongEl = (num: number | string): HTMLButtonElement => {
    return document.getElementById('song-' + (num) + '-queue') as HTMLButtonElement;
}

export function genNum(max: number) {
    return Math.floor(Math.random() * max);
}

export function getUserAgent(): UserAgent {
    const prefersReducedMotion: boolean = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const prefersDarkMode: boolean = window.matchMedia("(prefers-color-scheme: dark)").matches;
    const sysLang: string = navigator.language;

    const user: UserAgent = {
        prefersReducedMotion,
        prefersDarkMode,
        sysLang
    }

    return user;
}

export function toggleEl(id: string, clsName: string): void {
    document.getElementById(id)?.classList.toggle(clsName);
}

export function popup(text: string, type: string) {
    const popup = document.getElementById('popup') as HTMLDivElement;
    const popupIcon = document.getElementById('popup-icon') as HTMLParagraphElement;
    const popupText = document.getElementById('popup-text') as HTMLParagraphElement;

    if(!popup.classList.contains('active')) {
        popupText.textContent = text;
        popup.className = `popup ${type} active`;
        setTimeout(() => {
            popup.classList.remove('active');
            popup.classList.add('inactive');
        }, 5000);
    }
}
