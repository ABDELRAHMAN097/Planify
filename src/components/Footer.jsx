import image from "../assets/footer/image7.svg";
import logo from "../assets/Logo.svg";
import facebook from "../assets/footer/facebook-icon.svg";
import twitter from "../assets/footer/twitter-3.svg";
import ig from "../assets/footer/instagram-2016.svg";
import Icon from "../assets/footer/Icon ionic-ios-send.svg";

const Footer = () => {
  return (
    <>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 ">
        {/* desktop */}
        <div className="hidden md:block ">
          <div className="grid grid-cols-6 grid-rows-1 gap-10 pt-16">
            <div className="">
              <img src={logo} alt="" />
              <p className="py-4 text-[ #160637] font-medium">
                Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed
                diam nonummy nibh euismod tincidunt ut laoreet dolore magna
                aliquam erat volutpat ut wisi enim ad minim
              </p>
              <div className="flex justify-start gap-4">
                <img src={facebook} alt="" className="cursor-pointer" />
                <img src={twitter} alt="" className="cursor-pointer" />
                <img src={ig} alt="" className="cursor-pointer" />
              </div>
            </div>
            <div className="">
              <h1 className="font-bold">Product</h1>
              <ul className="flex flex-col gap-2 justify-evenly mt-6 	font-medium	 text-[#160637] ">
                <li>Connections</li>
                <li>Protocols</li>
                <li>Personas</li>
                <li>Integrations</li>
                <li>Catalog</li>
                <li>Pricing</li>
                <li>Security</li>
                <li>GDPR</li>
              </ul>
            </div>
            <div>
              <h1 className="font-bold">For Developers</h1>
              <ul className="flex flex-col gap-2  justify-evenly mt-6 	font-medium	 text-[#160637] ">
                <li>Docs</li>
                <li>API</li>
                <li>Open Source</li>
                <li>Engineering Team</li>
              </ul>
            </div>
            <div>
              <h1 className="font-bold">Company</h1>
              <ul className="flex flex-col gap-2  justify-evenly mt-6 	font-medium	 text-[#160637] ">
                <li>Careers</li>
                <li>Blog</li>
                <li>Press</li>
              </ul>
            </div>
            <div>
              <h1 className="font-bold">Support</h1>
              <ul className="flex flex-col gap-2  justify-evenly mt-6 font-medium 	 text-[#160637] ">
                <li>Help Center</li>
                <li>Contact Us</li>
                <li>Security</li>
                <li>Security</li>
                <li>Bulletins</li>
                <li>Documentation</li>
                <li>Partner</li>
                <li>Portal</li>
              </ul>
            </div>
            <div>
              <h1 className="font-bold">Newsletter</h1>

              <div className="relative flex flex-col gap-2  justify-evenly mt-6">
                <input
                  type="text"
                  className="pl-4 pr-4 py-2 shadow-md w-full"
                  placeholder="Email"
                />
                <div className="absolute inset-y-0 right-2 pl-3 flex items-center pointer-events-none">
                  <i className="material-icons text-gray-400">
                    <img src={Icon} alt="" />
                  </i>
                </div>
              </div>
            </div>
            <div className=" pr-10 flex flex-wrap	mb-4 col-span-6 content-start justify-self-center">
              <h1 className=" font-bold text-[#160637] mr-2">Rahul Rao</h1>
              <img className="  " src={image} height={18} width={18} alt="" />
            </div>
          </div>
        </div>

        {/* Mobile */}
        <div className=" md:hidden ">
          <div className="pt-16 flex-col gap-16 ">
            <div className="py-4">
              <img src={logo} alt="" />
              <p className="py-4 text-[ #160637] font-medium">
                Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed
                diam nonummy nibh euismod tincidunt ut laoreet dolore magna
                aliquam erat volutpat ut wisi enim ad minim
              </p>
              <div className="flex justify-start gap-4">
                <img src={facebook} alt="" className="cursor-pointer" />
                <img src={twitter} alt="" className="cursor-pointer" />
                <img src={ig} alt="" className="cursor-pointer" />
              </div>
            </div>

            <div className="">
              <h1 className="font-bold">Product</h1>
              <ul className="flex flex-col gap-2 justify-evenly mt-6 	font-medium	 text-[#160637] ">
                <li>Connections</li>
                <li>Protocols</li>
                <li>Personas</li>
                <li>Integrations</li>
                <li>Catalog</li>
                <li>Pricing</li>
                <li>Security</li>
                <li>GDPR</li>
              </ul>
            </div>
            <div>
              <h1 className="font-bold">For Developers</h1>
              <ul className="flex flex-col gap-2  justify-evenly mt-6 font-medium		 text-[#160637] ">
                <li>Docs</li>
                <li>API</li>
                <li>Open Source</li>
                <li>Engineering Team</li>
              </ul>
            </div>
            <div>
              <h1 className="font-bold">Company</h1>
              <ul className="flex flex-col gap-2  justify-evenly mt-6 	font-medium	 text-[#160637] ">
                <li>Careers</li>
                <li>Blog</li>
                <li>Press</li>
              </ul>
            </div>
            <div>
              <h1 className="font-bold">Support</h1>
              <ul className="flex flex-col gap-2  justify-evenly mt-6 font-medium  text-[#160637] ">
                <li>Help Center</li>
                <li>Contact Us</li>
                <li>Security</li>
                <li>Security</li>
                <li>Bulletins</li>
                <li>Documentation</li>
                <li>Partner</li>
                <li>Portal</li>
              </ul>
            </div>

            <div className="py-4">
              <h1 className="font-bold">Newsletter</h1>

              <div className="relative flex flex-col gap-2  justify-evenly mt-6">
                <input
                  type="text"
                  className="pl-4 pr-4 py-2 shadow-md w-full"
                  placeholder="Email"
                />
                <div className="absolute inset-y-0 right-2 pl-3 flex items-center pointer-events-none">
                  <i className="material-icons text-gray-400">
                    <img src={Icon} alt="" />
                  </i>
                </div>
              </div>
            </div>

            <div className=" pr-10 flex flex-wrap	mb-4 col-span-6 content-start justify-self-center">
              <h1 className=" font-bold text-[#160637] mr-2">Rahul Rao</h1>
              <img className="  " src={image} height={18} width={18} alt="" />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Footer;
