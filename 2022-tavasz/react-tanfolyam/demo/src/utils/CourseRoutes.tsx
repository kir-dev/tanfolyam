import { JsxWrapper } from '../examples/jsx/jsxWrapper'
import { CourseSection } from './CourseRouting'
import { Composition } from '../examples/components/Composition'
import { Heading } from '@chakra-ui/react'
import { States } from '../examples/components/States'
import { StatesWithFunction } from '../examples/components/StatesWithFunction'
import { PropInteraction } from '../examples/interaction/PropInteraction'
import { FunctionInteraction } from '../examples/interaction/FunctionInteraction'
import { ContextInteraction } from '../examples/interaction/ContextInteraction'
import { UseEffect } from '../examples/hooks/UseEffect'
import { UseMemo } from '../examples/hooks/UseMemo'
import { CustomHook } from '../examples/hooks/CustomHook'
import { Router } from '../examples/routing/Router'
import { RouterFunctions } from '../examples/routing/RouterFunctions'
import { UrlParams } from '../examples/routing/UrlParams'
import { RouteParams } from '../examples/routing/RouteParams'
import { Form } from '../examples/other/Form'
import { StyledComponents } from '../examples/other/StyledComponents'
import { FuncWrapper } from '../examples/components/FuncWrapper'
import { FCWrapper } from '../examples/components/FCWrapper'
import { PropsWrapper } from '../examples/components/PropsWrapper'
import { CompositionWrapper } from '../examples/components/CompositionWrapper'

const CourseRoutes: CourseSection[] = [
    { name: 'jsx', parts: [{ name: 'Példa', path: 'jsx', element: <JsxWrapper /> }] },
    {
        name: 'React Components',
        parts: [
            { name: 'Function alapú', path: 'func-based', element: <FuncWrapper /> },
            { name: 'React.FC alapú', path: 'fc-based', element: <FCWrapper /> },
            {
                name: 'Kompozíció',
                path: 'composition',
                element: <CompositionWrapper />
            },
            {
                name: 'Propok és attribútumok',
                path: 'props',
                element: <PropsWrapper />
            },
            {
                name: 'Életciklus',
                path: 'lifecycle',
                element: <p>Mount, amikor megjelenik, unmount, amikor eltűnik. Osztály alapúaknál fontosabb.</p>
            },
            { name: 'Állapotok', path: 'states', element: <States /> },
            { name: 'Belső függvények', path: 'inner-functions', element: <StatesWithFunction /> }
        ]
    },
    {
        name: 'Komponensek interakciója',
        parts: [
            { name: 'Propok', path: 'prop-interactions', element: <PropInteraction /> },
            { name: 'Függvények', path: 'function-interactions', element: <FunctionInteraction /> },
            { name: 'Context', path: 'context-interactions', element: <ContextInteraction /> }
        ]
    },
    {
        name: 'Hook-ok',
        parts: [
            { name: 'useState', path: 'use-state', element: <States /> },
            { name: 'useEffect', path: 'use-effect', element: <UseEffect /> },
            { name: 'useMemo', path: 'use-memo', element: <UseMemo /> },
            { name: 'egyedi', path: 'use-custom', element: <CustomHook /> }
        ]
    },
    {
        name: 'Routing',
        parts: [
            { name: 'Telepítés', path: 'https://reactrouter.com/docs/en/v6/getting-started/installation', external: true },
            { name: 'Router DOM', path: 'router/*', element: <Router /> },
            { name: 'Router fügvények', path: 'router-functions', element: <RouterFunctions /> },
            { name: 'URL Paraméterek', path: 'url-params', element: <UrlParams /> },
            { name: 'Útvonal Paraméterek', path: 'url-params/:text', element: <RouteParams /> }
        ]
    },
    {
        name: 'Egyéb',
        parts: [
            { name: 'create-react-app', path: 'https://create-react-app.dev', external: true },
            { name: 'React Hook Forms', path: 'form', element: <Form /> },
            { name: 'ChakraUI', path: 'https://chakra-ui.com', external: true },
            { name: 'Styled Components', path: 'styled', element: <StyledComponents /> },
            { name: 'React Icons', path: 'https://react-icons.github.io/react-icons', external: true }
        ]
    }
]

export default CourseRoutes
