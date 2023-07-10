import { useForm, FormProvider, type SubmitHandler } from 'react-hook-form'
import { formValidation } from '../utils'
import { Input } from '../components'

interface Inputs {
  email: string
  password: string
}

export const Login: React.FC = () => {
  const methods = useForm<Inputs>()
  const { handleSubmit, reset } = methods

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    console.log(data)
    reset()
  }

  return (
    <section className="w-full h-screen flex flex-col justify-center items-center font-inter relative dark:bg-slate-900">
      <div className="absolute top-0 left-0 w-full pb-24">
        <h1 className="pt-5 pl-6 text-xl font-bold text-success underline decoration-wavy dark:text-gray-200 select-none">
          Newspaper
        </h1>
      </div>
      <div className="h-auto mx-auto w-11/12 z-20 flex flex-col justify-center items-center gap-2 md:flex-row md:bg-white  md:shadow-2xl md:rounded-xl md:overflow-hidden xl:h-3/4 xl:w-3/4 dark:md:bg-slate-800">
        <div className="h-full hidden justify-center items-center md:flex md:px-6 md:py-10 lg:w-3/4 dark:bg-white dark:rounded-lg">
          <img
            src="/images/login.svg"
            className="lg:w-3/4"
            alt="Girl with keys in hand"
          />
        </div>
        <div className="py-10 h-full w-3/4 flex justify-center items-center flex-col md:px-6 lg:w-3/4">
          <div className="mb-10 text-center">
            <i className="inline-block text-3xl mb-3">👋</i>
            <h1 className="text-3xl font-bold dark:text-gray-200">Welcome Back</h1>
            <span className="text-lg inline-block text-gray-400 mt-1 ">
              Enter your Login details below
            </span>
          </div>
          <FormProvider {...methods}>
            <form className="w-full xl:w-3/4" onSubmit={(evt) => { void handleSubmit(onSubmit)(evt) }}>
              <Input label="Email address" type="email" name="email" validation={formValidation.email} />
              <Input label="Password" type="password" name="password" validation={formValidation.password} />
              <button
                type="submit"
                className="bg-success rounded text-white font-semibold w-full py-3 transition duration-150 ease-in-out"
                data-te-ripple-init
                data-te-ripple-color="light">
                Login
              </button>
              <div className="w-full flex justify-center items-center gap-1 pt-4">
                <span className='dark:text-gray-200'>Don&apos;t have an account?</span>
                <a href="#" className="text-primary font-semibold hover:opacity-90 dark:text-success">
                  Sign Up
                </a>
              </div>
            </form>
          </FormProvider>
        </div>
      </div>
      <svg
        className="absolute w-full z-10 bottom-0  fill-success dark:fill-slate-700"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 1440 320">
        <path
          fillOpacity="1"
          d="M0,96L48,117.3C96,139,192,181,288,170.7C384,160,480,96,576,85.3C672,75,768,117,864,133.3C960,149,1056,139,1152,128C1248,117,1344,107,1392,101.3L1440,96L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path>
      </svg>
    </section>
  )
}
