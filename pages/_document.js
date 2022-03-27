import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
    return (
        <Html>
            <Head>
                <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/Swiper/7.4.1/swiper-bundle.css"
                    integrity="sha512-PYSQaQBKTu066xiq+XES4zNfKps3Za9xFsPH97MuEaP53a4kNFed/Q7lW539jALMETHApKj7/CZ1ac9d0NBzZA=="
                    crossOrigin="anonymous" referrerpolicy="no-referrer" />
            </Head>
            <body>
                <Main />
                <NextScript />
            </body>
        </Html>
    )
}