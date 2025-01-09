
import AccessibilityMenu from '../components/Navbar'
import Hero from '../components/hero'

const LandingPage = () => {
  return (
    <div className='h-screen'>
     <AccessibilityMenu onScreenReaderToggle={function (): void {
        throw new Error('Function not implemented.')
      } } ariaLabel={''} onThemeToggle={function (): void {
        throw new Error('Function not implemented.')
      } }></AccessibilityMenu> 
          <Hero />
    </div>
  )
}

export default LandingPage
