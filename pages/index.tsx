import { useState } from 'react'
import Head from 'next/head'
import Link from 'next/link'
import Layout, { siteTitle } from '../components/layout'
import Date from '../components/date'
import utilStyles from '../styles/utils.module.css'

function getAngleFromEvent(e: any, setRotation: any) {
  const circle = e.target as HTMLElement
  const circleRect: DOMRect = circle.getBoundingClientRect()
  const circleCenter = {
    x: (circleRect.left + document.body.scrollLeft) + parseFloat(getComputedStyle(circle, null).width.replace('px', '')) / 2,
    y: (circleRect.top + document.body.scrollTop) + parseFloat(getComputedStyle(circle, null).height.replace('px', '')) / 2
  }

  let rotationAngle = Math.atan2(e.pageX - circleCenter.x, - (e.pageY - circleCenter.y)) * (180/Math.PI)
  setRotation(rotationAngle)
}

export default function Home() {
  const [showNav, setShowNav] = useState(false)
  const [activeNavIndex, setActiveNavIndex] = useState('')
  const [navRotation, setNavRotation] = useState(0)

  return (
    <Layout>
      <Head>
        <title>{siteTitle}</title>
      </Head>
      <div 
        className={`${utilStyles.cd} ${showNav && utilStyles.cdActive} ${activeNavIndex ? utilStyles['cdIndex' + activeNavIndex] : utilStyles.cdIndex1}`} 
        style={{transform: `translate(-50%, -50%) rotateZ(${navRotation}deg)`}}>
        <div className={utilStyles.cdBg}></div>
        <nav 
          className={utilStyles.cdNav}
          onMouseEnter={() => setShowNav(true)}
          onMouseLeave={() => setShowNav(false)}
          onTouchMove={(e) => getAngleFromEvent(e, setNavRotation)}
          onMouseMove={(e) => getAngleFromEvent(e, setNavRotation)}
        >
          <svg onClick={() => setActiveNavIndex('1')} width="26" height="29" viewBox="0 0 26 29" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M24.0614 3.19685C24.0614 1.43128 22.6301 0 20.8645 0H5.13545C3.36988 0 1.9386 1.43128 1.9386 3.19685V5.92763C1.9386 6.18503 2.14726 6.3937 2.40467 6.3937C2.807 6.3937 3.02702 6.87539 2.7835 7.19565C1.04017 9.48833 0 12.3821 0 15.5276C0 22.9682 5.8203 29 13 29C20.1797 29 26 22.9682 26 15.5276C26 12.3821 24.9598 9.48833 23.2165 7.19565C22.973 6.87539 23.193 6.3937 23.5953 6.3937C23.8527 6.3937 24.0614 6.18503 24.0614 5.92763V3.19685Z" fill="#F2F2F2"/></svg>
          <svg onClick={() => setActiveNavIndex('2')} width="34" height="34" viewBox="0 0 34 34" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M2.42161 17.0476C-1.36061 13.05 1.67981 6.48395 7.17502 6.78226C9.51968 6.90955 11.7286 5.67738 12.8521 3.61551C15.4853 -1.21694 22.6695 -0.354339 24.0839 4.9641C24.6874 7.23334 26.5419 8.9534 28.85 9.38477C34.2597 10.3958 35.6593 17.4949 31.0383 20.4836C29.0666 21.7588 28.0038 24.054 28.3067 26.3825C29.0169 31.8398 22.6977 35.3647 18.4273 31.8933C16.6053 30.4122 14.094 30.1107 11.9731 31.1184C7.00233 33.4801 1.69722 28.5595 3.67905 23.4254C4.52464 21.2349 4.03538 18.7533 2.42161 17.0476Z" fill="#C6CEF8"/></svg>
          <svg onClick={() => setActiveNavIndex('3')} width="26" height="29" viewBox="0 0 26 29" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M24.0614 3.19685C24.0614 1.43128 22.6301 0 20.8645 0H5.13545C3.36988 0 1.9386 1.43128 1.9386 3.19685V5.92763C1.9386 6.18503 2.14726 6.3937 2.40467 6.3937C2.807 6.3937 3.02702 6.87539 2.7835 7.19565C1.04017 9.48833 0 12.3821 0 15.5276C0 22.9682 5.8203 29 13 29C20.1797 29 26 22.9682 26 15.5276C26 12.3821 24.9598 9.48833 23.2165 7.19565C22.973 6.87539 23.193 6.3937 23.5953 6.3937C23.8527 6.3937 24.0614 6.18503 24.0614 5.92763V3.19685Z" fill="#E75187"/></svg>
          <svg onClick={() => setActiveNavIndex('4')} width="34" height="34" viewBox="0 0 34 34" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M2.42161 17.0476C-1.36061 13.05 1.67981 6.48395 7.17502 6.78226C9.51968 6.90955 11.7286 5.67738 12.8521 3.61551C15.4853 -1.21694 22.6695 -0.354339 24.0839 4.9641C24.6874 7.23334 26.5419 8.9534 28.85 9.38477C34.2597 10.3958 35.6593 17.4949 31.0383 20.4836C29.0666 21.7588 28.0038 24.054 28.3067 26.3825C29.0169 31.8398 22.6977 35.3647 18.4273 31.8933C16.6053 30.4122 14.094 30.1107 11.9731 31.1184C7.00233 33.4801 1.69722 28.5595 3.67905 23.4254C4.52464 21.2349 4.03538 18.7533 2.42161 17.0476Z" fill="#7BFF65"/></svg>
        </nav>
      </div>
    </Layout>
  )
}
