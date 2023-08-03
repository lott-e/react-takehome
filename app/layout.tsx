import { Layout } from '@/components/dom/Layout'
import '@/global.css'

export const metadata = {
  title: 'InstaGen by Gendo',
  description: 'A social media app to post your AI generated images',
}

export default function RootLayout({ children }) {
  return (
    <html lang='en' className='antialiased'>
      {/*
        <head /> will contain the components returned by the nearest parent
        head.tsx. Find out more at https://beta.nextjs.org/docs/api-reference/file-conventions/head
      */}
      <head />
      <body>
        <Layout>{children}</Layout>
      </body>
    </html>
  )
}
