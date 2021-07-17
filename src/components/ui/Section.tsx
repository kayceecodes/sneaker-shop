import Box from '@material-ui/core/Box/Box'
import React from 'react'

interface Props {
  m: string | number
  mt: string | number
  mr: string | number
  mb: string | number
  ml: string | number
  p: string | number
  pt: string | number
  pr: string | number
  pb: string | number
  pl: string | number
}

export const SectionMargin = (props: { px: string }) => (
  <div
    style={{
      marginTop: props.px,
    }}
  />
)

export const SectionBreak = (props: Partial<Props>) => {
  return (
    <Box
      m={props.m}
      mt={props.mt}
      mr={props.mr}
      mb={props.mb}
      ml={props.ml}
      p={props.p}
      pt={props.pt}
      pr={props.pr}
      pb={props.pb}
      pl={props.pl}
    ></Box>
  )
}
