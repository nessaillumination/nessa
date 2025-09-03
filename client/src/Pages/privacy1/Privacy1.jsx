import { privacyConfig } from './Privacy1Config'
import Navbar from '../../Components/Header/Navbar'
import SideComponent from '../../Components/sideComponent/SideComponent'
import Footer from '../../Components/Footer'

const Privacy1 = () => {
  return (
    <div className="overflow-hidden bg-white">
      <Navbar />
      <SideComponent />
      
      <div className="bg-blue-200 text-black py-20"> 
        <h1 className="text-2xl font-semibold text-center">{privacyConfig.title}</h1>
      </div>

      <div className="max-w-[1200px] mx-auto px-8 py-12">
        {privacyConfig.sections.map((section) => (
          <section key={section.id} className="mb-10">
            <h2 className="text-lg font-semibold bg-gray-100 p-3 mb-4">
              {section.title}
            </h2>
            {section.content.split('. ').map((paragraph, idx) => (
              paragraph.trim() && (
                <p key={idx} className="text-gray-700 leading-relaxed mb-3 pl-1">
                  {paragraph.trim()}.
                </p>
              )
            ))}
          </section>
        ))}
      </div>

      <Footer/>
    </div>
  )
}

export default Privacy1