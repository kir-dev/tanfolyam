import React from 'react'
import { Box, ButtonGroup, Heading } from '@chakra-ui/react'
import { LinkButton } from './Button'
import { CourseRoute } from '../utils/CourseRouting'

type CourseSectionProps = {
    title: string
    parts: CourseRoute[]
}

export const CourseSection: React.FC<CourseSectionProps> = ({ title, parts }) => {
    return (
        <Box mt={10}>
            <Heading as="h2" size="md">
                {title}
            </Heading>
            <ButtonGroup mt={5} flexWrap="wrap">
                {parts.map((part) => (
                    <LinkButton to={part.path} external={part.external}>
                        {part.name}
                    </LinkButton>
                ))}
            </ButtonGroup>
        </Box>
    )
}
