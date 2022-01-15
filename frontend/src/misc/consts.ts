export const API_URL = 'http://localhost:8000/api/';
export const GET_PROFILE = API_URL + 'users/profiles/';
export const GET_SONGS = API_URL + 'songs';
export const GET_SONG = API_URL + 'songs/audio/';
export const GET_THUMBNAIL = API_URL + 'songs/thumb/'
export const GET_RECENTS = API_URL + 'songs/recents/get/';
export const POST_RECENTS = API_URL + 'songs/recents/post/';
export const POST_LOGIN = API_URL + 'users/login';
export const POST_SIGNUP = API_URL + 'users/signup';
export const POST_SAVE = API_URL + 'users/update';  
export const POST_UPLOAD = API_URL + 'songs/upload';
export const GET_TOKEN = API_URL + 'users/tok/';

export const HEADERS_FILE = {
    'content-type': 'multipart/form-data'
}

// For toggling
export const DROPUP_ON = '70%';
export const DROPUP_OFF = '105%';

// Icons
export const ICON_ERROR = '\uf071';
export const ICON_INFO = '\uf05a';