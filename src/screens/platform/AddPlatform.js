import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { Base_url } from "../../utils/Base_url";
import axios from "axios";
import Input from "../../components/Input";
import Button from "../../components/Button";
import Modal from "../../components/modal";
import { MdClose } from "react-icons/md";

const AddPlatform = ({
    isModalOpen,
    setIsModalOpen,
    closeModal,
    setUsers,
    platform,
}) => {
    const [loading, setLoader] = useState(false);
    const [formData, setFormData] = useState({
        title: "",
    });

    console.log('====================================');
    console.log(platform);
    console.log('====================================');

    useEffect(() => {
        if (platform) {
            setFormData({
                title: platform?.title,
            });
        } else {
            setFormData({
                title: "",
            });
        }
    }, [platform]);



    const handleSubmit = async (e) => {
        e.preventDefault();

        const data = {
            "title": formData.title
        }

        if (!data.title) {
            toast.error("Must enter a platform name!");
            return;
        }


        try {
            setLoader(true);
            let response;

            if (platform) {
                // Edit mode
                response = await axios.put(
                    `${Base_url}/platform/update/${platform._id}`,
                    data,
                );
            } else {
                // Add mode
                response = await axios.post(`${Base_url}/platform/create`, data);
            }

            if (response?.status === 200) {
                const res = await axios.get(`${Base_url}/platform/getAll`);
                setUsers(res.data.data);
                setIsModalOpen(false);
                toast.success(response.data.message);
            } else {
                toast.error(response.data.message);
            }
        } catch (error) {
            toast.error(error.response?.data?.message || "An error occurred");
        } finally {
            setLoader(false);
        }
    };

    return (
        <div>
            <Modal isOpen={isModalOpen} onClose={closeModal}>
                <div>
                    <div className="p-3 flex justify-between items-center">
                        <div></div>
                        <h1 className="capitalize h4 font-semibold">
                            {platform ? "Edit Platform" : "Add Platform"}
                        </h1>
                        <MdClose onClick={() => setIsModalOpen(false)} size={25} />
                    </div>
                    <hr />
                    <div className="p-5">
                        <form onSubmit={handleSubmit}>
                            <div className="flex gap-5 flex-wrap">
                                <div className="w-[100%]">
                                    <Input
                                        label={"Name"}
                                        name={"title"}
                                        value={formData.title}
                                        onChange={(e) =>
                                            setFormData({ ...formData, title: e.target.value })
                                        }
                                        className={"border w-full py-3"}
                                        defaultValue={platform?.title}
                                    />
                                </div>

                            </div>

                            {loading ? (
                                <button
                                    disabled
                                    type="button"
                                    className="bg-primary w-full text-center mt-3 py-2.5 rounded-lg text-white uppercase font-semibold"
                                >
                                    <svg
                                        aria-hidden="true"
                                        role="status"
                                        className="inline w-4 h-4 mr-3 text-white animate-spin"
                                        viewBox="0 0 100 101"
                                        fill="none"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path
                                            d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                                            fill="#E5E7EB"
                                        />
                                        <path
                                            d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5733 10.4718 44.049 10.1079C47.8864 9.50375 51.7922 9.47893 55.6171 10.0401C60.8261 10.7915 65.8352 12.6341 70.2666 15.4652C74.698 18.2962 78.4293 22.0659 81.1718 26.555C83.3874 29.9732 85.0597 33.7302 86.1142 37.6864C86.8046 40.0431 89.3423 41.6781 91.7676 41.0409Z"
                                            fill="currentColor"
                                        />
                                    </svg>
                                    Loading...
                                </button>
                            ) : (
                                <Button
                                    label={platform ? "Update" : "Submit"}
                                    type={"submit"}
                                    className={"bg-primary mt-3 uppercase text-white py-2 w-full"}
                                />
                            )}
                        </form>
                    </div>
                </div>
            </Modal>
        </div>
    );
};

export default AddPlatform;