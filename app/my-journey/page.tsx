import CompanionsList from "@/components/CompanionsList";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { getUserCompanions, getUserSessions } from "@/lib/actions/companions.action";
import { currentUser } from "@clerk/nextjs/server"
import { CheckCircle } from "lucide-react";
import Image from "next/image";
import { redirect } from "next/navigation";
export default async function page() {
    const user = await currentUser();
    if(!user) redirect('/sign-in');

    const companions = await getUserCompanions(user.id);
    const sessionHistory = await getUserSessions(user.id);
return (
    <main className="">
        <section className="flex flex-col gap-8 md:flex-row items-center justify-between mb-12">
            <div className="user flex flex-col md:flex-row items-center gap-4">
                <Image src={user.imageUrl} alt="user" width={80} height={80} className="rounded-lg" />
                <div className="user-info flex text-center md:text-left flex-col gap-2">
                    <h2 className="user-name font-bold text-3xl">{user.firstName}</h2>
                    <p className="user-email font-semibold">{user.emailAddresses[0].emailAddress}</p>
                </div>
            </div>
            <div className="info flex gap-6">
                <div className="border border-black rounded-lg p-4 flex flex-col gap-5">
                    <h2 className="flex items-center gap-2">
                        <CheckCircle className="text-[#FE5933]" />
                        <span className="font-bold text-2xl">{sessionHistory.length}</span>
                    </h2>
                    <p>Lessons Completed</p>
                </div>
                <div className="border border-black rounded-lg p-4 flex flex-col gap-5">
                    <h2 className="flex items-center gap-2">
                        <CheckCircle className="text-[#FE5933]"/>
                        <span className="font-bold text-2xl">{companions.length}</span>
                    </h2>
                    <p>Companions Created</p>
                </div>
            </div>
        </section>
        <Accordion type="multiple">
            <AccordionItem value="recent">
                <AccordionTrigger className="text-2xl font-bold">Recent Sessions</AccordionTrigger>
                <AccordionContent>
                    <CompanionsList title="Recent Sessions" companions={sessionHistory}/>
                </AccordionContent>
            </AccordionItem>
            <AccordionItem value="companions">
                <AccordionTrigger className="text-2xl font-bold">My Companions {`(${companions.length})`}</AccordionTrigger>
                <AccordionContent>
                    <CompanionsList title="My Companions" companions={companions}/>
                </AccordionContent>
            </AccordionItem>
        </Accordion>
    </main>
)
}
