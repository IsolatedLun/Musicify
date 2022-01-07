export interface UserAgent {
    prefersReducedMotion: boolean;
    prefersDarkMode: boolean;
    sysLang: string;
} 

export interface EventState {
    isMouseDown: boolean;
}

export interface INF_Song {
    id: number | null;
    title: string;
    author: string;
    genre: string;
    views: number;
    rating: number;
    created_at: Date;
}

export interface MusicState {
    songs: INF_Song[];
    status: 'idle' | 'fulfilled' | 'rejected';
    currSong: INF_Song;
    currIdx: number;
}

export interface UserForm {
    firstName?: string;
    lastName?: string;
    email?: string;
    password?: string;
    bandName?: string;
}

export interface UserLogin {
    email?: string;
    password?: string;
}

export interface UserState {
    user: User;
    isLogged: boolean;
    isSignedUp: boolean;
}

export interface User {
    firstName: string;
    lastName: string;
    email: string;
    bandName: string;
    isSuperUser: boolean;
}