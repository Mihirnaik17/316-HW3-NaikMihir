import { useContext, useEffect } from 'react'
import { useHistory, useParams } from 'react-router-dom'
import SongCard from './SongCard.js'
import EditSongModal from './EditSongModal.js'
import { GlobalStoreContext } from '../store/index.js'
/*
    This React component lets us edit a loaded list, which only
    happens when we are on the proper route.
    
    @author McKilla Gorilla
*/
function SongCards() {
    const { store } = useContext(GlobalStoreContext);
    const { id } = useParams(); // GET THE PLAYLIST ID FROM THE URL
    store.history = useHistory();

    // THIS EFFECT HOOK WILL TRIGGER THE DATA LOADING WHEN THE URL ID CHANGES
    useEffect(() => {
        store.setCurrentList(id);
    }, [id]);

    let modalJSX = "";
    if (store.isEditSongModalOpen()) {
        modalJSX = <EditSongModal />;
    }

    // WAITS FOR THE DATA TO BE LOADED BEFORE TRYING TO RENDER
    if (!store.currentList) {
        return <div>Loading...</div>
    }

    return (
        <div id="playlist-cards">
        {
            store.currentList.songs.map((song, index) => (
                <SongCard
                    id={'playlist-song-' + (index)}
                    key={'playlist-song-' + (index)}
                    index={index}
                    song={song}
                />
            ))
        }
        {modalJSX}
        </div>
    )
}

export default SongCards;