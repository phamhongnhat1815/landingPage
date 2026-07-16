import './App.css'
import { ToastProvider } from './context/ToastContext'
import Navbar      from './components/Navbar'
import Hero        from './components/Hero'
import Invitation  from './components/Invitation'
import Gallery     from './components/Gallery'
import Countdown   from './components/Countdown'
import Schedule    from './components/Schedule'
import Venues      from './components/Venues'
import Gift        from './components/Gift'
import Contact     from './components/Contact'
import MusicPlayer from './components/MusicPlayer'

export default function App() {
  return (
    <ToastProvider>
      <MusicPlayer />
      <Navbar />
      <main>
        <Hero />
        <Invitation />
        <Gallery />
        <Countdown />
        <Schedule />
        <Venues />
        <Gift />
        <Contact />
      </main>
    </ToastProvider>
  )
}

