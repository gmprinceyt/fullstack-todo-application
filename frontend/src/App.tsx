import Todos  from "./components/custom/Todo.tsx"
import { ThemeProvider } from "./components/theme-provider.tsx";


const App = () => {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <div className=" w-full h-screen flex flex-col gap-3 justify-center items-center">
        <Todos />
      </div>
    </ThemeProvider>
  );
};

export default App;
