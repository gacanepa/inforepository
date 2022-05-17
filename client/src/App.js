import Landing from './pages/Landing';
import { SITE_TITLE } from './common/constants/pages';

const App = () => (
  <div>
    <h1>{SITE_TITLE}</h1>
    <Landing />
  </div>
);

export default App;
