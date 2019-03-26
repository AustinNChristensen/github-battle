var React = require('react');
var Link = require('react-router-dom').Link;
var PlayerPreview = require('./PlayerPreview');


interface IBattleProps {}

interface IBattleState {
    playerOneName: string,
    playerTwoName: string,
    playerOneImage: string,
    playerTwoImage: string
}

interface IPlayerInputProps {
    id: string,
    label: string,
    onSubmit(id: string, username: string) : void
}

interface IPlayerInputState {
    username: string
}

class PlayerInput extends React.Component <IPlayerInputProps, IPlayerInputState> {
    constructor(props: IPlayerInputProps){
        super(props);
        this.state = {
            username: ''
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event: any){
        var value = event.target.value;
        this.setState(function () {
            return {
                username: value
            }
        })
    }
    handleSubmit(event: any){
        event.preventDefault();
        this.props.onSubmit(this.props.id, this.state.username)
    }

    render() {
        return(
            <form className='column' onSubmit={this.handleSubmit}>
                <label className='header' htmlFor='username'>
                    {this.props.label} 
                </label>
                <input 
                    id='username' 
                    placeholder='github username' 
                    type='text' 
                    autoComplete='off' 
                    value={this.state.username} 
                    onChange={this.handleChange} 
                />
                <button 
                    className='button'
                    type='submit'
                    disabled={!this.state.username}
                >
                    submit
                </button>
            </form>

        )
    }
}


class Battle extends React.Component <IBattleProps, IBattleState> {
    constructor(props: IBattleProps){
        super(props);
        this.state = {
            playerOneName: "",
            playerTwoName: "",
            playerOneImage: null,
            playerTwoImage: null
        }
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleReset = this.handleReset.bind(this);
    }

    handleSubmit(id: string, username: string){
        this.setState(function(){
            var newState: any = {};
            newState[id + 'Name'] = username;
            newState[id + 'Image'] = 'https://github.com/' + username + '.png?size=200';
            return newState;
        });
    }

    handleReset(id: string){
        this.setState(function(){
            var newState: any = {};
            newState[id + 'Name'] = '';
            newState[id + 'Image'] = null;
            return newState;
        })
    }

    render() {
        var match: any = this.props.match;
        var playerOneName: string = this.state.playerOneName;
        var playerTwoName: string = this.state.playerTwoName;
        var playerOneImage: string = this.state.playerOneImage;
        var playerTwoImage: string = this.state.playerTwoImage;

        return (
            <div>
                <div className='row'>
                {!playerOneName &&
                <PlayerInput 
                    id='playerOne'
                    label='Player One'
                    onSubmit={this.handleSubmit}
                />}

                {playerOneImage !== null &&
                <PlayerPreview
                    avatar={playerOneImage}
                    username={playerOneName}
                >
                <button
                    className='reset'
                    onClick={this.handleReset.bind(null, 'playerOne')}
                > 
                    Reset 
                </button>
                </PlayerPreview>}

                {!playerTwoName &&
                <PlayerInput 
                    id='playerTwo'
                    label='Player Two'
                    onSubmit={this.handleSubmit}
                />}

                {playerTwoImage !== null &&
                <PlayerPreview
                    avatar={playerTwoImage}
                    username={playerTwoName}
                >
                <button
                    className='reset'
                    onClick={this.handleReset.bind(null, 'playerTwo')}
                > 
                    Reset 
                </button>
                </PlayerPreview>}
                
                </div>
                {playerOneImage && playerTwoImage &&
                <Link
                    className='button'
                to={{
                    pathname: match.url + '/results',
                    search: '?playerOneName=' + playerOneName + '&playerTwoName=' + playerTwoName
                }}>
                    Battle
                </Link>
            }
            </div>
        )
    }
}

module.exports = Battle;