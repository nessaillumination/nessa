import Footer from '../../Components/Footer'
import Navbar from '../../Components/Header/Navbar'
import SideComponent from '../../Components/sideComponent/SideComponent'
import { cookiePolicyConfig } from './cookieConfig'

const CookiesPolicy = () => {
  const formatContent = (content) => {
    return content.split('\n\n').map((paragraph, mainIndex) => {
      if (paragraph.includes(': ')) {
        const [title, description] = paragraph.split(': ')
        return (
          <div key={mainIndex} className="mb-4">
            <p className="font-medium text-gray-800">{title}:</p>
            <p className="text-gray-700 leading-relaxed pl-4">{description}</p>
          </div>
        )
      }
      return (
        <p key={mainIndex} className="text-gray-700 leading-relaxed mb-4">
          {paragraph}
        </p>
      )
    })
  }

  return (
    <div className="overflow-hidden bg-white">
      <Navbar />
      <SideComponent />
      
      <div className="bg-blue-200 text-black py-20"> 
        <h1 className="text-2xl font-semibold text-center">{cookiePolicyConfig.title}</h1>
      </div>

      <div className="max-w-[1200px] mx-auto px-8 py-12">
        {cookiePolicyConfig.sections.map((section) => (
          <section key={section.id} className="mb-10">
            <h2 className="text-lg font-semibold bg-gray-100 p-3 mb-4">
              {section.title}
            </h2>
            <div className="pl-1">
              {formatContent(section.content)}
            </div>
          </section>
        ))}
      </div>

      <Footer/>
    </div>
  )
}

export default CookiesPolicy