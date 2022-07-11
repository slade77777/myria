import { useRouter } from 'next/router';
import { useAuthenticationContext } from 'src/context/authentication';

interface Props {
  children: React.ReactNode;
  redirectToPath?: string;
}

function ProtectedComponent({ children, redirectToPath = '/' }: Props) {
  const { user } = useAuthenticationContext();
  const router = useRouter();

  if (!user && typeof window === 'object') {
    router.replace(redirectToPath);
    return null;
  }

  return <>{children}</>;
}

export default ProtectedComponent;
