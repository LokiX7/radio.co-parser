import * as fs from 'node:fs/promises';
import * as path from 'node:path';

import axios, {AxiosResponse} from 'axios';

import {STATION_ID, FILENAME, EXCLUDE, SORTBY} from './settings.js'

const DIRNAME = path.dirname(new URL(import.meta.url).pathname);

interface trackType {
    artist: string
    title: string
}


async function request(url: string): Promise<AxiosResponse> {
    try {
        const response = await axios.get(url);

        if(response.status > 299 || response.status < 200) {
            let codeErr = new Error(`Something wrong. Code: ${response.status}`);
            throw codeErr;
        }

        return response;

    } catch(err) {
        throw err;
    }
}


async function parseTrackList(response: AxiosResponse): Promise<{count: number, tracks: trackType[]}> {

    let tracks: trackType[] = [];
    let parsedTrack: trackType;
    let counter = 0;

    for( let track of response.data.tracks ) {

        if(EXCLUDE.artists.includes(track.artist) || EXCLUDE.titles.includes(track.title)) {
            continue;
        }

        parsedTrack = {artist: track.artist, title: track.title};

        tracks.push(parsedTrack);

        counter++
    }

        return {count: counter, tracks: tracks};
}


async function sortTracks(tracks: trackType[]): Promise<trackType[]> {
    if( SORTBY !== 'none' ) {
        const compare = (a: trackType, b: trackType) => {
            let key = SORTBY as 'artist' | 'title';

            if(a[key] > b[key]) {
                return 1;
            }

            if(a[key] < b[key]) {
                return -1;
            }

            return 0;
        }

        return tracks.sort(compare);

    }

    return tracks;
}


async function saveTracks(tracks: trackType[]): Promise<void> {
    const destination = path.join(DIRNAME, '..', FILENAME);

    await fs.writeFile(destination, '');
    
    for(let track of tracks) {
        let str = `${track.artist} - ${track.title}\n`;

        await fs.appendFile(destination, str);
    }
}

async function parse(): Promise<void> {
    const ADRESS = `https://public.radio.co/stations/${STATION_ID}/requests/tracks`; 
    
    try {
        const response = await request(ADRESS);
        const parsed = await parseTrackList(response);
        const sorted = await sortTracks(parsed.tracks);
        await saveTracks(sorted)
        console.log(`Done! [${parsed.count}] tracks saved`);

    } catch(err) {
        if(err instanceof Error) {
            console.log(`${err.name}: ${err.message}`);    
        } else {
            console.log('Unexpected error', err);
        }
    }
}

parse();


