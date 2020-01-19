# Scrapdash

A browser extension that creates a dashboard page with configuration to pull information out of websites and scripts, including (but not limited to) grades, calendars, etc.

<p align="center">
    <img src="https://cdn.garykim.dev/img/scrapdash-1.jpg" height="250">
</p>
<p align="center">
    <img src="https://cdn.garykim.dev/img/scrapdash-2.jpg" height="250">
</p>
<p align="center">
    <img src="https://cdn.garykim.dev/img/scrapdash-3.jpg" height="250">
</p>

## Browsers Supported
- Firefox
- Chrome

## Installation
- Signed released are not yet available (coming soon!)

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

Copyright &copy; 2020 The Scrapdash Authors  
See [AUTHORS](AUTHORS) file for full list.

Source code licensed under [AGPL-3.0-or-later](LICENSE)
