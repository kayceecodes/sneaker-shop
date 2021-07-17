import CircularProgress from '@material-ui/core/CircularProgress/CircularProgress'
import React from 'react'

interface Props {
    message: string
}

export default function Progess(props: Props) {
    return (
        <div>
            <CircularProgress color={"primary"} />           
        </div>
    )
    
}