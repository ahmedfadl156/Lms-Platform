import { SignIn } from "@clerk/nextjs"
export default function page() {
return (
    <main className="flex items-center justify-center h-[80vh]">
        <SignIn />
    </main>
)
}
