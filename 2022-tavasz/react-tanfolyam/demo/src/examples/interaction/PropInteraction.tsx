import React from 'react'

export const PropInteraction: React.FC = () => {
    const text = 'Valami szöveg'
    return <InnerComponent text={text} />
}

type MyProps = {
    text: string
}

const InnerComponent: React.FC<MyProps> = ({ text }) => {
    return <h1>{text}</h1>
}
