import React from 'react'
import { Link, Route, Routes } from 'react-router-dom'
import { ButtonGroup, Heading } from '@chakra-ui/react'

export const Router: React.FC = () => {
    return (
        // <BrowserRouter>
        <>
            <ButtonGroup color="orange">
                <Link to="/router">Indexre</Link>
                <Link to="/router/egyik">Egyikre</Link>
                <Link to="/router/masik">Másikra</Link>
            </ButtonGroup>
            <Routes>
                <Route path="/">
                    <Route path="egyik" element={<Heading>Egyik</Heading>} />
                    <Route path="masik" element={<Heading>Másik</Heading>} />
                    <Route index element={<Heading>Index oldal</Heading>} />
                </Route>
            </Routes>
        </>
        // </BrowserRouter>
    )
}
