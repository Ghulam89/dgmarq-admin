import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { Base_url } from "../../utils/Base_url";
import axios from "axios";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import Button from "../../components/Button";
import { MdClose } from "react-icons/md";
import Wrapper from "../Wrapper";
import { useNavigate } from "react-router-dom";

const AddFlashDeals = () => {
    const navigate = useNavigate();
    const [loading, setLoader] = useState(false);
    const [previewImage, setPreviewImage] = useState(null);
    const [selectedFile, setSelectedFile] = useState(null);
 // Validation Schema
 const validationSchema = Yup.object().shape({
    title: Yup.string().required("Title is required"),
    actualPrice: Yup.string().required("Actual price is required"),
    discountPrice: Yup.string().required("Discount price is required"),
    // image: Yup.mixed().required("Image is required"),
    startDate: Yup.date().required("Flash deal start date is required"),
    endDate: Yup.date()
        .required("Flash deal end date is required")
        .min(Yup.ref('startDate'), "End date must be after the start date"),
});

    const handleFileChange = (event) => {
        const file = event.target.files[0]; // Get the first file
        if (file) {
            setSelectedFile(file);
            const preview = URL.createObjectURL(file); // Create a preview URL
            setPreviewImage(preview); // Set the preview image state
        }
    };
    // Remove Image Handler
    const handleRemoveImage = () => {
        setPreviewImage(null);
        setSelectedFile(null);
    };

   

    // Form Submit Handler
    const onSubmit = async (values, { resetForm }) => {
        setLoader(true);
        const formData = new FormData();
        if (selectedFile) {
            formData.append("image", selectedFile); 
        }

        // Append other form data
        Object.keys(values).forEach((key) => {
            if (key !== "image") {
                formData.append(key, values[key]);
            }
        });

        try {
            const response = await axios.post(`${Base_url}/flashDeals/create`, formData);
            if (response.status === 200) {
                toast.success(response.data.message);
                resetForm();
                setPreviewImage(null);
                setSelectedFile(null);
                navigate('/flash-deals')
            } else {
                toast.error(response.data.message);
            }
        } catch (error) {
            toast.error(error.response?.data?.message || "Something went wrong!");
        } finally {
            setLoader(false);
        }
    };

    return (
        <Wrapper>
            <div className="p-3 flex justify-between items-center">
                <h1 className="capitalize main_title font-semibold">Add Flash Deals</h1>
            </div>
            <div className="p-5 shadow-lg bg-white mt-4 rounded-md">
                <Formik
                    initialValues={{
                        title: "",
                        actualPrice: "",
                        discountPrice: "",
                        gst: "",
                        image: null,
                        startDate: "",
                        endDate: "",
                    }}
                    validationSchema={validationSchema}
                    onSubmit={onSubmit}
                >
                    {({ handleSubmit, setFieldValue }) => (
                        <Form onSubmit={handleSubmit}>
                            <div className="flex gap-5 justify-between flex-wrap">

                                {/* Title Input */}
                                <div className="w-[100%]">
                                    <label className="block mb-2 text-sm font-medium text-gray-900">
                                        Title <span className=" text-red">*</span>
                                    </label>
                                    <Field
                                        name="title"
                                        type="text"
                                        placeholder="Enter name"
                                        className="border w-full bg-lightGray py-3 px-2 rounded-md"
                                    />
                                    <ErrorMessage
                                        name="title"
                                        component="div"
                                        className="text-red text-sm mt-1"
                                    />
                                </div>

                                {/* Flash Deal Start Date */}
                                <div className="w-[49%]">
                                    <label className="block mb-2 text-sm font-medium text-gray-900">
                                        Flash Deal Start Date <span className=" text-red">*</span>
                                    </label>
                                    <Field
                                        name="startDate"
                                        type="date"
                                        className="border w-full bg-lightGray py-3 px-2 rounded-md"
                                    />
                                    <ErrorMessage
                                        name="startDate"
                                        component="div"
                                        className="text-red text-sm mt-1"
                                    />
                                </div>

                                {/* Flash Deal End Date */}
                                <div className="w-[49%]">
                                    <label className="block mb-2 text-sm font-medium text-gray-900">
                                        Flash Deal End Date <span className=" text-red">*</span>
                                    </label>
                                    <Field
                                        name="endDate"
                                        type="date"
                                        className="border w-full bg-lightGray py-3 px-2 rounded-md"
                                    />
                                    <ErrorMessage
                                        name="endDate"
                                        component="div"
                                        className="text-red text-sm mt-1"
                                    />
                                </div>

                                {/* Actual Price */}
                                <div className="w-[49%]">
                                    <label className="block mb-2 text-sm font-medium text-gray-900">
                                        Actual Price <span className=" text-red">*</span>
                                    </label>
                                    <Field
                                        name="actualPrice"
                                        type="text"
                                        placeholder="Enter Actual Price"
                                        className="border w-full bg-lightGray py-3 px-2 rounded-md"
                                    />
                                    <ErrorMessage
                                        name="actualPrice"
                                        component="div"
                                        className="text-red text-sm mt-1"
                                    />
                                </div>

                                {/* Discount Price */}
                                <div className="w-[49%]">
                                    <label className="block mb-2 text-sm font-medium text-gray-900">
                                        Discount Price <span className=" text-red">*</span>
                                    </label>
                                    <Field
                                        name="discountPrice"
                                        type="text"
                                        placeholder="Enter Discount Price"
                                        className="border w-full bg-lightGray py-3 px-2 rounded-md"
                                    />
                                    <ErrorMessage
                                        name="discountPrice"
                                        component="div"
                                        className="text-red text-sm mt-1"
                                    />
                                </div>
                                {/* Discount Price */}
                                <div className="w-[49%]">
                                    <label className="block mb-2 text-sm font-medium text-gray-900">
                                        Gst <span className=" text-red">*</span>
                                    </label>
                                    <Field
                                        name="gst"
                                        type="number"
                                        placeholder="Enter Discount Price"
                                        className="border w-full bg-lightGray py-3 px-2 rounded-md"
                                    />
                                    <ErrorMessage
                                        name="gst"
                                        component="div"
                                        className="text-red text-sm mt-1"
                                    />
                                </div>



                                {/* Single Image Upload */}
                                <div className="w-[100%] mt-3">
                                    <label className="block mb-2 text-sm font-medium text-gray-900">
                                        Product Image <span className=" text-red">*</span>
                                    </label>
                                    <input
                                        type="file"
                                        className="block w-full bg-lightGray text-black py-3 px-2 rounded-md"
                                        onChange={(e) => handleFileChange(e, setFieldValue)}
                                    />
                                    {previewImage && (
                                        <div className="relative mt-2">
                                            <img src={previewImage} alt="preview" className="w-[100px] h-[100px] object-cover" />
                                            <MdClose
                                                onClick={handleRemoveImage}
                                                className="absolute top-0 right-0 text-white cursor-pointer"
                                            />
                                        </div>
                                    )}
                                    <ErrorMessage name="image" component="div" className="text-red text-sm mt-1" />
                                </div>
                            </div>

                            {/* Submit Button */}
                            <Button label={'Submit'} className={' mt-3'} type="submit" disabled={loading} loading={loading}>
                                Add Product
                            </Button>
                        </Form>
                    )}
                </Formik>
            </div>
        </Wrapper>
    );
};

export default AddFlashDeals;
