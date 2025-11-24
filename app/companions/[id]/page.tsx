import CompanionComponent from "@/components/CompanionComponent";
import { getCompanion } from "@/lib/actions/companions.action";
import { getSubjectColor } from "@/lib/utils";
import { currentUser } from "@clerk/nextjs/server";
import Image from "next/image";
import { redirect } from "next/navigation";

interface CompanionSessionPageProps {
    params: Promise<{id: string}>
}

export default async function page({params}: CompanionSessionPageProps) {
    const {id} = await params;
    const companion = await getCompanion(id);
    const {name , subject , topic , duration , title} = companion;
    const user = await currentUser();
    if(!user) redirect("/sign-in")
    if(!companion) redirect("/companions")

return (
    <main>
        <section className="session-header flex flex-col justify-center text-center md:text-left md:justify-between md:flex-row gap-6 p-6 border border-black rounded-xl">
            <div className="flex flex-col justify-center md:flex-row items-center gap-6">
                <Image src={"/icons/" + companion.subject + ".svg"} className="w-16 h-16 p-4 rounded-lg" alt={companion.subject} width={30} height={30} style={{backgroundColor: getSubjectColor(companion.subject)}}/>
                <div className="flex flex-col gap-2">
                    <h2 className="font-bold text-2xl flex flex-col md:flex-row items-center gap-2">
                        {companion.name}
                        <span className="bg-black text-white px-3 py-1 rounded-full text-sm">{companion.subject}</span>
                    </h2>
                    <p className="text-[#111111] text-lg max-w-2xl">{companion.topic}</p>
                </div>
            </div>
            <p className="text-[#111111] text-lg">{companion.duration} minutes</p>
        </section>
        <CompanionComponent {...companion} companionId={id} userName={user?.firstName + " " + user?.lastName} userImage={user?.imageUrl}/>
    </main>
)
}
