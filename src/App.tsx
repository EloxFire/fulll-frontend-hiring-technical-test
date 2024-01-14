import Card from './components/Card';
import { useSearch } from './hooks/useSearch';
import './styles/home.css'

function App() {

  const { searchResults } = useSearch()

  return (
    <div id="home">
      <div className="header">
        <h1>Github Search</h1>
      </div>
      <div className="content">
        <input type="text" />
        <div className="controls">

        </div>
        <div className="results">
          {
            searchResults.length > 0 ?
              searchResults.map((result: any) => {
                return (
                  <Card />
                )
              })
              :
              <h2>Aucun résulats...</h2>
          }
        </div>
      </div>
    </div>
  );
}

export default App;
