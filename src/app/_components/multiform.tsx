"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { api } from "~/trpc/react";
import { toast, ToastContainer } from "react-toastify";
import { Loader } from "lucide-react";

const MultiStepForm = () => {
    const router = useRouter();
    const [step, setStep] = useState(1);
    const [role, setRole] = useState<"MENTOR" | "ASPIRANT" | "">("");
    const [formData, setFormData] = useState({
        mainWork: "",
        description: "",
        preparation: "",
        hashtags: "",
    });
    const [isLoading, setIsLoading] = useState(false); // New state for loading indicator

    const aspirantMutation = api.profileData.aspirantForm.useMutation({
        onSuccess: () => {
            toast.success("submitted successfully!");
            router.push("/home/aspirant");
            setFormData({ ...formData, preparation: "" });
            setRole("");
        },
    });

    const mentorMutation = api.profileData.mentorForm.useMutation({
        onSuccess: () => {
            toast.success("submitted successfully!");
            router.push("/home/mentor");
            setFormData({ ...formData, mainWork: "", description: "" });
            setRole("");
        },
    });

    const handleNext = () => setStep((prevStep) => prevStep + 1);
    const handleBack = () => setStep((prevStep) => prevStep - 1);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (role === "MENTOR") {
            if (formData.mainWork.trim() === "") {
                toast.error("Main work is required.");
                return;
            }
            if (formData.description.trim().length < 150) {
                toast.error("Description must be at least 150 characters long.");
                return;
            }
        } else if (role === "ASPIRANT") {
            if (formData.preparation.trim() === "") {
                toast.error("Preparation field is required.");
                return;
            }
        }

        try {
            if (role === "ASPIRANT") {
                await aspirantMutation.mutateAsync({
                    role: "ASPIRANT",
                    preparation: formData.preparation,
                });
            } else if (role === "MENTOR") {
                await mentorMutation.mutateAsync({
                    mainWork: formData.mainWork,
                    description: formData.description,
                    hashtags: formData.hashtags
                        ? formData.hashtags.split(",").map(tag => tag.trim()).filter(tag => tag !== "")
                        : [],
                });
            }
        } catch (error) {
            console.error("Error submitting form:", error);
            alert("Something went wrong. Please try again.");
        }
    };

    const handleSkip = () => {
        setIsLoading(true); // Set loading to true when skip is clicked
        setTimeout(() => {
            router.push(role === "ASPIRANT" ? "/home/aspirant" : "/home/mentor");
        }, 1500); // Simulate a delay for loading
    };

    return (
        <div className="flex justify-center items-center min-h-screen">
            <ToastContainer />
            <div className="w-full max-w-md p-6 rounded-lg shadow-lg">
                {step === 1 && (
                    <div>
                        <h2 className="text-xl font-bold mb-4">Choose your role</h2>
                        <div className="flex justify-around">
                            <button
                                className="hover:shadow duration-500 rounded-full bg-purple-100 hover:bg-purple-200 text-slate-800 px-4 py-2 font-semibold"
                                onClick={() => {
                                    setRole("MENTOR");
                                    handleNext();
                                }}
                            >
                                Mentor
                            </button>
                            <button
                                className="hover:shadow duration-500 rounded-full bg-purple-100 hover:bg-purple-200 text-slate-800 px-4 py-2 font-semibold"
                                onClick={() => {
                                    setRole("ASPIRANT");
                                    handleNext();
                                }}
                            >
                                Aspirant
                            </button>
                        </div>
                    </div>
                )}
                {step === 2 && role === "ASPIRANT" && (
                    <div>
                        <h2 className="text-xl font-bold mb-4">Preparation Details</h2>
                        <form onSubmit={handleSubmit}>
                            <label className="block mb-4">
                                <span className="text-gray-200">What are you preparing for?</span>
                                <input
                                    type="text"
                                    name="preparation"
                                    value={formData.preparation}
                                    onChange={handleChange}
                                    placeholder="e.g., UPSC or JEE or ReactJs etc..."
                                    className="w-full px-3 py-2 text-black border rounded mt-1"
                                />
                            </label>
                            <div className="flex justify-between">
                                <button
                                    type="button"
                                    className="px-4 py-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400"
                                    onClick={handleBack}
                                >
                                    Back
                                </button>
                                <button
                                    type="submit"
                                    className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
                                    disabled={aspirantMutation.isPending}
                                >
                                    {aspirantMutation.isPending ? <Loader/> : "Submit"}
                                </button>
                                <button
                                    type="button"
                                    className={`px-4 py-2 bg-yellow-500 text-white rounded hover:bg-yellow-600 ${isLoading ? 'cursor-wait opacity-50' : ''}`}
                                    onClick={handleSkip}
                                    disabled={isLoading} // Disable the button while loading
                                >
                                    {isLoading ? <Loader/> : 'Skip'}
                                </button>
                            </div>
                        </form>
                    </div>
                )}

                {step === 2 && role === "MENTOR" && (
                    <div>
                        <h2 className="text-xl font-bold mb-4">Mentor Details</h2>
                        <form onSubmit={handleSubmit}>
                            <label className="block mb-2">
                                <span className="text-gray-200">Your main domain</span>
                                <input
                                    type="text"
                                    name="mainWork"
                                    value={formData.mainWork}
                                    onChange={handleChange}
                                    placeholder="e.g., IAS or SOFTWARE OR GATE, etc"
                                    className="w-full px-3 py-2 text-black border rounded mt-1"
                                />
                            </label>
                            <label className="block mb-2">
                                <span className="text-gray-200">More about you</span>
                                <textarea
                                    name="description"
                                    value={formData.description}
                                    onChange={handleChange}
                                    placeholder="Minimum 150 characters required"
                                    className="w-full px-3 py-2 text-black border rounded mt-1 resize-none"
                                    rows={4}
                                />
                                <p className="text-sm text-gray-400 text-right mt-1">{formData.description.length} / 150 characters</p>
                            </label>
                            <label className="block mb-4">
                                <span className="text-gray-200">Related hashtags(seperate by comma ,)</span>
                                <input
                                    type="text"
                                    name="hashtags"
                                    value={formData.hashtags}
                                    onChange={handleChange}
                                    placeholder="e.g., GATE, UPSC, SOFTWARE, MOTIVATIONAL etc"
                                    className="w-full px-3 py-2 text-black border rounded mt-1"
                                />
                            </label>
                            <div className="flex justify-between">
                                <button
                                    type="button"
                                    className="px-4 py-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400"
                                    onClick={handleBack}
                                >
                                    Back
                                </button>
                                <button
                                    type="submit"
                                    className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                                    disabled={mentorMutation.isPending}
                                >
                                    {mentorMutation.isPending ? <Loader/> : "Submit"}
                                </button>
                            </div>
                        </form>
                    </div>
                )}
            </div>
        </div>
    );
};

export default MultiStepForm;
