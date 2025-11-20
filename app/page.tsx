import CompanionCard from "@/components/CompanionCard"
import CompanionsList from "@/components/CompanionsList"
import Cta from "@/components/Cta"
import { recentSessions } from "@/constants"

const Page = () => {
  return (
    <main>
      <h1>Popular Companions</h1>
      <section className="home-section">
        <CompanionCard 
          id="1"
          name="Neura the brainy explorer"
          topic="Neural newtwork of the brain"
          subject="science"
          duration={45}
          color="#ffda6e"
        />
        <CompanionCard 
          id="2"
          name="Neura the brainy explorer"
          topic="Neural newtwork of the brain"
          subject="science"
          duration={45}
          color="#e5d0ff"
        />
        <CompanionCard
          id="3"
          name="Neura the brainy explorer"
          topic="Neural newtwork of the brain"
          subject="science"
          duration={45}
          color="#e5d0ff"
        />
      </section>
      <section className="home-section">
        <CompanionsList title="Recently Completed Lessons" companions={recentSessions} classNames="w-2/3 max-lg:w-full"/>
        <Cta />
      </section>
    </main>
  )
}

export default Page