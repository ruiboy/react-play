import { useEffect } from 'react'

export const Hello = () => {
  useEffect(() => {
    console.log("Hello mounted")
    return () => {
      console.log("Hello unmounted")
    }
  }, [])

  return <div>Hello</div>
}