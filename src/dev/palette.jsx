import React from "react"
import {Fragment} from "react"
import {
    Category,
    Component,
    Variant,
    Palette,
} from "@react-buddy/ide-toolbox"
import MUIPalette from "@react-buddy/palette-mui";
import AntdPalette from "@react-buddy/palette-antd";

export const PaletteTree = () => (
    <Palette>
        <Category name="App">
            <Component name="Loader">
                <Variant>
                    <ExampleLoaderComponent/>
                </Variant>
            </Component>
        </Category>
        <MUIPalette/>
        <AntdPalette/>
    </Palette>
)

export function ExampleLoaderComponent() {
    return (
        <Fragment>Loading...</Fragment>
    )
}