## Nickname Generator

This lightweight app was created using React, Material-UI, and a RhymeAPI from [RhymeBrain](http://rhymebrain.com/api.html).

The purpose of this app is to generate nicknames for my roommate Destin by fetching rhyming words from the RhymeBrain API. The suffixes at the end of Destin's name (e.g. Dest-ini, Dest-orni, Dest-ino) are used as the rhyming word used to fetch the API, and the returned JSON file is filtered by RhymeBrain's score so that most nicknames are perfect or near rhymes.

This app could be cloned to fit almost any name, and could be modularized to input any name/suffixes into the app in order to fetch nicknames, but I left it fairly static for simplicity's sake.

## Limitations of the API

RhymeBrain's API can only be pinged 350 times per hour, so the scalability of this app beyond novelty isn't feasible.

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).
