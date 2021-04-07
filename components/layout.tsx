import Head from 'next/head'
import Image from 'next/image'
import styles from './layout.module.css'
import utilStyles from '../styles/utils.module.css'
import Link from 'next/link'

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