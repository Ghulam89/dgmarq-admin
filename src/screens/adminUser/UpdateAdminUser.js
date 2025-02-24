import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { Base_url } from "../../utils/Base_url";
import axios from "axios";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import Button from "../../components/Button";
import Modal from "../../components/modal";
import { MdClose } from "react-icons/md";

const UpdateAdminUser = ({
  isModalOpen,
  setIsModalOpen,
  closeModal,
  setUsers,
  singleUser,
}) => {
  const [loading, setLoader] = useState(false);
  const [categories, setCategories] = useState([]);
  const [subcategories, setsubCategories] = useState([]);

  useEffect(() => {
    axios
      .get(`${Base_url}/brands/getAll`)
      .then((res) => setCategories(res.data.data))
      .catch((error) => console.error(error));

    axios
      .get(`${Base_url}/category/getAll`)
      .then((res) => setsubCategories(res.data.data))
      .catch((error) => console.error(error));
  }, []);

  // Validation Schema
  const validationSchema = Yup.object().shape({
    // title: Yup.string().required("Title is required"),
    // brandId: Yup.string().required("Main Category selection is required"),
    // categoryId: Yup.string().required("Category selection is required"),
  });

  // Form Submit Handler
  console.log('====================================');
  console.log(singleUser);
  console.log('====================================');
  const onSubmit = async (values, { resetForm }) => {
    setLoader(true);

    const formData = new FormData();
    formData.append("title", values.title);
    formData.append("brandId", values.brandId);
    formData.append("categoryId", values.categoryId);

    try {
      const response = await axios.put(`${Base_url}/subCategory/update/${singleUser?._id}`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      if (response.status === 200) {
        const res = await axios.get(`${Base_url}/subCategory/getAll`);
        setUsers(res.data.data);
        setIsModalOpen(false);
        toast.success(response.data.message);
        resetForm();
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.message || "Something went wrong!");
    } finally {
      setLoader(false);
    }
  };

  const initialValues = {
    title: singleUser?.title || "",
    brandId: singleUser?.brandId?._id || "",
    categoryId: singleUser?.categoryId?._id || "",
  };

  return (
    <div>
      <Modal isOpen={isModalOpen} onClose={closeModal} className="rounded-md">
        <div>
          <div className="p-3 flex justify-between items-center">
            <h1 className="capitalize h4 font-semibold">Update Sub Category</h1>
            <MdClose
              className="cursor-pointer"
              onClick={() => setIsModalOpen(false)}
              size={25}
            />
          </div>
          <hr />
          <div className="p-5">
            <Formik
              initialValues={initialValues}
              validationSchema={validationSchema}
              onSubmit={onSubmit}
              enableReinitialize
            >
              {({ setFieldValue }) => (
                <Form>
                  <div className="flex gap-5 flex-wrap">
                    
                    <div className="w-[100%]">
                      <label className="block mb-2 text-sm font-medium text-gray-900">
                        Main Categories
                      </label>
                      <Field
                        as="select"
                        name="brandId"
                        className="outline-none bg-lightGray w-full border p-2.5 text-black placeholder:text-black rounded-md"
                      >
                        <option value="" label="Select main category" />
                        {categories.map((item) => (
                          <option key={item._id} value={item._id}>
                            {item.name}
                          </option>
                        ))}
                      </Field>
                      <ErrorMessage
                        name="brandId"
                        component="div"
                        className="text-red text-sm mt-1"
                      />
                    </div>

                    {/* Category Select */}
                    <div className="w-[100%]">
                      <label className="block mb-2 text-sm font-medium text-gray-900">
                        Categories
                      </label>
                      <Field
                        as="select"
                        name="categoryId"
                        className="outline-none bg-lightGray w-full border p-2.5 text-black placeholder:text-black rounded-md"
                      >
                        <option value="" label="Select category" />
                        {subcategories.map((item) => (
                          <option key={item._id} value={item._id}>
                            {item.title}
                          </option>
                        ))}
                      </Field>
                      <ErrorMessage
                        name="categoryId"
                        component="div"
                        className="text-red text-sm mt-1"
                      />
                    </div>

                    {/* Title Input */}
                    <div className="w-[100%]">
                      <label className="block mb-2 text-sm font-medium text-gray-900">
                        Title
                      </label>
                      <Field
                        name="title"
                        type="text"
                        placeholder="Enter title"
                        className="border w-full py-3 px-2 rounded-md"
                      />
                      <ErrorMessage
                        name="title"
                        component="div"
                        className="text-red text-sm mt-1"
                      />
                    </div>
                  </div>

                  {/* Submit Button */}
                  {loading ? (
                    <button
                      disabled
                      type="button"
                      className="w-full h-11 bg-primary border-none outline-none rounded-lg mt-4 shadow-sm cursor-pointer text-lg text-white font-semibold"
                    >
                      Loading...
                    </button>
                  ) : (
                    <Button
                      label={"Submit"}
                      type={"submit"}
                      className="bg-primary mt-3 uppercase text-white py-2 w-full"
                    />
                  )}
                </Form>
              )}
            </Formik>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default UpdateAdminUser;