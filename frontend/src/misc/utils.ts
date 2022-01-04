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
        }

        if(musicPlayer.style.transform === 'translateY(96%)')
            musicPlayer.style.transform = `translateY(2%)`;
        else
            musicPlayer.style.transform = 'translateY(96%)'
    }
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

// Gets the angle of the mouse from the element.
export function getAngleWithMouse(e: MouseEvent, id: string, factor: number): number {
    const el = document.getElementById(id)! as HTMLDivElement;
    const bounds = el.getBoundingClientRect()
    const elCenter: any = {
        x: bounds.left + bounds.width / 2,
        y: bounds.top + bounds.height / 2
    }

    const angle = Math.atan2(e.pageX - elCenter.x,  -(e.pageY - elCenter.y))
    return (angle * ((180 * factor) / Math.PI));
}

// Gets the roation of an element.
export const getRotation = (el: HTMLElement): number => {
    let vals: string | string[] = window.getComputedStyle(el, null).getPropertyValue('transform');
    vals = vals.split('(')[1].split(')')[0].split(',');
    let a: number = Number(vals[0]);
    let b: number =  Number(vals[1]);

    const scale = Math.sqrt(a*a + b*b);
    return Math.round(Math.asin(b / scale) * (180 / Math.PI));
}