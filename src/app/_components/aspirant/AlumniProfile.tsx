import Image from "next/image";
// import { Mail, Phone, MapPin } from "lucide-react";
import { Mail, Phone, MapPin, GraduationCap, Building } from "lucide-react";

interface AlumniProfileProps {
    alumni: {
        user: {
            name: string;
            email: string;
            image: string | null;
        };
        userId: string;
        description: string;
        id: string;
        createdAt: Date;
        updatedAt: Date;
        collegeName: string;
        degree: string;
        sessionCost: number;
        whatsappNumber: string;
    };
}

const AlumniProfile = (
    {alumni}: AlumniProfileProps) => {
        const {
            user: { name,image},
            collegeName,
            degree,
            sessionCost,
            description,
            
        } = alumni;
    return (
        
    //     <div className="relative py-4 sm:py-6">
    //     <div className="mx-auto max-w-3xl px-4 sm:px-6">
    //         <div className="bg-purple-900/20 rounded-2xl p-4 sm:p-6 
    //             border border-purple-500/20">
                
    //             {/* Profile Section */}
    //             <div className="flex flex-col md:flex-row items-start gap-4">
    //                 {/* Left Section - Profile Image */}
    //                 <div className="relative w-24 h-24 sm:w-28 sm:h-28 md:w-32 md:h-32 mx-auto md:mx-0">
    //                     <Image
    //                         src={image ? image : "/image/profile"}
    //                         className="rounded-full object-cover border-2 border-purple-500/30"
    //                         alt="Profile"
    //                         fill
    //                         priority
    //                     />
    //                 </div>

    //                 {/* Right Section - Info */}
    //                 <div className="flex-1 text-center md:text-left">
    //                     <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
    //                         <div>
    //                             <h1 className="text-xl sm:text-2xl font-bold text-white">{name}</h1>
    //                             <div className="space-y-1 mt-2">
    //                                 <p className="text-purple-300 text-sm">{collegeName}</p>
    //                                 <p className="text-purple-300 text-sm">{degree}</p>
    //                             </div>
    //                             <div className="flex items-center gap-1 mt-1">
    //                             <span className="text-green-400 font-bold text-xs sm:text-sm">₹{sessionCost}</span>
    //                             <span className="text-green-500/70 text-xs">/session</span>
    //                         </div>
    //                         </div>
                            
    //                     </div>
                        
    //                     {/* About Section */}
    //                     <p className="text-gray-300 text-sm leading-relaxed mb-6">
    //                        {description}
    //                     </p>

    //                     {/* Contact Details and Button */}
                       
    //                 </div>
    //             </div>
    //         </div>
    //         <div className="bg-purple-900/20 rounded-2xl p-4 sm:p-6 
    //             border border-purple-500/20 mt-6">
    //             <h2 className="text-lg font-semibold text-white mb-4">Contact Information</h2>
    //             <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
    //                 <div className="flex items-center gap-3 bg-purple-900/30 p-3 rounded-lg">
    //                     <Phone className="w-5 h-5 text-purple-400" />
    //                     <div>
    //                         <p className="text-xs text-purple-300">Phone</p>
    //                         <p className="text-sm text-white">+91 6300763145</p>
    //                     </div>
    //                 </div>
    //                 <div className="flex items-center gap-3 bg-purple-900/30 p-3 rounded-lg">
    //                     <Mail className="w-5 h-5 text-purple-400" />
    //                     <div>
    //                         <p className="text-xs text-purple-300">Email</p>
    //                         <p className="text-sm text-white">mentoras@gmail.com</p>
    //                     </div>
    //                 </div>
    //                 <div className="flex items-center gap-3 bg-purple-900/30 p-3 rounded-lg sm:col-span-2">
    //                     <MapPin className="w-5 h-5 text-purple-400" />
    //                     <div>
    //                         <p className="text-xs text-purple-300">Location</p>
    //                         <p className="text-sm text-white">Bangalore, India</p>
    //                     </div>
    //                 </div>
    //             </div>
               
    //         </div>
    //     </div>
    // </div>
    <div className="relative py-4 sm:py-6">
            <div className="mx-auto max-w-3xl px-4 sm:px-6">
                <div className="bg-purple-900/20 rounded-2xl p-4 sm:p-6 
                    border border-purple-500/20">
                    
                    {/* Profile Section */}
                    <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
                        {/* Left Section - Profile Image */}
                        <div className="relative w-28 h-28 sm:w-32 sm:h-32 shrink-0">
                            <Image
                                src={image ?? "/default-avatar.png"}
                                className="rounded-full object-cover border-2 border-purple-500/30"
                                alt={`${name}'s profile`}
                                fill
                                priority
                            />
                        </div>

                        {/* Right Section - Info */}
                        <div className="flex-1 w-full text-center md:text-left">
                            <div className="space-y-4">
                                {/* Name and Session Cost */}
                                <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                                    <h1 className="text-2xl sm:text-3xl font-bold text-white">{name}</h1>
                                    <div className="bg-purple-900/30 px-4 py-2 rounded-lg">
                                        <p className="text-green-400 font-semibold">₹{sessionCost}</p>
                                        <p className="text-gray-400 text-xs">per session</p>
                                    </div>
                                </div>

                                {/* Education Details */}
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    <div className="flex items-center gap-3 bg-purple-900/30 p-3 rounded-lg">
                                        <Building className="w-5 h-5 text-purple-400 shrink-0" />
                                        <div className="text-left">
                                            <p className="text-xs text-purple-300">College</p>
                                            <p className="text-sm text-white">{collegeName}</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-3 bg-purple-900/30 p-3 rounded-lg">
                                        <GraduationCap className="w-5 h-5 text-purple-400 shrink-0" />
                                        <div className="text-left">
                                            <p className="text-xs text-purple-300">Degree</p>
                                            <p className="text-sm text-white">{degree}</p>
                                        </div>
                                    </div>
                                </div>

                                {/* Description */}
                                <p className="text-gray-300 text-sm leading-relaxed">
                                    {description}
                                   
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Contact Information */}
                <div className="bg-purple-900/20 rounded-2xl p-4 sm:p-6 
                    border border-purple-500/20 mt-6">
                    <h2 className="text-lg font-semibold text-white mb-4">Contact Information</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="flex items-center gap-3 bg-purple-900/30 p-3 rounded-lg">
                            <Phone className="w-5 h-5 text-purple-400 shrink-0" />
                            <div>
                                <p className="text-xs text-purple-300">WhatsApp</p>
                                <p className="text-sm text-white">+91 6300763145</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-3 bg-purple-900/30 p-3 rounded-lg">
                            <Mail className="w-5 h-5 text-purple-400 shrink-0" />
                            <div>
                                <p className="text-xs text-purple-300">Email</p>
                                <p className="text-sm text-white">mentoras@gmail.com</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-3 bg-purple-900/30 p-3 rounded-lg sm:col-span-2">
                            <MapPin className="w-5 h-5 text-purple-400 shrink-0" />
                            <div>
                                <p className="text-xs text-purple-300">Location</p>
                                <p className="text-sm text-white">Sanga reddy,Hyderabad, India</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    );
};

export default AlumniProfile;