import { useState, useCallback, useRef } from 'react'
import './App.css'

function App() {
  const [length, setlength] = useState(8)
  const [number, setnumber] = useState(false)
  const [char, setchar] = useState(false)
  const [pass, setpass] = useState("")

  const passref = useRef(null)

  const copypass = useCallback(() => {
    passref.current?.select()
    window.navigator.clipboard.writeText(pass)
  }, [pass])

  const passgen = useCallback(() => {
    let p = ""
    let str = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ"
    if (number) str += "1234567890"
    if (char) str += "!@#$%^&*()_+|}{[]?><,./~"
    for (let i = 0; i <= length; i++) {
      let char = Math.floor(Math.random() * str.length + 1)
      p += str.charAt(char)
    }
    setpass(p)
  }, [length, number, char])

  return (
    <>
      <div className='w-full max-w-2xl mx-auto shadow-lg rounded-2xl px-4 sm:px-6 my-10 text-red-600 bg-slate-600 py-6 sm:py-10'>
        <h1 className='text-white text-center mb-6 text-2xl sm:text-3xl font-bold'>
          PASSWORD GENERATOR
        </h1>

        <div className='flex shadow rounded-lg overflow-hidden mb-6'>
          <input
            type="text"
            value={pass}
            className="w-full text-lg px-4 py-2 rounded-l bg-white"
            placeholder='Password'
            readOnly
            ref={passref}
          />
          <button
            onClick={copypass}
            className='bg-blue-900 text-orange-400 px-4 py-2 text-sm font-semibold hover:bg-blue-500'
          >
            Copy
          </button>
        </div>

        <div className='flex justify-center mb-6'>
          <button
            onClick={passgen}
            className='bg-green-500 hover:bg-green-800 text-white px-6 py-2 rounded-lg text-base font-medium'
          >
            CLICK TO GENERATE
          </button>
        </div>

        <div className='flex flex-col sm:flex-row gap-4 sm:gap-x-6 text-base sm:text-lg'>
          <div className='flex items-center gap-x-2'>
            <input
              type="range"
              min={6}
              max={100}
              value={length}
              className='cursor-pointer'
              onChange={(e) => setlength(e.target.value)}
            />
            <label className="text-orange-400">Length: {length}</label>
          </div>

          <div className='flex items-center gap-x-2'>
            <input
              type="checkbox"
              defaultChecked={number}
              id="numberInput"
              onChange={() => setnumber((prev) => !prev)}
            />
            <label htmlFor="numberInput" className="text-orange-400">Numbers</label>
          </div>

          <div className='flex items-center gap-x-2'>
            <input
              type="checkbox"
              defaultChecked={char}
              id="characterInput"
              onChange={() => setchar((prev) => !prev)}
            />
            <label htmlFor="characterInput" className="text-orange-400">Characters</label>
          </div>
        </div>
      </div>
    </>
  )
}

export default App