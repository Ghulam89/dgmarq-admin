import React, { useEffect, useState } from "react";
import Wrapper from "../Wrapper";
import { Base_url } from "../../utils/Base_url";
import axios from "axios";
import Swal from "sweetalert2";
import { IoMdEye } from "react-icons/io";

import { toast } from "react-toastify";
import { Link } from "react-router-dom";
const Orders = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios
      .get(`${Base_url}/checkout/getAll`)
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
          .delete(`${Base_url}/checkout/delete/${id}`)
          .then((res) => {
            console.log(res);
            if (res.status === 200) {
              Swal.fire("Deleted!", "Your file has been deleted.", "success");
              axios
              .get(`${Base_url}/checkout/getAll`)
              .then((res) => {
                console.log(res);
        
                setProducts(res?.data?.data?.data);
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
    const params = {
      status: newStatus,
    };
    axios
      .put(`${Base_url}/products/update/${id}`, params)
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
          <h2 className="main_title">Orders</h2>
        </div>
        
      </div>

      {/* <UpdateProducts
        setIsModalOpen={setIsModalOpen}
        setUsers={setUsers}
        getData={singleData}
        isModalOpen={isModalOpen}
      /> */}


      
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
                        Order ID
                      </th>
                      <th
                        scope="col"
                        className=" text-sm text-white  font-bold px-6 py-4"
                      >
                        Customer Email
                      </th>

                    

                      <th
                        scope="col"
                        className="text-sm  text-white   font-bold px-6 py-4"
                      >
                        Price
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
                            className="text-sm font-normal px-6 py-4   whitespace-nowrap "
                          >
                            <p className="mb-0.5 font-medium text-black">
                              #{item?._id}
                            </p>
                          </th>
                          <td className="align-middle text-sm font-normal px-6 py-4 whitespace-nowrap  text-center">
                            <span className=" text-base text-black  py-1 px-2.5 leading-none text-center whitespace-nowrap align-baseline   bg-green-200  rounded-full">
                              {item?.email}
                            </span>
                          </td>
                         
                          <td className="align-middle text-sm font-normal px-6 py-4 whitespace-nowrap  text-center">
                            <span className=" text-base text-black  py-1 px-2.5 leading-none text-center whitespace-nowrap align-baseline   bg-green-200  rounded-full">
                              {item?.totalPrice}
                            </span>
                          </td>
                         
                      
                          <td className="align-middle text-center text-sm font-normal px-6 py-4 whitespace-nowrap text-left">
                            <span className=" text-sm text-white  py-1 px-3.5 leading-none  whitespace-nowrap     bg-green  rounded-full">
                              {item?.status}
                            </span>
                          </td>

                          

                          <td className="align-middle  text-sm font-normal px-6 py-4 whitespace-nowrap">
                            <div className=" flex justify-center gap-2">
                             <Link to={`/orders/${item?._id}`} className=" cursor-pointer">
                             <IoMdEye size={35} className=" text-orange" />

                             </Link>
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

export default Orders;
