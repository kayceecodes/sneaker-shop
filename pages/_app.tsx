import React, { Dispatch, useState } from 'react'
import Head from 'next/head'
import { AppProps } from 'next/app'
import { ThemeProvider } from '@material-ui/core/styles'
import CssBaseline from '@material-ui/core/CssBaseline'
import theme from '../src/Theme'
import { wrapper } from '../src/store/store'
import {
  createCheckout,
  fetchCheckout,
} from '../src/store/actions/actionCreators/checkout'
import { useDispatch } from 'react-redux'
import FramerMotionProvider from '../src/components/ui/hoc/FramerMotionProvider'
import { AnimatePresence } from 'framer-motion'
import { useRouter } from 'next/router'
import Header from '@/src/components/ui/header/Header'

function MyApp(props: AppProps) {
  const { Component, pageProps } = props
  const dispatch: Dispatch<any> = useDispatch()
  const router = useRouter()
  const [pageValue, setPageValue] = useState<number>(0)

  React.useEffect(() => {
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector('#jss-server-side')
    if (jssStyles) {
      jssStyles.parentElement!.removeChild(jssStyles)
    }
    if (localStorage.checkout_id) {
      dispatch(fetchCheckout(localStorage.checkout_id))
      console.log('Fetched Checkout ID!: ', localStorage.checkout_id)
    } else {
      console.log('Created new Checkout ID!')
      dispatch(createCheckout())
    }
  }, [createCheckout, dispatch, fetchCheckout])


  // const initialFetchCheckout: any = () => {  
  //   if (localStorage.checkout_id) {
  //     dispatch(fetchCheckout(localStorage.checkout_id))
  //     console.log('Fetched Checkout ID!: ', localStorage.checkout_id)
  //   } else {
  //     dispatch(createCheckout())
  //   }
  // }
  
  // initialFetchCheckout()
  // console.log('FROM _app.tsx', localStorage.checkout_id)
  return (
    <React.Fragment>
      <Head>
        <title>Cart Starter</title>
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width"
        />
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@200;300;500&family=Padauk&family=Roboto+Condensed:wght@300;400&display=swap"
          rel="stylesheet"
        />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/icon?family=Material+Icons"
        />
      </Head>
      <ThemeProvider theme={theme}>
        {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
        <CssBaseline />
        <Header pageValue={pageValue} setPageValue={setPageValue} />
        {/* <div style={{ marginBottom: '60px' }} /> */}
        <FramerMotionProvider>
          {(props) => (
            <AnimatePresence exitBeforeEnter>
              <Component
                key={router.pathname}
                setPageValue={setPageValue}
                pageValue={pageValue}
                {...props}
                {...pageProps}
              />
            </AnimatePresence>
          )}
        </FramerMotionProvider>
      </ThemeProvider>
    </React.Fragment>
  )
}

export default wrapper.withRedux(MyApp)
