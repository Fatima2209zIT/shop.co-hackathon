import Image from "next/image";
import mail from "@/app/images/mail.png";
import logo from "@/app/images/SHOP.CO.png";
import twitter from "@/app/images/1.png";
import facebook from "@/app/images/2.png";
import instagram from "@/app/images/3.png";
import github from "@/app/images/4.png";
import card2 from "@/app/images/card2.png";
import gpay from "@/app/images/Badge (4).png";
import paypal from "@/app/images/Badge (3).png";
import visa from "@/app/images/visa.jpg";
import apple from "@/app/images/Badge (2).png";

export default function Footer() {
  return (
    <div className="  relative bg-gray-100">
      {/* Top Banner */}
      <div className="w-full max-w-7xl mx-auto flex flex-col lg:flex-row justify-between items-center px-6 py-8 bg-black rounded-lg text-white">
        <h1 className="text-center lg:text-left text-2xl lg:text-4xl font-bold leading-snug lg:leading-tight mb-6 lg:mb-0">
          STAY UP TO DATE ABOUT OUR LATEST OFFERS
        </h1>
        <div className="flex flex-col w-full lg:w-1/3 gap-4">
          <div className="flex items-center bg-white rounded-full px-4 py-2">
            <Image src={mail} alt="mail" width={24} height={24} />
            <input
              type="text"
              placeholder="Enter Your Email Address"
              className="ml-4 flex-1 text-sm text-gray-600 placeholder-gray-400 focus:outline-none"
            />
          </div>
          <button className="bg-blue-500 hover:bg-blue-600 text-white rounded-full px-4 py-2">
            Subscribe to Newsletter
          </button>
        </div>
      </div>

      {/* Bottom Content */}
      <div className="w-full max-w-7xl mx-auto px-6 py-8 grid gap-8 grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
        {/* Logo and Social Links */}
        <div className="flex flex-col items-center lg:items-start gap-4">
          <Image src={logo} alt="logo" width={144} height={20} />
          <p className="text-center lg:text-left text-sm text-gray-600">
            We have clothes that suit your style and which you’re proud to wear. From women to men.
          </p>
          <div className="flex gap-4">
            <Image src={twitter} alt="twitter" width={24} height={24} />
            <Image src={facebook} alt="facebook" width={24} height={24} />
            <Image src={instagram} alt="instagram" width={24} height={24} />
            <Image src={github} alt="github" width={24} height={24} />
          </div>
        </div>

        {/* Links Sections */}
        {["COMPANY", "HELP", "FAQ", "RESOURCES"].map((section, index) => (
          <div key={index} className="flex flex-col gap-4">
            <h3 className="font-medium text-lg text-gray-800">{section}</h3>
            <ul className="flex flex-col gap-2 text-sm text-gray-600">
              {["Link 1", "Link 2", "Link 3", "Link 4"].map((link, i) => (
                <li key={i}>{link}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      {/* Divider Line */}
      <div className="w-full bg-gray-300 h-px my-4"></div>

      {/* Footer Text and Payment Options */}
      <div className="w-full max-w-7xl mx-auto px-6 py-4 text-center text-sm text-gray-600">
        Shop.co ©, Mehmil Zeeshan, All Rights Reserved
      </div>
      <div className="w-full max-w-7xl mx-auto flex justify-center gap-4 py-4">
        {[visa, card2, paypal, apple, gpay].map((img, index) => (
          <Image key={index} src={img} alt="payment" width={40} height={40} />
        ))}
      </div>
    </div>
  );
}