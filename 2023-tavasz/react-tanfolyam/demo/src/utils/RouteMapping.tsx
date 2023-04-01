import React from 'react';
import { Route } from 'react-router';

import CourseRoutes from './CourseRoutes';

const RouteMapping = () => {
  return CourseRoutes.flatMap((section) => section.parts)
    .filter((r) => !r.external)
    .map((r) => <Route key={r.path} path={r.path} element={r.element} />);
};

export default RouteMapping;
