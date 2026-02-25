interface NavDotsProps {
  current: number;
  total: number;
  onClick: (i: number) => void;
}

export function NavDots({ current, total, onClick }: NavDotsProps) {
  return (
    <div className="nav-dots">
      {Array.from({ length: total }).map((_, i) => (
        <div
          key={i}
          className={`nav-dot-btn ${i === current ? "active" : ""}`}
          onClick={() => onClick(i)}
        />
      ))}
    </div>
  );
}
