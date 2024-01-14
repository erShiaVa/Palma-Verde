import { useState } from 'react';
import { auth } from '../config/firebase';
import { createUserWithEmailAndPassword } from 'firebase/auth';

export const Auth = () => {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");


    const signIn = async () => {
        try {
            await createUserWithEmailAndPassword(auth, email, password);
        } catch (err) {
            console.error(err);
        }
    };

  return (
    <>
    {/*
    <div className='flex justify-center items-center flex-col gap-2 m-auto'>
        <input 
            placeholder='E-mail...'
            type='email '
            onChange={(e) => setEmail(e.target.value)}
        />
        <input 
            placeholder='Password...'
            type='password' 
            onChange={(e) => setPassword(e.target.value)}
        />
        <button onClick={signIn}>Sign In</button>
    </div>
    */}

    </>
  )
}
