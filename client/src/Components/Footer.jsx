import logo from '../assets/images/nessalogo.webp'
import { RiFacebookBoxLine } from 'react-icons/ri'
import { FaInstagram } from 'react-icons/fa'
import { IoLogoWhatsapp } from 'react-icons/io5'
import { CiLinkedin } from 'react-icons/ci'
import { RiTwitterXFill } from 'react-icons/ri'
import { Link } from 'react-router-dom'


function Footer() {
  return (
      <footer className="bg-black text-white py-12 px-[5vw]">
          <div className="container mx-auto">
              <div className=" flex justify-between max-md:flex-col gap-10">
                  <div className="space-y-6 w-[30%] max-md:w-full">
                      <img
                          src={logo}
                          alt="NESSA Logo"
                          className="h-12"
                      />
                      <p className="text-gray-400 text-sm">
                          In a world driven by innovation, Nessa leads the way in redefining lighting solutions with sustainability at its core. We
                          illuminate the future with cutting-edge LED and solar technologies, seamlessly blending efficiency, performance, and
                          environmental responsibility. <br /> <br /> Our vision extends beyond lighting—it’s about creating a brighter, greener world
                          where every product reflects our commitment to energy efficiency and sustainable progress. At Nessa, innovation isn’t just
                          about advancement; it’s about shaping a future that balances technological excellence with a deep respect for our planet.
                      </p>
                      <div className="flex gap-4">
                          <Link
                              to="https://www.instagram.com/nessa.illumination?igsh=MWd2NWxxbXFrbjkyOQ=="
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-white text-2xl hover:text-gray-400">
                              <FaInstagram />
                          </Link>
                          <Link
                              to="https://www.facebook.com/share/15Z3mQLR5s/?mibextid=LQQJ4d"
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-white text-2xl hover:text-gray-400">
                              <RiFacebookBoxLine />
                          </Link>
                          <Link
                              to="https://api.whatsapp.com/send?phone=918690779778"
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-white text-2xl hover:text-gray-400">
                              <IoLogoWhatsapp />
                          </Link>
                          <Link
                              to="https://www.linkedin.com/company/nessa-illumination-technologies/ "
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-white text-2xl hover:text-gray-400">
                              <CiLinkedin />
                          </Link>
                          <Link
                              to="https://x.com/nessaledlights?s=21&t=SDO__KiQh-rlzCEB0xXW7g"
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-white text-2xl hover:text-gray-400">
                              <RiTwitterXFill />
                          </Link>
                      </div>
                  </div>

                  <div className="w-fit max-md:w-full ">
                      <h3 className="text-lg font-semibold mb-4">Browse</h3>
                      <ul className="space-y-3">
                          <li>
                              <Link
                                  to="/"
                                  className="text-gray-400 hover:text-white">
                                  Home
                              </Link>
                          </li>
                          <li>
                              <Link
                                  to="/solutions"
                                  className="text-gray-400 hover:text-white">
                                  Solutions
                              </Link>
                          </li>
                          <li>
                              <Link
                                  to="/allproducts"
                                  className="text-gray-400 hover:text-white">
                                  Products
                              </Link>
                          </li>
                          <li>
                              <Link
                                  to="/aboutus"
                                  className="text-gray-400 hover:text-white">
                                  About Us
                              </Link>
                          </li>
                          <li>
                              <Link
                                  to="/contactus"
                                  className="text-gray-400 hover:text-white">
                                  Contact Us
                              </Link>
                          </li>
                          <li>
                              <Link
                                  to="/support"
                                  className="text-gray-400 hover:text-white">
                                  Support
                              </Link>
                          </li>
                      </ul>
                  </div>

                  <div className="w-fit max-md:w-full">
                      <h3 className="text-lg font-semibold mb-4">Company</h3>
                      <ul className="space-y-3">
                          <li>
                              <Link
                                  to="/valueAddedServices"
                                  className="text-gray-400 hover:text-white">
                                  Value Added Service
                              </Link>
                          </li>
                          <li>
                              <Link
                                  to="/resources"
                                  className="text-gray-400 hover:text-white">
                                  Resources
                              </Link>
                          </li>

                          <li>
                              <Link
                                  to="/projects"
                                  className="text-gray-400 hover:text-white">
                                  Projects
                              </Link>
                          </li>
                          <li>
                              <Link
                                  to="#"
                                  className="text-gray-400 hover:text-white">
                                  Calculators
                              </Link>
                          </li>
                      </ul>
                  </div>

                  <div className="w-fit max-md:w-full">
                      <h3 className="text-lg font-semibold mb-4">Legal</h3>
                      <ul className="space-y-3">
                          <li>
                              <Link
                                  to="/terms"
                                  className="text-gray-400 hover:text-white">
                                  Terms & Conditions
                              </Link>
                          </li>
                          <li>
                              <Link
                                  to="/privacy"
                                  className="text-gray-400 hover:text-white">
                                  Privacy Policy
                              </Link>
                          </li>
                          <li>
                              <Link
                                  to="/esgpolicy"
                                  className="text-gray-400 hover:text-white">
                                  ESG Policy
                              </Link>
                          </li>
                          <li>
                              <Link
                                  to="/cookiespolicy"
                                  className="text-gray-400 hover:text-white">
                                  Cookies Policy
                              </Link>
                          </li>
                      </ul>
                  </div>

                  <div className="w-[20%] max-md:w-full">
                      <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
                      <ul className="space-y-3">
                          <li className="text-gray-400 mb-4">+918690779778</li>
                          <Link
                              to="mailto:info@nessa.in"
                              className="hover:underline  text-gray-400">
                              info@nessa.in
                          </Link>
                          <li className="text-gray-400">36-A, Devraj Industrial Park, Near Pipalaj, Pirana Rd, Piplaj, Ahmedabad, Gujarat 382405</li>
                      </ul>
                  </div>
              </div>

              <div className="mt-12 pt-8 border-t border-gray-800 text-center text-gray-400 text-sm">
                  Copyright 2025. NESSA. All Right Reserved. Developed by Futuredesks Services
              </div>
          </div>
      </footer>
  )
}

export default Footer

