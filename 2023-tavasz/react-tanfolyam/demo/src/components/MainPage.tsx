import React from 'react';

import CourseRoutes from '../utils/CourseRoutes';
import { CourseSection } from './CourseSection';

export function MainPage() {
  return (
    <>
      {CourseRoutes.map((cr) => (
        <CourseSection key={cr.name} title={cr.name} parts={cr.parts} />
      ))}
    </>
  );
}
