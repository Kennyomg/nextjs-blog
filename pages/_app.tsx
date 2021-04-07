import '../styles/global.css'
import { AppProps } from 'next/app'
import { init } from '../lib/builder'

init()

export default function App({ Component, pageProps }: AppProps) {
    return <Component {...pageProps} />
}
