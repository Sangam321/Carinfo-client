import COVER_IMAGE from '@/assets/logo.png';

const colors = {
    primary: '#606060',
    background: '#f5f5f5',
    disabled: '#D9D9D9',
};

const Login = () => {
    return (
        <div className="w-full h-screen flex items-start">
            <div className="relative w-1/2 h-full flex flex-col">
                <div className="absolute top-[20%] left-[10%] flex flex-col">
                    <h1 className="text-4xl text-white font-bold my-4">Turn Your Ideas into Reality</h1>
                    <p className="text-xl text-white font-normal">Start for free and get attractive offers from the community</p>
                </div>
                <img src={COVER_IMAGE} className="w-full h-full object-cover" />
            </div>

            <div className="w-1/2 h-full bg-[#f5f5f5] flex flex-col p-20 justify-between items-center">
                <h1 className="max-w-[500px] mx-auto text-xl text-[#606060] font-semibold mr-auto">Interactive Brand</h1>

                <div className="w-full flex flex-col max-w-[500px]">
                    <h3 className="text-3xl font-semibold mb-2">Login</h3>
                    <p className="text-base mb-2">Welcome Back! Please enter your details.</p>

                    <div className="w-full flex flex-col">
                        <input
                            type="email"
                            placeholder="Email"
                            className="w-full text-black py-2 my-2 bg-transparent border-b border-black outline-none focus:outline-none"
                        />
                        <input
                            type="password"
                            placeholder="Password"
                            className="w-full text-black py-2 my-2 bg-transparent border-b border-black outline-none focus:outline-none"
                        />
                    </div>

                    <div className="w-full flex items-center justify-between">
                        <div className="flex items-center">
                            <input type="checkbox" className="w-4 h-4 mr-2" />
                            <p className="text-sm">Remember me for 30 days</p>
                        </div>
                        <p className="text-sm font-medium whitespace-nowrap cursor-pointer underline underline-offset-2">Forgot Password?</p>
                    </div>

                    <div className="w-full flex flex-col my-4">
                        <button className="w-full text-white my-2 font-semibold bg-[#606060] rounded-md p-4 text-center flex items-center justify-center">Log in</button>
                        <button className="w-full text-[#606060] my-2 font-semibold bg-white border-2 border-black rounded-md p-4 text-center flex items-center justify-center">Register</button>
                    </div>

                    <div className="w-full flex items-center justify-center relative py-2">
                        <div className="w-full h-[1px] bg-black"></div>
                        <p className="absolute text-black/80 bg-[#f5f5f5]">or</p>
                    </div>

                    <div className="w-full flex items-center justify-center">
                        <p className="text-sm font-normal text-[#606060]">Don't have an account? <span className="font-semibold underline underline-offset-2">Sign up</span></p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;
