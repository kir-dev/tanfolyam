import React from 'react'
import CourseRoutes from './CourseRoutes'
import { Route } from 'react-router'

const RouteMapping = () => {
    return CourseRoutes.flatMap((section) => section.parts)
        .filter((r) => !r.external)
        .map((r) => <Route key={r.path} path={r.path} element={r.element} />)
}

export default RouteMapping
