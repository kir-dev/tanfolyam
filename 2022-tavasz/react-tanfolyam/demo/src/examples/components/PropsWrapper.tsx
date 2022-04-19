import React from 'react'
import { Props } from './Props'

export const PropsWrapper: React.FC = () => {
    return (
        <Props
            data={[
                { name: 'Valami', value: 10 },
                { name: 'Valami2', value: 20 }
            ]}
        />
    )
}
