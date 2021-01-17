import React from 'react'
import {GetStaticPropsContext, GetStaticPaths, InferGetStaticPropsType} from 'next'
import {Article} from '@components/Article';
import type {Post} from '../index';

export default function BlogPost({post}: InferGetStaticPropsType<typeof getStaticProps>) {
    return (
        <Article>
            <h2>Post title: {post.title}</h2>
            <p>{post.body}</p>
        </Article>
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

export const getStaticProps = async (content: GetStaticPropsContext) => {
    const {params} = content;

    const emptyPost: Post = {
        userId: 0,
        id: 0,
        title: "title not found",
        body: ""
    };
    if(!params?.id){
        return {
            props: {
                post: emptyPost
            }
        }
    }

    const res = await fetch(`http://jsonplaceholder.typicode.com/posts/${params.id}`);
    const post: Post[] = await res.json();
    return {
        props: {
            post
        }
    }
}
