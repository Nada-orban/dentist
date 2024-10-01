import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import Head from 'next/head';
import '../styles/globals.css'
import Layout from '@/components/Layout';
import 'bootstrap/dist/css/bootstrap.min.css'

export default function App({ Component, pageProps }: AppProps) {
  return <>
    <Head>
      <meta property="og:title" content="Singularity" />
      <meta name="keywords" content="BIM Services, BIM Support, BIM 5D, Dynamo, Architecture BIM, MEP BIM, Digital Transformation, Software Development" />
      <title>Luxury Dental Clinic</title>
      <meta property="og:image" content="/logo.jpg" />
      <meta property="og:url" content="" />

      <meta property="og:title" content="Luxury Dental Clinic" />
      <meta property="og:description" content="مركز الدكتور /مصطفى المصرى. لتجميل وزراعه الاسنان" />
      <meta property="og:type" content="website" />
      <meta property="og:site_name" content="uxury Dental Clinic" />
      <meta property="og:image:width" content="2000" />
      <meta property="og:image:height" content="2000" />
      {/* <meta name="twitter:image" content="https://singularityaec.com/static/images/logo/logo-blue.png" /> */}
      <link rel="icon" type="image/png" href="/logo.jpg" />

      {/* <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Organization",
            "name": "Singularity",
            "url": "https://singularityaec.com",
            "logo": "https://singularityaec.com/static/images/logo/logo-blue.png",
            "sameAs": [
              "https://www.facebook.com/SINGULARITY.AEC",
              //   "https://www.twitter.com/yourprofile",
              //   "https://www.instagram.com/yourprofile",
              "https://www.linkedin.com/company/singularity-aec/"
            ]
          })
        }}
      /> */}
    </Head>
    <Layout>
      <Component {...pageProps} />
    </Layout>

  </>
}
