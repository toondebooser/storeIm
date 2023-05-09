import { useRef } from 'react'

export default function Signup() {
    const emailRef = useRef()
    const passwordRef = useRef()
    const passwordConfirmationRef = useRef()

    const handleSubmit = (e)=>{
        e.preventDefault()
    }

  return (
    <>
    <div className="card">
        <h2 className='formTitle'>Sign up</h2>
        <form>
            <span className="email">
                <label  htmlFor="email">Email</label> <br />
                <input required type="email" name='email' ref={emailRef} />
            </span>

            <span className="password">
                <label htmlFor="password">Password</label><br />
                <input type="password" name='password' ref={passwordRef} />
            </span>

            <span className="passwordConfirmation">
                <label htmlFor="passwordConfirmation">Password Confirmation</label><br />
                <input type="password" name='passwordConfirmation' ref={passwordConfirmationRef} />
            </span>


            <span className="submit"><input className='submitButton' type="submit" value="Sign up" /></span>
        </form>
    </div>
    </>
  )
}
