"use client"

import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { Logo } from "@/components/Logo/Logo";
import axios from 'axios';
import { api_axios } from '@/service/api';

const singInSchema = z.object({
  email: z.string().email(),
  senha: z.string().min(5),
})

type singInProps = z.infer<typeof singInSchema>

export default function Login() {

  const { register, handleSubmit, formState: { errors }} = useForm<singInProps>({
    resolver: zodResolver(singInSchema),
  })


  const singIn = handleSubmit(async (data) => {
    const response = await api_axios.post('/auth/signin', data)
    
    if (response.status === 200) {
      console.log(response.data)
    }
   
  })

  return (
    <div className="flex w-screen h-screen justify-center items-center bg-base-300">
      <form
        id="container-login"
        onSubmit={singIn}
        className="flex  w-4/6 h-[700px] bg-base-100 rounded-3xl shadow-3xl overflow-auto"
      >

        <div id="container-left" className="flex w-3/6 h-full items-center justify-center max-lg:w-full">

          <div className="flex flex-col w-96 h-auto gap-5 items-center">

            <Logo />

            <label className="form-control w-full max-w-xs">
              <input
                id="email"
                type="text"
                placeholder="exemple@outlook.com.br"
                className="input input-bordered input-primary w-full max-w-xs"
                {...register('email')}
              />
              <div className="label">
                {errors.email && <span className="label-text-alt text-error">{errors.email.message}</span>}
              </div>
            </label>
            

            <label className="form-control w-full max-w-xs">
              <input
                type="password"
                placeholder="senha"
                className="input input-bordered input-primary w-full max-w-xs"
                {...register('senha')}
              />
              <div className="label">
                {errors.senha && <span className="label-text-alt text-error">{errors.senha.message}</span>}
              </div>
            </label>

            <button type="submit" className="btn bg-primary hover:bg-primary w-full max-w-xs">
              Sing In
            </button>

          </div>

        </div>


        <div id="container-right" className="flex items-center justify-center bg-primary w-3/6 h-full rounded-l-[30%] shadow-2xl max-lg:hidden">
          <div className="h-1/2 w-1/2">
            <img src="./imagens/logo.png" alt='logo'/>
          </div>
        </div>
      </form>

    </div>
  )
}
