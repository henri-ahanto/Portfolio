'use client'

import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/css'
import { StackCard } from '../cards/StackCard/StackCard'
import { Stack } from '@/domain/entities/Stacks'
import { Autoplay } from 'swiper/modules'
import { useEffect, useState } from 'react'

export const StackCarousel = ({ stacks }: { stacks: Stack[] }) => {
  const [clientWidth, setClientWidth] = useState<number>(1024);


  window.addEventListener('resize', (e) => {
    setClientWidth(document.documentElement.clientWidth)
  })
  return (
    <Swiper modules={[Autoplay]} slidesPerView={clientWidth >= 1550 ? 4 : 2} loop={true} autoplay={{ delay: 5000, }}>
      {stacks.map(stack => (
        <SwiperSlide key={stack.name}>
          <StackCard
            key={stack.id}
            name={stack.name}
            logo_url={stack.logo_url}
            description={stack.description}
          />

        </SwiperSlide>
      ))}
    </Swiper>
  );
}
