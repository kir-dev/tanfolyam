export type CourseRoute = { name: string; path: string; external?: boolean; element?: JSX.Element };

export type CourseSection = { name: string; parts: CourseRoute[] };
