import { cn } from "@/lib/utils";

const AppLogoText = ({
  className = "text-2xl",
  subClassName = "text-3xl",
}: {
  className?: string;
  subClassName?: string;
}) => {
  return (
    <h3
      className={cn(
        `text-2xl text-secondary-foreground font-bold self-center text-center`,
        className
      )}
    >
      NextJs
      <span
        className={cn(
          `text-gradient-green font-extrabold text-3xl`,
          subClassName
        )}
      >
        Eats
      </span>
    </h3>
  );
};

export default AppLogoText;
