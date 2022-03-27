import Document, { Html, Head, Main, NextScript } from 'next/document'

class MyDocument extends Document {

    render() {
        return (
            <Html>
                <Head>
                <meta charSet="utf-8" />
                <link rel="icon" href="/favicon.ico" />
                <meta name="theme-color" content="#278EA5" />
                    <meta name="title" content="CINE | Live cinematic information" />
                    <meta name="description"
                        content="A website that provides you cinematic data with stunning UI. Torrents for movies are also available and just a touch to download them." />
                    <meta name="keywords"
                        content="cine, cinema, cinematic, information, movies, series, tv shows, tv, shows, torrents, tmdb, yts, download movies" />
                    <meta name="robots" content="index, follow" />
                    <meta name="language" content="English" />
                    <meta name="revisit-after" content="1 days" />
                    <meta name="author" content="TeNyain Moe Lwin" />
                    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/Swiper/7.4.1/swiper-bundle.css"
                        integrity="sha512-PYSQaQBKTu066xiq+XES4zNfKps3Za9xFsPH97MuEaP53a4kNFed/Q7lW539jALMETHApKj7/CZ1ac9d0NBzZA=="
                        crossOrigin="anonymous" referrerpolicy="no-referrer" />

                    {/* <!-- Primary Meta Tags --> */}
                    <meta name="title" content="CINE | Live cinematic information" />
                    <meta name="description"
                        content="A website that provides you cinematic data with stunning UI. Torrents for movies are also available and just a touch to download them." />

                    {/* <!-- Open Graph / Facebook --> */}
                    <meta property="og:type" content="website" />
                    <meta property="og:url" content="https://cine-next.vercel.app/" />
                    <meta property="og:title" content="CINE | Live cinematic information" />
                    <meta property="og:description"
                        content="A website that provides you cinematic data with stunning UI. Torrents for movies are also available and just a touch to download them." />
                    <meta property="og:image" content="meta.png" />

                    {/* <!-- Twitter --> */}
                    <meta property="twitter:card" content="summary_large_image" />
                    <meta property="twitter:url" content="https://cine-next.vercel.app/" />
                    <meta property="twitter:title" content="CINE | Live cinematic information" />
                    <meta property="twitter:description"
                        content="A website that provides you cinematic data with stunning UI. Torrents for movies are also available and just a touch to download them." />
                    <meta property="twitter:image" content="meta.png" />
                </Head>
                <body>
                    <Main />
                    <NextScript />
                </body>
            </Html>
        )
    }
}

export default MyDocument