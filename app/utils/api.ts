const axios = require('axios');

const id: string = "a12700a97924bd4633c3" // YOUR_CLIENT_ID
const sec: string = "56ac23ebdcb969d213f4ddd882664b41bf0f57fe" // YOUR_SECRET_ID
const params: string = `?client_id=${id}&client_secret=${sec}`;

async function getProfile(username: string): any{
    const profile = await axios.get(`https://api.github.com/users/${username}${params}`)
    return profile.data
}

function getRepos(username: string): any {
    return axios.get(`https://api.github.com/users/${username}/repos${params}`);
}

function getStarCount (repos: any): number {
    return repos.data.reduce((count: number, {stargazers_count}: any) => count + stargazers_count ,0)
}

function calculateScore({followers}: any, repos: any): number{
    return (followers * 1) + getStarCount(repos);
}

function handleError(error: any): null{
    console.warn(error);
    return null
}

async function getUserData (player: any) {
    const [ profile, repos ] = await Promise.all([
        getProfile(player), 
        getRepos(player)
    ]);
    return {
        profile,
        score: calculateScore(profile,repos)
    }
}

function sortPlayers (players: any) {
    return players.sort((a: any, b: any) => b.score - a.score );
}

export async function battle (players: Array<any>) {
        const results = await Promise.all(players.map(getUserData))
            .catch(handleError);
        
        return results === null
        ? results
        : sortPlayers(results)

}

export async function fetchPopularRepos (language: string) {
    const encodedURI = window.encodeURI(`https://api.github.com/search/repositories?q=stars:>1+language:${language}&sort=stars&order=desc&type=Repositories`);
    const repos = await axios.get(encodedURI)
        .catch(handleError);
    return repos.data.items;
}