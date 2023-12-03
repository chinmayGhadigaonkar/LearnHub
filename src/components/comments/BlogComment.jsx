import React from 'react'

const BlogComment = () => {
  return (
    <>

    <div className='py-2 my-2 shadow-lg px-2 md:w-5/5'>

    <div className="relative mb-4">
        <label for="message" className="leading-7 text-lg text-gray-600 mb-2">Message</label><br />
        <textarea id="message" name="message" className="w-full  bg-white rounded border border-gray-300 focus:border-red-500 focus:ring-2 focus:ring-red-200 h-32 text-base outline-none text-gray-700 py-1 px-3 resize-none leading-6 transition-colors duration-200 ease-in-out"></textarea>
      </div>
      <button className="text-white bg-red-500 border-0 py-2 px-6 focus:outline-none hover:bg-red-600 rounded text-lg">Send</button>

    </div>

  
    </>
  )
}

export default BlogComment