import reactLogo from './assets/ARTEMIS.svg'
import './App.css'
import  Finput from './components/Finput'
import RegistrationForm from './components/RegistrationForm'
import Attendence from './components/Attendence'

function App() {
  return (
    <>
      <img src={reactLogo} className="mx-auto mb-10 h-20 mt-0"/>
      {/* <RegistrationForm /> */}
      <Attendence/>
    </>
  )
}

export default App
