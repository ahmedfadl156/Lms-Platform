"use client"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "./ui/form"
import { Input } from "./ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select"
import { subjects } from "@/constants"
import { Textarea } from "./ui/textarea"
import { Button } from "./ui/button"
import { createCompanion } from "@/lib/actions/companions.action"
import { redirect } from "next/navigation"

const formSchema = z.object({
    name: z.string().min(1 , {message: "Companion Name Is Required"}),
    subject: z.string().min(1 , {message: "Subject Is Required"}),
    topic: z.string().min(1 , {message: "Topic Is Required"}),
    voice: z.string().min(1 , {message: "Voice Is Required"}),
    style: z.string().min(1 , {message: "Style Is Required"}),
    duration: z.coerce.number().min(1 , {message: "Duration Is Required"}),
})
export default function ComapnionForm() {
    const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
    name: "",
    subject: "",
    topic: "",
    voice: "",
    style: "",
    duration: 15,
    },
})

    async function onSubmit(data: z.infer<typeof formSchema>) {
        const companion = await createCompanion(data)
        if(companion){
            redirect(`/companions/${companion.id}`)
        }
        else{
            console.log("Failed to Create Companion")
            redirect('/')
        }
    }
return (
    <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                    <FormItem>
                        <FormLabel>Companion Name</FormLabel>
                        <FormControl>
                            <Input placeholder="e.g. Neura the brainy explorer" {...field} className="input"/>
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )}
            />
            <FormField
                control={form.control}
                name="subject"
                render={({ field }) => (
                    <FormItem>
                        <FormLabel>Subject</FormLabel>
                        <FormControl>
                        <Select
                            value={field.value}
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                        >
                            <SelectTrigger
                            id="form-rhf-select-language"
                            className="input capitalize"
                            >
                            <SelectValue placeholder="Select The Subject" />
                            </SelectTrigger>
                            <SelectContent position="item-aligned">
                                {subjects.map((subject) => (
                                    <SelectItem value={subject} key={subject} className="capitalize">
                                        {subject}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )}
            />
            <FormField
                control={form.control}
                name="topic"
                render={({ field }) => (
                    <FormItem>
                        <FormLabel>What should the companion help with?</FormLabel>
                        <FormControl>
                            <Textarea placeholder="ex. Math , Science , Coding " {...field} className="input"/>
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )}
            />
            <FormField
                control={form.control}
                name="voice"
                render={({ field }) => (
                    <FormItem>
                        <FormLabel>Voice</FormLabel>
                        <FormControl>
                        <Select
                            value={field.value}
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                        >
                            <SelectTrigger
                            id="form-rhf-select-language"
                            className="input"
                            >
                            <SelectValue placeholder="Select The Voice" />
                            </SelectTrigger>
                            <SelectContent position="item-aligned">
                                    <SelectItem value="male" className="capitalize">
                                        Male
                                    </SelectItem>
                                    <SelectItem value="female" className="capitalize">
                                        Female
                                    </SelectItem>
                            </SelectContent>
                        </Select>
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )}
            />
            <FormField
                control={form.control}
                name="style"
                render={({ field }) => (
                    <FormItem>
                        <FormLabel>Style</FormLabel>
                        <FormControl>
                        <Select
                            value={field.value}
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                        >
                            <SelectTrigger
                            id="form-rhf-select-language"
                            className="input"
                            >
                            <SelectValue placeholder="Select The Style" />
                            </SelectTrigger>
                            <SelectContent position="item-aligned">
                                    <SelectItem value="formal" className="capitalize">
                                        Formal
                                    </SelectItem>
                                    <SelectItem value="casual" className="capitalize">
                                        Casual
                                    </SelectItem>
                            </SelectContent>
                        </Select>
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )}
            />
            <FormField
                control={form.control}
                name="duration"
                render={({ field }) => (
                    <FormItem>
                        <FormLabel>Estimated session duration in minutes</FormLabel>
                        <FormControl>
                            <Input type="number" placeholder="15" {...field} className="input"/>
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )}
            />
            <div className="grid">
                <Button type="submit" className="">
                    Build Your Companion
                </Button>
            </div>
        </form>
    </Form>
)
}
