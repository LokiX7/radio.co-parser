export const STATION_ID = ''; // id stored in url. Example https://public.radio.co/stations/STATION_ID/requests/tracks

export const FILENAME = 'tracks.txt'; // saved tracks file name

export const EXCLUDE: {
    artists: string[];
    titles: string[];
} = {
    artists: [''], // exclude tracks by artists ['artist', 'artist', ...]
    titles: [''] // exclude tracks by titles ['title', 'title', ...]
}

export const SORTBY: 'artist' | 'title' | 'none' = 'none'; // Sort tracks by. Default - null


