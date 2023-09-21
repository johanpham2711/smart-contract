import { useEffect, useState } from 'react'

const useCountdown = (targetMs: number) => {
  const countDownDate = new Date(targetMs).getTime()

  const [countDown, setCountDown] = useState(countDownDate - new Date().getTime())

  useEffect(() => {
    const interval = setInterval(() => {
      setCountDown(countDownDate - new Date().getTime())
    }, 1000)

    return () => clearInterval(interval)
  }, [countDownDate])

  return countDown
}

export { useCountdown }
