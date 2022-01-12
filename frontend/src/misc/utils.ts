import { UserAgent } from "./interfaces";

export function animateMixerBars(id: string): void {
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

export const toggleMusicPlayer = (ignore: boolean=false): void => {
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

export const toggleElement = (id: string, offVal: string, onVal: string, togglerClsName: string,
    ignore: boolean=false): void => {
    const el: HTMLElement | null = document.getElementById(id) ?? null;

    if(el !== null && !ignore) {
        if(!el.style.transform) {
            el.style.transform = `translateY(${offVal})`
            el.classList.remove(togglerClsName);
        }

        if(el.style.transform === `translateY(${offVal})`) {
            el.classList.add(togglerClsName);
            el.style.transform = `translateY(${onVal})`;
        }
            
        else {
            el.style.transform = `translateY(${offVal})`;
            el.classList.remove(togglerClsName);
        }
    }
}

export const focusElement = (id: string) => {
    document.getElementById(id)?.focus();
}

export const getSongEl = (num: number | string): HTMLButtonElement => {
    return document.getElementById('song-' + (num) + '-queue') as HTMLButtonElement;
}

export function genNum(max: number): number {
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

export function popup(text: string, type: string): void {
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

export function areObjectsEqual(a: object, b: object): boolean {
    if(JSON.stringify(a) === JSON.stringify(b)) {
        return true;
    }

    return false;
}

export function constructFormData(obj: object): FormData | null {
    if(obj instanceof Object) {
        let formData = new FormData();

        Object.entries(obj).forEach(tup => {
            formData.append(tup[0], tup[1])
        })

        return formData
    }

    return null;
}

export function isImage(file: File): boolean {
    const pattern = /image-*/;

    if(file.type.match(pattern))
        return true;
    return false;
}

export function fullReload() {
    setTimeout(() => {
        window.location.reload();
    }, 1000)
}