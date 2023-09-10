export const InputAlert = ({ message }: { message: string }): JSX.Element => {
  let messageSplited: string[] = []

  if (message.includes('/')) {
    messageSplited = message.split('/')
  }

  return (
    <div className="mt-2 text-sm text-red-600 font-semibold animate-fade-down
    animate-duration-300 animate-ease-in-out flex gap-1 items-center">
      {
        messageSplited.length !== 0
          ? <div className="flex flex-col md:flex-row md:gap-1">
            <span className="block">{messageSplited[0]}</span>
            <span className="block text-green-500">{messageSplited[1]} </span>
          </div>
          : message
      }
    </div>
  )
}
