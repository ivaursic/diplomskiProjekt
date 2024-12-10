import ErrorGetter from "./ErrorGetter";
import ErrorSender from "./ErrorSender";

const App = () => {
  return (
    <div>
      <h1>LexApp</h1>
      <ErrorSender />
      <ErrorGetter />
    </div>
  );
};

export default App;
