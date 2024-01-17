import React, { ChangeEvent } from 'react'
import { GithubProfile } from '../types/GithubProfile'
import '../styles/components/card.css'
import { useSearch } from '../hooks/useSearch';

// Interface de typage des props du composent Card
interface CardProps {
  user: GithubProfile
  selected: boolean
}

// Création d'un composent Card qui affichera les informations d'un utilisateur
export default function Card({ user, selected }: CardProps) {

  const { addSelectedElement, removeSelectedElement } = useSearch();

  // Fonction de gestion du changeent d'état de la checkbox de la card
  const handleCheckboxChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked) {
      addSelectedElement(user);
    } else {
      removeSelectedElement(user);
    }
  }

  return (
    <div className="card">
      <div className="card__header">
        <input type="checkbox" checked={selected} onChange={(e) => handleCheckboxChange(e)} />
      </div>
      <div className="card__body">
        {(user && user.avatar_url !== "") && <img className="card__body__avatar" src={user.avatar_url} alt={user.login} />}
        {(!user || (user && user.avatar_url === "")) && <div className="card__body__avatar--default">Avatar</div>}
        <div className="card__body__infos">
          <p className="card__body__infos__text">{user.id}</p>
          <p className="card__body__infos__text">{user.login}</p>
        </div>
      </div>
      <button className="card__button">View profile</button>
    </div>
  )
}
