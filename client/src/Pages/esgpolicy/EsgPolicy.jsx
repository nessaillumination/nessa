import { Link } from 'react-router-dom'
// import Footer from '../../Components/Footer'
// import Navbar from '../../Components/Header/Navbar'
// import SideComponent from '../../Components/sideComponent/SideComponent'
// import SEO from '../../helper/Seo'
// import { EsgPolicyConfig } from './EsgPolicyConfig'

const EsgPolicy = () => {
    return (
        <div className="h-screen flex-col w-screen flex gap-6 items-center justify-center">
            <h3 className='text-3xl font-extrabold capitalize'>Page is under maintainance ! Visit after some time .</h3>
            <Link
                to="/"
                className="px-12 py-2 bg-blue-600 text-center text-white rounded-xl capitalize">
                Home
            </Link>
        </div>
    )

    // return (
    //   <>
    //     <SEO
    //       title={"ESG Policy | Environmental Social Governance & Sustainability | Nessa"}
    //       ogTitle={"ESG Policy | Environmental Social Governance & Sustainability | Nessa"}
    //       description={"Explore Nessa’s ESG policy and sustainability strategy. Our corporate environmental, social, and governance commitments drive responsible and sustainable practices."}
    //       primaryKeyword={["esg policy", "environmental social governance policy", "corporate esg policy", "sustainability policy", "esg strategy"]}
    //     />
    //     <div className="overflow-hidden bg-white">
    //       <Navbar />
    //       <SideComponent />
    //       <div className="bg-blue-200 text-black  py-20">
    //         <h1 className="text-2xl font-semibold text-center">{EsgPolicyConfig.title}</h1>
    //       </div>

    //       <div className="max-w-[1200px] mx-auto px-8 py-6 space-y-8">
    //         {EsgPolicyConfig.sections.map((section) => (
    //           <section key={section.id}>
    //             <h2 className="text-lg font-semibold bg-gray-100 p-3">
    //               {section.title}
    //             </h2>
    //             <p className="mt-4 text-gray-700 leading-relaxed">
    //               {section.content}
    //             </p>
    //           </section>
    //         ))}
    //       </div>

    //       <Footer />
    //     </div>
    //   </>
    // )
}

export default EsgPolicy
