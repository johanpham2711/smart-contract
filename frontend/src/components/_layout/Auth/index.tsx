import { useRouter } from 'next/router'
import { PropsWithChildren, useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'

const AuthLayout = (props: PropsWithChildren) => {
  const { children } = props
  const router = useRouter()
  const dispatch = useDispatch()

  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    // if (mounted) dispatch(getMe())
  }, [mounted])

  return <>{children}</>
}

export default AuthLayout
