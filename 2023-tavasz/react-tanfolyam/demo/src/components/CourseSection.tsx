import { Box, ButtonGroup, Heading } from '@chakra-ui/react';
import React from 'react';

import { CourseRoute } from '../utils/CourseRouting';
import { LinkButton } from './Button';

type CourseSectionProps = {
  title: string;
  parts: CourseRoute[];
};

export function CourseSection({ title, parts }: CourseSectionProps) {
  return (
    <Box mt={10}>
      <Heading as='h2' size='md'>
        {title}
      </Heading>
      <ButtonGroup mt={5} flexWrap='wrap'>
        {parts.map((part) => (
          <LinkButton key={part.path} to={part.path} external={part.external}>
            {part.name}
          </LinkButton>
        ))}
      </ButtonGroup>
    </Box>
  );
}
