import DateComp from '../components/date'
import Layout from '../components/layout'
import { builder, Builder } from '@builder.io/react'

export const init = () => {
    builder.init(process.env.REACT_APP_BUILDER_API_KEY)

    Builder.registerComponent(DateComp, {
        name: 'Date component',
        inputs: [
            { name: 'dateString', type: 'string', defaultValue: new Date().toISOString()}
        ]
    })
}