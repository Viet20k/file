import {QueryClient, QueryClientProvider} from "react-query";
import "antd/dist/antd.css";
import {AppProps} from "next/app";
import Config from "../config";
import {Navbar} from "@app/module/navbar";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: Config.NETWORK_CONFIG.RETRY,
      refetchOnWindowFocus: false,
    },
  },
});

export default function MyApp({Component}: AppProps): JSX.Element {
  if (typeof window !== "undefined") {
    return (
      <QueryClientProvider client={queryClient}>
        <Navbar />
        <Component />
      </QueryClientProvider>
    );
  }

  return (
    <QueryClientProvider client={queryClient}>
      <Component />
    </QueryClientProvider>
  );
}
