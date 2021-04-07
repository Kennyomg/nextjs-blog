import { builder, BuilderComponent } from '@builder.io/react'
import { BuilderContent } from '@builder.io/sdk';
import { GetStaticProps, GetStaticPaths } from 'next'

builder.init(process.env.REACT_APP_BUILDER_API_KEY)

// Get page data
// https://nextjs.org/docs/basic-features/data-fetching#getstaticprops-static-generation
export const getStaticProps: GetStaticProps = async (context) => {
    const content = await builder.get('page', { url: '/'+context.params.page }).promise();

    return {
        props: { content },
        revalidate: true,
        notFound: !content
    }
}

// List all Builder pages
// https://nextjs.org/docs/basic-features/data-fetching#getstaticpaths-static-generation
export const getStaticPaths: GetStaticPaths = async () => {
    const results = await builder.getAll('page', {
        fields: 'data.url',
        key: 'all-pages',
        limit: 200,
        options: {
            noTargeting: true
        }
    })

    return {
        paths: results.map((item) => ({
            params: {
                page: [item.data.url]
            }
        })),
        fallback: true
    }
}

export default function BuilderPage(props: { content: BuilderContent; }) {
    // console.log(props)
    return (<>
    {props?.content && 
        <BuilderComponent
            content={props.content}
            model="page" />
    }
    </>)
}