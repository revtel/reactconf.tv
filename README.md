# 📺 React Conference TV 

> A collections web, contains the react conferences and important info. site
> [stg site](https://reactconf.netlify.app/)

## Outline

- 🚀 [Getting Started](#getting-started)<br/>

- 💣 [Motivation](#motivation)<br/>

- 🔨  [Built With](#built-with)<br/>

- 💎 [Contribute](#contribute)<br/>

- 📂 [Directory Structure](#directory-structure)<br/>

- 📞 [Contact](#contact)<br/>

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

##### ⭐  How To Contribute a New Conference Resource for Reactconf-tv

- Can see the file `data.json` in `data` folder , and then you would see below data structure 

```
{
  "name": "reactconf.tv",
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
}
```



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

## Contact

[📮 mail](mailto:contact@revtel.tech) 

[![](https://www.revtel.tech/static/4545186ab8b681a171f4dd479ae818c8/af03b/revtel-logo-color.png)](https://www.revtel.tech/)
