import Head from 'next/head'
import styles from '@/styles/Home.module.css'
import Link from 'next/link'
import { InferGetStaticPropsType } from 'next';

type Autor = {
  id: string;
  nome: string;
  nacionalidade: string;
}

export async function getStaticProps() {
  const AUTORES_API_URL = 'http://localhost:3000/autores'
  const autores: Autor[] = await fetch(AUTORES_API_URL)
    .then((respostaDoServidor) => {
      return respostaDoServidor.json()
    })
    .then((resposta) => { return resposta })
  return {
    props: {
      autores
    }
  }
}

export default function Home({ autores }: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <>
      <Head>
        <title>Livraria</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Link href="/create">Criar autor</Link>
      <main className={styles.main}>        
        <ul>          
          {autores.map((autor: Autor) => (
            <li key={autor.nome}>
              <h1>{autor.nome}</h1>
              <p>{autor.nacionalidade}</p>
            </li>
          ))}
        </ul>
      </main>
    </>
  )
}
