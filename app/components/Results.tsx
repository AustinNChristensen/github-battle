const React = require('react');
const queryString = require('query-string');
const api = require('../utils/api');
const Link = require('react-router-dom').Link;
const PlayerPreview = require('./PlayerPreview');
const Loading = require('./Loading');
interface IResultsState {
    winner: any,
    loser: any,
    error: any,
    loading: boolean
}

function Profile ({info}: any) {
    return (
        <PlayerPreview avatar={info.avatar_url} username={info.login}>
            <ul className='space-list-items'>
                {info.name && <li>{info.name}</li>}
                {info.location && <li>{info.location}</li>}
                {info.company && <li>{info.company}</li>}
                <li>Followers: {info.followers}</li>
                <li>Following: {info.following}</li>
                <li>Public Repos: {info.public_repos}</li>
                {info.blog && <li><a href={info.blog}>{info.blog}</a></li>} 
            </ul>
        </PlayerPreview>
    )
}

function Player ({label, score, profile}: any) {
    return (
        <div>
            <h1 className='header'>{label}</h1>
            <h3 style={{textAlign: 'center'}}>Score: {score}</h3>
            <Profile 
                info={profile}
            />
        </div>
    )
}


class Results extends React.Component <any, IResultsState> {
    constructor(props: any){
        super(props);
        this.state = {
            winner: null,
            loser: null,
            error: null,
            loading: true
        }
    }
    componentDidMount(){
        const {playerOneName, playerTwoName }: any = queryString.parse(this.props.location.search);
        api.battle([
            playerOneName,
            playerTwoName
        ]).then((results: any) => {
            if (results === null){
                return this.setState(() =>({
                        error: 'looks like there was an error. Check that users exist',
                        loading: false
                    }));
            }
            this.setState(() => ({
                    error: null,
                    winner: results[0],
                    loser: results[1],
                    loading: false
                }));
            console.log(results);
        });
    }
    render() {
        const { error, winner, loser, loading } = this.state;
        if(loading === true){
            return <Loading />
        }
        if (error) {
            return (
                <div>
                    <p>{error}</p>
                    <Link to='/battle'>Reset</Link>
                </div>
            )
        }
        return(
            <div className='row'>
                <Player
                label="Winner"
                score={winner.score}
                profile={winner.profile}
                />
                <Player
                label="Loser"
                score={loser.score}
                profile={loser.profile}
                />
            </div>
        )
    }
}
module.exports = Results;