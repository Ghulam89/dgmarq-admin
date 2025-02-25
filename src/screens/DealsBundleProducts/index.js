import React, { useEffect, useState } from "react";
import Wrapper from "../Wrapper";
import { Base_url } from "../../utils/Base_url";
import axios from "axios";
import Swal from "sweetalert2";
import { toast } from "react-toastify";
import { useParams } from "react-router-dom";
import { FaCheck, FaSpinner } from "react-icons/fa";
import { MdOutlineAddCircle } from "react-icons/md";

const DealsBundleProducts = () => {
    const { id } = useParams();
    const [products, setProducts] = useState([]);
    const [flashDeals, setFlashDeals] = useState({});
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedProducts, setSelectedProducts] = useState([]);
    const [isLoading, setIsLoading] = useState(false); // Loading state

    // Fetch products and flash deal data
    useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true);
            try {
                const [productsRes, flashDealsRes] = await Promise.all([
                    axios.get(`${Base_url}/products/getAll`),
                    axios.get(`${Base_url}/bundleDeals/getProduct/${id}`),
                ]);
                setProducts(productsRes?.data?.data);
                setFlashDeals(flashDealsRes?.data?.data);
            } catch (error) {
                console.error("Error fetching data:", error);
                toast.error("Failed to fetch data. Please try again.");
            } finally {
                setIsLoading(false);
            }
        };
        fetchData();
    }, [id]);

    // Handle search input change
    const handleSearchChange = (e) => {
        setSearchQuery(e.target.value);
    };

    // Handle product selection
    const handleProductSelection = (product) => {
        const isProductSelected = selectedProducts.some(
            (selectedProduct) => selectedProduct._id === product._id
        );

        if (isProductSelected) {
            setSelectedProducts(
                selectedProducts.filter((selectedProduct) => selectedProduct._id !== product._id)
            );
        } else {
            setSelectedProducts([...selectedProducts, product]);
        }

        setSearchQuery("");
    };

    // Filter products based on search query
    const filteredProducts = products?.filter((item) =>
        item.title.toLowerCase().includes(searchQuery.toLowerCase())
    );

    // Handle saving selected products to the flash deal
    const handleSubmit = async () => {
        if (selectedProducts.length === 0) {
            toast.warning("Please select at least one product.");
            return;
        }

        setIsLoading(true);
        const selectedProductIds = selectedProducts.map((product) => product._id);

        console.log(selectedProducts);
        

        try {
            console.log(selectedProductIds);
            
            const response = await axios.put(`${Base_url}/bundleDeals/addProduct/${id}`, {
                productId: selectedProductIds,
            });

            if (response?.data?.status === "success") {
                toast.success(response?.data?.message);

                // Refetch data after successful update
                const [productsRes, flashDealsRes] = await Promise.all([
                    axios.get(`${Base_url}/products/getAll`),
                    axios.get(`${Base_url}/bundleDeals/getProduct/${id}`),
                ]);

                setProducts(productsRes?.data?.data);
                setFlashDeals(flashDealsRes?.data?.data);
                setSelectedProducts([]); // Clear selected products
            } else {
                toast.error(response?.data?.message);
            }
        } catch (error) {
            console.error("Error saving selected products:", error);
            toast.error("Failed to save selected products. Please try again.");
        } finally {
            setIsLoading(false);
        }
    };

    // Handle removing a product from the flash deal
    const removeFunction = (productId) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#A47ABF",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!",
        }).then(async (result) => {
            if (result.isConfirmed) {
                setIsLoading(true);
                try {
                    const response = await axios.delete(`${Base_url}/products/delete/${productId}`);
                    if (response.status === 200) {
                        Swal.fire("Deleted!", "Your file has been deleted.", "success");

                        // Refetch data after successful deletion
                        const [productsRes, flashDealsRes] = await Promise.all([
                            axios.get(`${Base_url}/products/getAll`),
                            axios.get(`${Base_url}/bundleDeals/getProduct/${id}`),
                        ]);

                        setProducts(productsRes?.data?.data);
                        setFlashDeals(flashDealsRes?.data?.data);
                    }
                } catch (error) {
                    console.error("Error deleting product:", error);
                    toast.error("Failed to delete product. Please try again.");
                } finally {
                    setIsLoading(false);
                }
            }
        });
    };

    return (
        <Wrapper>
            <section className="mb-12 mt-7 shadow-xl bg-white p-3 text-gray-800">
                <h2 className="main_title pb-2 border-b">Product Table</h2>

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
                                        {selectedProducts.some(
                                            (selectedProduct) => selectedProduct._id === product._id
                                        ) && <FaCheck className="text-green" />}
                                    </div>
                                </li>
                            ))}
                        </ul>
                    )}

                    {selectedProducts.length > 0 && (
                        <div className="mt-4">
                            <h3>Selected Products:</h3>
                            <div className="flex flex-wrap mt-2">
                                {selectedProducts.map((product) => (
                                    <div
                                        key={product._id}
                                        className="flex relative items-center border w-96 rounded-lg mb-2 mr-2 p-2"
                                    >
                                        <div className="w-24 h-24 mr-4">
                                            <img
                                                src={product.images[0]}
                                                alt={product.title}
                                                className="w-20 h-20 object-cover"
                                            />
                                        </div>
                                        <div>
                                            <span className="font-medium">{product.title}</span>
                                            <button
                                                className="ml-2 absolute -top-2 -right-2 text-red-500"
                                                onClick={() => handleProductSelection(product)}
                                            >
                                                <MdOutlineAddCircle size={20} className="text-gray-500" />
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </div>

                <div className="flex mb-4 justify-end items-center">
                    <button
                        className="bg-primary text-white px-4 py-2 rounded-md flex items-center gap-2"
                        onClick={handleSubmit}
                        disabled={isLoading}
                    >
                        {isLoading ? <FaSpinner className="animate-spin" /> : null}
                        Save Selected
                    </button>
                </div>
            </section>

            <section className="mb-20 mt-7 shadow-xl bg-white p-3 text-gray-800">
                <h2 className="main_title pb-2">Product Table</h2>

                <div className="block rounded-lg shadow-lg">
                    <div className="flex overflow-x-auto flex-col">
                        <div className="sm:-mx-6 lg:-mx-8">
                            <div className="inline-block min-w-full sm:px-6 lg:px-8">
                                <div className="">
                                    <table className="min-w-full mb-0">
                                        <thead className="bg-primary">
                                            <tr className="rounded-lg whitespace-nowrap">
                                                <th scope="col" className="text-sm text-white font-bold px-6 py-4">No</th>
                                                <th scope="col" className="text-sm text-white font-bold px-6 py-4">Title</th>
                                                <th scope="col" className="text-sm text-white font-bold px-6 py-4">Image</th>
                                                <th scope="col" className="text-sm text-white font-bold px-6 py-4">Price</th>
                                                <th scope="col" className="text-sm text-white font-bold px-6 py-4">Status</th>
                                                <th scope="col" className="text-sm text-white font-bold px-6 py-4">Action</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {flashDeals?.productId?.map((productId, index) => {
                                               

                                                return (
                                                    <tr key={productId._id} className="bg-white border-t rounded-md">
                                                        <th scope="row" className="text-sm font-normal px-6 py-4">
                                                            <p className="mb-0.5 font-medium text-black">#{index + 1}</p>
                                                        </th>
                                                        <td className="align-middle text-sm font-normal px-6 py-4 text-center">
                                                            <span className="text-base text-black py-1 px-2.5 leading-none text-center align-baseline bg-green-200 rounded-full">
                                                                {productId.title}
                                                            </span>
                                                        </td>
                                                        <td className="align-middle text-sm font-normal px-6 py-4 whitespace-nowrap text-center">
                                                            <div className="w-20 h-20">
                                                                <img src={productId.images[0]} className="w-full object-cover rounded-md h-full" alt="" />
                                                            </div>
                                                        </td>
                                                        <td className="text-sm font-normal text-center px-6 py-4 whitespace-nowrap">
                                                            <span className="text-base text-black py-1 px-2.5 leading-none text-center align-baseline bg-green-200 rounded-full">
                                                                {productId.actualPrice}
                                                            </span>
                                                        </td>
                                                        <td className="align-middle text-center text-sm font-normal px-6 py-4 text-left">
                                                            <span className="text-sm text-white py-1 px-3.5 leading-none whitespace-nowrap bg-green rounded-full">
                                                                {productId.status}
                                                            </span>
                                                        </td>
                                                        <td className="align-middle text-sm font-normal px-6 py-4 whitespace-nowrap">
                                                            <div className="flex justify-center items-center gap-3">
                                                                <div className="cursor-pointer" onClick={() => removeFunction(productId._id)}>
                                                                    <img src={require("../../assets/image/del.png")} alt="" />
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

export default DealsBundleProducts;