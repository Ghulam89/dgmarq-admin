import React, { useEffect, useState } from "react";
import Wrapper from "../Wrapper";
import { Base_url } from "../../utils/Base_url";
import axios from "axios";
import Swal from "sweetalert2";
import Button from "../../components/Button";
import { toast } from "react-toastify";

const PaymentRequests = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios
      .get(`${Base_url}/withdraw/getAll`)
      .then((res) => {
        console.log(res?.data);
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
          .delete(`${Base_url}/withdraw/delete/${id}`)
          .then((res) => {
            console.log(res);
            if (res.status === 200) {
              Swal.fire("Deleted!", "Your file has been deleted.", "success");
              axios
                .get(`${Base_url}/withdraw/getBySellerId`)
                .then((res) => {
                  console.log(res?.data);
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

  const updateStatus = (id, newStatus) => {
    axios
      .put(`${Base_url}/withdraw/update/${id}`, { status: newStatus })
      .then((res) => {
        if (res.status === 200) {
          toast.success(res.data.message);
          setProducts((prevProducts) =>
            prevProducts.map((product) =>
              product._id === id ? { ...product, status: newStatus } : product
            )
          );
        }
      })
      .catch((error) => {
        console.log(error);
        toast.error("Failed to update status");
      });
  };

  return (
    <Wrapper>
      <div className="flex justify-between items-center">
        <div>
          <h2 className="main_title">Payment Request</h2>
        </div>
      </div>

      <section className="mb-20 mt-7 text-gray-800">
        <div className="block rounded-lg shadow-lg">
          <div className="flex overflow-x-auto flex-col">
            <div className="sm:-mx-6 lg:-mx-8">
              <div className="inline-block min-w-full sm:px-6 lg:px-8">
                <div className="">
                  <table className="min-w-full mb-0">
                    <thead className="bg-primary">
                      <tr className="rounded-lg whitespace-nowrap">
                        <th scope="col" className="text-sm text-white font-bold px-6 py-4">
                          No
                        </th>
                        <th scope="col" className="text-sm text-white font-bold px-6 py-4">
                          Seller Name
                        </th>
                        <th scope="col" className="text-sm text-white font-bold px-6 py-4">
                          Seller Email
                        </th>
                        <th scope="col" className="text-sm text-white font-bold px-6 py-4">
                          Registration Number
                        </th>
                        <th scope="col" className="text-sm text-white font-bold px-6 py-4">
                          Amount
                        </th>
                        <th scope="col" className="text-sm text-white font-bold px-6 py-4">
                          Commission
                        </th>
                        <th scope="col" className="text-sm text-white font-bold px-6 py-4">
                          Final Amount
                        </th>
                        <th scope="col" className="text-sm text-white font-bold px-6 py-4">
                          Status
                        </th>
                        <th scope="col" className="text-sm text-white font-bold px-6 py-4">
                          Update Status
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {products?.map((item, index) => {
                        const finalAmount = item.amount - (item.amount * (item.commission / 100));
                        return (
                          <tr className="bg-white border-t rounded-md" key={item._id}>
                            <th scope="row" className="text-sm font-normal px-6 py-4 whitespace-nowrap">
                              <p className="mb-0.5 font-medium text-black">#{index + 1}</p>
                            </th>
                            <td className="align-middle text-sm font-normal px-6 py-4 whitespace-nowrap text-center">
                              <span className="text-base text-black py-1 px-2.5 leading-none text-center whitespace-nowrap align-baseline bg-green-200 rounded-full">
                                {item?.sellerId?.companyName}
                              </span>
                            </td>
                            <td className="align-middle text-sm font-normal px-6 py-4 whitespace-nowrap text-center">
                              <span className="text-base text-black py-1 px-2.5 leading-none text-center whitespace-nowrap align-baseline bg-green-200 rounded-full">
                                {item?.sellerId?.email}
                              </span>
                            </td>
                            <td className="align-middle text-sm font-normal px-6 py-4 whitespace-nowrap text-center">
                              <span className="text-base text-black py-1 px-2.5 leading-none text-center whitespace-nowrap align-baseline bg-green-200 rounded-full">
                                {item?.sellerId?.registrationNumber}
                              </span>
                            </td>
                            <td className="align-middle text-sm font-normal px-6 py-4 whitespace-nowrap text-center">
                              <span className="text-base text-black py-1 px-2.5 leading-none text-center whitespace-nowrap align-baseline bg-green-200 rounded-full">
                                {item?.amount}
                              </span>
                            </td>
                            <td className="align-middle text-sm font-normal px-6 py-4 whitespace-nowrap text-center">
                              <span className="text-base text-white py-1 px-2.5 leading-none text-center whitespace-nowrap align-baseline bg-green rounded-full">
                                {item?.commission} %
                              </span>
                            </td>
                            <td className="align-middle text-sm font-normal px-6 py-4 whitespace-nowrap text-center">
                              <span className="text-base text-black py-1 px-2.5 leading-none text-center whitespace-nowrap align-baseline bg-green-200 rounded-full">
                                {finalAmount.toFixed(2)}
                              </span>
                            </td>
                            <td className="align-middle text-sm font-normal px-6 py-4 whitespace-nowrap text-center">
                              <span className="text-base text-white py-1 px-2.5 leading-none text-center whitespace-nowrap align-baseline bg-green rounded-full">
                                {item?.status}
                              </span>
                            </td>
                            <td className="align-middle text-center text-sm font-normal px-6 py-4 whitespace-nowrap text-left">
                              <select
                                value={item.status || "pending"}
                                onChange={(e) => {
                                  const newStatus = e.target.value;
                                  updateStatus(item._id, newStatus);
                                }}
                                className="px-3 py-2 bg-gray-200 rounded-lg shadow-md"
                              >
                                <option value="pending">Pending</option>
                                <option value="approved">Approved</option>
                              </select>
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

export default PaymentRequests;