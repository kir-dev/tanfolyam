import {
    Category,
    Component,
    Palette,
    Variant,
} from "@react-buddy/ide-toolbox";
import ChakraPalette from "@react-buddy/palette-chakra-ui";
import React from "react";
import {Fragment} from "react";

export const PaletteTree = () => (
    <Palette>
        <Category name="App">
            <Component name="Loader">
                <Variant>
                    <ExampleLoaderComponent/>
                </Variant>
            </Component>
        </Category>
        <ChakraPalette/>
    </Palette>
);

export function ExampleLoaderComponent() {
    return (
        <Fragment>Loading...</Fragment>
    );
}