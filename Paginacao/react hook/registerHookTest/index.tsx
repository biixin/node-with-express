import css from './template.module.css'
// React Hook Form
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup'

// YUP
import { object, string } from 'yup'




export const RegisterHookTest = () => {

    const schema = object({
        name: string().required("Campo obrigatório"),
        lastname: string().required("Campo obrigatório"),
        email: string().required("Campo obrigatório"),
    })

    const {
        register,
        handleSubmit: onSubmit,
        watch,
        formState: { errors } 
    } = useForm({resolver: yupResolver(schema)});

    const handleSubmit = (data: any) => {
        console.log(data)
        
    }
    console.log(errors)

    return (
        <main className={css.register}>
            <div>
                Registration Info Hook
            </div>
            <form onSubmit={onSubmit(handleSubmit)} action="">
                <input {...register("name")} placeholder='Nome' type="text" />
                {errors.name &&
                    <span>Campo Obrigatório.</span>
                }
                <input {...register("lastname")} placeholder='Sobrenome' type="text" />
                {errors.lastname &&
                    <span>Campo Obrigatório.</span>
                }
                <input {...register("email")} placeholder='Email' type="text" />
                {errors.email &&
                    <span>Campo Obrigatório.</span>
                }
                <button>Submit</button>
            </form>
        </main>
    )
}

