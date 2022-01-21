export interface UserAgent {
    prefersReducedMotion: boolean;
    prefersDarkMode: boolean;
    sysLang: string;
} 

export interface EventState {
    isMouseDown: boolean;
}

// Music related
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
    songsToPlay: I_INF_Song;
    status: 'idle' | 'fulfilled' | 'rejected';
    currSong: INF_Song | any;
    currIdx: number;
    currSongType: string;
}

export interface I_INF_Song {
    [key: string]: INF_Song[]
}

export interface NewSong {
    title: string;
    genre: string;
    profile: File | null;
    audio: File | null;
}

// User related 
export interface UserForm {
    firstName?: string;
    lastName?: string;
    email?: string;
    password?: string;
    producerName?: string;
    profilePicture?: File | null;
}

export interface UserLogin {
    email?: string;
    password?: string;
}

export interface UserState {
    user: User | null;
    isLogged: boolean;
    isSignedUp: boolean;
    changesMade: boolean;
    doSave: boolean;
}

export interface User {
    id: number;
    first_name: string;
    last_name: string;
    email: string;
    producer_name: string;
    is_super_user: boolean;
    profile: File | Blob;
}

export interface UtilsState {
    loc: string;
}

// Album

export interface INF_Album {
    id: number
    album_name: string;
} 