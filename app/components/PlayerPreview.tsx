var React = require('react');

interface IPlayerPreviewProps {
    avatar: string,
    username: string,
    children: any
}

function PlayerPreview (props: IPlayerPreviewProps) {
    return (
        <div>
            <div className='column'>
                <img 
                    className='avatar'
                    src={props.avatar}
                    alt={'Avatar for ' + props.username} 
                />
                <h2 className='username'>@{props.username}</h2>
            </div>
            {props.children}
        </div>
    )
}
module.exports = PlayerPreview;