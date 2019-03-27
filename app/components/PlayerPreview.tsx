import * as  React from 'react';

interface IPlayerPreviewProps {
    avatar: string,
    username: string,
    children: any
}

export default function PlayerPreview ({avatar, username, children}: IPlayerPreviewProps) {
    return (
        <div>
            <div className='column'>
                <img 
                    className='avatar'
                    src={avatar}
                    alt={'Avatar for ' + username} 
                />
                <h2 className='username'>@{username}</h2>
            </div>
            {children}
        </div>
    )
}