import React, { useState, useRef } from "react";
import { gsap } from "gsap";

interface Card {
  id: number;
  color: string;
}

const cards: Card[] = [
  { id: 1, color: "bg-red-500" },
  { id: 2, color: "bg-green-500" },
  { id: 3, color: "bg-blue-500" },
  { id: 4, color: "bg-yellow-500" },
];

const CircularDequeCarousel: React.FC = () => {
  const [activeCard, setActiveCard] = useState<Card | null>(null);
  const [dequeCards, setDequeCards] = useState<Card[]>(cards);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);
  const expandedCardRef = useRef<HTMLDivElement | null>(null);

  const handleCardClick = (clickedCard: Card) => {
    if (activeCard?.id === clickedCard.id) return;

    const timeline = gsap.timeline();

    if (activeCard) {
      // Shrink current active card
      timeline.to(expandedCardRef.current, {
        scale: 0.2,
        x: "0",
        y: "0",
        duration: 0.5,
        ease: "power2.inOut",
      });
    }

    // Expand clicked card
    const clickedElement = cardsRef.current[dequeCards.indexOf(clickedCard)];
    if (clickedElement) {
      timeline
        .set(expandedCardRef.current, {
          backgroundColor: clickedCard.color.replace("bg-", ""),
        })
        .to(clickedElement, {
          scale: 5,
          duration: 0.5,
          ease: "power2.inOut",
        });
    }

    // Update deque order
    const newDequeCards = [...dequeCards];
    const clickedIndex = newDequeCards.indexOf(clickedCard);
    const removedCard = newDequeCards.splice(clickedIndex, 1)[0];
    if (activeCard) {
      newDequeCards.push(activeCard);
    }
    setDequeCards(newDequeCards);
    setActiveCard(removedCard);

    // Animate deque cards movement
    timeline.to(
      cardsRef.current.filter(Boolean),
      {
        x: (index) => `${index * 60}px`,
        duration: 0.3,
        ease: "power2.inOut",
      },
      "-=0.3"
    );
  };

  return (
    <div className="relative h-screen w-screen overflow-hidden">
      {/* Expanded card background */}
      <div
        ref={expandedCardRef}
        className={`fixed inset-0 transition-colors duration-300 ${
          activeCard ? activeCard.color : "bg-transparent"
        }`}
      />

      {/* Circular deque */}
      <div className="fixed bottom-8 right-8 flex gap-4">
        {dequeCards.map((card, index) => (
          <div
            key={card.id}
            onClick={() => handleCardClick(card)}
            ref={(el) => (cardsRef.current[index] = el)}
            style={{ transform: `translateX(${index * 60}px)` }}
            className={`h-12 w-12 rounded-full cursor-pointer transform transition-transform ${card.color}`}
          />
        ))}
      </div>
    </div>
  );
};

export default CircularDequeCarousel;
