import React, { useEffect, useState } from "react";
import Wrapper from "../Wrapper";
import { Base_url } from "../../utils/Base_url";
import axios from "axios";
import Swal from "sweetalert2";
import { toast } from "react-toastify";
import Button from "../../components/Button";
import { Link, useNavigate, useParams } from "react-router-dom";
import { FaCheck, FaPlus } from "react-icons/fa";
import { MdOutlineAddCircle } from "react-icons/md";
const DealsProducts = () => {
    const [products, setProducts] = useState([]);
    const [flashDeals, setFlashDeals] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [bannerImage, setBannerImage] = useState(null);
    const [logoImage, setLogoImage] = useState(null);

    const navigate = useNavigate();

    useEffect(() => {
        axios
            .get(`${Base_url}/products/getAll?page=1`)
            .then((res) => {
                console.log(res);

                setProducts(res?.data?.data?.data);
            })
            .catch((error) => {
                console.log(error);
            });



        axios
            .get(`${Base_url}/upcoming/getAll`)
            .then((res) => {
                console.log(res);

                setFlashDeals(res?.data?.data);
            })
            .catch((error) => {
                console.log(error);
            });





    }, []);



    const handleSearchChange = (e) => {
        setSearchQuery(e.target.value);
    };

    const handleProductSelection = (product) => {
        setSelectedProduct(product);
        setSearchQuery('');
    };

    const handleBannerImageChange = (e) => {
        setBannerImage(e.target.files[0]);
    };

    const handleLogoImageChange = (e) => {
        setLogoImage(e.target.files[0]);
    };

    const handleSubmit = () => {
        if (!selectedProduct) {
            toast.error('Please select a product.');
            return;
        }

        const formData = new FormData();
        formData.append('productId', selectedProduct._id);
        if (bannerImage) formData.append('banner', bannerImage);
        if (logoImage) formData.append('logo', logoImage);

        axios
            .post(`${Base_url}/upcoming/create`, formData)
            .then((res) => {
                if (res?.data?.status === 'success') {
                    toast.success(res?.data?.message);


                    axios
                    .get(`${Base_url}/upcoming/getAll`)
                    .then((res) => {
                        console.log(res);
        
                        setFlashDeals(res?.data?.data);
                    })
                    .catch((error) => {
                        console.log(error);
                    });
         
                } else {
                    toast.error(res?.data?.message);
                }
            })
            .catch((error) => {
                console.error(error);
            });
    };

    const filteredProducts = products.filter((item) =>
        item.title.toLowerCase().includes(searchQuery.toLowerCase())
    );


    const removeFunction = (id) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#A47ABF",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!",
        }).then((result) => {
            if (result.isConfirmed) {
                axios
                    .delete(`${Base_url}/upcoming/delete/${id}`)
                    .then((res) => {
                        console.log(res);
                        if (res.status === 200) {
                            Swal.fire("Deleted!", "Your file has been deleted.", "success");
                            axios
                            .get(`${Base_url}/upcoming/getAll`)
                            .then((res) => {
                                console.log(res);
                
                                setFlashDeals(res?.data?.data);
                            })
                            .catch((error) => {
                                console.log(error);
                            });

                        }
                    })
                    .catch((error) => {
                        console.log(error);
                    });
            }
        });
    };




    return (
        <Wrapper>


            <section className="mb-12 mt-7 shadow-xl bg-white p-3 text-gray-800">
                <h2 className="main_title pb-2 border-b">Add Upcoming Releases</h2>

                <div className="my-6">
                    <label className="block mb-2 font-medium">Banner Image:</label>
                    <input type="file" onChange={handleBannerImageChange} className="outline-none bg-lightGray w-full border p-2.5 text-black placeholder:text-black rounded-md" />

                    <div className=" pt-2">

                        <label className="block mb-2 font-medium">Logo Image:</label>
                        <input type="file" onChange={handleLogoImageChange} className="outline-none bg-lightGray w-full border p-2.5 text-black placeholder:text-black rounded-md"
                        />

                    </div>
                </div>

                <div className="my-12 px-3">
                    <input
                        type="text"
                        className="outline-none bg-lightGray w-full border p-2.5 text-black placeholder:text-black rounded-md"
                        placeholder="Search by product name..."
                        value={searchQuery}
                        onChange={handleSearchChange}
                    />

                    {searchQuery && filteredProducts.length > 0 && (
                        <ul className="absolute mt-2 h-96 overflow-y-scroll w-[81%] bg-white border border-gray-300 rounded-md shadow-lg z-10">
                            {filteredProducts.map((product) => (
                                <li
                                    key={product._id}
                                    className="p-2 hover:bg-gray-200 flex gap-2 items-center cursor-pointer"
                                    onClick={() => handleProductSelection(product)}
                                >
                                    <div className="w-24 h-24 mr-4">
                                        <img
                                            src={product.images[0]}
                                            alt={product.title}
                                            className="w-20 h-20 object-cover"
                                        />
                                    </div>
                                    <div className="flex gap-2 items-center">
                                        {product.title}
                                        {selectedProduct?._id === product._id && <FaCheck className="text-green" />}
                                    </div>
                                </li>
                            ))}
                        </ul>
                    )}

                    {selectedProduct && (
                        <div className="mt-4">
                            <h3>Selected Product:</h3>
                            <div className="flex relative items-center border w-96 rounded-lg mb-2 p-2">
                                <div className="w-24 h-24 mr-4">
                                    <img
                                        src={selectedProduct.images[0]}
                                        alt={selectedProduct.title}
                                        className="w-20 h-20 object-cover"
                                    />
                                </div>
                                <div>
                                    <span className="font-medium">{selectedProduct.title}</span>
                                    <button
                                        className="ml-2 absolute -top-2 -right-2 text-red-500"
                                        onClick={() => setSelectedProduct(null)}
                                    >
                                        <MdOutlineAddCircle size={20} className="text-gray-500" />
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}
                </div>

                <div className="flex mb-4 justify-end items-center">
                    <button
                        className="bg-primary text-white px-4 py-2 rounded-md"
                        onClick={handleSubmit}
                    >
                        Save Selected
                    </button>
                </div>
            </section>



            <section className="mb-20 mt-7 shadow-xl bg-white p-3 text-gray-800">
                <h2 className="main_title pb-5">New and Upcoming Releases</h2>

                <div className="block rounded-lg shadow-lg">
                    <div className="flex overflow-x-auto flex-col">
                        <div className=" sm:-mx-6 lg:-mx-8">
                            <div className="inline-block min-w-full sm:px-6 lg:px-8">
                                <div className="">
                                    <table className="min-w-full mb-0">
                                        <thead className=" bg-primary">
                                            <tr className=" rounded-lg whitespace-nowrap ">
                                                <th
                                                    scope="col"
                                                    className=" text-sm text-white  font-bold px-6 py-4"
                                                >
                                                    No
                                                </th>
                                              

                                                <th
                                                    scope="col"
                                                    className=" text-sm text-white  font-bold px-6 py-4"
                                                >
                                                    Banner
                                                </th>


                                                <th
                                                    scope="col"
                                                    className=" text-sm text-white  font-bold px-6 py-4"
                                                >
                                                    Logo
                                                </th>
                                                <th
                                                    scope="col"
                                                    className=" text-sm text-white  font-bold px-6 py-4"
                                                >
                                                    Product Name
                                                </th>



                                                <th
                                                    scope="col"
                                                    className="text-sm  text-white   font-bold px-6 py-4"
                                                >
                                                    Action
                                                </th>
                                            </tr>
                                        </thead>
                                        <tbody className="">
                                            {flashDeals?.map((item, index) => {
                                                return (
                                                    <tr className="bg-white border-t   rounded-md ">
                                                        <th
                                                            scope="row"
                                                            className="text-sm font-normal px-6 py-4  "
                                                        >
                                                            <p className="mb-0.5 font-medium text-black">
                                                                #{index + 1}
                                                            </p>
                                                        </th>
                                                     
                                                        <td className="align-middle text-sm font-normal px-6 py-4 whitespace-nowrap  text-center">
                                                            <div className=" w-20  h-20 mx-auto">
                                                                <img src={item?.banner} className=" w-full object-cover mx-auto rounded-md h-full" alt="" />
                                                            </div>
                                                        </td>
                                                        <td className="align-middle text-sm font-normal px-6 py-4 whitespace-nowrap  text-center">
                                                            <div className=" w-20  h-20 mx-auto">
                                                                <img src={item?.logo} className=" w-full object-cover mx-auto rounded-md h-full" alt="" />
                                                            </div>
                                                        </td>

                                                        <td className="align-middle text-sm font-normal px-6 py-4  text-center">
                                                            <span className=" text-base text-black  py-1 px-2.5 leading-none text-center align-baseline   bg-green-200  rounded-full">
                                                                {item?.productId?.title}
                                                            </span>
                                                        </td>



                                                        <td className="align-middle  text-sm font-normal px-6 py-4 whitespace-nowrap">
                                                            <div className=" flex justify-center items-center gap-3">

                                                                <div
                                                                    className=" cursor-pointer"
                                                                    onClick={() => removeFunction(item?._id)}
                                                                >
                                                                    <img
                                                                        src={require("../../assets/image/del.png")}
                                                                        alt=""
                                                                    />
                                                                </div>
                                                            </div>
                                                        </td>
                                                    </tr>
                                                );
                                            })}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>


        </Wrapper>
    );
};

export default DealsProducts;
