import React from 'react'
import Container from '@material-ui/core/Container'
import Typography from '@material-ui/core/Typography'
import Box from '@material-ui/core/Box'
import Link from '../src/Link'
import { PageAnimations } from '@/src/types/interfaces/animation'
import PageTransition from '@/src/components/ui/hoc/PageTransition'

interface Props {
  pageAnimations: PageAnimations
}

export default function Index({ pageAnimations }: Props) {
  return (
    <>
    <PageTransition pageAnimations={pageAnimations}>
      <Container maxWidth="sm">
        <Box my={4}>
          <Typography variant="h4" component="h1" gutterBottom>
            Next.js with TypeScript example is it only with content or not
          </Typography>
          <Link href="/catalog" color="secondary">
            Go to the catalog page
          </Link>
        </Box>
      </Container>
    </PageTransition>
    </>
  )
}
