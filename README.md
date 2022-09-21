# Radio.co track list parser

Simple parser for JSON format track lists from public.radio.co 

## How to use?

1. Install **npm** and **node.js** if you dont have it.
2. Clone this repository:
  ```
  $ cd
  $ git clone https://github.com/LokiX7/radio.co_tracklist_parser.git
  ```
3. Move to repository folder and install dependencies:
  ```
  $ cd radio.co_tracklist_parser
  $ npm install
  ```
4. Open **settings.ts** and configure parser options:
  - `STATION_ID` - ID of the station you want to parse. 
      
      > Example: https://public.radio.co/stations/sdda8682fb/requests/tracks **sdda8682fb** in URL it's - ID of Fimbul Radio
      
  - `FILENAME` - The name of the file where the data will be stored.
  - `EXCLUDE` - What tracks would you like to exclude?
       
      ```      
      artists: ['name of artist', 'name of artist', ...], // exclude tracks by artists
      titles: ['track title', 'track title', ...] // exclude tracks by titles
      ```   
  - `SORTBY` - Sort output track list by: `'artist'`, `'title'` or without sort `'none'`.

5. Run parser: 
      ```
      $ npm start
      ```

6. By default track list stored in tracks.txt in app folder.
