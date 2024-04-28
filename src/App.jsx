import { useRef } from "react";
import { useEffect , useCallback } from "react";
import { useState } from "react"

function App() {

  const [length, setlength] = useState(8);
  const [Password, setpassword] = useState("");
  const [char, setChar] = useState(false);
  const [number, setnumber] = useState(false);

  const Passwordref = useRef(null);

  const copyToClipBoard = () =>{

    Passwordref.current?.select();
     window.navigator.clipboard.writeText(Password);
  }

  const genratePassword = useCallback(() => {

    let str = 'ABCDEEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
    let pass = '';

    if (number) str += '0123456789';
    if (char) str += '!@#$%^&*';

    for (let i = 0; i < length; i++) {
      let idx = Math.floor(Math.random() * str.length) + 1;
      pass += str.charAt(idx);
    }

    setpassword(pass);
    // console.log(Password);
  }, [char , number , length]);

  useEffect(()=>{genratePassword()} , [length , char , number]);

  return (
    <>
      <div className="flex justify-center ">
        <div className="  my-10 py-5 bg-gray-700 border-solid rounded-lg w-fit px-10">
          <h1 className=' font-extrabold text-white text-4xl'>Password Genrater</h1>
          <div className="  my-2 flex border-solid rounded-lg">
            <input type="text" value={Password} placeholder="Password" ref={Passwordref} className="border-solid rounded-l-lg px-2 w-full" />
            <button className=" bg-blue-900 px-2 py-2 text-white font-semibold border-solid rounded-r-lg" onClick={()=>{copyToClipBoard()}}>copy</button>
          </div>
          <div className="flex gap-2">
          <div className="mx-2 flex gap-1">
            <input type="range" min={4} max={100}  value={length} className=" cursor-pointer" onChange={(e) => { setlength(e.target.value) }} />
            <label className="text-white font-semibold">Length:{length}</label>
          </div>
          
          <div className="mx-2 flex gap-1">
            <input
              type="checkbox"
              checked={char}
              className="cursor-pointer"
              onChange={() => {
                setChar(prev => !prev);
              }}
              readOnly
            />
            <label className="text-white font-semibold">Character: {char.toString()}</label>
          </div>
          <div className="mx-2 flex gap-1">
            <input
              type="checkbox"
              checked={number}
              className="cursor-pointer"
              onChange={() => {
                setnumber(prev => !prev);
              }}
              readOnly
            />
            <label className="text-white font-semibold">number: {number.toString()}</label>
          </div>
          </div>
        </div>
      </div>


    </>
  )
}

export default App
