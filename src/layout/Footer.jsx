const Footer = () => {
    return (
      <footer className="bg-gray-100 py-8">
        <div className="container  px-6 md:justify-between flex flex-col">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6  ">
            {/* Company Info */}
            <div>
              <h3 className="text-lg font-bold mb-4">Company Info</h3>
              <ul className="space-y-2">
                <li>
                  <a href="#" className="text-gray-700 hover:text-blue-500">
                    About Us
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-700 hover:text-blue-500">
                    Carrier
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-700 hover:text-blue-500">
                    We are hiring
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-700 hover:text-blue-500">
                    Blog
                  </a>
                </li>
              </ul>
            </div>
  
            {/* Legal */}
            <div>
              <h3 className="text-lg font-bold mb-4">Legal</h3>
              <ul className="space-y-2">
                <li>
                  <a href="#" className="text-gray-700 hover:text-blue-500">
                    About Us
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-700 hover:text-blue-500">
                    Carrier
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-700 hover:text-blue-500">
                    We are hiring
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-700 hover:text-blue-500">
                    Blog
                  </a>
                </li>
              </ul>
            </div>
  
            {/* Features */}
            <div>
              <h3 className="text-lg font-bold mb-4">Features</h3>
              <ul className="space-y-2">
                <li>
                  <a href="#" className="text-gray-700 hover:text-blue-500">
                    Business Marketing
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-700 hover:text-blue-500">
                    User Analytic
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-700 hover:text-blue-500">
                    Live Chat
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-700 hover:text-blue-500">
                    Unlimited Support
                  </a>
                </li>
              </ul>
            </div>
  
            {/* Resources */}
            <div>
              <h3 className="text-lg font-bold mb-4">Resources</h3>
              <ul className="space-y-2">
                <li>
                  <a href="#" className="text-gray-700 hover:text-blue-500">
                    iOS & Android
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-700 hover:text-blue-500">
                    Watch a Demo
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-700 hover:text-blue-500">
                    Customers
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-700 hover:text-blue-500">
                    API
                  </a>
                </li>
              </ul>
            </div>
  
            {/* Get In Touch */}
            <div>
              <h3 className="text-lg font-bold mb-4">Get In Touch</h3>
              <form>
                <input
                  type="email"
                  placeholder="Your Email"
                  className="w-full px-4 py-2 mb-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <button
                  type="submit"
                  className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600"
                >
                  Subscribe
                </button>
              </form>
            </div>
          </div>
  
          {/* Footer Bottom */}
          <div className="mt-8 text-center text-gray-600">
            Made With Love By Figmaland All Rights Reserved
          </div>
        </div>
      </footer>
    );
  };
  
  export default Footer;
  