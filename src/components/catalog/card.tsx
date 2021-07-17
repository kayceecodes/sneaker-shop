import React from 'react'
import Image from 'next/image'
import { Typography } from '@material-ui/core'
import useMediaQuery from '@material-ui/core/useMediaQuery/useMediaQuery'
import theme from '@/src/Theme'
import { extractColor, extractTitle } from '@/src/utils/Parse'
interface Props {
  title: string
  src: string
  type: string
  price: string
}

export default function Card({ title, type, src, price }: Props) {
  const matches = { sm: useMediaQuery(theme.breakpoints.up('sm')) }
  return (
    <div role="listitem">
      <div style={{ position: 'relative' }}>
        <small style={{ position: 'absolute', left: '2%', bottom: '2%', zIndex: 1 }}>
          ${price}
        </small>
        <Image
          src={src}
          height={matches.sm ? 175 : 140}
          width={matches.sm ? 175 : 140}
        />
      </div>
      <div>
        <Typography variant="caption">
          <strong>{extractTitle(title)}</strong> <br />
          {extractColor(title)} <br />
          {type}
        </Typography>
      </div>
    </div>
  )
}
