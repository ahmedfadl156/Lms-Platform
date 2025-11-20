import Image from "next/image";
import Link from "next/link";

export default function Cta() {
return (
    <section className="cta-section">
        <div className="flex flex-col gap-4">
            <p className="bg-[#FCCC41] rounded-2xl px-3 py-1.5 text-black">Start learning your way</p>
            <h2 className="font-bold text-2xl">Build a Personalize Learning Companion</h2>
            <p className="text-[#F9F9F9] text-base">Pick a name, subject, voice, & personality — and start learning through voice conversations that feel natural and fun.</p>
        </div>
        <Image src={"/images/cta.svg"} alt="cta" width={500} height={500}/>
        <div className="grid">
            <Link href="/companions/new" className="bg-[#FE5933] text-white cursor-pointer flex items-center gap-2 rounded-2xl px-8 py-3">
                <Image src={"/icons/plus.svg"} alt="plus" width={12.5} height={15}/>
                Build New Companion
            </Link>
        </div>
    </section>
)
}
