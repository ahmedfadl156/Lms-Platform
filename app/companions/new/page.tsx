import ComapnionForm from "@/components/ComapnionForm";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

export default async function page() {
    const {userId: user} = await auth();
    if(!user){
        redirect("/sign-in")
    }
    return (
    <main className="min-lg:w-1/3 min-md:w-2/3 items-center justify-center">
        <div className="w-full gap-4 flex flex-col">
            <h1>Companion Builder</h1>
            <ComapnionForm />
        </div>
    </main>
)
}
