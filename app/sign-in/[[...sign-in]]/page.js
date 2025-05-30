import { SignIn } from '@clerk/nextjs'

export default function Page() {
  return <div className='signinbackground flex items-center justify-center w-full h-screen'>

    <SignIn />
  </div>
}