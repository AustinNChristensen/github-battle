import * as React from 'react';

var api = require('../utils/api');

export interface IProps {}
export interface IState {
    selectedLanguage: string,
    repos: any
}
export interface ILanguageProps {
    selectedLanguage: string,
    onSelect(language: string): void
}
interface IRepoGridProps {
    repos: any
}


function RepoGrid (props: IRepoGridProps) {
    return (
        <ul className='popular-list'>
            {props.repos.map(function(repo: any, index: number){
                return(
                    <li key={repo.name} className='popular-item'>
                        <div className='popular-rank'>#{index + 1}</div>
                        <ul className='space-list-items'>
                            <li>
                                <img className='avatar' src={repo.owner.avatar_url} alt={'avatar for ' + repo.owner.login } />
                            </li>
                            <li><a href={repo.html_url}>{repo.name}</a></li>
                            <li>@{repo.owner.login}</li>
                            <li>{repo.stargazers_count} stars</li>
                        </ul>
                    </li>
                )
            })}
        </ul>
    )

}

function SelectedLanguage(props: ILanguageProps) {
    var languages = ['All', 'Javascript', 'Ruby', 'Java', 'CSS', 'Python'];
    return(
        <ul className='languages'>
            {languages.map(function (lang: string){
                return (
                    <li 
                    style={lang === props.selectedLanguage ? {color:  '#d0021b'} : null}
                    key={lang} 
                    onClick={props.onSelect.bind(null, lang)}>
                    {lang}
                    </li>
                )
            })}
        </ul>
    )
}

export default class Popular extends React.Component <IProps, IState> {
    constructor(props: IProps){
        super(props);
        this.state = {
            selectedLanguage: "All",
            repos: null
        };
        this.updateLanguage= this.updateLanguage.bind(this);
    }

    componentDidMount () {
        // ajax
        this.updateLanguage(this.state.selectedLanguage);

    }

    updateLanguage(lang: string){
        this.setState(function () {
            return {
                selectedLanguage: lang,
                repos: null
            }
        });

        api.fetchPopularRepos(lang)
            .then(function (repos: Array<any>) {
                this.setState(function () {
                    return {
                        repos: repos
                    }
                })
            }.bind(this));
    }
    
    render(){
        return(
            <div>
                <SelectedLanguage 
                    selectedLanguage={this.state.selectedLanguage} 
                    onSelect={this.updateLanguage}
                />
                {!this.state.repos
                    ? <p>LOADING</p>
                    : <RepoGrid repos={this.state.repos} />
                }
                
            </div>
        )

    }
}