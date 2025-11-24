import ComapnionForm from "@/components/ComapnionForm";
import { newCompanionPermisions } from "@/lib/actions/companions.action";
import { auth } from "@clerk/nextjs/server";
import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";

export const dynamic = 'force-dynamic'

export default async function page() {
    const { userId: user } = await auth();
    const canCreateCompanion = await newCompanionPermisions();
    if (!user) {
        redirect("/sign-in")
    }
    return (
        <main className="min-lg:w-1/3 min-md:w-2/3 items-center justify-center">
            {canCreateCompanion ?
                (<div className="w-full gap-4 flex flex-col">
                    <h1>Companion Builder</h1>
                    <ComapnionForm />
                </div>) :
                (
                    <div className="flex flex-col gap-6 items-center text-center justify-center h-[70vh]">
                        <div className="image w-lg">
                            <Image src="/images/limit.svg" alt="limit" width={1000} height={1000} />
                        </div>
                        <span className="bg-[#FCCC41] text-black text-sm px-4 py-1.5 rounded-lg">Upgrade Your Plan</span>
                        <h1>You've Reached Your Limit</h1>
                        <p>You’ve reached your companion limit. Upgrade to create more companions and premium features.</p>
                        <Link href="/subscription" className="bg-[#FE5933] text-white px-4 py-2 rounded-lg">Upgrade Your Plan</Link>
                    </div>
                )
            }
        </main>
    )
}
