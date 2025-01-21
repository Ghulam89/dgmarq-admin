import React, { useEffect, useState } from "react";
import Wrapper from "../Wrapper";
import { Base_url } from "../../utils/Base_url";
import axios from "axios";
import Swal from "sweetalert2";
import { toast } from "react-toastify";
import Button from "../../components/Button";
import { Link } from "react-router-dom";
import { FaPlus } from "react-icons/fa";
const FlashDeals = () => {

    const [products, setProducts] = useState([]);
    useEffect(() => {
        axios
            .get(`${Base_url}/flashDeals/getAll`)
            .then((res) => {
                console.log(res);

                setProducts(res?.data?.data);
            })
            .catch((error) => {
                console.log(error);
            });


    }, []);

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
                    .delete(`${Base_url}/flashDeals/delete/${id}`)
                    .then((res) => {
                        console.log(res);
                        if (res.status === 200) {
                            Swal.fire("Deleted!", "Your file has been deleted.", "success");
                            axios
                            .get(`${Base_url}/flashDeals/getAll`)
                            .then((res) => {
                                console.log(res);
                
                                setProducts(res?.data?.data);
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

    const [isModalOpen, setIsModalOpen] = useState(false);
    const UpdateStatus = (id, newStatus) => {
        // const params = {
        //     id: newStatus,
        // };
        axios
            .put(`${Base_url}/flashDeals/approve/${id}`,)
            .then((res) => {
                console.log(res);

                if (res.status === 200) {
                    toast.success(res.data.message);

                }
            })
            .catch((error) => {
                console.log(error);
            });
    };



    return (
        <Wrapper>
            <div className=" flex   justify-between items-center">
                <div>
                    <h2 className="main_title">Flash Deals</h2>
                </div>
                <Link to={'/add-flash-deals'} >
                    <Button

                        onClick={() => setIsModalOpen(true)}
                        className={"  bg-primary py-2.5"}
                        label={`Add Deals`}
                    />
                </Link>
            </div>

            <section className="mb-20 mt-7 text-gray-800">
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
                                                    Title
                                                </th>

                                                <th
                                                    scope="col"
                                                    className=" text-sm text-white  font-bold px-6 py-4"
                                                >
                                                    Image
                                                </th>


                                                <th
                                                    scope="col"
                                                    className="text-sm  text-white   font-bold px-6 py-4"
                                                >
                                                    Duration
                                                </th>
                                                <th
                                                    scope="col"
                                                    className="text-sm  text-white   font-bold px-6 py-4"
                                                >
                                                    Active Products
                                                </th>

                                                <th
                                                    scope="col"
                                                    className="text-sm  text-white   font-bold px-6 py-4"
                                                >
                                                    Publish
                                                </th>

                                                <th
                                                    scope="col"
                                                    className="text-sm  text-white   font-bold px-6 py-4"
                                                >
                                                    Status
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
                                            {products?.map((item, index) => {
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
                                                        <td className="align-middle text-sm font-normal px-6 py-4  text-center">
                                                            <span className=" text-base text-black  py-1 px-2.5 leading-none text-center align-baseline   bg-green-200  rounded-full">
                                                                {item?.title}
                                                            </span>
                                                        </td>
                                                        <td className="align-middle text-sm font-normal px-6 py-4 whitespace-nowrap  text-center">
                                                            <div className=" w-20  h-20">
                                                                <img src={item?.image} className=" w-full object-cover rounded-md h-full" alt="" />
                                                            </div>
                                                        </td>
                                                        <td className="text-sm font-normal text-center px-6 py-4 whitespace-nowrap">
                                                            <span className=" text-base text-black  py-1 px-2.5 leading-none text-center  align-baseline   bg-green-200  rounded-full">
                                                                {`${item?.startDate}  ${item?.endDate}` }
                                                            </span>
                                                        </td>
                                                        <td className="align-middle text-center text-sm font-normal px-6 py-4  text-left">
                                                            <span className=" text-base text-black  py-1 px-2.5 leading-none   bg-green-200  rounded-full">
                                                                {item?.productId?.length}
                                                            </span>
                                                        </td>


                                                        <td className="align-middle text-center text-sm font-normal px-6 py-4 text-left">
                                                            <span className=" text-sm text-white  py-1 px-3.5 leading-none  whitespace-nowrap     bg-green  rounded-full">
                                                                {item?.status}
                                                            </span>
                                                        </td>

                                                        <td className="align-middle text-center text-sm font-normal px-6 py-4 whitespace-nowrap text-left">
                                                            <select
                                                                value={item.status || "pending"}
                                                                onChange={(e) => {
                                                                    const newStatus = e.target.value;
                                                                    UpdateStatus(item._id, newStatus);
                                                                }}
                                                                className="px-3 py-2 bg-gray-200 rounded-lg shadow-md"
                                                            >
                                                                <option value={"pending"}>Pending</option>
                                                                <option value={"approved"}>Approved</option>
                                                            </select>
                                                        </td>

                                                        <td className="align-middle  text-sm font-normal px-6 py-4 whitespace-nowrap">
                                                            <div className=" flex justify-center items-center gap-3">
                                                                <div>
                                                                    <Link to={`/flash-deals-product/${item?._id}`} className=" flex gap-2 items-center border-primary border px-3 hover:bg-primary hover:text-white text-primary py-1.5 rounded-sm"> <FaPlus />  Add Product</Link>
                                                                </div>
                                                                <div
                                                                    className=" cursor-pointer"
                                                                // onClick={() => {
                                                                //   setIsModalOpen(true);
                                                                //   setSingleData(item);
                                                                // }}
                                                                >
                                                                    <img
                                                                        src={require("../../assets/image/edit.png")}
                                                                    />
                                                                </div>
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

export default FlashDeals;
