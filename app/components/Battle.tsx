import * as React from 'react';
import { Link } from 'react-router-dom';
import PlayerPreview from './PlayerPreview';


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
        const value = event.target.value;
        this.setState(() => ({username: value}))
    }
    handleSubmit(event: any){
        event.preventDefault();
        this.props.onSubmit(this.props.id, this.state.username)
    }

    render() {
        const { label } = this.props;
        const { username } = this.state;
        return(
            <form className='column' onSubmit={this.handleSubmit}>
                <label className='header' htmlFor='username'>
                    {label} 
                </label>
                <input 
                    id='username' 
                    placeholder='github username' 
                    type='text' 
                    autoComplete='off' 
                    value={username} 
                    onChange={this.handleChange} 
                />
                <button 
                    className='button'
                    type='submit'
                    disabled={!username}
                >
                    submit
                </button>
            </form>

        )
    }
}


export default class Battle extends React.Component <IBattleProps, IBattleState> {
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
        this.setState(() => ({
            [id + 'Name']: username,
            [id + 'Image']: `https://github.com/${username}.png?size=200`
        }));
    }

    handleReset(id: string):any{
        this.setState(() => ({
            [id + 'Name']: '',
            [id + 'Image']: null
        }));
    }

    render() {
        const { match }: any = this.props;
        const { playerOneName, playerTwoName, playerOneImage, playerTwoImage } = this.state;

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
                    onClick={() => this.handleReset('playerOne')}
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
                    onClick={() => this.handleReset('playerTwo')}
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
                    search: `?playerOneName=${playerOneName}&playerTwoName=${playerTwoName}`
                }}>
                    Battle
                </Link>
            }
            </div>
        )
    }
}