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
    browseSongs: INF_Song[];
    recentSongs: INF_Song[];
    favoriteSongs: INF_Song[];
    songsToPlay: INF_Song[];
    status: 'idle' | 'fulfilled' | 'rejected';
    currSong: INF_Song;
    currIdx: number;
    currSongType: string;
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