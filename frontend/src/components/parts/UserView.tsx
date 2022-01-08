import React from 'react'

const UserView = ({ children }: { children: any }) => {
    return (
        <div className='user-container'>
            {
                children
            }
        </div>
    )
}

export default UserView
