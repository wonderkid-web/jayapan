import { AuthProvider, useAuthContext } from "./context/authContext"

const app = ({ Component, pageProps } : any) => {
    const {isLoggin} = useAuthContext()

    console.log('its from PAGE: ', isLoggin)
    return (

      <AuthProvider>
      <Component {...pageProps} />
      </AuthProvider>
  
    
  )
}

export default app