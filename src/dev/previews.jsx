import React from 'react'
import {ComponentPreview, Previews} from '@react-buddy/ide-toolbox'
import {PaletteTree} from './palette'
import Main from "../Views/Index2.jsx";

const ComponentPreviews = () => {
    return (
        <Previews palette={<PaletteTree/>}>
            <ComponentPreview path="/Main">
                <Main/>
            </ComponentPreview>
        </Previews>
    )
}

export default ComponentPreviews