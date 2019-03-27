import * as React from 'react';
import { fetchPopularRepos } from '../utils/api';
import Loading from './Loading';
export interface IProps {}
export interface IState {
    selectedLanguage: string,
    repos: any | null
}
export interface ILanguageProps {
    selectedLanguage: string,
    onSelect(language: string): void
}
interface IRepoGridProps {
    repos: any
}

function SelectLanguage ({ selectedLanguage, onSelect }): ILanguageProps {
  const languages = ['All', 'JavaScript', 'Ruby', 'Java', 'CSS', 'Python'];
  return (
    <ul className='languages'>
      {languages.map((lang: string) => (
        <li
          style={lang === selectedLanguage ? {color: '#d0021b'} : null}
          onClick={() => onSelect(lang)}
          key={lang}>
            {lang}
        </li>
      ))}
    </ul>
  )
}

function RepoGrid ({ repos }: any) {
  return (
    <ul className='popular-list'>
      {repos.map(({ name, stargazers_count, owner, html_url }: any, index: number) => (
        <li key={name} className='popular-item'>
          <div className='popular-rank'>#{index + 1}</div>
          <ul className='space-list-items'>
            <li>
              <img
                className='avatar'
                src={owner.avatar_url}
                alt={'Avatar for ' + owner.login}
              />
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


export default class Popular extends React.Component <IProps, IState>{
  state: IState = {
    selectedLanguage: 'All',
    repos: null
  }

  componentDidMount() {
    this.updateLanguage(this.state.selectedLanguage)
  }
  
  updateLanguage = async (lang: string) => {
    this.setState(() => ({
      selectedLanguage: lang,
      repos: null
    }));

    const repos = await fetchPopularRepos(lang);
    this.setState(() => ({ repos }))
  }
  render() {
    const { selectedLanguage, repos } = this.state

    return (
      <div>
        <SelectLanguage
          selectedLanguage={selectedLanguage}
          onSelect={this.updateLanguage} />
        {!repos
          ? <Loading />
          : <RepoGrid repos={repos} />}
      </div>
    )
  }
}