import React, { useEffect, useState } from "react";
import Navbar from "../Navbar/Navbar";
import axios from 'axios';
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";




function Home() {
    const [word, setWord] = useState('')
    const [worderror, setwordError] = useState(false)
    const [data, setData] = useState(false)

    const { loading, userInfo, error, success, loginErr } = useSelector(
        (state) => state.auth
      )

      const navigate = useNavigate()
    
    const searchWord = () => {
        axios.get(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`)
            .then(response => {
                console.log(response.data)
                setData(response.data[0])
            })
            .catch(error => {
                setwordError(true)
                setData(false)
            })

    }
    const handleWord = (e) => {
        setWord(e.target.value)
        setwordError(false)
    }

    useEffect(()=>{
        if(!userInfo){
            navigate("/")
        }
    },[])

    return (

        <>
            <Navbar />
            <div className="container w-svw h-svh m-auto ">
                <div className="h-full">
                    <div className=" h-10 md:h-15    "></div>
                    <div className=" flex justify-center ">
                        <div className="bg-white w-full md:w-[50%] rounded border-[1px] border-slate-300 shadow-lg">
                            <div className="m-10 h-full">
                                <div className="text-xl font-semibold text-blue-900 mb-4">Enter the Word to search :</div>
                                <div className="flex">
                                    <input
                                        type="text"
                                        name="word"
                                        placeholder="Enter the word"
                                        className="block w-full h-16 rounded-s py-2 px-5 ring-1 ring-inset ring-gray-400 text-2xl focus:text-gray-800 focus:outline-1 focus:outline-blue-900 "
                                        value={word}
                                        onChange={handleWord}
                                    />
                                    <button onClick={searchWord} className="bg-blue-900 px-6 py-2 rounded-e rounded-s-none text-white font-semibold" >Search</button>
                                </div>
                                {worderror && <div className="mb-10 text-red-600 mt-2">Enter a valid dictionary word</div>}
                                <hr className=" mb-10" />

                                {data && <div className="mb-4">
                                    <div className="head text-2xl font-bold text-blue-900 mb-3 underline">
                                        Result :
                                    </div>
                                    <div className="head text-xl font-semibold text-blue-900 mb-3">
                                        Phonetic :  <span className="text-black font-normal">{data ? data.phonetic : ""}</span>
                                    </div>
                                    <div className="head text-xl font-semibold text-blue-900 mb-3">
                                        meanings :
                                    </div>
                                    {data ? data.meanings.map((res) => <div><span className=" text-xl font-semibold text-black">{res.partOfSpeech}</span>
                                        <ul className="ml-10" style={{ listStyle: "disc" }}>
                                            {res.definitions.map(def => <li>{def.definition}</li>)}
                                        </ul>

                                    </div>) : ""}

                                </div>}

                                



                            </div>

                        </div>

                    </div>
                </div>
            </div>
        </>
    );
}

export default Home;
