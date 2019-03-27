import * as React from 'react';

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

interface ILoadingState {
    text: string
}

export default class Loading extends React.Component <ILoadingProps, ILoadingState> {
    state: ILoadingState = {
        text: this.props.text
    }

    static defaultProps = {
        text: 'Loading',
        speed: 300
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