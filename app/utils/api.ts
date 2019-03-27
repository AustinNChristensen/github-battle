const axios = require('axios');

const id: string = "a12700a97924bd4633c3" // YOUR_CLIENT_ID
const sec: string = "56ac23ebdcb969d213f4ddd882664b41bf0f57fe" // YOUR_SECRET_ID
const params: string = `?client_id=${id}&client_secret=${sec}`;

function getProfile(username: string): any{
    return axios.get(`https://api.github.com/users/${username}${params}`)
        .then(( {data}: any) => data );
}

function getRepos(username: string): any {
    return axios.get(`https://api.github.com/users/${username}/repos${params}`);
}

function getStarCount (repos: any): number {
    return repos.data.reduce((count: number, {stargazers_count}: any) => count + stargazers_count ,0)
}

function calculateScore({followers}: any, repos: any): number{
    return (followers * 3) + getStarCount(repos);
}

function handleError(error: any): null{
    console.warn(error);
    return null
}

function getUserData (player: any) {
    return Promise.all([
        getProfile(player),
        getRepos(player)
    ]).then(([ profile, repos ]: any) => ({
            profile,
            score: calculateScore(profile,repos)
    }));
}

function sortPlayers (players: any) {
    return players.sort((a: any, b: any) => b.score - a.score );
}

export function battle (players: Array<any>) {
    return Promise.all(players.map(getUserData))
    .then(sortPlayers)
    .catch(handleError)
}

export function fetchPopularRepos (language: string) {
    const encodedURI = window.encodeURI(`https://api.github.com/search/repositories?q=stars:>1+language:${language}&sort=stars&order=desc&type=Repositories`);
    return axios.get(encodedURI)
        .then(({data}: any) => data.items );
}