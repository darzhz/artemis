import reactLogo from './assets/ARTEMIS.svg'
import './App.css'
import  Finput from './components/Finput'
import RegistrationForm from './containers/RegistrationForm'

function App() {
  return (
    <>
      <img src={reactLogo} className="mx-auto mb-10 h-20 mt-0"/>
      <h1 className="text-xl" >User Registration</h1>
      <RegistrationForm />
    </>
  )
}

export default App
