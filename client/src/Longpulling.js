import React, {useState, useEffect} from 'react';
import axios from 'axios'
import { uid } from 'uid'

const Longpulling = () => {
    const [message, setMessage] = useState([])
    const [value, setValue] = useState('')

    useEffect(()=>{
        subscribe()
    },[], )
    const subscribe = async ()=>{
        try{
            const {data} = await  axios.get('http://localhost:5000/get-message')
            setMessage((prev)=> [data, ...prev])
            subscribe()
        }catch(e){
            setTimeout(()=>{
                subscribe()
            }, 500)
        }
        
    } 
    async function sendMessage(){
        await  axios.post('http://localhost:5000/new-message', {
            message: value,
            id: uid(10)
        })
        setValue('')
    }
    return (
        <div className='center'>
            <div className='form'>
                <input value = {value} onChange ={(e)=> setValue(e.target.value)} type= 'text'/>
                <button onClick={sendMessage}>Submit</button>
            </div>
            <div >
                {message.map(msg=>
                    <div className='message' key= {msg.id}>
                        {msg.message}
                    </div>
                )}
            </div>
            
        </div>
    );
};

export default Longpulling;