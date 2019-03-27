var React = require('react');


var styles = {
    content: {
        textAlign: 'center',
        fontSize: '35px'
    }
}

interface ILoadingProps {
    speed: number,
    text: string

}
class Loading extends React.Component <any, any> {
    constructor(props: any){
        super(props);
        this.state = {
            text: props.text
        };
    }
    
    componentDidMount(){
        var stopper = this.props.text + '...';
        this.interval = window.setInterval(function(){
            if(this.state.text === stopper){
                this.setState(function(){
                    return {
                        text: this.props.text
                    }
                })
            } else {
                this.setState(function(prevState: any){
                    return {
                        text: prevState.text + '.'
                    }
                })
            }
        }.bind(this),this.props.speed)
    }

    componentWillUnmount(){
        window.clearInterval(this.interval);
    }


    render() {
        return (
            <p style={styles.content}>
                {this.state.text}
            </p>
        )
    }
}

Loading.defaultProps = {
    text: 'Loading',
    speed: 300
}
module.exports = Loading;