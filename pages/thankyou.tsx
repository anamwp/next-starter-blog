import { Article } from '@components/Article'
import Link from 'next/link'
import React from 'react'

export default function thankyou() {
    return (
        <>
        <Article>
            <h2>
                <Link href="/">Back</Link>
            </h2>
            <h3>Thanks to submit your feedback. We Received your feeback.</h3>
        </Article>
        </>
    )
}
