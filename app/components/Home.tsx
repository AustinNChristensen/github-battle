var React = require('react');
var Link = require('react-router-dom').Link;

class Home extends React.Component <any, any> {
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
module.exports = Home;