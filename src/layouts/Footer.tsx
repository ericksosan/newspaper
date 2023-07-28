export const Footer = (): JSX.Element => {
  return (
    <footer className="text-gray-600 body-font border-t border-gray-100 dark:bg-slate-800 dark:border-slate-700">
      <div className="container px-5 py-4 mx-auto flex items-center sm:flex-row flex-col sm:justify-center">
        <a className="flex title-font font-medium items-center md:justify-start justify-center text-gray-900">
          <span className="ml-3 text-xl dark:text-gray-200">Newspaper</span>
        </a>
        <p className="text-sm text-gray-400 sm:ml-4 sm:pl-4 sm:border-l-2 sm:border-gray-200 sm:py-2 sm:mt-0 mt-4 dark:border-slate-700">© 2020 Newspaper —
          <span className="text-gray-400 ml-1">All rights reserved.</span>
        </p>
      </div>
    </footer>
  )
}
