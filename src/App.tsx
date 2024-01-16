import { useSearch } from './hooks/useSearch';
import Card from './components/Card';
import './styles/home.css';

function App() {

  const { searchResults, hasSearched, selectedElements, searchTerm, setSearchTerm, searchError, searchLoading } = useSearch();

  return (
    <div id="home">
      <div className="header">
        <h1>Github Search</h1>
      </div>
      <div className="content">
        <input className="search-input" type="text" placeholder='Search username' value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
        {hasSearched ? "true" : "false        "}
        {searchLoading ? "true" : "false"}
        {selectedElements.length > 0 && (
          <div className="controls">
            <div className='controls-infos'>
              <input type="checkbox" checked readOnly />
              <p>Selected elements : {selectedElements.length}</p>
            </div>
            <div className='controls-infos'>
              <button><img src="/images/duplicate.png" alt="Duplicate icon" /></button>
              <button><img src="/images/trash.png" alt="Trash icon" /></button>
            </div>
          </div>
        )}
        <div className="results-box">
          {
            searchLoading &&
            <div>
              <img className="results-box__loader" src="/images/loader.png" alt="Loader" />
              <p>Chargement des résultats</p>
            </div>
          }
          {
            !searchLoading && (
              <>
                {!hasSearched && <p className="results-box__text">Entrez un nom d'utilisateur à rechercher</p>}
                {(searchError === "" && hasSearched && searchResults.length === 0) && <p className="results-box__text">Aucun résultat...</p>}
                {searchError !== "" && <p className="results-box__text">{searchError}</p>}
                {
                  searchResults.length > 0 &&
                  searchResults.map((result: any) => {
                    return (
                      <Card key={`user-card-${result.id}`} user={result} />
                    )
                  })
                }
              </>
            )
          }
        </div>
      </div>
    </div>
  );
}

export default App;
