import type {Metadata} from 'next';
import './globals.css';
import SiteNav from '@/components/SiteNav';
import Footer from '@/components/Footer';
export const metadata:Metadata={metadataBase:new URL('https://malakalhanafi02.github.io'),title:{default:'Malak Al-Hanafi — AI & Mechatronics Engineer',template:'%s · Malak Al-Hanafi'},description:'Engineering portfolio of Malak Al-Hanafi: autonomous robotics, computer vision, applied AI, research at KAUST, and practical teaching.',robots:{index:true,follow:true},icons:{icon:'/favicon.svg'}};
export default function RootLayout({children}:{children:React.ReactNode}){return <html lang="en"><body><SiteNav/><main id="main">{children}</main><Footer/></body></html>}
