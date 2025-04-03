import { useState, useEffect } from 'react'
import { Head, Link } from '@inertiajs/react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import {
  GitHubLogoIcon,
  DownloadIcon,
  ArrowRightIcon,
  LightningBoltIcon,
  RocketIcon,
  GearIcon,
  HeartIcon,
} from '@radix-ui/react-icons'
import { GuestLayout } from '@/layouts/guest-layout'
import type { Kit } from '@/types'

interface Props {
  trendingKits: Kit[]
  recentKits: Kit[]
}

export default function Welcome({ trendingKits, recentKits }: Props) {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
    }

    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  const features = [
    {
      icon: LightningBoltIcon,
      title: 'Quick Setup',
      description:
        'Get your Laravel project up and running in minutes with our curated starter kits.',
    },
    {
      icon: RocketIcon,
      title: 'Modern Stack',
      description:
        'Access kits built with the latest technologies and best practices.',
    },
    {
      icon: GearIcon,
      title: 'Customizable',
      description:
        'Each kit is designed to be easily customized to match your needs.',
    },
    {
      icon: HeartIcon,
      title: 'Community-Driven',
      description:
        'Join a thriving community of Laravel developers sharing their work.',
    },
  ]

  return (
    <GuestLayout>
      <Head title="Welcome" />

      {/* Glow Effect */}
      <div
        className="pointer-events-none fixed inset-0 z-30 transition duration-300"
        style={{
          background: `radial-gradient(600px at ${mousePosition.x}px ${mousePosition.y}px, rgba(29, 78, 216, 0.15), transparent 80%)`,
        }}
      />

      {/* Hero Section */}
      <section className="relative flex min-h-[calc(100vh-4rem)] items-center">
        <div className="container mx-auto">
          <div className="mx-auto max-w-2xl text-center">
            <h1 className="mb-6 text-4xl font-bold tracking-tight sm:text-6xl">
              one more reason{' '}
              <span className="text-gradient">
                to ship faster then ever
              </span>
            </h1>
            <p className="mb-8 text-lg text-muted-foreground sm:text-xl">
              Discover community-maintained starter kits that help you build better
              Laravel applications faster.
            </p>
            <div className="flex items-center justify-center gap-4">
              <Button asChild size="lg">
                <Link href="/kits">Browse Kits</Link>
              </Button>
              <Button variant="outline" size="lg" asChild>
                <Link href="/how-to">Learn More</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Kits Section */}
      <section className="border-t bg-muted/40 py-16">
        <div className="container mx-auto">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="mb-8 text-3xl font-bold tracking-tight">
              Featured Starter Kits
            </h2>
            <Tabs defaultValue="trending" className="mx-auto">
              <TabsList className="mb-8">
                <TabsTrigger value="trending">Trending</TabsTrigger>
                <TabsTrigger value="recent">Recently Added</TabsTrigger>
              </TabsList>
              <TabsContent value="trending">
                <div className="grid gap-6 sm:grid-cols-2">
                  {trendingKits.map((kit) => (
                    <Card
                      key={kit.slug}
                      className="flex cursor-pointer flex-col p-6 transition-colors hover:bg-muted/50"
                    >
                      <div className="mb-4 flex items-center gap-4">
                        <div className="flex -space-x-2">
                          {kit.maintainers.slice(0, 3).map((maintainer) => (
                            <img
                              key={maintainer.name}
                              src={maintainer.avatar_url}
                              alt={maintainer.name}
                              className="h-8 w-8 rounded-full border-2 border-background"
                              title={maintainer.name}
                            />
                          ))}
                          {kit.maintainers.length > 3 && (
                            <div className="flex h-8 w-8 items-center justify-center rounded-full border-2 border-background bg-muted text-xs font-medium">
                              +{kit.maintainers.length - 3}
                            </div>
                          )}
                        </div>
                        <h3 className="font-semibold">{kit.name}</h3>
                      </div>
                      <p className="mb-4 flex-1 text-sm text-muted-foreground">
                        {kit.description}
                      </p>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                          <span className="flex items-center">
                            <GitHubLogoIcon className="mr-1 h-4 w-4" />
                            {kit.stars}
                          </span>
                          <span className="flex items-center">
                            <DownloadIcon className="mr-1 h-4 w-4" />
                            {kit.downloads}
                          </span>
                        </div>
                        <div className="flex gap-1">
                          {kit.tags.slice(0, 3).map((tag) => (
                            <Badge key={tag.slug} variant="secondary">
                              {tag.name}
                            </Badge>
                          ))}
                          {kit.tags.length > 3 && (
                            <Badge variant="outline">
                              +{kit.tags.length - 3}
                            </Badge>
                          )}
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>
              </TabsContent>
              <TabsContent value="recent">
                <div className="grid gap-6 sm:grid-cols-2">
                  {recentKits.map((kit) => (
                    <Card
                      key={kit.slug}
                      className="flex cursor-pointer flex-col p-6 transition-colors hover:bg-muted/50"
                    >
                      <div className="mb-4 flex items-center gap-4">
                        <div className="flex -space-x-2">
                          {kit.maintainers.slice(0, 3).map((maintainer) => (
                            <img
                              key={maintainer.name}
                              src={maintainer.avatar_url}
                              alt={maintainer.name}
                              className="h-8 w-8 rounded-full border-2 border-background"
                              title={maintainer.name}
                            />
                          ))}
                          {kit.maintainers.length > 3 && (
                            <div className="flex h-8 w-8 items-center justify-center rounded-full border-2 border-background bg-muted text-xs font-medium">
                              +{kit.maintainers.length - 3}
                            </div>
                          )}
                        </div>
                        <h3 className="font-semibold">{kit.name}</h3>
                      </div>
                      <p className="mb-4 flex-1 text-sm text-muted-foreground">
                        {kit.description}
                      </p>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                          <span className="flex items-center">
                            <GitHubLogoIcon className="mr-1 h-4 w-4" />
                            {kit.stars}
                          </span>
                          <span className="flex items-center">
                            <DownloadIcon className="mr-1 h-4 w-4" />
                            {kit.downloads}
                          </span>
                        </div>
                        <div className="flex gap-1">
                          {kit.tags.slice(0, 3).map((tag) => (
                            <Badge key={tag.slug} variant="secondary">
                              {tag.name}
                            </Badge>
                          ))}
                          {kit.tags.length > 3 && (
                            <Badge variant="outline">
                              +{kit.tags.length - 3}
                            </Badge>
                          )}
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16">
        <div className="container mx-auto">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="mb-8 text-3xl font-bold tracking-tight">
              Why Choose LaraKits?
            </h2>
            <div className="grid gap-8 sm:grid-cols-2">
              {features.map((feature) => (
                <div
                  key={feature.title}
                  className="group relative overflow-hidden rounded-lg border bg-background p-6"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-cyan-50 opacity-0 transition-opacity duration-300 group-hover:opacity-10 dark:from-blue-950 dark:to-cyan-950" />
                  <feature.icon className="mb-4 h-8 w-8 text-primary" />
                  <h3 className="mb-2 text-lg font-semibold">{feature.title}</h3>
                  <p className="text-sm text-muted-foreground">
                    {feature.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="border-t bg-muted/40 py-16">
        <div className="container mx-auto">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="mb-4 text-3xl font-bold tracking-tight">
              Ready to Get Started?
            </h2>
            <p className="mb-8 text-lg text-muted-foreground">
              Browse our collection of Laravel starter kits and find the perfect
              foundation for your next project.
            </p>
            <Button asChild size="lg">
              <Link href="/kits" className="gap-2">
                Browse Starter Kits
                <ArrowRightIcon className="h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </GuestLayout>
  )
}
