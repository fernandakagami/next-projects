import Head from 'next/head'
import styles from '@/styles/Home.module.css'
import Link from 'next/link'

export default function Create() {
    const handleSubmit = async (event: React.SyntheticEvent) => {

        event.preventDefault()

        const target = event.target as typeof event.target & {
            nome: { value: string };
            nacionalidade: { value: string };
        };

        const data = {
            nome: target.nome.value,
            nacionalidade: target.nacionalidade.value,
        }

        const JSONdata = JSON.stringify(data)

        const endpoint = 'http://localhost:3000/autores'

        const options = {
            method: 'POST',
            redirected: '/',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSONdata,
        }

        const response = await fetch(endpoint, options)

        const result = await response.json()

        if (result.nome = target.nome.value) {
            window.location.href = "/"
        } else {
            alert('Não funcionou')
        }

    }

    return (
        <>
            <Head>
                <title>Livraria</title>
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <Link href="/">Voltar para Listagem de Autores</Link>
            <main className={styles.main}>
                <form onSubmit={handleSubmit}>
                    <div>
                        <label htmlFor="nome">Nome</label>
                        <input name="nome" id="nome" type="text" />
                    </div>
                    <div>
                        <label htmlFor='nacionalidade'>Nacionalidade</label>
                        <input name="nacionalidade" id='nacionalidade' type='text' />
                    </div>

                    <button type="submit">Cadastrar</button>
                </form >
            </main>
        </>
    )
}