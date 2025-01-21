import { BsSliders } from "react-icons/bs";
import { FaQuestionCircle } from "react-icons/fa";
import { FiUsers } from "react-icons/fi";
import { ImBlogger } from "react-icons/im";
import { MdOutlineContacts, MdOutlineProductionQuantityLimits } from "react-icons/md";
import { PiSlidersBold } from "react-icons/pi";
import { RxDashboard } from "react-icons/rx";
import { Link } from "react-router-dom";
const Sidebar = ({ side, closeSidebar }) => {
  return (
    <div
      className={`fixed top-0  shadow-xl ${side} sm:left-0 w-64 overflow-x-auto h-screen bg-[#000] z-10 transition-all`}
    >
      <i
        className="bi bi-x-lg absolute text-black top-4 right-4 sm:hidden block cursor-pointer text-lg"
        onClick={closeSidebar}
      ></i>
      <div className="  p-5">
        <img src={require('../../assets/image/admin-logo.jpeg')} alt="" />
      </div>

      <ul className="">
        <li className="px-4 cursor-pointer   font-semibold   transition-all py-3 text-white flex items-center  hover:bg-[#F1521B] hover:text-white">
          <i className="bi bi-speedometer2 mr-2 text-white inline-block text-xl"></i>
          <RxDashboard className=" mr-2" size={20} />
          <Link to="/dashboard" className="text-lg capitalize">
            Dashboard
          </Link>
        </li>


        <li className="px-4 cursor-pointer   font-semibold   transition-all py-3 text-white flex items-center  hover:bg-[#F1521B] hover:text-white">
          <i className="bi bi-speedometer2 mr-2 text-white inline-block text-xl"></i>
          <PiSlidersBold className=" mr-2" size={20} />

          <Link to="/customers" className="text-lg capitalize">
            Customers
          </Link>
        </li>

        <li className="px-4 cursor-pointer   font-semibold   transition-all py-3 text-white flex items-center  hover:bg-[#F1521B] hover:text-white">
          <i className="bi bi-speedometer2 mr-2 text-white inline-block text-xl"></i>
          <PiSlidersBold className=" mr-2" size={20} />

          <Link to="/flash-deals" className="text-lg capitalize">
            Flash Deals
          </Link>
        </li>

        <li className="px-4 cursor-pointer   font-semibold   transition-all py-3 text-white flex items-center  hover:bg-[#F1521B] hover:text-white">
          <i className="bi bi-speedometer2 mr-2 text-white inline-block text-xl"></i>
          <PiSlidersBold className=" mr-2" size={20} />

          <Link to="/upcoming-releases" className="text-lg capitalize">
            Upcoming Releases
          </Link>
        </li>


        <li className="px-4 cursor-pointer   font-semibold   transition-all py-3 text-white flex items-center  hover:bg-[#F1521B] hover:text-white">
          <i className="bi bi-speedometer2 mr-2 text-white inline-block text-xl"></i>
          <PiSlidersBold className=" mr-2" size={20} />

          <Link to="/home_banner" className="text-lg capitalize">
            Home Banner
          </Link>
        </li>
        <li className="px-4 cursor-pointer   font-semibold   transition-all py-3 text-white flex items-center  hover:bg-[#F1521B] hover:text-white">
          <i className="bi bi-speedometer2  text-white inline-block text-xl"></i>
          <RxDashboard className=" mr-2" size={20} />
          <Link to="/brands" className="text-lg capitalize">

            main Categories
          </Link>
        </li>

        <li className="px-4 cursor-pointer   font-semibold   transition-all py-3 text-white flex items-center hover:bg-[#F1521B] hover:text-white">
          <BsSliders className=" mr-2" size={20} />
          <Link to="/sub-categories" className="text-lg capitalize">
            Categories
          </Link>
        </li>

        <li className="px-4 cursor-pointer  font-semibold  transition-all py-3 text-white flex items-center  hover:bg-[#F1521B] hover:text-white">
          <FiUsers className=" mr-2" size={20} />
          <Link to="/category" className="text-lg capitalize">
            Sub  Categories
          </Link>
        </li>







        <li className="px-4 cursor-pointer  font-semibold  transition-all py-3 text-white flex items-center  hover:bg-[#F1521B] hover:text-white">
          <MdOutlineProductionQuantityLimits className=" mr-2" size={20} />
          <Link to="/products" className="text-lg capitalize">
            Product
          </Link>
        </li>
        <li className="px-4 cursor-pointer   font-semibold   transition-all py-3 text-white flex items-center hover:bg-[#F1521B] hover:text-white">

          <ImBlogger className=" mr-2" size={20} />
          <Link to="/blogs" className="text-lg capitalize">
            Articles
          </Link>
        </li>

        <li className="px-4 cursor-pointer   font-semibold   transition-all py-3 text-white flex items-center hover:bg-[#F1521B] hover:text-white">
          <MdOutlineContacts className=" mr-2" size={20} />
          <Link to="/contact-us" className="text-lg capitalize">
            Contact Us
          </Link>
        </li>

        {/* <li className="px-4 cursor-pointer   font-semibold   transition-all py-3 text-white flex items-center hover:bg-[#F1521B] hover:text-white">
          <FaQuestionCircle          className=" mr-2" size={20}    />
          <Link to="/faqs" className="text-lg capitalize">
            Faqs
          </Link>
        </li> */}


      </ul>
    </div>
  );
};
export default Sidebar;
