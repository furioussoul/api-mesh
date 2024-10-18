import { useEffect } from 'react'

export default function Login() {
  useEffect(() => {
    console.log('useEffect mounted')
    return () => {
      console.log('useEffect unmounted')
    }
  }, [])
  return (
    <div>
      login
    </div>
  )
}
