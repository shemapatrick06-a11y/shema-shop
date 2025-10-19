'use client';

import Image from 'next/image';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import Autoplay from 'embla-carousel-autoplay';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Button } from './ui/button';

export default function HeroCarousel() {
  const heroImages = PlaceHolderImages.filter((img) =>
    img.id.startsWith('hero-')
  );

  const heroContent = [
    {
      id: 'hero-1',
      title: '30% OFF SUMMER COLLECTION!',
      subtitle: 'Limited Time Offer. Grab your favorites now.',
      buttonText: 'Shop Now',
    },
    {
      id: 'hero-2',
      title: 'New Arrivals: Urban Edge',
      subtitle: 'Discover the latest in streetwear.',
      buttonText: 'Explore Collection',
    },
    {
      id: 'hero-3',
      title: 'Denim That Defines You',
      subtitle: 'Perfect fits for every style.',
      buttonText: 'Find Your Fit',
    },
    {
      id: 'hero-4',
      title: 'Elegance in Every Stitch',
      subtitle: 'Evening wear that turns heads.',
      buttonText: 'View Lookbook',
    },
  ];

  return (
    <div className="relative">
      <Carousel
        plugins={[Autoplay({ delay: 5000, stopOnInteraction: true })]}
        opts={{ loop: true }}
      >
        <CarouselContent>
          {heroContent.map((content) => {
            const image = heroImages.find((img) => img.id === content.id);
            if (!image) return null;
            return (
              <CarouselItem key={content.id}>
                <div className="relative h-[50vh] w-full md:h-[70vh]">
                  <Image
                    src={image.imageUrl}
                    alt={image.description}
                    fill
                    className="object-cover"
                    priority
                    data-ai-hint={image.imageHint}
                  />
                  <div className="absolute inset-0 bg-black/40" />
                  <div className="absolute inset-0 flex flex-col items-center justify-center text-center text-white">
                    <div className="animate-fade-in-down space-y-4">
                      <h1 className="font-headline text-4xl font-bold md:text-6xl">
                        {content.title}
                      </h1>
                      <p className="mx-auto max-w-2xl text-lg md:text-xl">
                        {content.subtitle}
                      </p>
                      <Button
                        size="lg"
                        className="animate-pulse-glow"
                      >
                        {content.buttonText}
                      </Button>
                    </div>
                  </div>
                </div>
              </CarouselItem>
            );
          })}
        </CarouselContent>
        <CarouselPrevious className="absolute left-4 top-1/2 -translate-y-1/2 text-white" />
        <CarouselNext className="absolute right-4 top-1/2 -translate-y-1/2 text-white" />
      </Carousel>
      <style jsx>{`
        @keyframes fadeInDown {
          from {
            opacity: 0;
            transform: translateY(-20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fade-in-down {
          animation: fadeInDown 1s ease-out forwards;
        }
        
        @keyframes pulseGlow {
          0%, 100% {
            transform: scale(1);
            box-shadow: 0 0 5px hsl(var(--primary)), 0 0 10px hsl(var(--primary));
          }
          50% {
            transform: scale(1.05);
            box-shadow: 0 0 15px hsl(var(--primary)), 0 0 25px hsl(var(--primary));
          }
        }
        .animate-pulse-glow {
          animation: pulseGlow 2.5s infinite ease-in-out;
        }
      `}</style>
    </div>
  );
}
