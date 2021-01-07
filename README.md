# 📺 React Conference TV

> A collections web, contains the react conferences and important info. site
> [stg site](https://reactconf.netlify.app/)
<p align="center">
  <img width="320" src="https://static.revtel-api.com/common/a107f1d8328847709c300ba25d675d6f.png" />
</p>

## Outline

- [Getting Started](#getting-started)<br/>

- [Motivation](#motivation)<br/>

- [Built With](#built-with)<br/>

- [Contribute](#contribute)<br/>

- [Directory Structure](#directory-structure)<br/>

- [Contributors](#contributors)<br/>

- [Contact](#contact)<br/>

## Getting Started

```
cd reactconf-tv
npm install
npm run start
```

open [http://localhost:8000/](http://localhost:8000/) for running locally reactconf-tv


## Motivation
We want to create a friendly gallery gathering the separate important information of react.




## Built with
- [Gatsby](https://www.gatsbyjs.com/)
- [YouTube api](https://developers.google.com/youtube/v3)


## Contribute
Welcome to contribute!
If you have any idea or suggestion, feel free to open an issue or create a PR.

####  How To Contribute a New Conference Resource for Reactconf-tv

- Can see the file `data.json` in `data` folder , and then you would see below data structure

```
  "ytChannels": [
    {
      "name": "react-conf",
      "display": "React Conf",
      "channelId": "UCz5vTaEhvh7dOHEyd1efcaQ",
      "conferences": [
        {
          "name": "react-conf",
          "display": "React Conf",
          "filters": ["React Conf"]
        }
      ]
    }
  ]
```

- ytChannels
  - `name` Channel Name
  - `display` Unused
  - `channelId` Channel id which use to fetch youtube api
    - conferences
      - `name` The name of the playlist
      - `display` The playlist name will display on the reactconf-tv playlist
      - `filters` The keyword to get the playlist

- How to get the channel id ?
   - Select the channel which you want to append to reactconf-tv,<br/>
     you would see the channel id on the url.

     `https://www.youtube.com/channel/${channel_id}`

- Where the keyword which I would place in the filters array ?
   - See the below picture , you will see the two playlists,<br/>
     what they have in common is the keyword `React Conf`,<br/>
     so if you want to append these palylists,<br/>
     please concat the `React Conf` in the filters of the channel.<br/>

     - p.s. Because system limitations, please choose the playlist that postfix has particular year.

    ![Imgur](https://i.imgur.com/WevsAiU.png)

- Why I concat the structure of channel, but I didn’t see the list in reactconf-tv ?
   - because reactconf-tv is static site, we will output static files we need first.<br/>
     so maybe you can run below script, you will fetch the data you want,
     then submit pull request.

      `node scripts/fetch-data.js`


### step
1. Open a new issue with description.
2. Fork and clone the repo. https://github.com/your-username/reactconf-tv.git.
3. Create a new branch based off the develop branch.
4. `npm install && npm start` to run the development enviroment.
5. Make changes.
6. Make commit message with [conventional commits specification](https://www.conventionalcommits.org/en/v1.0.0/).
7. Submit a pull request, referencing any issues it addresses.
8. We will review your Pull Request as soon as possible. Thank you for your contribution ✨

## Directory Structure

The following is the hign level folder structure of reactconf-tv

```
reactconf-tv
├── CHANGELOG.md
├── LICENSE
├── README.md
├── data
│   ├── all.json
│   ├── data.json
│   └── playlist
├── gatsby-browser.js
├── gatsby-config.js
├── gatsby-node.js
├── gatsby-ssr.js
├── package-lock.json
├── package.json
├── scripts
│   └── fetch-data.js
├── src
│   ├── AppContext.js
│   ├── PageContainer.js
│   ├── components
│   ├── hooks
│   ├── images
│   ├── index.css
│   ├── pages
│   ├── templates
│   └── utils
└── static
    ├── fonts
    ├── lib
    ├── playlistitems
    └── worker.js
```


## Contributors

<table>
  <tbody>
    <tr>
      <td align="center">
        <a href="https://github.com/whitedogg13">
          <img src="https://avatars3.githubusercontent.com/u/10307875?s=400&u=4ca8b7f2af4a1a32dcdee594aca61a800262c421&v=4" width="100px" />
        </a>
        <br/>
        <div>Richie Hsieh</div>
      </td>
      <td align="center">
        <a href="https://github.com/Mylio-chang">
          <img src="https://avatars3.githubusercontent.com/u/32530956?s=400&v=4" width="100px" />
        </a>
        <br/>
        <div>Mylio change</div>
      </td>
      <td align="center">
        <a href="https://github.com/ulayab">
          <img src="https://avatars2.githubusercontent.com/u/19527809?s=400&u=afa10a82996b318931ede57b8a2fce3dc7c4d83a&v=4" width="100px" />
        </a>
        <br/>
        <div>Ula chao</div>
      </td>
      <td align="center">
        <a href="https://github.com/guychienll">
          <img src="https://avatars3.githubusercontent.com/u/63462677?s=460&u=a82006b332820e1da1fc774d3337c1656303c1f3&v=4" width="100px" />
        </a>
        <br/>
        <div>Guy Chien</div>
      </td>
    </tr>
  </tbody>
</table>

## Contact

[Revtel Tech](mailto:contact@revtel.tech)

[![](https://www.revtel.tech/static/4545186ab8b681a171f4dd479ae818c8/af03b/revtel-logo-color.png)](https://www.revtel.tech/)
