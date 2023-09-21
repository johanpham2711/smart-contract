import { Box, Button } from '@mui/material'
import React, { useState } from 'react'

import { QuantityPickerStyle } from './index.style'

const QuantityPicker = (props: any) => {
  const { onChange } = props
  const [quantity, setQuantity] = useState(1)

  const increment = () => {
    const qty = quantity < 2 ? quantity + 1 : quantity
    setQuantity(qty)
    onChange(qty)
  }

  const decrement = () => {
    const qty = quantity > 1 ? quantity - 1 : 1
    setQuantity(qty)
    onChange(qty)
  }

  return (
    <QuantityPickerStyle>
      <Box className="quantity-input">
        <Button className="quantity-input-modifier quantity-input-left" onClick={decrement}>
          <svg
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg">
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M13.418 8C13.418 8.41421 13.0822 8.75 12.668 8.75L3.33398 8.75C2.91977 8.75 2.58398 8.41421 2.58398 8C2.58398 7.58579 2.91977 7.25 3.33398 7.25L12.668 7.25C13.0822 7.25 13.418 7.58579 13.418 8Z"
              fill="currentColor"></path>
          </svg>
        </Button>
        <input className="quantity-input-screen" type="text" value={quantity} readOnly />
        <Button className="quantity-input-modifier quantity-input-right" onClick={increment}>
          <svg
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg">
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M8.77198 4.33325C8.77198 3.91904 8.4362 3.58325 8.02198 3.58325C7.60777 3.58325 7.27198 3.91904 7.27198 4.33325V7.24992L4.33398 7.24992C3.91977 7.24992 3.58398 7.5857 3.58398 7.99992C3.58398 8.41413 3.91977 8.74992 4.33398 8.74992H7.27198V11.6666C7.27198 12.0808 7.60777 12.4166 8.02198 12.4166C8.4362 12.4166 8.77198 12.0808 8.77198 11.6666V8.74992H11.6678C12.082 8.74992 12.4178 8.41413 12.4178 7.99992C12.4178 7.5857 12.082 7.24992 11.6678 7.24992L8.77198 7.24992V4.33325Z"
              fill="currentColor"></path>
          </svg>
        </Button>
      </Box>
    </QuantityPickerStyle>
  )
}

export default QuantityPicker
