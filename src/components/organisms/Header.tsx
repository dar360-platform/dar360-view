import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { Text } from "@/components/atoms/Text";
import logo from "@/assets/logo.png";

interface HeaderProps {
  showBack?: boolean;
  backTo?: string;
  backLabel?: string;
  minimal?: boolean;
}

export const Header = ({
  showBack = true,
  backTo = "/",
  backLabel = "Back to Home",
  minimal = false,
}: HeaderProps) => {
  if (minimal) {
    return (
      <header className="p-4 md:p-6">
        {showBack && (
          <Link
            to={backTo}
            className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <Text variant="small">{backLabel}</Text>
          </Link>
        )}
      </header>
    );
  }

  return (
    <header className="p-4 md:p-6 flex items-center justify-between">
      <Link to="/" className="flex items-center gap-2">
        <img src={logo} alt="Dar360" className="w-10 h-10 object-contain" />
        <Text variant="h4" className="font-display">
          Dar360
        </Text>
      </Link>
      {showBack && (
        <Link
          to={backTo}
          className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <Text variant="small">{backLabel}</Text>
        </Link>
      )}
    </header>
  );
};
