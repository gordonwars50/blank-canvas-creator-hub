import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { cn } from '@/lib/utils'
import { Calendar, LucideIcon, MapPin } from 'lucide-react'
import { ReactNode } from 'react'
import { AnimatedTooltip } from './animated-tooltip'

const people = [
  {
    id: 1,
    name: "Sarah Chen",
    designation: "Editor",
    image: "https://www.tapback.co/api/avatar/sarahchen",
  },
  {
    id: 2,
    name: "Marcus Johnson",
    designation: "Writer",
    image: "https://www.tapback.co/api/avatar/marcusjohnson",
  },
  {
    id: 3,
    name: "Emma Rodriguez",
    designation: "Producer",
    image: "https://www.tapback.co/api/avatar/emmarodriguez",
  },
  {
    id: 4,
    name: "Alex Kim",
    designation: "Designer",
    image: "https://www.tapback.co/api/avatar/alexkim",
  },
  {
    id: 5,
    name: "Maya Patel",
    designation: "Manager",
    image: "https://www.tapback.co/api/avatar/mayapatel",
  },
];

export function Features() {
    return (
        <section id="features-10" className="bg-black py-16 md:py-32">
            <div className="mx-auto max-w-2xl px-6 lg:max-w-5xl">
                <div className="mx-auto grid gap-4 lg:grid-cols-2">
                    <FeatureCard>
                        <CardHeader className="pb-3">
                            <CardHeading
                                icon={MapPin}
                                title="Real time location tracking"
                                description="Advanced tracking system, Instantly locate all your assets."
                            />
                        </CardHeader>

                        <div className="relative mb-6 border-t border-dashed border-gray-600 sm:mb-0">
                            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-gray-800/20 to-black"></div>
                            <div className="aspect-[76/59] p-1 px-6">
                                <DualModeImage
                                    darkSrc="/landing-page_images/Payments.png"
                                    lightSrc="/landing-page_images/Payments.png"
                                    alt="payments dashboard illustration"
                                    width={1207}
                                    height={929}
                                    className="hover:scale-105 transition-transform duration-300 ease-in-out"
                                />
                            </div>
                        </div>
                    </FeatureCard>

                    <FeatureCard>
                        <CardHeader className="pb-3">
                            <CardHeading
                                icon={Calendar}
                                title="Advanced Scheduling"
                                description="Scheduling system, Instantly locate all your assets."
                            />
                        </CardHeader>

                        <CardContent>
                            <div className="relative mb-6 sm:mb-0">
                                <div className="absolute -inset-6 bg-gradient-to-r from-transparent via-gray-800/10 to-black"></div>
                                <div className="aspect-[76/59] border border-gray-600 overflow-hidden">
                                    <DualModeImage
                                        darkSrc="/landing-page_images/June 2025.png"
                                        lightSrc="/landing-page_images/June 2025.png"
                                        alt="june 2025 calendar illustration"
                                        width={1207}
                                        height={929}
                                        className="hover:scale-105 transition-transform duration-300 ease-in-out w-full h-full object-cover"
                                    />
                                </div>
                            </div>
                        </CardContent>
                    </FeatureCard>

                    <FeatureCard className="p-6 lg:col-span-2">
                        <div className="text-center mb-8">
                            <h3 className="text-2xl font-semibold text-white mb-4">
                                Collaborative Workspace for Teams
                            </h3>
                            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
                                Bring your team together—editors, writers, producers, and more—in one unified hub.
                            </p>
                        </div>

                        <div className="flex justify-center">
                            <AnimatedTooltip items={people} />
                        </div>
                    </FeatureCard>
                </div>
            </div>
        </section>
    )
}

interface FeatureCardProps {
    children: ReactNode
    className?: string
}

const FeatureCard = ({ children, className }: FeatureCardProps) => (
    <Card className={cn('group relative rounded-none shadow-zinc-950/5 bg-black border-gray-700', className)}>
        <CardDecorator />
        {children}
    </Card>
)

const CardDecorator = () => (
    <>
        <span className="absolute -left-px -top-px block size-2 border-l-2 border-t-2 border-color-1"></span>
        <span className="absolute -right-px -top-px block size-2 border-r-2 border-t-2 border-color-1"></span>
        <span className="absolute -bottom-px -left-px block size-2 border-b-2 border-l-2 border-color-1"></span>
        <span className="absolute -bottom-px -right-px block size-2 border-b-2 border-r-2 border-color-1"></span>
    </>
)

interface CardHeadingProps {
    icon: LucideIcon
    title: string
    description: string
}

const CardHeading = ({ icon: Icon, title, description }: CardHeadingProps) => (
    <div className="p-6">
        <span className="text-gray-400 flex items-center gap-2">
            <Icon className="size-4" />
            {title}
        </span>
        <p className="mt-8 text-2xl font-semibold text-white">{description}</p>
    </div>
)

interface DualModeImageProps {
    darkSrc: string
    lightSrc: string
    alt: string
    width: number
    height: number
    className?: string
}

const DualModeImage = ({ darkSrc, lightSrc, alt, width, height, className }: DualModeImageProps) => (
    <>
        <img
            src={darkSrc}
            className={cn('block', className)}
            alt={`${alt} dark`}
            width={width}
            height={height}
        />
    </>
)

interface CircleConfig {
    pattern: 'none' | 'border' | 'primary' | 'red'
}

interface CircularUIProps {
    label: string
    circles: CircleConfig[]
    className?: string
}

const CircularUI = ({ label, circles, className }: CircularUIProps) => (
    <div className={className}>
        <div className="bg-gradient-to-b from-gray-600 to-black size-fit rounded-2xl p-px">
            <div className="bg-gradient-to-b from-gray-800 to-black relative flex aspect-square w-fit items-center -space-x-4 rounded-[15px] p-4">
                {circles.map((circle, i) => (
                    <div
                        key={i}
                        className={cn('size-7 rounded-full border sm:size-8', {
                            'border-gray-500': circle.pattern === 'none',
                            'border-gray-500 bg-[repeating-linear-gradient(-45deg,#374151,#374151_1px,transparent_1px,transparent_4px)]': circle.pattern === 'border',
                            'border-color-1 bg-gray-800 bg-[repeating-linear-gradient(-45deg,hsl(var(--color-1)),hsl(var(--color-1))_1px,transparent_1px,transparent_4px)]': circle.pattern === 'primary',
                            'bg-gray-800 z-1 border-color-1 bg-[repeating-linear-gradient(-45deg,hsl(var(--color-1)),hsl(var(--color-1))_1px,transparent_1px,transparent_4px)]': circle.pattern === 'red',
                        })}></div>
                ))}
            </div>
        </div>
        <span className="text-gray-400 mt-1.5 block text-center text-sm">{label}</span>
    </div>
)
