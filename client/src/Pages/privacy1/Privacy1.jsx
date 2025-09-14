import { privacyConfig } from './Privacy1Config'
import Navbar from '../../Components/Header/Navbar'
import SideComponent from '../../Components/sideComponent/SideComponent'
import Footer from '../../Components/Footer'
import SEO from '../../helper/Seo'

const Privacy1 = () => {
  return (
    <>
      <SEO
        title={"Privacy Policy | Website Data Privacy Policy India | Nessa"}
        ogTitle={"Privacy Policy | Website Data Privacy Policy India | Nessa"}
        description={"Read Nessa’s privacy policy outlining data collection and usage practices. Learn how we protect your information while you browse our LED and solar lighting website"}
        primaryKeyword={["privacy policy", "website privacy policy", "privacy policy india", "data privacy policy", "privacy policy for website"]}
      />
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

        <Footer />
      </div>
    </>
  )
}

export default Privacy1