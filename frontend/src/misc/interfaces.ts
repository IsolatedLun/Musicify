export interface UserAgent {
    prefersReducedMotion: boolean;
    prefersDarkMode: boolean;
    sysLang: string;
} 

export interface EventState {
    isMouseDown: boolean;
}

export interface Song {
    id: number;
    title: string;
    author: string;
    views: number;
    rating: number;
    created_at: Date;
}

export interface MusicState {
    songs: Song[];
    status: 'idle' | 'fulfilled' | 'rejected';
}