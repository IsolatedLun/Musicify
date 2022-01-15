import React from 'react'
import { useAppSelector } from '../../../hooks/hooks'
import { INF_Song, User } from '../../../misc/interfaces'
import { useGetUploadedSongsQuery } from '../../../services/musicService'
import Songs from '../song/Songs'

const UserSongs = ({ user }: { user: User }) => {
    const { uploadedSongs } = useAppSelector(state => state.music)
    
    useGetUploadedSongsQuery()

    return (
        <div className="user__songs">
            <h1 className="songs__title">{ user.producer_name }'s songs  
                <span className="txt--muted txt--small"> { uploadedSongs.length } result(s)</span>
            </h1>

            <div className="songs__results songs">
                <Songs songs={uploadedSongs} referBy='ref-uploads' mode='def' 
                    search='' genre=''/>
            </div>
        </div>
    )
}

export default UserSongs
