"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { api } from "~/trpc/react";
import { toast, ToastContainer } from "react-toastify";
import { Loader } from "lucide-react";

const MultiStepForm = () => {
    const router = useRouter();
    const [step, setStep] = useState(1);
    const [role, setRole] = useState<"MENTOR" | "ASPIRANT" | "ALUMNI" | "">("");
    const [formData, setFormData] = useState({
        mainWork: "",
        description: "",
        preparation: "",
        hashtags: "",
        whatsappNumber: "",
        collegeName: "",
        degree: "",
        sessionCost: 0,
        
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
    const alumniMutation = api.profileData.alumniForm.useMutation({
        onSuccess: () => {
            toast.success("submitted successfully!");
            router.push("/home/alumni");
            setFormData({
                ...formData,
                collegeName: "",
                degree: "",
                description: "",
                sessionCost: 0,
                whatsappNumber: "",
                
            });
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
        else if (role === "ALUMNI") {
            if (!formData.collegeName.trim()) {
                toast.error("College name is required");
                return;
            }
            if (!formData.degree.trim()) {
                toast.error("Degree is required");
                return;
            }
            // if (!formData.description || formData.description.trim().length < 50) {
            //     toast.error("Description must be at least 50 characters long");
            //     return;
            // }
            if (!formData.sessionCost || formData.sessionCost <= 0) {
                toast.error("Please enter a valid session cost");
                return;
            }
            if (!formData.whatsappNumber || !/^\d{10}$/.test(formData.whatsappNumber)) {
                toast.error("Please enter a valid 10-digit WhatsApp number");
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
            } else if (role === "ALUMNI") {
                console.log(formData)
                await alumniMutation.mutateAsync({
                    whatsappNumber: Number(formData.whatsappNumber),
                    description: formData.description,
                    collegeName: formData.collegeName,
                    degree: formData.degree,
                    sessionCost: Number(formData.sessionCost),
                   
                });
            }
        } catch (error) {
            console.error("Error submitting form:", error);
            toast.error("Something went wrong. Please try again.");
        }
    };

    const handleSkip = () => {
        setIsLoading(true);
        setTimeout(() => {
            const route = role === "ASPIRANT" 
                ? "/home/aspirant" 
                : role === "ALUMNI"
                    ? "/home/alumni"
                    : "/home/mentor";
            router.push(route);
        }, 1500);
    };

    return (
        <div className="flex justify-center items-center min-h-screen ">
            <ToastContainer />
            <div className="w-full max-w-md p-6 rounded-xl 
  bg-gradient-to-b from-gray-900/50 via-purple-900/30 to-gray-900/50
  shadow-[0_0_15px_rgba(139,92,246,0.1)]
  border border-purple-500/20
  backdrop-filter backdrop-blur-sm
  transition-all duration-300
  hover:shadow-[0_0_20px_rgba(139,92,246,0.2)]
  mx-4 sm:mx-0">
                {step === 1 && (
    <div>
        <h2 className="text-center text-xl font-bold mb-6 text-white">
            Choose your role
        </h2>
        <div className="flex flex-col sm:flex-row gap-4 items-center justify-center w-full mx-auto ">
            <button
                className="w-full sm:w-1/3 hover:shadow duration-500 
                    rounded-full bg-purple-100 hover:bg-purple-200 
                    text-slate-800 px-6 py-2.5 font-semibold
                    transition-all transform hover:scale-105"
                onClick={() => {
                    setRole("MENTOR");
                    handleNext();
                }}
            >
                Mentor
            </button>
            <button
                className="w-full sm:w-1/3 hover:shadow duration-500 
                    rounded-full bg-purple-100 hover:bg-purple-200 
                    text-slate-800 px-6 py-2.5 font-semibold
                    transition-all transform hover:scale-105"
                onClick={() => {
                    setRole("ASPIRANT");
                    handleNext();
                }}
            >
                Aspirant
            </button>
            <button
                className="w-full sm:w-1/3 hover:shadow duration-500 
                    rounded-full bg-purple-100 hover:bg-purple-200 
                    text-slate-800 px-6 py-2.5 font-semibold
                    transition-all transform hover:scale-105"
                onClick={() => {
                    setRole("ALUMNI");
                    handleNext();
                }}
            >
                Alumni
            </button>
        </div>
    </div>
)}
                {step === 2 && role === "ASPIRANT" && (
                    <div >
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
             
            {step === 2 && role === "ALUMNI" && (
    <div  className="">
        <h2 className="text-xl font-bold mb-6 text-center text-white">
            Alumni Contact Details
        </h2>
        <form onSubmit={handleSubmit} className="space-y-6 ">
            {/* College Name Field */}
            <div className="relative mt-4">
                <label className="block mb-4">
                    <span className="text-gray-200 text-sm font-medium">College Name</span>
                    <input
                        type="text"
                        name="collegeName"
                        value={formData.collegeName}
                        onChange={handleChange}
                        placeholder="Enter your college name"
                        className="block w-full px-4 py-3 
                            border border-purple-500/20 rounded-lg 
                            bg-white/10 backdrop-blur-sm
                            text-white placeholder-gray-400
                            focus:ring-2 focus:ring-purple-500/40 
                            focus:border-transparent
                            transition-all duration-200"
                        required
                    />
                </label>
            </div>
            

            {/* Degree Field */}
            <div className="relative">
                <label className="block mb-2">
                    <span className="text-gray-200 text-sm font-medium">Degree</span>
                    <input
                        type="text"
                        name="degree"
                        value={formData.degree}
                        onChange={handleChange}
                        placeholder="Enter your degree (e.g., B.Tech, M.Tech)"
                        className="block w-full px-4 py-3 
                            border border-purple-500/20 rounded-lg 
                            bg-white/10 backdrop-blur-sm
                            text-white placeholder-gray-400
                            focus:ring-2 focus:ring-purple-500/40 
                            focus:border-transparent
                            transition-all duration-200"
                        required
                    />
                </label>
            </div>

            {/* Description Field */}
            <div className="relative">
                <label className="block mb-2">
                    <span className="text-gray-200 text-sm font-medium">Description</span>
                    <textarea
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                        placeholder="Tell us about your experience and how you can help..."
                        className="block w-full px-4 py-3 
                            border border-purple-500/20 rounded-lg 
                            bg-white/10 backdrop-blur-sm
                            text-white placeholder-gray-400
                            focus:ring-2 focus:ring-purple-500/40 
                            focus:border-transparent
                            transition-all duration-200
                            resize-none"
                        rows={4}
                        required
                    />
                </label>
            </div>

            {/* Session Cost Field */}
            <div className="relative">
                <label className="block mb-2">
                    <span className="text-gray-200 text-sm font-medium">Session Cost (₹)</span>
                    <input
                        type="number"
                        name="sessionCost"
                        value={formData.sessionCost}
                        onChange={handleChange}
                        placeholder="Enter session cost in rupees"
                        className="block w-full px-4 py-3 
                            border border-purple-500/20 rounded-lg 
                            bg-white/10 backdrop-blur-sm
                            text-white placeholder-gray-400
                            focus:ring-2 focus:ring-purple-500/40 
                            focus:border-transparent
                            transition-all duration-200"
                       
                        required
                    />
                </label>
            </div>

            {/* WhatsApp Number Field (existing) */}
            <div className="relative ">
                <label className="block mb-2 4">
                    <span className="text-gray-200 text-sm font-medium">WhatsApp Number</span>
                    <div className="mt-1 relative rounded-lg shadow-sm ">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <span className="text-gray-500 sm:text-sm">+91</span>
                        </div>
                        <input
                            type="tel"
                            name="whatsappNumber"
                            value={formData.whatsappNumber}
                            onChange={handleChange}
                            placeholder="Enter your WhatsApp number"
                            className="block w-full pl-12 pr-4 py-3 
                                border border-purple-500/20 rounded-lg 
                                bg-white/10 backdrop-blur-sm
                                text-white placeholder-gray-400
                                focus:ring-2 focus:ring-purple-500/40 
                                focus:border-transparent
                                transition-all duration-200"
                            pattern="[0-9]{10}"
                            maxLength={10}
                            required
                        />
                    </div>
                    <p className="mt-1 text-xs text-gray-400">
                        This will help students to connect with you directly
                    </p>
                </label>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center justify-between gap-4 pt-2">
                <button
                    type="button"
                    onClick={handleBack}
                    className="px-4 py-2 rounded-lg
                        bg-gray-600 text-gray-200
                        hover:bg-gray-700 
                        transition-all duration-200
                        flex-1"
                >
                    Back
                </button>
                <button
                    type="submit"
                    className="px-4 py-2 rounded-lg
                        bg-purple-600 text-white
                        hover:bg-purple-700
                        transition-all duration-200
                        flex-1
                        disabled:opacity-50"
                    disabled={alumniMutation.isPending}
                >
                    {alumniMutation.isPending ? <Loader className="w-5 h-5 mx-auto"/> : "Submit"}
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
