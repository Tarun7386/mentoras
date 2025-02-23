import Image from "next/image";
import { Mail, Phone, MapPin } from "lucide-react";

const AlumniProfile = () => {

    return (
        <div className="relative py-4 sm:py-6">
            <div className="mx-auto max-w-3xl px-4 sm:px-6">
                <div className="bg-purple-900/20 rounded-2xl p-4 sm:p-6 
                    border border-purple-500/20">
                    
                    {/* Profile Section */}
                    <div className="flex flex-col md:flex-row items-start gap-4">
                        {/* Left Section - Profile Image */}
                        <div className="relative w-24 h-24 sm:w-28 sm:h-28 md:w-32 md:h-32 mx-auto md:mx-0">
                            <Image
                                src="/default-avatar.png"
                                className="rounded-full object-cover border-2 border-purple-500/30"
                                alt="Profile"
                                fill
                                priority
                            />
                        </div>

                        {/* Right Section - Info */}
                        <div className="flex-1 text-center md:text-left">
                            <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
                                <div>
                                    <h1 className="text-xl sm:text-2xl font-bold text-white">Rahul Kumar</h1>
                                    <div className="space-y-1 mt-2">
                                        <p className="text-purple-300 text-sm">IIT Delhi</p>
                                        <p className="text-purple-300 text-sm">B.Tech Computer Science</p>
                                    </div>
                                </div>
                                <div className="mt-3 md:mt-0">
                                    <div className="bg-purple-900/30 px-4 py-2 rounded-lg inline-block">
                                        <p className="text-green-400 font-semibold">₹1500</p>
                                        <p className="text-gray-400 text-xs">per session</p>
                                    </div>
                                </div>
                            </div>
                            
                            {/* About Section */}
                            <p className="text-gray-300 text-sm leading-relaxed mb-6">
                                Ex-Google SDE with 3 years of experience. Passionate about teaching 
                                DSA and System Design. Have mentored 50+ students who successfully 
                                cracked interviews at FAANG companies.
                            </p>

                            {/* Contact Details and Button */}
                           
                        </div>
                    </div>
                </div>
                <div className="bg-purple-900/20 rounded-2xl p-4 sm:p-6 
                    border border-purple-500/20 mt-6">
                    <h2 className="text-lg font-semibold text-white mb-4">Contact Information</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                        <div className="flex items-center gap-3 bg-purple-900/30 p-3 rounded-lg">
                            <Phone className="w-5 h-5 text-purple-400" />
                            <div>
                                <p className="text-xs text-purple-300">Phone</p>
                                <p className="text-sm text-white">+91 7386633690</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-3 bg-purple-900/30 p-3 rounded-lg">
                            <Mail className="w-5 h-5 text-purple-400" />
                            <div>
                                <p className="text-xs text-purple-300">Email</p>
                                <p className="text-sm text-white">rahul.kumar@gmail.com</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-3 bg-purple-900/30 p-3 rounded-lg sm:col-span-2">
                            <MapPin className="w-5 h-5 text-purple-400" />
                            <div>
                                <p className="text-xs text-purple-300">Location</p>
                                <p className="text-sm text-white">Bangalore, India</p>
                            </div>
                        </div>
                    </div>
                   
                </div>
            </div>
        </div>
    );
};

export default AlumniProfile;