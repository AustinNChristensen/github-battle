var axios = require('axios');

module.exports = {
    fetchPopularRepos: function(language: string) {
        var encodedURI = window.encodeURI('https://api.github.com/search/repositories?q=stars:>1+language:'+language+'&sort=stars&order=desc&type=Repositories');
        return axios.get(encodedURI)
            .then(function(response: any){
                return response.data.items;
            });
    }
}