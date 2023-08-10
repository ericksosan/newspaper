import { CardNews } from '../components/CardNews'

export const ManageNews = (): JSX.Element => {
  return (
    <div className="lg:max-w-7xl lg:mx-auto flex flex-col pt-8 xl:pt-16 min-h-screen px-5 md:px-10">
      <h1 className="font-bold text-lg md:text-4xl dark:text-gray-200 pb-4">News Management</h1>
      <div className="grid grid-cols-1 gap-3 md:grid-cols-2 xl:grid-cols-3">
        <CardNews />
        <CardNews />
        <CardNews />
      </div>
    </div>
  )
}
