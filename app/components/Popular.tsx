import * as React from 'react';

const api = require('../utils/api');
const Loading = require('./Loading');

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


function RepoGrid ({repos}: IRepoGridProps) {
    return (
        <ul className='popular-list'>
            {repos.map(({name, stargazers_count, owner, html_url}: any, index: number) => (
                <li key={name} className='popular-item'>
                    <div className='popular-rank'>#{index + 1}</div>
                    <ul className='space-list-items'>
                        <li>
                            <img className='avatar' src={owner.avatar_url} alt={`avatar for ${owner.login}`} />
                        </li>
                        <li><a href={html_url}>{name}</a></li>
                        <li>@{owner.login}</li>
                        <li>{stargazers_count} stars</li>
                    </ul>
                </li>
            ))}
        </ul>
    )
}

function SelectedLanguage({selectedLanguage, onSelect}: ILanguageProps) {
    const languages = ['All', 'Javascript', 'Ruby', 'Java', 'CSS', 'Python'];
    return(
        <ul className='languages'>
            {languages.map((lang: string) => (
                <li 
                style={lang === selectedLanguage ? {color: '#d0021b'} : null}
                key={lang} 
                onClick={() => onSelect.bind(lang)}>
                {lang}
                </li>
            ))}
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
        this.setState(() => ({
                selectedLanguage: lang,
                repos: null
        }));

        api.fetchPopularRepos(lang)
            .then((repos: Array<any>) => {
                this.setState(() => ({ repos }))
            });
    }
    
    render(){
        const { selectedLanguage, repos } = this.state; 
        return(
            <div>
                <SelectedLanguage 
                    selectedLanguage={selectedLanguage} 
                    onSelect={this.updateLanguage}
                />
                {!repos
                    ? <Loading />
                    : <RepoGrid repos={repos} />
                }
            </div>
        )
    }
}