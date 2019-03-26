var axios = require('axios');

var id: string = "a12700a97924bd4633c3" // YOUR_CLIENT_ID
var sec: string = "56ac23ebdcb969d213f4ddd882664b41bf0f57fe" // YOUR_SECRET_ID
var params: string = '?client_id=' + id + '&client_secret' + sec; // '?client_id=' + id + '&client_secret' + sec;

function getProfile(username: string) : any{
    return axios.get('https://api.github.com/users/' + username + params)
        .then(function(user: any) {
            return user.data;
        });
}

function getRepos(username: string) : any {
    return axios.get('https://api.github.com/users/' + username + '/repos' + params);
}

function getStarCount (repos: any) : number {
    return repos.data.reduce(function(count: number, repo: any){
        return count + repo.stargazers_count;
    },0)
}

function calculateScore(profile: any, repos: any) : number{
    var followers : any = profile.followers;
    var totalStarts = getStarCount(repos);
    return (followers * 3) + totalStarts;
}

function handleError(error: any) : null{
    console.warn(error);
    return null
}

function getUserData (player: any) {
    return axios.all([
        getProfile(player),
        getRepos(player)
    ]).then(function(data: any){
        var profile: any = data[0];
        var repos: any = data[1];

        return {
            profile: profile,
            score: calculateScore(profile,repos)
        }
    });
}

function sortPlayers (players: any) {
    return players.sort(function(a: any, b: any){
        return b.score - a.score;
    });
}


module.exports = {
    battle: function (players: Array<any>) {
        return axios.all(players.map(getUserData))
            .then(sortPlayers)
            .catch(handleError)
    },

    fetchPopularRepos: function(language: string) {
        var encodedURI = window.encodeURI('https://api.github.com/search/repositories?q=stars:>1+language:'+language+'&sort=stars&order=desc&type=Repositories');
        return axios.get(encodedURI)
            .then(function(response: any){
                return response.data.items;
            });
    }
}