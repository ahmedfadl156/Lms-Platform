import { Timer } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

interface CompanionCardProps {
    id: string;
    name: string;
    topic: string;
    subject: string;
    duration: number;
    color: string;
}
export default function CompanionCard({
    id,
    name,
    topic,
    subject,
    duration,
    color
}: CompanionCardProps) {
return (
    <div className="border border-black px-6 py-4 rounded-xl" style={{backgroundColor: color}}>
        <div className="header flex items-center justify-between">
            <span className="bg-black text-white px-3 py-1 rounded-lg">{subject}</span>
            <button className="bg-black p-2 rounded-full cursor-pointer">
                <Image src="/icons/bookmark.svg" alt="bookmark" width={12.5} height={15} />
            </button>
        </div>
        <div className="content mt-4 flex flex-col gap-3">
            <h2 className="text-2xl font-bold">{name}</h2>
            <p className="text-[#111111] text-lg">{topic}</p>
            <span className="flex items-center gap-1">
                <Timer className="size-4"/>
                <p className="text-[#111111] text-base">{duration} minutes</p>
            </span>    
        </div>
        <div className="grid">
            <Link href={`/companions/${id}`} className="bg-[#FE5933] cursor-pointer text-white px-6 py-2 rounded-lg mt-6 text-center">Launch Session</Link>
        </div>
    </div>
)
}
