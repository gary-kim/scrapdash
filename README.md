# Scrapdash

A browser extension that creates a dashboard page with configuration to pull information out of websites and scripts, including (but not limited to) grades, calendars, etc.

## Features
### Passwords
- Stores your passwords (they aren't protected lol)

## Browsers Supported
- Firefox
- Chrome

## Installation
- For Chrome: Chrome Web Store
- For Firefox: Check the releases page

- To setup the screenshot server:

```
cd **project**/host
npm install
node main.js &
```
or pull from [Docker Hub](https://hub.docker.com/r/garykim/scrapdash-server).
```bash
docker pull garykim/scrapdash-server
docker run -p 3000:3000 --cap-add=SYS_ADMIN -d -e SCRAPDASH_SHARED_PASSWORD=sharedsecret garykim/scrapdash-server
```

## Development
For Firefox
````bash
npm i
npm run webpack:dev:firefox
````
For Chrome
````bash
npm i
npm run webpack:dev:chromium
````

## License
00 -- License to Kill



