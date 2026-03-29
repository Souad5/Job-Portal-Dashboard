import {
  createContext,
  useContext,
  useState,
  useEffect,
  type ReactNode,
} from "react";
import axios from "axios";
import { API_BASE_URL } from "@/config";

type Recruiter = {
  _id: string;
  name: string;
  email: string;
  role: string;
  profilePic?: string;
};

type AuthContextType = {
  user: Recruiter | null;
  setUser: (u: Recruiter | null) => void;
  loading: boolean;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<Recruiter | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const { data } = await axios.get(`${API_BASE_URL}/recruiter/me`, {
          withCredentials: true, // ✅ important for cookie
        });

        const normalizedUser: Recruiter = {
          _id: data._id,
          name: data.name,
          email: data.email,
          role: data.role ?? "Recruiter",
          profilePic: data.profilePic ?? null,
        };

        setUser(normalizedUser);
      } catch (err) {
        console.error("Failed to fetch user", err);
        setUser(null); // cookie invalid or expired
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  return (
    <AuthContext.Provider value={{ user, setUser, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used inside AuthProvider");
  return context;
};
