import type { ReactNode } from "react";
import "./AuthCard.css";

type AuthCardProps = {
  children: ReactNode;
  id: string;
};

function AuthCard({ children, id }: AuthCardProps) {
  return (
    <div className="auth-card" id={id}>
      {children}
    </div>
  );
}

export default AuthCard;
