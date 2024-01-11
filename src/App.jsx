import { useState, useCallback, useEffect, useRef } from "react";

function App() {
  const [length, setlength] = useState(8);
  const [numberAllowed, setNumberAllowed] = useState(false);
  const [charAllowed, setCharAllowed] = useState(false);
  const [password, setPassword] = useState();

  //useRef hook
  const passwordRef = useRef(null);

  const passwordGenerator = useCallback(() => {
    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    if (numberAllowed) str += "0123456789";
    if (charAllowed) str += "!@#$%^&*(){}[]`~";

    for (let i = 1; i <= length; i++) {
      let index = Math.floor(Math.random() * str.length + 1);
      pass += str.charAt(index);
    }

    setPassword(pass);
  }, [length, numberAllowed, charAllowed, setPassword]);
  //memoizes function and returns the same function reference unless dpndcies change

  //calling pwdGn() is a change, even though it's dependencies aren't changed, leading to re-rendering

  const copyPasswordToClipboard = useCallback(() => {
    passwordRef.current?.select();
    window.navigator.clipboard.writeText(password)
  }, [password] )

  //[useEffect] executes callBack function after component has rendered, not during initial render, prevents pwdGn() calling immediately which causes state update, that triggers re-render

  useEffect(() => {
    passwordGenerator();
  }, [length, numberAllowed, charAllowed]);
  // runs pwdGn() once, doesn't run again unless dpndcies change
  return (
    <>
      <div className="w-full max-w-fit mx-auto shadow-md rounded-lg px-3 py-3 my-20 text-orange-500 bg-gray-700">
        <h1 className="text-white text-center py-0.5">Password generator</h1>
        <div className="flex shadow rounded-lg overflow-hidden mb-4">
          <input
            ref={passwordRef}
            type="text"
            value={password}
            className="outline-none w-full py-1 px-3"
            placeholder="eminem"
            readOnly
          />
          <button 
          onClick={copyPasswordToClipboard}
          className="outline-none bg-blue-700 text-white px-3 py-0.5 shrink-0">
            Copy
          </button>
        </div>
        <div className="flex text-sm gap-x-2">
          <div className="flex items-center gap-x-1">
            <input
              type="range"
              min={6}
              max={20}
              value={length}
              className="cursor-pointer"
              onChange={(fireEvent) => {
                setlength(fireEvent.target.value);
              }}
            />
            <label>Length: {length}</label>
          </div>
          <div className="flex items-center gap-x-1">
            <input
              type="checkbox"
              defaultChecked={numberAllowed}
              id="numberInput"
              onChange={() => {
                setNumberAllowed((prev) => !prev);
              }}
            />
            <label>Number</label>
          </div>
          <div className="flex items-center gap-x-1">
            <input
              type="checkbox"
              defaultChecked={charAllowed}
              id="specialInput"
              onChange={() => {
                setCharAllowed((prev) => !prev);
              }}
            />
            <label>Special Characters </label>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
