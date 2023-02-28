import Head from 'next/head'
import styles from '@/styles/Home.module.css'
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from "yup";

export default function Home() {

  type formData = {
    nome: string;
    email: string;
    senha: string;
  };

  const validateSchema = Yup.object().shape({
    nome: Yup.string()
      .required('O campo Nome é obrigatório.'),
    email: Yup.string()
      .required('O campo E-mail é obrigatório.')
      .email('Email inválido'),
    senha: Yup.string()      
      .required('O campo Senha é obrigatório.')
      .min(6, 'A senha deve conter pelo menos 6 caracteres.')
    });

  const { register, handleSubmit, setValue, formState: { errors } } = useForm<formData>({ mode: 'onChange', resolver: yupResolver(validateSchema) });

  function onSubmit(data: formData) {
    // display form data on success
    alert('SUCCESS!! :-)\n\n');
    console.log(JSON.stringify(data))
  }

  return (
    <>
      <Head>
        <title>Sign up</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>
        <h1 className={styles.title}>Sign up</h1>

        <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>

          <div className={styles.field}>
            <label htmlFor="Nome">Nome</label>
            <input type="text" {...register('nome')} id="nome" aria-describedby="nomeHelp" className={styles.input}/>
            {errors.nome && (<small id="nameHelp">O campo nome é obrigatório</small>)}
          </div>

          <div className={styles.field}>
            <label htmlFor="email">E-mail</label>
            <input type="email" {...register('email')} id="email" aria-describedby="emailHelp" className={styles.input}/>
            {errors.email && (<small id="emailHelp">O campo e-mail é obirgatório</small>)}
          </div>

          <div className={styles.field}>
            <label htmlFor="senha">Senha</label>
            <input type="password" {...register('senha')} id="senha" aria-describedby="senhaHelp" className={styles.input}/>
            {errors.senha && (<small id="senhaHelp">{errors.senha?.message}</small>)}
          </div>

          <button type="submit" className={styles.button}>Cadastrar</button>
        </form>

      </main>
    </>
  )
}
