import { ICON_ERROR, ICON_INFO } from "./consts";
import { DataItem, UserAgent } from "./interfaces";

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

let popupInterval = setTimeout(() => null);
export function popup(text: string, type: string, forceClear: boolean=false): void {
    const popup = document.getElementById('popup') as HTMLDivElement;
    const popupIcon = document.getElementById('popup-icon') as HTMLParagraphElement;
    const popupType = document.getElementById('popup-type') as HTMLParagraphElement;
    const popupText = document.getElementById('popup-text') as HTMLParagraphElement;
    const typeLowerCase: string = type.toLowerCase();

    const error_icon = ICON_ERROR;
    const info_icon = ICON_INFO;

    if(forceClear) {
        clearInterval(popupInterval);
        return;
    }

    if(!popup.classList.contains('active')) {
        popupText.textContent = text;
        popup.className = `popup ${typeLowerCase} active`;
        popupIcon.textContent = eval(`${typeLowerCase}_icon`);
        popupType.textContent = type;

        popupInterval = setTimeout(() => {
            popup.classList.remove('active');
            popup.classList.add('inactive');
        }, 4900);
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

export function fullReload() {
    setTimeout(() => {
        window.location.reload();
    }, 1000)
}

export function previewImage(id: string, imgFile: File, def: string | null) {
    const imgEl = document.getElementById(id) as HTMLImageElement;

    if(imgFile instanceof File) {
        const url: string = window.URL.createObjectURL(imgFile);
        imgEl.src = url;
    }

    else if(def !== null) {
        imgEl.src = def;
    }

    else {
        imgEl.src = '';
    }
}

/**
 * @param isHeader -> if true then splits the scheme and token
 * @returns Token from localStorage or api
 */
export function getToken(isHeader: boolean=true): string {
    const tok = localStorage.getItem('tok')!;
    if(tok !== null)
        if(isHeader)
            return 'Token ' + tok;
        return tok
}

/**
 * @param File -> Audio file
 * @param format -> return HH:MM:SS if *then* s
 */
export function getAudioLength(file: File, format: boolean=true) {
    return new Promise((resolve) => {
        const audio = new Audio();

        audio.onloadedmetadata = () => {
            let duration: string | number = audio.duration;

            if(format)
                duration = convertToDateTime(audio.duration);

            resolve(duration);
        }

        audio.src = URL.createObjectURL(file);
    })
}

/**
 * @param time in seconds
 * @returns -> HH::MM:SS
 */
export function convertToDateTime(time: number): string {
    return new Date(time * 1000).toISOString().substr(11, 8);
}

/**
 * @param el
 * @returns {object} { id, type, referBy }
*/
export function splitDataItem(el: HTMLElement): DataItem {
    const attrs: string[] = el.getAttribute('data-item')!?.split(';');

    return { id: Number(attrs[0]), type: attrs[1], referBy: attrs[2] };
}