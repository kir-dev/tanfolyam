import React from 'react'

type MyProps = {
    text: string
}

export const FCBased: React.FC<MyProps> = ({ text }) => {
    return <h1>{text}</h1>
}
