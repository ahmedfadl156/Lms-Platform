import CompanionCard from "@/components/CompanionCard";
import SearchInput from "@/components/SearchInput";
import SubjectFilter from "@/components/SubjectFilter";
import { getAllCompanions } from "@/lib/actions/companions.action";
import { getSubjectColor } from "@/lib/utils";

export default async function page({searchParams} : SearchParams) {
const params = await searchParams;
const subject = params.subject ? params.subject as string : "";
const topic = params.topic ? params.topic as string : "";
const companions = await getAllCompanions({subject , topic});
return (
    <main>
        <section className="flex justify-between gap-4 max-sm:flex-col">
            <h1>Companions</h1>
            <div className="flex flex-col md:flex-row gap-4">
                <SearchInput />
                <SubjectFilter />
            </div>
        </section>
        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {companions.map((companion) => (
                <CompanionCard key={companion.id} {...companion} color={getSubjectColor(companion.subject)}/>
            ))}
        </section>
    </main>
)
}
