import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { MainPage } from './components/MainPage'
import { NavBar } from './components/NavBar'
import { ChakraProvider } from '@chakra-ui/react'
import customTheme from './style/customTheme'
import RouteMapping from './utils/RouteMapping'
import { Page } from './components/Page'

function App() {
    return (
        <ChakraProvider theme={customTheme}>
            <BrowserRouter>
                <NavBar />
                <Page>
                    <Routes>
                        <Route path="/">
                            {RouteMapping()}
                            <Route index element={<MainPage />} />
                        </Route>
                    </Routes>
                </Page>
            </BrowserRouter>
        </ChakraProvider>
    )
}

export default App
