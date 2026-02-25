export function HeartsBackground() {
  const hearts = Array.from({ length: 20 }, (_, i) => ({
    id: i,
    left: `${(i * 5.3 + Math.sin(i) * 20 + 50) % 100}%`,
    delay: `${(i * 0.8) % 10}s`,
    duration: `${11 + (i % 7)}s`,
    size: `${13 + (i % 10)}px`,
    emoji: i % 3 === 0 ? "💕" : "❤️",
  }));
  return (
    <div className="hearts-bg">
      {hearts.map((h) => (
        <span
          key={h.id}
          className="heart-float"
          style={{
            left: h.left,
            animationDelay: h.delay,
            animationDuration: h.duration,
            fontSize: h.size,
          }}
        >
          {h.emoji}
        </span>
      ))}
    </div>
  );
}
