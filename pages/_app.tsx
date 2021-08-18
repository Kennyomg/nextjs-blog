import '../styles/global.css'
import { AppProps } from 'next/app'
import Head from 'next/head'
import { init } from '../lib/builder'
import { TouchBackend } from 'react-dnd-touch-backend'
import { DndProvider } from 'react-dnd'

init()

export default function App({ Component, pageProps }: AppProps) {
    return (<DndProvider backend={TouchBackend}>
        <Head><meta name='viewport' content='minimum-scale=1, initial-scale=1, width=device-width, shrink-to-fit=no, user-scalable=no, viewport-fit=cover' /></Head>
        <Component {...pageProps} />
    </DndProvider>)
}
