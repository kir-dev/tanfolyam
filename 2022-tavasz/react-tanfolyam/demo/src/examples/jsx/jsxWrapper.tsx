import React, { useEffect } from 'react'
import { renderDemo } from './jsx'

export const JsxWrapper: React.FC = () => {
    useEffect(() => {
        renderDemo()
    }, [])

    return <div id="jsx" />
}
