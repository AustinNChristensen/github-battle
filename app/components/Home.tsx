import * as React from 'react';
import { Link } from 'react-router-dom';

export default class Home extends React.Component <any, any> {
    render() {
        return(
            <div className='home-container'>
                <h1>
                    Github Battle: Let's play.
                </h1>
                <Link className='button' to='/battle'>Battle!</Link>
            </div>
        )
    }
}