import { useSearch } from './hooks/useSearch';
import Card from './components/Card';
import './styles/home.css';
import { mockUser } from './helpers/mocks';

function App() {

  const { searchResults } = useSearch();

  return (
    <div id="home">
      <div className="header">
        <h1>Github Search</h1>
      </div>
      <div className="content">
        <input type="text" />
        <div className="controls">

        </div>
        <div className="results-box">
          <Card user={mockUser} />
          <Card user={mockUser} />
          <Card user={mockUser} />
          <Card user={mockUser} />
          <Card user={mockUser} />
          {/* {
            searchResults.length > 0 ?
              searchResults.map((result: any) => {
                return (
                  <Card />
                )
              })
              :
              <p>Aucun résulats...</p>
          } */}
        </div>
      </div>
    </div>
  );
}

export default App;
