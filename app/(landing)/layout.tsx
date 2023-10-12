import {getApiLimitCount} from "@/lib/api-limit";
import {checkSubscription} from "@/lib/subscription";

const LandingLayout = async ({
                                 children
                             }: { children: React.ReactNode; }) => {
    const apiLimitCount = await getApiLimitCount();
    const isPro = await checkSubscription();
    return (

        <main className="h-full bg-[#111827] overflow-auto">
            <div className="mx-auto max-w-screen-xl h-full w-full">
                {children}
            </div>
        </main>
    )
}

export default LandingLayout;