'use client'

import { formUrlQuery, removeKeysFromUrlQuery } from "@jsmastery/utils";
import Image from "next/image";
import { usePathname, useRouter, useSearchParams } from "next/navigation"
import { useEffect, useState } from "react";

export default function SearchInput() {
    const pathname = usePathname();
    const router = useRouter();
    const searchParams = useSearchParams();
    const topic = searchParams.get("topic") || "";
    const [searchQuery, setSearchQuery] = useState(topic);

    useEffect(() => {
        const delayDebounce = setTimeout(() => {
            if (searchQuery) {
                const newUrl = formUrlQuery({
                    params: searchParams.toString(),
                    key: "topic",
                    value: searchQuery,
                })
                if (newUrl !== pathname + "?" + searchParams.toString()) {
                    router.push(newUrl, { scroll: false })
                }
            } else {
                if (topic) {
                    const newUrl = removeKeysFromUrlQuery({
                        params: searchParams.toString(),
                        keysToRemove: ["topic"]
                    })
                    router.push(newUrl, { scroll: false })
                }
            }
        }, 1000)

        return () => clearTimeout(delayDebounce);
    }, [searchQuery, router, searchParams, pathname, topic])

    return (
        <div className="relative border border-black rounded-lg px-2 py-1 flex gap-2 items-center h-fit">
            <Image src="/icons/search.svg" alt="search" width={15} height={15} />
            <input
                placeholder="Search Companions....."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="outline-none px-2"
            />
        </div>
    )
}
