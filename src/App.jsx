import { useCallback, useEffect, useRef, useState } from 'react';
import './App.css';

function App() {
  const [length, setlength] = useState(8);
  const [numbers, setnumber] = useState(false);
  const [character, setcharacter] = useState(false);
  const [password, setpassword] = useState("");
  const passref=useRef(null)
  const passgenerater = () => {
    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    
    if (character) str += "!@#$%^&*()_+-={}[]|:;";
    if (numbers) str += "1234567890";
    
    for (let i = 0; i < length; i++) {
      let char = Math.floor(Math.random() * str.length);
      pass += str.charAt(char);
    }
    
    setpassword(pass);
  };
  const copy = useCallback(()=>{
    passref.current?.select()
    navigator.clipboard.writeText(password)
  },[password]) 
  useEffect(() => {
    passgenerater();
  }, [length, numbers, character]);
 
  return (
    <>
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white p-5">
        <h1 className="text-white bg-gray-800 border-2 border-amber-900 rounded-2xl px-5 py-3 text-2xl font-bold text-center w-full max-w-md">
          Password Generator
        </h1>

        {/* Input and Copy Button */}
        <div className="mt-5 flex items-center bg-gray-800 p-3 rounded-lg w-full max-w-md">
          <input
            type="text"
            value={password}
            readOnly
            ref={passref}
            className="flex-grow p-2 rounded-lg text-black outline-none"
          />
          <button 
            className="ml-2 bg-blue-500 px-4 py-2 rounded-lg hover:bg-blue-600"
            onClick={copy}
          >
            Copy
          </button>
        </div>

        {/* Password Length Slider */}
        <div className="mt-5 flex flex-col items-center bg-gray-800 p-3 rounded-lg w-full max-w-md">
          <label className="text-lg font-semibold">Password Length: {length}</label>
          <input
            type="range"
            min={8}
            max={100}
            value={length}
            className="w-full mt-2"
            onChange={(e) => setlength(Number(e.target.value))}
          />
        </div>

        {/* Options: Include Numbers & Characters */}
        <div className="mt-3 flex flex-col items-start bg-gray-800 p-3 rounded-lg w-full max-w-md">
          <div className="flex items-center space-x-2">
            <input type="checkbox" id="numbers" onChange={() => setnumber((prev) => !prev)} />
            <label htmlFor="numbers">Include Numbers</label>
          </div>
          <div className="flex items-center space-x-2 mt-2">
            <input type="checkbox" id="characters" onChange={() => setcharacter((prev) => !prev)} />
            <label htmlFor="characters">Include Special Characters</label>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
