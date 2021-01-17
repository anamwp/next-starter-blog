import React from 'react'
import {
    GetStaticPropsContext, 
    InferGetStaticPropsType,
    GetStaticPaths, 
} from 'next'
import {Article} from '@components/Article';
import type {Post} from '../index';
import Link from 'next/link';
import Head from 'next/head'
export default function BlogPost({
    post,
}: InferGetStaticPropsType<typeof getStaticProps>) {
    const {title, body} = post
    return (
        <>
        <Article>
            <Head>
                <title>{title}</title>
                <meta property="og:title" content={title}/>
            </Head>
            <h2>
                <Link href="/">Back</Link>
            </h2>
            <h3>Post title: {title}</h3>
            <p>{body}</p>
        </Article>
        </>
    )
}

export const getStaticPaths: GetStaticPaths = async () => {
    const res = await fetch(`http://jsonplaceholder.typicode.com/posts`);
    const posts: Post[] = await res.json();
    const paths = posts.map( post => ({
        params: {id: post.id.toString()}
    }));
    return {
        paths,
        fallback: false
    }
}

export const getStaticProps = async (context: GetStaticPropsContext) => {
    const {params} = context;

    const emptyPost: Post = {
        title: "title not found",
        body: "",
        id: 0,
        userId: 0,
    };
    if(!params?.id){
        return {
            props: {
                post: emptyPost
            }
        }
    }

    const res = await fetch(`http://jsonplaceholder.typicode.com/posts/${params.id}`);
    const post: Post = await res.json();
    return {
        props: {
          post,
        },
      };
}
