function Mychallenges() {
    return ( 
        <div className="min-h-screen w-full bg-gradient-to-b from-gray-900 via-[#300171]/30 to-slate-900 
            flex items-start sm:items-center justify-center p-4 sm:p-6">
            <div className="max-w-md w-full space-y-6 bg-black/30 backdrop-blur-sm 
                rounded-xl p-6 border border-purple-500/20 mt-18 sm:mt-0">
                <p className="text-gray-300 text-justify text-sm sm:text-base leading-relaxed">
                    We are still working on this feature. Basically this feature will make it to create challenge like 21 days 100 problems etc. If you have any suggestions regarding this, please share below.
                </p>
                
                <div className="space-y-4">
                    <input
                        className="w-full px-4 py-3 bg-black/50 text-white border 
                            border-purple-500/30 rounded-lg focus:outline-none 
                            focus:border-purple-500 placeholder-gray-500 
                            transition-all duration-300"
                        placeholder="Share your suggestion..."
                    />
                    <div className="flex justify-center sm:justify-start">
                        <button className="w-full sm:w-auto px-6 py-3 rounded-xl 
                            bg-gradient-to-r from-purple-600 to-pink-600 
                            text-white font-medium hover:shadow-lg 
                            hover:shadow-purple-500/25 transition-all duration-300 
                            transform hover:scale-[1.02]">
                            Send Suggestion
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Mychallenges;