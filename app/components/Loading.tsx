const React = require('react');


const styles = {
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
        const { text, speed } = this.props;
        const stopper = text + '...';
        this.interval = window.setInterval(() => {
            this.state.text === stopper
            ? this.setState(() => ({text}))
            : this.setState((prevState: any) => ({ text: prevState.text + '.' }))
        },speed)
    }

    componentWillUnmount(){
        window.clearInterval(this.interval);
    }


    render() {
        const { text } = this.state;
        return (
            <p style={styles.content}>
                {text}
            </p>
        )
    }
}

Loading.defaultProps = {
    text: 'Loading',
    speed: 300
}
module.exports = Loading;