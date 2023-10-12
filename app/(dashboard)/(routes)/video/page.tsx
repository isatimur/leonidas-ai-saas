"use client"

import * as z from "zod";
import Heading from "@/components/heading";
import {Music, VideoIcon} from "lucide-react";
import {useForm} from "react-hook-form";
import {formSchema} from "./constants";
import {zodResolver} from "@hookform/resolvers/zod";
import {Form, FormControl, FormField, FormItem} from "@/components/ui/form";
import React, {useState} from "react";
import {Input} from "@/components/ui/input";
import {Button} from "@/components/ui/button";
import {useRouter} from "next/navigation";
import {ChatCompletionMessageParam} from "openai/resources/chat/completions";
import axios from "axios";
import {Empty} from "@/components/empty";
import {Loader} from "@/components/loader";
import {useProModal} from "@/hooks/use-pro-modal";

export default function VideoPage() {

    const proModal = useProModal();

    const router = useRouter();
    const [video, setVideo] = useState<string>();

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            prompt: ""
        }
    })
    // const proModal = useProModal();
    const [messages, setMessages] = useState<ChatCompletionMessageParam[]>([]);


    const isLoading = form.formState.isSubmitting;

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        try {
            setVideo(undefined);

            const response = await axios.post('/api/video', values);
            console.log(response)

            setVideo(response.data[0]);
            form.reset();
        } catch (error: any) {
            if (error?.response?.status === 403) {
                proModal.onOpen();
            } else {
                console.error("Something went wrong.");
            }
        } finally {
            router.refresh();
        }
    }

    return (
        <div>
            <Heading
                title="Video Generation"
                description="Turn your prompt into video."
                icon={VideoIcon}
                iconColor="text-orange-700"
                bgColor="bg-orange-700/10"
            />
            <div className="px-4 lg:px-8">
                <Form {...form}>
                    <form
                        onSubmit={form.handleSubmit(onSubmit)}
                        className="
              rounded-lg
              border
              w-full
              p-4
              px-3
              md:px-6
              focus-within:shadow-sm
              grid
              grid-cols-12
              gap-2
            "
                    >
                        <FormField
                            name="prompt"
                            render={({field}) => (
                                <FormItem className="col-span-12 lg:col-span-10">
                                    <FormControl className="m-0 p-0">
                                        <Input
                                            className="border-0 outline-none focus-visible:ring-0 focus-visible:ring-transparent"
                                            disabled={isLoading}
                                            placeholder="Clown fish swimming around coral reef."
                                            {...field}
                                        />
                                    </FormControl>
                                </FormItem>
                            )}
                        />
                        <Button className="col-span-12 lg:col-span-2 w-full" type="submit" disabled={isLoading}
                                size="icon">
                            Generate
                        </Button>
                    </form>
                </Form>
                {isLoading && (
                    <div className="p-20">
                        <Loader/>
                    </div>
                )}
                {!video && !isLoading && (
                    <Empty label="No video generated."/>
                )}
                {video && (
                    <video controls className="w-full aspect-video mt-8 rounded-lg border bg-black">
                        <source src={video}/>
                    </video>
                )}
            </div>
        </div>
    )
}
