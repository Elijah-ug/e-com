// Footer.jsx
import { Separator } from "@/components/ui/separator";
import { FaFacebookF, FaTwitter, FaInstagram, FaGithub } from "react-icons/fa";

export const Footer = () => {
  return (
    <footer className="px-3 lg:px-10 bg-gray-800 dark:bg-gray-800 text-gray-300 dark:text-gray-300 ">
      {/* Upper Footer max-w-6xl mx-auto px-6 */}
      <div className=" py-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 ">
        {/* Column 1 */}
        <div className="flex flex-col items-center">
          <h2 className="text-xl font-semibold mb-4 text-gray-300 tracking-wider">ShopEase</h2>
          <p className="text-sm text-center">
            Your one-stop shop for all your favorite products. Quality and affordability, guaranteed.
          </p>
        </div>

        {/* Column 2 */}
        <div className="flex flex-col items-center">
          <h3 className="text-lg font-semibold mb-4 text-gray-300">Customer Service</h3>
          <ul className="space-y-2 text-sm">
            <li>
              <a href="#" className="hover:text-gray-900 dark:hover:text-white">
                Contact Us
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-gray-900 dark:hover:text-white">
                Shipping & Returns
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-gray-900 dark:hover:text-white">
                FAQs
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-gray-900 dark:hover:text-white">
                Privacy Policy
              </a>
            </li>
          </ul>
        </div>

        {/* Column 3 */}
        <div className="flex flex-col items-center">
          <h3 className="text-lg font-semibold mb-4 text-gray-300">Shop</h3>
          <ul className="space-y-2 text-sm">
            <li>
              <a href="#" className="hover:text-gray-900 dark:hover:text-white">
                Men
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-gray-900 dark:hover:text-white">
                Women
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-gray-900 dark:hover:text-white">
                Kids
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-gray-900 dark:hover:text-white">
                Accessories
              </a>
            </li>
          </ul>
        </div>

        {/* Column 4 */}
        <div className="flex flex-col items-center">
          <h3 className="text-lg font-semibold mb-4 text-gray-300">Follow Us</h3>
          <div className="flex space-x-4 text-xl">
            <a href="#" className="hover:text-blue-600">
              <FaFacebookF />
            </a>
            <a href="#" className="hover:text-sky-500">
              <FaTwitter />
            </a>
            <a href="#" className="hover:text-pink-600">
              <FaInstagram />
            </a>
            <a href="#" className="hover:text-gray-800 dark:hover:text-white">
              <FaGithub />
            </a>
          </div>
        </div>
      </div>

      <Separator className="bg-gray-200 dark:bg-gray-700" />

      {/* Lower Footer */}
      <div className="py-4 text-center text-sm">
        <p>&copy; {new Date().getFullYear()} ShopEase. All rights reserved.</p>
      </div>
    </footer>
  );
};
