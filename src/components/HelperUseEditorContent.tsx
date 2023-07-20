import { ExclamationCircle } from './Icons'

export const HelperUseEditorContent = (): JSX.Element => {
  return (
    <div>
      <p className="flex items-center text-sm text-gray-500 dark:text-gray-400">You can use <kbd className="p-1 mx-1 text-sm font-semibold text-gray-800 bg-gray-100 border border-gray-200 rounded-lg dark:bg-gray-600 dark:text-gray-100 dark:border-gray-500">Markdown</kbd> in your content! <button data-popover-target="popover-description" data-popover-placement="bottom-end" type="button"><ExclamationCircle className="w-5 h-5 ml-2 text-gray-400 hover:text-gray-500" /></button></p>
      <div data-popover id="popover-description"
        role="tooltip"
        className="absolute z-10 invisible inline-block text-sm text-gray-500
        transition-opacity duration-300 bg-white border border-gray-200 rounded-lg
        shadow-md opacity-0 w-80 lg:w-[450px] dark:bg-gray-800 dark:border-gray-600
      dark:text-gray-400">
        <div className="p-3 space-y-2">
          <h3 className="font-semibold text-gray-900 dark:text-white">What is Markdown?</h3>
          <p className='text-justify'>
            Markdown is a lightweight, easy-to-learn markup language that allows you to create formatted content without the need for a complex text editor. It is widely used in blogging platforms, forums, websites and in project documentation to make content easier to read and understand.
          </p>
          <h3 className="font-semibold text-gray-900 dark:text-white">These are the most common Markdown commands</h3>

          <div className="relative border dark:border-slate-700 sm:rounded-lg overflow-x-auto h-80 modify-scroll">
            <table className="w-full text-xs text-left text-gray-500 dark:text-gray-400 overflow-y-auto">
              <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                  <th scope="col" className="px-6 py-3">
                    Tag
                  </th>
                  <th scope="col" className="px-6 py-3">
                    DESCRIPTION
                  </th>

                </tr>
              </thead>
              <tbody>
                <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                  <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                    #
                  </th>
                  <td className="px-6 py-4">
                    Defines a level 1 header.
                  </td>
                </tr>
                <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                  <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                    ##
                  </th>
                  <td className="px-6 py-4">
                    Defines a level 2 header.
                  </td>
                </tr>
                <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                  <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                    ###
                  </th>
                  <td className="px-6 py-4">
                    Defines a level 3 header.
                  </td>
                </tr>
                <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                  <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                    ####
                  </th>
                  <td className="px-6 py-4">
                    Defines a level 4 header.
                  </td>
                </tr>
                <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                  <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                    **Bold text**
                  </th>
                  <td className="px-6 py-4">
                    Displays the text between the double asterisks in bold.
                  </td>
                </tr>
                <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                  <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                    *Text in italics*
                  </th>
                  <td className="px-6 py-4">
                    Displays text between asterisks or underscores in italics.
                  </td>
                </tr>
                <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                  <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                    [Link text](URL)
                  </th>
                  <td className="px-6 py-4">
                    Creates a link with the specified text that redirects to the URL.
                  </td>
                </tr>
                <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                  <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                    ![Alternative text](path/to/image.jpg)
                  </th>
                  <td className="px-6 py-4">
                    Inserts an image with alternative text in case it does not load.
                  </td>
                </tr>
                <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                  <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                    *
                  </th>
                  <td className="px-6 py-4">
                    Creates a bulleted unordered list.
                  </td>
                </tr>
                <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                  <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                    1.
                  </th>
                  <td className="px-6 py-4">
                    Create a numbered list with numbers.
                  </td>
                </tr>
                <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                  <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                    {'>'}
                  </th>
                  <td className="px-6 py-4">
                    Creates an appointment block.
                  </td>
                </tr>
                <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                  <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                    `Online code`
                  </th>
                  <td className="px-6 py-4">
                    Displays text enclosed in inverted quotation marks as inline code.
                  </td>
                </tr>

                <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                  <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                    ```Code block```
                  </th>
                  <td className="px-6 py-4">
                    Creates a code block for multiple lines of code.
                  </td>
                </tr>

                <tr className="bg-white dark:bg-gray-800 dark:border-gray-700">
                  <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                    ---
                  </th>
                  <td className="px-6 py-4">
                    Creates a horizontal line to separate sections.
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <div data-popper-arrow />
      </div>
    </div>
  )
}
