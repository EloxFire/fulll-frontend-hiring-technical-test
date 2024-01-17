import { useSearch } from './hooks/useSearch';
import Card from './components/Card';
import './styles/home.css';
import { duplicateElements } from './helpers/utils/duplicateElements';
import { deleteElements } from './helpers/utils/deleteElements';
import { GithubProfile } from './types/GithubProfile';
import { useState } from 'react';

function App() {

  const { searchResults, hasSearched, selectedElements, searchTerm, setSearchTerm, setTotalItems, searchError, searchLoading, totalItems, loadMore, moreLoading, setSearchResults, setSelectedElements } = useSearch();

  const [editMode, setEditMode] = useState(false);

  const handleDuplicate = () => {
    const newResults = duplicateElements(searchResults, selectedElements);
    setTotalItems(totalItems + selectedElements.length)
    setSearchResults(newResults);
    setSelectedElements([])
  }

  const handleDelete = () => {
    const newResults = deleteElements(searchResults, selectedElements);
    setTotalItems(totalItems - selectedElements.length)
    setSearchResults(newResults);
    setSelectedElements([])
  }

  const handleSelectAll = () => {
    selectedElements.length > 0 ? setSelectedElements([]) : setSelectedElements(searchResults);
  }

  const toggleEditMode = () => {
    setEditMode(!editMode);
  }

  return (
    <div id="home">
      <div className="header">
        <h1>Github Search</h1>
      </div>
      <div className="content">
        <input className="search-input" type="text" placeholder='Search username' value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
        <div className="controls">
          <div className="infos">
            <p>Elements affichés : {searchResults.length} / {totalItems}</p>
            <button onClick={() => toggleEditMode()}>Edit mode</button>
          </div>
          {
            editMode &&
            <div className="edit-mode">
              <div style={{ display: 'flex', flexDirection: 'row' }}>
                <input type="checkbox" checked={selectedElements.length > 0} readOnly onClick={() => handleSelectAll()} />
                <p>Selected elements : {selectedElements.length}</p>
              </div>
              {selectedElements.length > 0 && (
                <div className='edit-controls'>
                  <button onClick={() => handleDuplicate()}><img src="/images/duplicate.png" alt="Duplicate icon" /></button>
                  <button onClick={() => handleDelete()}><img src="/images/trash.png" alt="Trash icon" /></button>
                </div>
              )}
            </div>
          }
        </div>
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
                  searchResults.map((result: any, card_index: number) => {
                    return (
                      <Card key={`user-card-${card_index}-${result.id}`} user={result} selected={selectedElements.find((element: GithubProfile) => element.id === result.id)} editMode={editMode} />
                    )
                  })
                }
              </>
            )
          }
        </div>
        {
          moreLoading ?
            <div>
              <img className="results-box__loader" src="/images/loader.png" alt="Loader" />
              <p>Chargement des résultats</p>
            </div>
            :
            (searchResults.length > 0 && totalItems > searchResults.length) &&
            <button disabled={moreLoading} onClick={() => loadMore()}>LOAD MORE</button>
        }
      </div>
    </div>
  );
}

export default App;
