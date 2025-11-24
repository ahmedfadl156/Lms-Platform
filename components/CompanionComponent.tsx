'use client'

import { cn, configureAssistant, getSubjectColor } from "@/lib/utils"
import { vapi } from "@/lib/vapi.sdk"
import Lottie, { LottieRefCurrentProps } from "lottie-react"
import Image from "next/image"
import { useEffect, useRef, useState } from "react"
import soundwaves from '@/constants/soundwaves.json'
import { addToSessionHistory } from "@/lib/actions/companions.action"

enum CallStatus {
    INACTIVE = 'INACTIVE',
    CONNECTING = 'CONNECTING',
    ACTIVE = 'ACTIVE',
    FINISHED = 'FINISHED'
}

export default function CompanionComponent({ 
    companionId, 
    subject, 
    topic, 
    name, 
    userName, 
    userImage, 
    style, 
    voice 
}: CompanionComponentProps) {
    const [callStatus, setCallStatus] = useState<CallStatus>(CallStatus.INACTIVE)
    const [isSpeaking, setIsSpeaking] = useState(false)
    const [isMuted, setIsMuted] = useState(false)
    const [transcript , setTranscript] = useState<string[]>([])
    const lottieRef = useRef<LottieRefCurrentProps>(null)

    useEffect(() => {
        if (lottieRef.current) {
            if (isSpeaking) {
                lottieRef.current.play()
            } else {
                lottieRef.current.stop()
            }
        }
    }, [isSpeaking])

    useEffect(() => {
        const onCallStart = () => {
            setCallStatus(CallStatus.ACTIVE)
            setIsSpeaking(false)
        }

        const onCallEnd = () => {
            setCallStatus(CallStatus.FINISHED)
            setIsSpeaking(false)
            setIsMuted(false)
            addToSessionHistory(companionId)
            setTimeout(() => {
                setCallStatus(CallStatus.INACTIVE)
            }, 2000)
        }

        const onMessage = (message: any) => {
            if(message.type === "transcript" && message.transcriptType === 'final') {
                const newMessage = {role: message.role , content: message.transcript}
                setTranscript((prev: any[]) => [newMessage , ...prev])
            }
        }

        const onSpeechStart = () => {
            setIsSpeaking(true)
        }

        const onSpeechEnd = () => {
            setIsSpeaking(false)
        }

        const onError = (error: Error) => {
            setCallStatus(CallStatus.INACTIVE)
            setIsSpeaking(false)
        }

        vapi.on('call-start', onCallStart)
        vapi.on('call-end', onCallEnd)
        vapi.on('message', onMessage)
        vapi.on('error', onError)
        vapi.on('speech-start', onSpeechStart)
        vapi.on('speech-end', onSpeechEnd)

        return () => {
            vapi.off('call-start', onCallStart)
            vapi.off('call-end', onCallEnd)
            vapi.off('message', onMessage)
            vapi.off('error', onError)
            vapi.off('speech-start', onSpeechStart)
            vapi.off('speech-end', onSpeechEnd)
        }
    }, [])

    const toggleMicrophone = () => {
        if (callStatus !== CallStatus.ACTIVE) return
        
        const currentMuteState = vapi.isMuted()
        vapi.setMuted(!currentMuteState)
        setIsMuted(!currentMuteState)
    }

    const handleCall = async () => {
        try {
            setCallStatus(CallStatus.CONNECTING)
            
            const assistantOverrides = {
                variableValues: {
                    subject,
                    topic,
                    style
                },
                clientMessages: ['transcript'],
                serverMessages: [],
            }
            
            // @ts-expect-error
            await vapi.start(configureAssistant(voice, style), assistantOverrides)
        } catch (error) {
            console.error('Error starting call:', error)
            setCallStatus(CallStatus.INACTIVE)
        }
    }

    const handleDisconnect = () => {
        vapi.stop()
    }

    const getButtonText = () => {
        switch (callStatus) {
            case CallStatus.CONNECTING:
                return "Connecting..."
            case CallStatus.ACTIVE:
                return "End Session"
            case CallStatus.FINISHED:
                return "Session Ended"
            case CallStatus.INACTIVE:
            default:
                return "Start Session"
        }
    }

    const isButtonDisabled = callStatus === CallStatus.CONNECTING || callStatus === CallStatus.FINISHED

    return (
        <section className="flex flex-col h-[70vh]">
            <section className="flex gap-8 max-sm:flex-col">
                <div className="companion-section">
                    <div 
                        className="companion-avatar" 
                        style={{ backgroundColor: getSubjectColor(subject) }}
                    >
                        <div 
                            className={cn(
                                "absolute transition-opacity duration-1000",
                                callStatus === CallStatus.ACTIVE ? "opacity-100" : "opacity-0",
                                callStatus === CallStatus.CONNECTING && 'opacity-100 animate-pulse'
                            )}
                        >
                            <Image 
                                src={`/icons/${subject}.svg`} 
                                alt="subject" 
                                width={150} 
                                height={150} 
                                className="max-sm:w-fit"
                            />
                        </div>
                        <div 
                            className={cn(
                                'absolute transition-opacity duration-1000',
                                callStatus === CallStatus.ACTIVE ? 'opacity-100' : 'opacity-0'
                            )}
                        >
                            <Lottie
                                lottieRef={lottieRef}
                                animationData={soundwaves}
                                autoplay={false}
                                loop={true}
                                className="companion-lottie"
                            />
                        </div>
                    </div>
                    <p className="font-bold text-2xl">{name}</p>
                </div>

                <div className="user-section">
                    <div className="user-avatar">
                        <Image 
                            src={userImage} 
                            alt="user" 
                            width={130} 
                            height={130} 
                            className="rounded-2xl"
                        />
                        <p className="font-bold text-2xl">{userName}</p>
                    </div>
                    
                    <button 
                        onClick={toggleMicrophone} 
                        className={cn(
                            "btn-mic",
                            callStatus !== CallStatus.ACTIVE && "opacity-50 cursor-not-allowed"
                        )}
                        disabled={callStatus !== CallStatus.ACTIVE}
                    >
                        <Image 
                            src={isMuted ? "/icons/mic-off.svg" : "/icons/mic-on.svg"} 
                            alt="microphone" 
                            width={36} 
                            height={36}
                        />
                        <p>{isMuted ? "Turn on microphone" : "Turn off microphone"}</p>
                    </button>
                    
                    <button 
                        onClick={callStatus === CallStatus.ACTIVE ? handleDisconnect : handleCall}
                        disabled={isButtonDisabled}
                        className={cn(
                            'rounded-lg py-2 cursor-pointer transition-colors duration-300 w-full text-white font-semibold',
                            callStatus === CallStatus.ACTIVE && 'bg-red-700 hover:bg-red-800',
                            callStatus === CallStatus.INACTIVE && 'bg-primary hover:bg-primary/90',
                            callStatus === CallStatus.CONNECTING && 'bg-primary/70 cursor-wait',
                            callStatus === CallStatus.FINISHED && 'bg-gray-500 cursor-not-allowed'
                        )}
                    >
                        {getButtonText()}
                    </button>
                </div>
            </section>

            <section className="transcript">
                <div className="transcript-message no-scrollbar">
                    {callStatus === CallStatus.INACTIVE && (
                        <p className="text-gray-500 text-center">Press "Start Session" to begin</p>
                    )}
                    {callStatus === CallStatus.CONNECTING && (
                        <p className="text-gray-500 text-center">Connecting to assistant...</p>
                    )}
                    {callStatus === CallStatus.ACTIVE && (
                        <p className="text-gray-500 text-center">Session is active - Messages will appear here</p>
                    )}
                    {callStatus === CallStatus.FINISHED && (
                        <p className="text-gray-500 text-center">Session ended</p>
                    )}
                    {transcript.map((message , index) => {
                        if(message.role === 'assistant'){
                            return(
                                <p key={index} className="max-sm:text-sm">
                                    {
                                        name.split(" ")[0].replace('/[.,]/g', '')
                                    }: {message.content}
                                </p>
                            )
                        } else{
                            return(
                                <p key={index} className="max-sm:text-sm">
                                    {userName}: {message.content}
                                </p>
                            )
                        }
                    })}
                </div>
                <div className="transcript-fade"/>
            </section>
        </section>
    )
}
