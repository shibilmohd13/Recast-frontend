import React, { useEffect, useState } from 'react'
import axios from 'axios'
import baseUrl from '../../constants/constants'

function Test() {
    const [first, setfirst] = useState('')
    useEffect(() => {
        const fetch = async () => {
            await axios.get(`${baseUrl}api/users/test/`).then(res => {
                // setfirst(res.data)
                console.log(res.data)
                console.log(typeof res.data)
                console.log(res.data.Fetch)
                setfirst(!res.data.Fetch)


            }).catch(err=>{
                console.log(err)
            })
            }
        fetch()
})

return (
    <>
        <div>Test</div>
        {first ? <div>LOgeed</div> : <div>NOt Logged</div>}
    </>
)
}

export default Test