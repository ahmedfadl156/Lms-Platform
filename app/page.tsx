import CompanionCard from "@/components/CompanionCard"
import CompanionsList from "@/components/CompanionsList"
import Cta from "@/components/Cta"
import { recentSessions } from "@/constants"
import { getAllCompanions, getRecentSessions } from "@/lib/actions/companions.action"

export const dynamic = 'force-dynamic'

const Page = async () => {
  const companions = await getAllCompanions({ limit: 3 });
  const recentSessions = await getRecentSessions(10);
  return (
    <main>
      <h1>Popular Companions</h1>
      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {companions?.length > 0 ? companions?.map((companion) => (
          <CompanionCard key={companion.id} {...companion} />
        ))
          :
          <p>No companions found</p>
        }
      </section>
      <section className="home-section">
        <CompanionsList title="Recently Completed Lessons" companions={recentSessions} classNames="w-2/3 max-lg:w-full" />
        <Cta />
      </section>
    </main>
  )
}

export default Page