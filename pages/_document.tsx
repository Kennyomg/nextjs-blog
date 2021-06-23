import Document, { Html, Head, Main, NextScript } from 'next/document'

class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const initialProps = await Document.getInitialProps(ctx)
    return { ...initialProps }
  }

  render() {
    return (
      <Html>
        <Head>
            <meta name='application-name' content='Happy Jar' />
            <meta name='apple-mobile-web-app-capable' content='yes' />
            <meta name='apple-mobile-web-app-status-bar-style' content='default' />
            <meta name='apple-mobile-web-app-title' content='Happy Jar' />
            <meta name='description' content='Your own Happy Jar' />
            <meta name='format-detection' content='telephone=no' />
            <meta name='mobile-web-app-capable' content='yes' />
            <meta name='msapplication-config' content='/icons/browserconfig.xml' />
            <meta name='msapplication-TileColor' content='#2B5797' />
            <meta name='msapplication-tap-highlight' content='no' />
            <meta name='theme-color' content='#000000' />

            <link rel='apple-touch-icon' href='/icons/Jar-iphone.png' />
            <link rel="apple-touch-icon" sizes="57x57" href="/icons/Jar-iphone.png">
            <link rel="apple-touch-icon" sizes="76x76" href="/icons/Jar-ipad-small.png">
            <link rel="apple-touch-icon" sizes="120x120" href="/icons/Jar-iphone-retina.png">
            <link rel='apple-touch-icon' sizes='152x152' href='/icons/Jar-ipad.png' />
            <link rel='apple-touch-icon' sizes='167x167' href='/icons/Jar-ipad-retina.png' />
            <link rel='apple-touch-icon' sizes='180x180' href='/icons/Jar-iphone-retina.png' />

            <link rel="icon" sizes="192x192" href="/icons/Jar-192x192.png" />
            <link rel="icon" sizes="128x128" href="/icons/Jar-128x128.png" />

            <link rel='icon' type='image/png' sizes='32x32' href='/icons/Jar-32x32.png' />
            <link rel='icon' type='image/png' sizes='16x16' href='/icons/Jar-16x16.png' />
            <link rel='manifest' href='/manifest.json' />
            <link rel='mask-icon' href='/icons/safari-pinned-tab.svg' color='#5bbad5' />
            <link rel='shortcut icon' type='image/png' href='/icons/Jar-16x16.png' />
            <link rel='stylesheet' href='https://fonts.googleapis.com/css?family=Roboto:300,400,500' />
                
            <meta name='twitter:card' content='summary' />
            <meta name='twitter:url' content='https://nextjs-blog-kennyomg.vercel.app' />
            <meta name='twitter:title' content='Happy Jar' />
            <meta name='twitter:description' content='Your own Happy Jar' />
            <meta name='twitter:image' content='/icons/Jar-192x192.png' />
            <meta name='twitter:creator' content='@KennyOmg' />
            <meta property='og:type' content='website' />
            <meta property='og:title' content='Happy Jar' />
            <meta property='og:description' content='Your own Happy Jar' />
            <meta property='og:site_name' content='Happy Jar' />
            <meta property='og:url' content='https://nextjs-blog-kennyomg.vercel.app' />
            <meta property='og:image' content='https://nextjs-blog-kennyomg.vercel.app/icons/apple-touch-icon.png' />

            {/* {'<!--'} apple splash screen images {'-->'}
            {'<!--'}
            <link rel='apple-touch-startup-image' href='/static/images/apple_splash_2048.png' sizes='2048x2732' />
            <link rel='apple-touch-startup-image' href='/static/images/apple_splash_1668.png' sizes='1668x2224' />
            <link rel='apple-touch-startup-image' href='/static/images/apple_splash_1536.png' sizes='1536x2048' />
            <link rel='apple-touch-startup-image' href='/static/images/apple_splash_1125.png' sizes='1125x2436' />
            <link rel='apple-touch-startup-image' href='/static/images/apple_splash_1242.png' sizes='1242x2208' />
            <link rel='apple-touch-startup-image' href='/static/images/apple_splash_750.png' sizes='750x1334' />
            <link rel='apple-touch-startup-image' href='/static/images/apple_splash_640.png' sizes='640x1136' />
            {'-->'} */}
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