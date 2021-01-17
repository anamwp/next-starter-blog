import Head from 'next/head'
import {InferGetStaticPropsType} from "next"
import Link from 'next/link'
// import styles from '../styles/Home.module.css'
import styled from '@emotion/styled'

const Container = styled.div`
    min-height: 100vh;
    padding: 0 0.5rem;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`;
const Main = styled.main`
    padding: 5rem 0;
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`;
const Title = styled.h1`
    margin: 0;
    line-height: 1.15;
    font-size: 4rem;
    color:red;
`;
const List = styled.ul`
    list-style: square;
`;
const ListItem = styled.li`
    padding: 10px;
    text-transform: capitalize;
    margin: 40px 0;
    cursor: pointer;
    color: #252525;
    &:hover {
        background: #f0f0f0;
    }
`;
const PostTitle = styled.h3`
    margin: 0;
    font-size: 24px;
`;

const title: string = 'Next with TypeScript';
export default function Home({posts}: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <Container>
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

        <Main>
            <Title>{title}</Title>
            <List>
                {
                    posts.map( post => (
                        <Link href="/posts/[id]" as={`/posts/${post.id}`}>
                            <ListItem key={post.id}>
                                <PostTitle>{post.title}</PostTitle>
                            </ListItem>
                        </Link>
                    ) )
                }
            </List>
        </Main>

    </Container>
  )
}

export type Post = {
    userId: number;
    id: number;
    title: string; 
    body: string;
}

export const getStaticProps = async () => {
    const res = await fetch("http://jsonplaceholder.typicode.com/posts");
    const posts: Post[] = await res.json();
    return {
        props: {
            posts
        }
    }
}
