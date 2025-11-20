import { Table, TableBody, TableCell, TableCaption, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { cn, getSubjectColor } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
interface CompanionsListProps {
    title: string;
    companions?: Companion[];
    classNames?: string;
}
export default function CompanionsList({title, companions, classNames}: CompanionsListProps) {
return (
    <div className={cn("border border-black px-6 py-4 rounded-2xl", classNames)}>
        <h2 className="font-bold text-3xl mb-6">{title}</h2>
        <Table>
            <TableHeader>
                <TableRow>
                    <TableHead className="text-lg w-2/3">Lessons</TableHead>
                    <TableHead className="text-lg">Subject</TableHead>
                    <TableHead className="text-lg text-right">Duration</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {companions?.map((companion) => (
                    <TableRow key={companion.id}>
                        <TableCell>
                            <Link href={`/companions/${companion.id}`}>
                                <div className="flex items-center gap-3">
                                    <div className="size-[72px] flex items-center justify-center rounded-lg max-md:hidden" style={{backgroundColor: getSubjectColor(companion.subject) }}>
                                        <Image src={`/icons/${companion.subject}.svg`} alt={companion.subject} width={30} height={30}/>
                                    </div>
                                    <div className="flex flex-col gap-2">
                                        <p className="font-bold text-2xl">{companion.name}</p>
                                        <p className="text-[#111111] text-lg">{companion.topic}</p>
                                    </div>
                                </div>
                            </Link>
                        </TableCell>
                        <TableCell>
                            <div className="bg-black rounded-2xl p-1 text-center text-sm capitalize">
                                <p className="text-white">{companion.subject}</p>
                            </div>
                        </TableCell>
                        <TableCell className="text-right">
                            <p className="text-lg">{companion.duration} mins</p>
                        </TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    </div>
)
}
