import { CompositionWrapper } from '../examples/components/CompositionWrapper';
import { FCWrapper } from '../examples/components/FCWrapper';
import { FuncWrapper } from '../examples/components/FuncWrapper';
import { Lifecycle } from '../examples/components/Lifecycle';
import { PropsWrapper } from '../examples/components/PropsWrapper';
import { States } from '../examples/components/States';
import { StatesWithFunction } from '../examples/components/StatesWithFunction';
import { CustomHook } from '../examples/hooks/CustomHook';
import { UseCallback } from '../examples/hooks/UseCallback';
import { UseEffect } from '../examples/hooks/UseEffect';
import { UseMemo } from '../examples/hooks/UseMemo';
import { ContextInteraction } from '../examples/interaction/ContextInteraction';
import { FunctionInteraction } from '../examples/interaction/FunctionInteraction';
import { PropInteraction } from '../examples/interaction/PropInteraction';
import { JsxWrapper } from '../examples/jsx/jsxWrapper';
import { Form } from '../examples/other/Form';
import { ReactQuery } from '../examples/other/ReactQuery';
import { StyledComponents } from '../examples/other/StyledComponents';
import { QueryParams } from '../examples/routing/QueryParams';
import { RouteParams } from '../examples/routing/RouteParams';
import { Router } from '../examples/routing/Router';
import { RouterFunctions } from '../examples/routing/RouterFunctions';
import { CourseSection } from './CourseRouting';

const CourseRoutes: CourseSection[] = [
  { name: 'jsx', parts: [{ name: 'Példa', path: 'jsx', element: <JsxWrapper /> }] },
  {
    name: 'React Components',
    parts: [
      { name: 'React.FC alapú', path: 'fc-based', element: <FCWrapper /> },
      { name: 'Function alapú', path: 'func-based', element: <FuncWrapper /> },
      {
        name: 'Kompozíció',
        path: 'composition',
        element: <CompositionWrapper />,
      },
      {
        name: 'Propok és attribútumok',
        path: 'props',
        element: <PropsWrapper />,
      },
      {
        name: 'Életciklus',
        path: 'lifecycle',
        element: <Lifecycle />,
      },
      { name: 'Állapotok', path: 'states', element: <States /> },
      { name: 'Belső függvények', path: 'inner-functions', element: <StatesWithFunction /> },
    ],
  },
  {
    name: 'Komponensek interakciója',
    parts: [
      { name: 'Propok', path: 'prop-interactions', element: <PropInteraction /> },
      { name: 'Függvények', path: 'function-interactions', element: <FunctionInteraction /> },
      { name: 'Context', path: 'context-interactions', element: <ContextInteraction /> },
    ],
  },
  {
    name: 'Hook-ok',
    parts: [
      { name: 'useState', path: 'use-state', element: <States /> },
      { name: 'useCallback', path: 'use-callback', element: <UseCallback /> },
      { name: 'useEffect', path: 'use-effect', element: <UseEffect /> },
      { name: 'useMemo', path: 'use-memo', element: <UseMemo /> },
      { name: 'egyedi', path: 'use-custom', element: <CustomHook /> },
    ],
  },
  {
    name: 'Routing',
    parts: [
      { name: 'Router DOM', path: 'router/*', element: <Router /> },
      { name: 'Router fügvények', path: 'router-functions', element: <RouterFunctions /> },
      { name: 'Query Paraméterek', path: 'query-params', element: <QueryParams /> },
      { name: 'Útvonal Paraméterek', path: 'url-params/:text', element: <RouteParams /> },
    ],
  },
  {
    name: 'Egyéb',
    parts: [
      { name: 'React Hook Forms', path: 'form', element: <Form /> },
      { name: 'React Query', path: 'react-query', element: <ReactQuery /> },
      { name: 'Styled Components', path: 'styled', element: <StyledComponents /> },
      { name: 'React Docs', path: 'https://react.dev', external: true },
      { name: 'create-react-app', path: 'https://create-react-app.dev', external: true },
      { name: 'Vite', path: 'https://vitejs.dev', external: true },
      { name: 'Redux', path: 'https://redux.js.org', external: true },
      { name: 'ChakraUI', path: 'https://chakra-ui.com', external: true },
      { name: 'React Icons', path: 'https://react-icons.github.io/react-icons', external: true },
      { name: 'NextJS', path: 'https://nextjs.org', external: true },
    ],
  },
];

export default CourseRoutes;
