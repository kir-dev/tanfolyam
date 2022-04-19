import React from 'react'
import { CourseSection } from './CourseSection'
import CourseRoutes from '../utils/CourseRoutes'

type MainPageProps = {}

export const MainPage: React.FC<MainPageProps> = () => {
    return (
        <>
            {CourseRoutes.map((cr) => (
                <CourseSection key={cr.name} title={cr.name} parts={cr.parts} />
            ))}
        </>
    )
}
