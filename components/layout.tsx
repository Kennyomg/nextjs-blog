import Head from 'next/head'
import styles from '../styles/layout.module.css'

const name = 'Kenrick Halff'
export const siteTitle = 'Casual Positivity'

export default function Layout({
    children
}: {
    children: React.ReactNode
}) {
    return (
        <div className={styles.container}>
            <Head>
            </Head>
            <header></header>
            <main style={{position: 'relative'}}>{children}</main>
            <nav></nav>
        </div>
    )
}