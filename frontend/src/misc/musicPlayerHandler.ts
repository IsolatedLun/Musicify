import { INF_Song } from "./interfaces";
import { getSongEl } from "./utils";

export const handleControls = (e: React.MouseEvent<HTMLButtonElement>, audioEl: HTMLAudioElement, 
        songs: INF_Song[], idx: number) => {
    const target = (e.target as HTMLButtonElement);
    switch(target.name) {
        case 'toggle-song':
            handleAudio(audioEl, target);
            break;

         case 'change-song':
             playBetween(songs, idx, target.getAttribute('data-num')!);
             break;
    }       
 }

 export const handleAudio = (audioEl: HTMLAudioElement, toggleBtn: HTMLButtonElement) => {
     if(audioEl.paused) {
         toggleBtn.innerText = '\uf04c';
         audioEl.play()
     }

     else {
         toggleBtn.innerText = '\uf04b';
         audioEl.pause()
     }
 }

 export const changeTime = (e: React.MouseEvent<HTMLDivElement>, audioEl: HTMLAudioElement) => {
     const pct: number = e.nativeEvent.offsetX / (e.target as HTMLDivElement).offsetWidth;
     audioEl.currentTime = pct * audioEl.duration;
 }

 export const handleAudioBar = (audioEl: HTMLAudioElement, audioBarProgress: HTMLDivElement) => {
     const pct: number = (audioEl.currentTime / audioEl.duration);
     audioBarProgress.style.transform = `scaleX(${pct})`;
 }

 export const dragAudioBar = (e: React.MouseEvent<HTMLDivElement>, audioEl: HTMLAudioElement, 
        isMouseDown: boolean) => {
     if(isMouseDown) {
         changeTime(e, audioEl);
     }
 }

 export const playBetween = (songsToPlay: INF_Song[], currIdx: number,action: string='any') => {
     let nextSong: HTMLButtonElement | null = null;

     if(songsToPlay[currIdx + 1] && (action === 'any' || action === '1')) {
         nextSong = getSongEl(songsToPlay[currIdx + 1].id!)
     }

     else if(songsToPlay[currIdx - 1] && (action === 'any' || action === '-1')) {
         nextSong = getSongEl(songsToPlay[currIdx - 1].id!);
     }

     if(nextSong)
         nextSong.click();
 }

 export const updateTime = (audioEl: HTMLAudioElement, audioTime: HTMLDivElement) => {
     const currTime = new Date(audioEl.currentTime * 1000).toISOString().substr(11, 8);
     const duration = new Date(audioEl.duration * 1000).toISOString().substr(11, 8);
     audioTime.innerText = currTime + ' / ' + duration;
 }