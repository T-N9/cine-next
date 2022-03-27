import styles from './DetailHero.module.scss';
import { useState, useEffect } from 'react';
import useSWR from "swr";

const fetcher = (...args) => fetch(...args).then(res => res.json());

const Torrent = ({ title, year, imdb_id }) => {

    const [torrents, setTorrents] = useState(null);

    const { data, error } = useSWR(`https://yts.mx/api/v2/list_movies.json?query_term=${title}( ${year} )`, fetcher)

    useEffect(() => {
        if(data){
            setTorrents(data)
        }
    }, [data])

    let torrent_links;
    if(torrents !== null) {
        // console.log(torrents)
        // console.log(torrents.data.movies)

        let targetMovie;
        if (torrents.data.movies) {

            targetMovie = torrents.data.movies.filter(movie => {
                return movie.imdb_code === imdb_id;
            })

            // console.log(targetMovie);

            if (targetMovie[0] !== undefined) {
                // console.log(targetMovie[0].torrents);
                // setTorrents(targetMovie[0].torrents)
                torrent_links = targetMovie[0].torrents;
            } else if (targetMovie.length === 0) {
                // setTorrents([])
                torrent_links= [];
                // console.log('No links')
            }
        }
    }


    if (error) return <div>Failed to load</div>
    if (!data) return <div>Loading...</div>

    return (
        <>
            <div className={styles.torrent_wrapper}>
                <h1>Download</h1>
                {/* <p>{title}</p>
                <p>{year}</p> */}
                <div className={styles.torrents}>
                    {
                        (torrent_links !== [] && torrent_links !== undefined) &&
                        torrent_links.map(torrent => {
                            return (
                                <a className={styles.torrent_item} key={torrent.url} href={`${torrent.url}`}>
                                    <p>
                                        <span className={styles.quality}>
                                            {torrent.quality}
                                        </span>
                                        .
                                        <span className={styles.type}>
                                            {torrent.type}
                                        </span>
                                    </p>
                                </a>
                            )
                        })
                    }
                    {
                        // (torrent_links !== undefined || torrent_links !== []) &&
                        torrents !== null &&
                        torrents.data.movies === undefined && <p>No torrents found!</p>
                    }
                </div>
            </div>
        </>
    )
}

export default Torrent;