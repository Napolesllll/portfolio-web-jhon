type TechBadgeProps = {
  tech: string;
  active?: boolean;
  onClick?: () => void;
};

export function TechBadge({ tech, active, onClick }: TechBadgeProps) {
  return (
    <button
      onClick={onClick}
      className={`rounded-lg px-4 py-2 text-sm font-medium transition-smooth ${
        active
          ? "bg-primary text-primary-foreground"
          : "bg-background-secondary text-foreground-secondary hover:bg-background-tertiary hover:text-foreground"
      }`}
    >
      {tech}
    </button>
  );
}