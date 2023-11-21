import React, { useState } from 'react'
import "./App.css"
import { numbers, upperCaseLetters, lowerCaseLetters, specialCharacters } from './Character'
import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import { COPY_Fail, COPY_SUCCESS } from './message';

const App = () => {
  const [password, setPassword] = useState("")
  const [passwordLength, setPasswordLength] = useState(26)
  const [includeUpperCase, setIncludeUpperCase] = useState(false)
  const [includeLowerCase, setIncludeLowerCase] = useState(false)
  const [includeNumbers, setIncludeNumbers] = useState(false)
  const [includeSymbols, setIncludeSymbols] = useState(false)
  const handleGeneratePassword = () => {
    if (!includeUpperCase && !includeLowerCase && !includeNumbers && !includeSymbols) {
      notify("To generate password you must select atleast one checkbox", true)
    }
    else {
      let characterList = ""
      if (includeNumbers) {
        characterList = characterList + numbers
      }
      if (includeUpperCase) {
        characterList = characterList + upperCaseLetters
      }
      if (includeLowerCase) {
        characterList = characterList + lowerCaseLetters
      }
      if (includeSymbols) {
        characterList = characterList + specialCharacters
      }
      setPassword(createPassword(characterList))
      notify("Password is generated successfully", false)
    }


  }
  const createPassword = (characterList) => {
    let password = ""
    const characterListLength = characterList.length
    for (let i = 0; i < passwordLength; i++) {
      const characterIndex = Math.round(Math.random() * characterListLength)
      password = password + characterList.charAt(characterIndex)
    }
    return password
  }
  const copyToClipboard = (password) => {

    navigator.clipboard.writeText(password)
  }
  const notify = (message, hasError = false) => {
    if (hasError) {
      toast.error(message, {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
    else {
      toast(message, {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }

  }
  const handleCopyPassword = (e) => {
    if (password === "") {
      notify(COPY_Fail, true)
    }
    else {
      copyToClipboard(password)
      notify(COPY_SUCCESS)
    }

  }

  return (
    <div className="min-h-screen items-center justify-center w-6/12 ml-80 flex flex-col md:flex-row ">
      <div className="container">
        <div className="bg-gradient-to-br from-teal-400 to-yellow-200
         rounded-lg shadow-md p-8">
          <h1 className="text-center text-darkgreen mb-5 text-2xl font-semibold">
           Password Generator
          </h1>
          <div className="bg-green-500 p-3 text-white mb-4 h-12 flex justify-between text-center px-4 ">
            <h3 >{password}</h3>
            <button className="text-white bg-green-500 border-none cursor-pointer">
              <i onClick={handleCopyPassword} className="far fa-clipboard"></i>
            </button>
          </div>
          <div className="flex justify-between text-white mb-4">
            <label htmlFor="password-strength">Password length</label>
            <input className="pw text-black" defaultValue={passwordLength} onChange={(e) => 
              setPasswordLength(e.target.value)} type="number" id="password-stregth" name="password-strength" 
              max="26" min="8" />
          </div>
          <div className="form-group">
            <label htmlFor="uppercase-letters">Add Uppercase Letters</label>
            <input checked={includeUpperCase} onChange={(e) => setIncludeUpperCase(e.target.checked)} 
            type="checkbox" id="uppercase-letters" name="uppercase-letters" />
          </div>
          <div className="form-group">
            <label htmlFor="lowercase-letters">Add Lowercase Letters</label>
            <input checked={includeLowerCase} onChange={(e) => setIncludeLowerCase(e.target.checked)} 
            type="checkbox" id="lowercase-letters" name="lowercase-letters" />
          </div>
          <div className="form-group">
            <label htmlFor="include-numbers">Include Numbers</label>
            <input checked={includeNumbers} onChange={(e) => setIncludeNumbers(e.target.checked)} 
            type="checkbox" id="include-numbers" name="include-numbers" />
          </div>
          <div className="form-group">
            <label htmlFor="include-symbols">Include Symbols</label>
            <input checked={includeSymbols} onChange={(e) => setIncludeSymbols(e.target.checked)} 
            type="checkbox" id="include-symbols" name="include-symbols" />
          </div>
          <button onClick={handleGeneratePassword} className="bg-green-500 border-none w-full mt-4 
          px-4 py-2 text-white rounded-3xl text-lg cursor-pointer">
            Generate Password
          </button>
          <ToastContainer
            position="top-center"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
          />
        </div>
      </div>
    </div>
  )
}

export default App
